import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomButtonProperties} from '../../_template/custom-button-properties';
import {first} from 'rxjs/operators';
import {UtentiService} from '../../services/utenti.service';
import {Utente} from '../../model/utente';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {Title} from '@angular/platform-browser';

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

  constructor(private formBuilder: FormBuilder,
              private utentiService: UtentiService,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private titleService: Title) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.titleService.setTitle('Crea o modifica un utente');
  }

  ngOnInit() {
    this.onInitOnChanges();
  }

  onInitOnChanges() {
    this.codiceFiscaleUtenteDaModificare = this.route.snapshot.queryParamMap.get('codiceFiscale');

    if (this.codiceFiscaleUtenteDaModificare) {
      this.utentiService.selezionaUtente(this.codiceFiscaleUtenteDaModificare)
        .subscribe(data => {
          this.utenteForm = this.formBuilder.group({
            nome: [data.nome, [Validators.required, Validators.maxLength(80)]],
            cognome: [data.cognome, [Validators.required, Validators.maxLength(80)]],
            codiceFiscale: [{value: data.codiceFiscale, disabled: true},
              [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
            password: ['', [Validators.required]],
            dataNascita: [data.dataNascita, Validators.required],
            superuser: [data.superuser],
            immagine: [data.immagine]
          });
        });
      this.creaUtenteButtonProperties = {
        testo: 'Modifica utente',
        buttonTypeBootstrap: 'btn-primary'
      };
      if (this.codiceFiscaleUtenteDaModificare === this.currentUser.codiceFiscale) {
        this.titoloPagina = 'Profilo utente';
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
        password: ['', [Validators.required, Validators.maxLength(42)]],
        dataNascita: ['', Validators.required],
        superuser: [false],
        immagine: [null]
      });
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
      this.error = 'ERRORE: La data di nascita non può essere futura';
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
            password: this.f.password.value,
            immagine: this.utenteGiaEsistente.immagine,
            id: this.utenteGiaEsistente.id
          };
        } else {
          utente = {
            nome: this.f.nome.value,
            cognome: this.f.cognome.value,
            dataNascita: this.f.dataNascita.value,
            codiceFiscale: this.f.codiceFiscale.value,
            superuser: this.f.superuser.value,
            password: this.f.password.value
          };
        }

        this.utentiService.salvaUtente(utente)
          .pipe(first())
          .subscribe(
            dati => {
              this.successMessage = 'Utente inserito correttamente.';

              if (this.immagineSelezionata != null) {

                this.utentiService.uploadImmagine(this.immagineSelezionata, utente.codiceFiscale + '').subscribe(
                  res => {
                    this.successMessage += '\nImmagine inserita correttamente.';
                    // this.onInitOnChanges();
                  },
                  err => {
                    this.warningMessage =
                      'Errore durante il caricamento dell\'immagine. Probabilmente la dimensione del file è troppo grande.';
                    console.log(err);
                  }
                );
              }
            },
            error => {
              this.error = 'ERRORE: ' + error;
              console.log(this.error);
            });

      });
  }

  onTypeCodiceFiscale(codiceFiscaleValue: string) {
    this.codiceFiscaleValidationTrue = false;
    this.utentiService.selezionaUtente(codiceFiscaleValue)
      .subscribe( data => {
        if (data != null) {
          // TODO controllare perché non mi fa vedere il messaggio
          // probabilmente perché la richiesta la fa dopo aver aggiornato l'elemento nella UI
          this.codiceFiscaleValidation =
            'Il codice fiscale inserito è già esistente. Non verrà inserito un nuovo utente ma verrà modificato quello già presente';
        } else {
          this.codiceFiscaleValidation = '';
        }
        console.log(this.codiceFiscaleValidation);
        this.codiceFiscaleValidationTrue = true;
      });
  }

  handleImages(Event) {
    this.immagineSelezionata = Event.target.files[0];
    console.log(this.immagineSelezionata);
  }
}
