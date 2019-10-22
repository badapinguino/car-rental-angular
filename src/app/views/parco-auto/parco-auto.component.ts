import { Component, OnInit } from '@angular/core';
import {CustomButtonProperties} from '../../_template/custom-button-properties';
import {HeaderCustomTable} from '../../_template/header-custom-table';
import {RestApi} from '../../services/rest-api.enum';
import {map} from 'rxjs/operators';
import {Veicolo} from '../../model/veicolo';
import {VeicoliService} from '../../services/veicoli.service';

@Component({
  selector: 'app-parco-auto',
  templateUrl: './parco-auto.component.html',
  styleUrls: ['./parco-auto.component.css']
})
export class ParcoAutoComponent implements OnInit {

  constructor(private veicoliService: VeicoliService) { }

  // ngOnInit() {
  // }


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
      testo: 'Modifica',
      buttonTypeBootstrap: 'btn-outline-primary',
      url: '/creaModificaVeicolo'
    },
    {
      testo: 'Elimina',
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
