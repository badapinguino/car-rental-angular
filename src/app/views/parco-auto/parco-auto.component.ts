import { Component, OnInit } from '@angular/core';
import {CustomButtonProperties} from '../../_template/custom-button-properties';
import {HeaderCustomTable} from '../../_template/header-custom-table';
import {RestApi} from '../../services/rest-api.enum';
import {map} from 'rxjs/operators';
import {Veicolo} from '../../model/veicolo';
import {VeicoliService} from '../../services/veicoli.service';
import {AuthenticationService} from '../../services/authentication.service';
import {Utente} from '../../model/utente';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-parco-auto',
  templateUrl: './parco-auto.component.html',
  styleUrls: ['./parco-auto.component.css']
})
export class ParcoAutoComponent implements OnInit {
  private currentUser: Utente;

  constructor(private veicoliService: VeicoliService, private authenticationService: AuthenticationService, private titleService: Title) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.titleService.setTitle('Parco auto');
  }

  creaVeicoloPulsanteProprieta: CustomButtonProperties = {
    testo: 'Crea un nuovo veicolo',
    buttonTypeBootstrap: 'btn-primary',
    url: '/creaModificaVeicolo'
  };

  listaVeicoli: Veicolo[];

  listaHeaderVeicoli: HeaderCustomTable[] = [
    {
      key: 'codiceMezzo',
      label: 'Codice Mezzo'
    },
    {
      key: 'targa',
      label: 'Targa'
    },
    {
      key: 'casaCostruttrice',
      label: 'Casa Costruttrice'
    },
    {
      key: 'modello',
      label: 'Modello'
    },
    {
      key: 'anno',
      label: 'Anno'
    },
    {
      key: 'tipologia',
      label: 'Tipologia'
    },
    {
      key: 'prezzoGiornata',
      label: 'Prezzo giornata'
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
      // testo: 'Modifica',
      nameMaterialIcon: 'edit',
      buttonTypeBootstrap: 'btn-outline-warning',
      url: '/creaModificaVeicolo'
    },
    {
      // testo: 'Elimina',
      nameMaterialIcon: 'delete',
      buttonTypeBootstrap: 'btn-danger',
      urlRestApi: 'http://localhost:8080/api/veicoli/',
      restApi: RestApi.Delete
    }
  ];

  ngOnInit(): void {
    this.inizializzaListaVeicoli();
  }

  inizializzaListaVeicoli() {
    this.veicoliService.selezionaTuttiVeicoli().pipe(
      map((r: any[]) => r.map(veicolo => {
        veicolo.prezzoGiornata = veicolo.prezzoGiornata + '€';
        return veicolo;
      }))
    ).subscribe(veicoli => {
      this.listaVeicoli = veicoli;
    });
  }

  onRichiestaRest(risultato: any) {
    this.inizializzaListaVeicoli();
  }

}
