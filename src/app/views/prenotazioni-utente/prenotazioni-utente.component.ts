import { Component, OnInit } from '@angular/core';
import {CustomButtonProperties} from '../../_template/custom-button-properties';
import {HeaderCustomTable} from '../../_template/header-custom-table';
import {RestApi} from '../../services/rest-api.enum';
import {map} from 'rxjs/operators';
import {Prenotazione} from '../../model/prenotazione';
import {PrenotazioniService} from '../../services/prenotazioni.service';
import {ActivatedRoute} from '@angular/router';
import {UtentiService} from '../../services/utenti.service';
import {Utente} from '../../model/utente';

@Component({
  selector: 'app-prenotazioni-utente',
  templateUrl: './prenotazioni-utente.component.html',
  styleUrls: ['./prenotazioni-utente.component.css']
})
export class PrenotazioniUtenteComponent implements OnInit {
  private codiceFiscaleUtentePrenotazioni: string;
  private utentePrenotazioni: Utente;

  constructor(private prenotazioniService: PrenotazioniService, private route: ActivatedRoute, private utentiService: UtentiService) { }

  creaPrenotazionePulsanteProprieta: CustomButtonProperties = {
    testo: 'Effettua una nuova prenotazione',
    buttonTypeBootstrap: 'btn-primary',
    url: '/creaModificaPrenotazione'
  };

  listaPrenotazioni: Prenotazione[];

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
    this.codiceFiscaleUtentePrenotazioni = this.route.snapshot.queryParamMap.get('codiceFiscale');

    if (this.codiceFiscaleUtentePrenotazioni) {
      this.utentiService.selezionaUtente(this.codiceFiscaleUtentePrenotazioni)
        .subscribe(data => {
          this.utentePrenotazioni = data;
        });
    }


    this.inizializzaListaPrenotazioni();
  }

  inizializzaListaPrenotazioni() {
    this.prenotazioniService.selezionaTuttePrenotazioniUtente(this.codiceFiscaleUtentePrenotazioni)/*.pipe(
      map((r: any[]) => r.map(veicolo => {
        veicolo.prezzoGiornata = veicolo.prezzoGiornata + '€';
        return veicolo;
      }))
    )*/.subscribe(prenotazioni => {
      this.listaPrenotazioni = prenotazioni;
    });
  }

  onRichiestaRest(risultato: any) {
    this.inizializzaListaPrenotazioni();
  }

}
