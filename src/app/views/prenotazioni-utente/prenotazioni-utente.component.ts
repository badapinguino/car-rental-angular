import {Component, Input, OnInit} from '@angular/core';
import {CustomButtonProperties} from '../../_template/custom-button-properties';
import {HeaderCustomTable} from '../../_template/header-custom-table';
import {RestApi} from '../../services/rest-api.enum';
import {Prenotazione} from '../../model/prenotazione';
import {PrenotazioniService} from '../../services/prenotazioni.service';
import {ActivatedRoute} from '@angular/router';
import {UtentiService} from '../../services/utenti.service';
import {Utente} from '../../model/utente';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-prenotazioni-utente',
  templateUrl: './prenotazioni-utente.component.html',
  styleUrls: ['./prenotazioni-utente.component.css']
})
export class PrenotazioniUtenteComponent implements OnInit {
  @Input() codiceFiscaleInput: string;

  private codiceFiscaleUtentePrenotazioni: string;
  private utentePrenotazioni: Utente;
  private currentUser: Utente;
  private error: string;

  constructor(
    private prenotazioniService: PrenotazioniService,
    private route: ActivatedRoute,
    private utentiService: UtentiService,
    private authenticationService: AuthenticationService) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  creaPrenotazionePulsanteProprieta: CustomButtonProperties = {
    testo: 'Effettua una nuova prenotazione',
    buttonTypeBootstrap: 'btn-primary',
    url: '/creaModificaPrenotazione'
  };

  listaPrenotazioni: Prenotazione[];
  listaPrenotazioniVeicoli: {
    id: number,
    dataInizio: string,
    dataFine: string,
    descrizioneVeicolo: string
  }[];

  listaHeaderPrenotazioni: HeaderCustomTable[] = [
    {
      key: 'id',
      label: 'Codice prenotazione'
    },
    {
      key: 'dataInizio',
      label: 'Data Inizio'
    },
    {
      key: 'dataFine',
      label: 'Data Fine'
    },
    {
      key: 'descrizioneVeicolo',
      label: 'Veicolo'
    }
  ];

  listaHeaderPulsanti: HeaderCustomTable[] = [
    {
      key: 'modifica',
      label: 'Modifica'
    },
    {
      key: 'elimina',
      label: 'Elimina'
    }
  ];

  listaPulsanti: CustomButtonProperties[] = [
    {
      testo: 'Modifica',
      buttonTypeBootstrap: 'btn-outline-primary',
      url: '/creaModificaPrenotazione'
    },
    {
      testo: 'Elimina',
      buttonTypeBootstrap: 'btn-danger',
      urlRestApi: 'http://localhost:8080/api/prenotazioni/',
      restApi: RestApi.Delete
    }
  ];

  ngOnInit(): void {
    if (this.codiceFiscaleInput) {
      this.codiceFiscaleUtentePrenotazioni = this.codiceFiscaleInput;
    } else {
      this.codiceFiscaleUtentePrenotazioni = this.route.snapshot.queryParamMap.get('codiceFiscale');
    }

    if (this.codiceFiscaleUtentePrenotazioni) {
      this.utentiService.selezionaUtente(this.codiceFiscaleUtentePrenotazioni)
        .subscribe(
          data => {
            this.utentePrenotazioni = data;
          },
          error => {
            this.error = error;
          }
        );
    }

    this.inizializzaListaPrenotazioni();
  }

  onRichiestaRest(risultato: any) {
    this.inizializzaListaPrenotazioni();
  }

  inizializzaListaPrenotazioni() {
    this.listaPrenotazioniVeicoli = [];
    this.prenotazioniService.selezionaTuttePrenotazioniUtente(this.codiceFiscaleUtentePrenotazioni)
      .subscribe(
        prenotazioni => {
          this.listaPrenotazioni = prenotazioni;
          this.inizializzaListaPrenotazioniVeicoli();
        },
        error => {
          this.error = error;
        });
  }

  private inizializzaListaPrenotazioniVeicoli() {
    for (const item of this.listaPrenotazioni) {
      this.listaPrenotazioniVeicoli.push(
        {
          id: item.id,
          dataInizio: item.dataInizio,
          dataFine: item.dataFine,
          descrizioneVeicolo: item.veicolo.casaCostruttrice + ' ' + item.veicolo.modello
        });
    }
  }

}
