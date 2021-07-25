import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomButtonProperties} from '../../_template/custom-button-properties';
import {first} from 'rxjs/operators';
import {UtentiService} from '../../services/utenti.service';
import {Utente} from '../../model/utente';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {Title} from '@angular/platform-browser';
import * as sha512 from 'js-sha512';

@Component({
  selector: 'app-crea-modifica-utente',
  templateUrl: './crea-modifica-utente.component.html',
  styleUrls: ['./crea-modifica-utente.component.css']
})
export class CreaModificaUtenteComponent implements OnInit/*, OnChanges*/ {
  private utenteForm: FormGroup;
  private submitted = false;
  creaUtenteButtonProperties: CustomButtonProperties;
  error: string;
  private utenteGiaEsistente: Utente;
  private successMessage: string;
  private codiceFiscaleValidation: string;
  private warningMessage: string;

  private titoloPagina = 'Crea o modifica un utente';

  private codiceFiscaleUtenteDaModificare: string;
  private currentUser: Utente;
  private codiceFiscaleValidationTrue: boolean;
  private immagineSelezionata: any;
  private immagineInserita: boolean;
  private timestamp: number;

  constructor(private formBuilder: FormBuilder,
              private utentiService: UtentiService,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private titleService: Title,
              private router: Router) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.titleService.setTitle('Crea o modifica un utente');
    // force route reload whenever parameters change
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }

  ngOnInit() {
    this.codiceFiscaleUtenteDaModificare = this.route.snapshot.queryParamMap.get('codiceFiscale');

    this.onInitOnChanges();
  }

  onInitOnChanges() {
    if (this.codiceFiscaleUtenteDaModificare) {
      if (this.codiceFiscaleUtenteDaModificare === this.currentUser.codiceFiscale || this.currentUser.superuser) {
        this.utentiService.selezionaUtente(this.codiceFiscaleUtenteDaModificare)
            .subscribe(data => {
              this.utenteForm = this.formBuilder.group({
                nome: [data.nome, [Validators.required, Validators.maxLength(80)]],
                cognome: [data.cognome, [Validators.required, Validators.maxLength(80)]],
                codiceFiscale: [{value: data.codiceFiscale, disabled: true},
                  [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
                vecchiaPassword: ['', [Validators.required]],
                password: ['', [Validators.required]],
                dataNascita: [data.dataNascita, Validators.required],
                superuser: [data.superuser],
                email: [data.email, [Validators.required, Validators.email]],
                immagine: [data.immagine],
                verificato: [false]
              });
              if (data.immagine !== null && data.immagine !== '') {
                this.immagineInserita = true;
              }
            });
        this.creaUtenteButtonProperties = {
          testo: 'Modifica utente',
          buttonTypeBootstrap: 'btn-primary'
        };
        if (this.codiceFiscaleUtenteDaModificare === this.currentUser.codiceFiscale) {
          this.titoloPagina = 'Profilo utente';
        }
      } else {
        this.error = 'ERRORE: Puoi modificare solo il tuo utente';
      }
    } else {
      this.creaUtenteButtonProperties = {
        testo: 'Crea utente',
        buttonTypeBootstrap: 'btn-primary'
      };
      this.utenteForm = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.maxLength(80)]],
        cognome: ['', [Validators.required, Validators.maxLength(80)]],
        codiceFiscale: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
        vecchiaPassword: [{value: null, disabled: true}],
        password: ['', [Validators.required, Validators.maxLength(42)]],
        dataNascita: ['', Validators.required],
        superuser: [false],
        email: ['', [Validators.required, Validators.email]],
        immagine: [null],
        verificato: [false]
      });
      this.immagineInserita = false;
    }
  }

  get f() { return this.utenteForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.error = '';
    this.successMessage = '';
    this.warningMessage = '';
    // controllo se la data di nascita non è futura rispetto alla data odierna
    const dataNascitaDate = new Date(this.f.dataNascita.value);
    if (dataNascitaDate > new Date()) {
      this.error = 'ERRORE: La data di nascita non può essere futura.';
      return;
    }

    if (dataNascitaDate < new Date(1900, 1, 1)) {
      this.error = 'ERRORE: La data di nascita non può essere antecedente al 1900.';
    }

    // stop here if form is invalid
    if (this.utenteForm.invalid) {
      return;
    }

    this.utentiService.selezionaUtente(this.f.codiceFiscale.value + '')
      .subscribe( data => {
        this.utenteGiaEsistente = data;
        let utente: Utente;
        if (this.utenteGiaEsistente != null) {
          utente = {
            nome: this.f.nome.value,
            cognome: this.f.cognome.value,
            dataNascita: this.f.dataNascita.value,
            codiceFiscale: this.f.codiceFiscale.value,
            superuser: this.f.superuser.value,
            vecchiaPassword: sha512.sha512(this.f.vecchiaPassword.value),
            password: sha512.sha512(this.f.password.value),
            immagine: this.utenteGiaEsistente.immagine,
            id: this.utenteGiaEsistente.id,
            email: this.f.email.value,
            verificato: this.utenteGiaEsistente.verificato
          };
          if (this.utenteGiaEsistente.immagine !== null && this.utenteGiaEsistente.immagine !== '') {
            this.immagineInserita = true;
          }
        } else {
          utente = {
            nome: this.f.nome.value,
            cognome: this.f.cognome.value,
            dataNascita: this.f.dataNascita.value,
            codiceFiscale: this.f.codiceFiscale.value,
            superuser: this.f.superuser.value,
            password: sha512.sha512(this.f.password.value),
            email: this.f.email.value,
            verificato: this.f.verificato.value
          };
          this.immagineInserita = false;
        }

        this.utentiService.salvaUtente(utente)
          .pipe(first())
          .subscribe(
            dati => {
              this.successMessage = 'Utente inserito correttamente.';

              if (this.immagineSelezionata != null) {

                this.utentiService.uploadImmagine(this.immagineSelezionata, utente.codiceFiscale + '').subscribe(
                  res => {
                    this.immagineInserita = false;
                    this.successMessage += '\nImmagine inserita correttamente.';
                    this.codiceFiscaleUtenteDaModificare = utente.codiceFiscale;
                    this.timestamp = (new Date()).getTime();
                    this.immagineInserita = true;
                    if (window.location.href.indexOf('#') <= -1) {
                      window.location.href += '#';
                    }
                  },
                  err => {
                    this.warningMessage =
                      'Errore durante il caricamento dell\'immagine. Probabilmente la dimensione del file è troppo grande.';
                    this.immagineInserita = false;
                    if (window.location.href.indexOf('#') <= -1) {
                      window.location.href += '#';
                    }
                  }
                );
              }
              if (window.location.href.indexOf('#') <= -1) {
                window.location.href += '#';
              }
            },
            error => {
              this.error = 'ERRORE: ' + error;
              if (window.location.href.indexOf('#') <= -1) {
                window.location.href += '#';
              }
            });
      });
  }

  onTypeCodiceFiscale(codiceFiscaleValue: string) {
    this.codiceFiscaleValidationTrue = false;
    this.utentiService.selezionaUtente(codiceFiscaleValue)
      .subscribe( data => {
        if (data != null) {
          this.codiceFiscaleValidation =
            'Il codice fiscale inserito è già esistente. Non verrà inserito un nuovo utente ma verrà modificato quello già presente';
        } else {
          this.codiceFiscaleValidation = '';
        }
        this.codiceFiscaleValidationTrue = true;
      });
  }

  handleImages(Event) {
    this.immagineSelezionata = Event.target.files[0];
  }

  public getTimestamp() {
    return this.timestamp;
  }
}
