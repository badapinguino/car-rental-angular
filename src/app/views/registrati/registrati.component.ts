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
  selector: 'app-registrati',
  templateUrl: './registrati.component.html',
  styleUrls: ['./registrati.component.css']
})
export class RegistratiComponent implements OnInit {
  private utenteForm: FormGroup;
  private submitted = false;
  creaUtenteButtonProperties: CustomButtonProperties;
  loginButtonProperties: CustomButtonProperties;
  error: string;
  private successMessage: string;
  private codiceFiscaleValidation: string;
  private warningMessage: string;

  private titoloPagina = 'Registrati al servizio';

  private currentUser: Utente;
  private codiceFiscaleValidationTrue: boolean;
  private immagineSelezionata: any;
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
    // this.codiceFiscaleUtenteDaModificare = this.route.snapshot.queryParamMap.get('codiceFiscale');

    this.onInitOnChanges();
  }

  onInitOnChanges() {
    this.utenteForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(80)]],
      cognome: ['', [Validators.required, Validators.maxLength(80)]],
      codiceFiscale: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      password: ['', [Validators.required, Validators.maxLength(42)]],
      dataNascita: ['', Validators.required],
      superuser: [false],
      email: ['', [Validators.required, Validators.email]],
      immagine: [null],
      verificato: [false]
    });
    this.creaUtenteButtonProperties = {
      testo: 'Registrati',
      buttonTypeBootstrap: 'btn-primary'
    };
    this.loginButtonProperties = {
      testo: 'Torna al login',
      buttonTypeBootstrap: 'btn-secondary',
      url: '/login'
    };
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

    let utente: Utente;
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

    this.utentiService.registraUtente(utente)
        .pipe(first())
        .subscribe(
            dati => {
              this.successMessage = 'Utente inserito correttamente.';

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
