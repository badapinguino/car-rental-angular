import { Component, OnInit } from '@angular/core';
import {CustomButtonProperties} from '../../_template/custom-button-properties';
import {HeaderCustomTable} from '../../_template/header-custom-table';
import {RestApi} from '../../services/rest-api.enum';

@Component({
  selector: 'app-table-view-component',
  templateUrl: './table-view-component.component.html',
  styleUrls: ['./table-view-component.component.css']
})
export class TableViewComponentComponent implements OnInit {

  constructor() { }

  title = 'car-rental-angular';

  // listaHeader = {idUtente: 'Utente', nome: 'Nome', cognome: 'Cognome'};
  // cambio perché concetto sbagliato
  listaHeader: HeaderCustomTable[] = [
    {
      key: 'idUtente',
      label: 'Utente'
    },
    {
      key: 'nome',
      label: 'Nome'
    },
    {
      key: 'cognome',
      label: 'Cognome'
    }
  ];
  listaElementi = [{
    idUtente: 1, nome: 'Pluto', cognome: 'Plutopolis'
  },
    {
      idUtente: 2, nome: 'Paolino', cognome: 'Paperino'
    },
    {
      idUtente: 3, nome: 'Marcello', cognome: 'Antoninelli'
    },
    {
      idUtente: 4, nome: 'Beppe', cognome: 'Badoglio'
    }
  ];
  campoIdElemento = 'idUtente';

  listaHeaderButtons: HeaderCustomTable[] = [
    {
      key: 'modifica',
      label: 'Modifica'
    },
    {
      key: 'elimina',
      label: 'Elimina'
    },
    {
      key: 'prenotazioni',
      label: 'Prenotazioni'
    }
  ];

  listaButtonCustomProperties: CustomButtonProperties[] = [
    {
      testo: 'Modifica',
      buttonTypeBootstrap: 'btn-secondary',
      url: '/modificaUtente',
      redirect: true
    },
    {
      testo: 'Elimina',
      buttonTypeBootstrap: 'btn-danger',
      url: '/eliminaUtente',
      redirect: true
    },
    {
      testo: 'Prenotazioni utente',
      buttonTypeBootstrap: 'btn-primary'
    }
  ];

  ngOnInit() {
  }

}
