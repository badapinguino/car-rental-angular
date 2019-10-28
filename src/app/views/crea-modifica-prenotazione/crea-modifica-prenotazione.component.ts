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
import {Title} from '@angular/platform-browser';

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
  private codicePrenotazioneDaModificare: number;
  private codiceFiscaleUtentePrenotazione: string;
  private listaVeicoli: Veicolo[];
  private currentUser: Utente;

  constructor(
    private route: ActivatedRoute,
    private prenotazioniService: PrenotazioniService,
    private veicoliService: VeicoliService,
    private utentiService: UtentiService,
    private authenticationService: AuthenticationService,
    private titleService: Title
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.titleService.setTitle('Crea o modifica una prenotazione');
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

    const prenotazione = this.model;
    console.log(prenotazione);
    this.prenotazioniService.salvaPrenotazione(prenotazione)
      .pipe(first())
      .subscribe(
        dati => {
          this.successMessage = 'Prenotazione inserita correttamente';
        },
        error => {
          // this.error = 'Errore: La prenotazione non è stata inserita.';
          this.error = 'Errore: La prenotazione non è stata inserita!\n' + error;
          console.log(this.error);
        });
  }
}
