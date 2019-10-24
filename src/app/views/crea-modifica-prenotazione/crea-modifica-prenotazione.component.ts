import { Component, OnInit } from '@angular/core';
import {CustomButtonProperties} from '../../_template/custom-button-properties';
import {Veicolo} from '../../model/veicolo';
import {ActivatedRoute} from '@angular/router';
import {VeicoliService} from '../../services/veicoli.service';
import {first} from 'rxjs/operators';
import {Prenotazione} from '../../model/prenotazione';
import {PrenotazioniService} from '../../services/prenotazioni.service';
import {UtentiService} from '../../services/utenti.service';
import {AuthenticationService} from '../../services/authentication.service';
import {Utente} from '../../model/utente';

@Component({
  selector: 'app-crea-modifica-prenotazione',
  templateUrl: './crea-modifica-prenotazione.component.html',
  styleUrls: ['./crea-modifica-prenotazione.component.css']
})
export class CreaModificaPrenotazioneComponent implements OnInit {

  error: string;
  private successMessage: string;
  private warningMessage: string;

  private creaPrenotazioneButtonProperties: CustomButtonProperties;

  // private veicoloGiaEsistente: Veicolo;

  private titoloPagina = 'Crea o modifica una prenotazione';
  model: Prenotazione;
  // listaTipologiaVeicoli = [
  //   'Berlina',
  //   'City car',
  //   'Furgone',
  //   'Lusso',
  //   'Monovolume',
  //   'Sportiva',
  //   'Supercar',
  //   'Suv',
  //   'Utilitaria'
  // ];
  private codicePrenotazioneDaModificare: number;
  private codiceFiscaleUtentePrenotazione: string;
  private listaVeicoli: Veicolo[];
  private currentUser: Utente;

  constructor(
    private route: ActivatedRoute,
    private prenotazioniService: PrenotazioniService,
    private veicoliService: VeicoliService,
    private utentiService: UtentiService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    // TODO: controllare poi che la prenotazione trovata dall'id nella modifica abbia
    //  lo stesso utente.codiceFiscale associato uguale al CF utente sessione
    this.codicePrenotazioneDaModificare = + this.route.snapshot.queryParamMap.get('id');
    this.codiceFiscaleUtentePrenotazione = this.route.snapshot.queryParamMap.get('codiceFiscale');

    // seleziono lista veicoli
    this.veicoliService.selezionaTuttiVeicoli().subscribe(
      data => {
        this.listaVeicoli = data;
        // this.model.veicolo = this.listaVeicoli[0];
      }
    );

    if (this.codicePrenotazioneDaModificare) {
      this.prenotazioniService.selezionaPrenotazione(this.codicePrenotazioneDaModificare)
        .subscribe(prenotazione => {
          this.model = prenotazione;
          console.log(prenotazione);
          console.log(prenotazione.veicolo);
          this.codiceFiscaleUtentePrenotazione = prenotazione.utente.codiceFiscale;
        });
      this.creaPrenotazioneButtonProperties = {
        testo: 'Modifica prenotazione',
        buttonTypeBootstrap: 'btn-primary'
      };
      this.titoloPagina = 'Modifica prenotazione già esistente';
    } else {
      this.creaPrenotazioneButtonProperties = {
        testo: 'Crea prenotazione',
        buttonTypeBootstrap: 'btn-primary'
      };
      this.utentiService.selezionaUtente(this.codiceFiscaleUtentePrenotazione).subscribe(data => {
        this.model = {};
        this.model.utente = data;
      });
      this.titoloPagina = 'Inserisci una nuova prenotazione';
    }

  }

  onSubmit() {

    // this.submitted = true;
    this.error = '';
    this.successMessage = '';
    this.warningMessage = '';

    // TODO: Controlli su date inizio e fine:
    // if (this.model.prezzoGiornata <= 0) {
    //   this.error = 'ERRORE: Il prezzo del veicolo deve essere maggiore di 0€.';
    //   return;
    // }
    // // controllo se l'anno
    // const annoVeicolo = this.model.anno;
    // if (annoVeicolo > (new Date().getFullYear() + 1)) {
    //   this.error = 'ERRORE: L\'anno del veicolo non può essere superiore all\'anno successivo quello attuale.';
    //   return;
    // }
    // if (annoVeicolo < 1900) {
    //   this.error = 'ERRORE: L\'anno del veicolo non può essere antecedente al 1900.';
    //   return;
    // }

    // stop here if form is invalid
    // if (this.model.form.invalid) {
    //   return;
    // }

    // CONTROLLO NON DA FARE PERCHE' id è già chiave primaria quindi dovrebbe già essere completo il campo dalla get per la modifica onInit
    // this.prenotazioniService.selezionaPrenotazione(this.model.veicolo + '')
    //   .subscribe( data => {
    //     this.veicoloGiaEsistente = data;
    //     let veicolo: Veicolo;
    //     if (this.veicoloGiaEsistente != null) {
    //       veicolo = this.model;
    //       veicolo.id = data.id;
    //     } else {
    //       veicolo = this.model;
    //     }

    const prenotazione = this.model;
    console.log(prenotazione);
    this.prenotazioniService.salvaPrenotazione(prenotazione)
      .pipe(first())
      .subscribe(
        dati => {
          this.successMessage = 'Prenotazione inserita correttamente';
        },
        error => {
          this.error = 'Errore: La prenotazione non è stata inserita.';
          console.log(this.error);
        });

      // });

  }
}
