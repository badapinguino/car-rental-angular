import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import * as _ from 'lodash';
import {PipeOrderByPipe} from './pipe-order-by.pipe';
import {CustomButtonProperties} from '../../_template/custom-button-properties';
import {RestApi} from '../../services/rest-api.enum';
import {HeaderCustomTable} from '../../_template/header-custom-table';
import {RestApiRequests} from '../../services/rest-api-requests';
import {Router} from '@angular/router';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent implements OnInit, OnChanges {
  _ = _;

  // sorting
  key = 'name';
  reverse = false;
  pipeOrder: PipeOrderByPipe;
  listaElementiOrdinati: any[];

  // search filter
  radioSelected: string;

  // paginazione
  elementiPerPagina = 6;
  numeroPagineTotale: number;
  numeroPaginaAttuale = 1; // parte da 1 e non da 0! attenzione
  // arrayListaElementi: any[];
  arrayNumeriPagina: number[] = [];
  listaElementiSliced: any[];

  /*
  * listaHeader conterrà qualcosa simile a: {idUtente: 'Utente', nome: 'Nome', cognome: 'Cognome'}
  * */
  @Input() listaHeader: HeaderCustomTable[]; // forse era meglio object ma mi dava problema che poteva essere null
  @Input() listaElementi: any[];
  @Input() campoIdElemento: string;

  @Input() listaHeaderBottoni: HeaderCustomTable[];
  @Input() listaBottoni: CustomButtonProperties[];
  @Output() buttonClickedData: EventEmitter<any> = new EventEmitter();

  private listaElementiFiltrata: any[];
  private inputUtente = '';
  // come controllo se il tipo è un'array o no? se non è array devo ricrearlo aggiungendo le graffe come stringa?

  // metto un output per avere un modo di prendere i dati del click dei bottoni anche dall'esterno della tabella
  // @Output() buttonClickedData: EventEmitter<any> = new EventEmitter();

  // buttonProperties5: CustomButtonProperties = {
  //   testo: 'Get all utenti',
  //   // type?: string;
  //   nameMaterialIcon: 'face',
  //   buttonTypeBootstrap: 'btn-danger',
  //   url: 'https://7bc40c7b-99da-48af-b5bb-acd4ef31eb79.mock.pstmn.io/selezionaTuttiUtenti',
  //   restApi: RestApi.Get
  // };


  constructor(public restApiService: RestApiRequests, private router: Router) {  }

  ngOnInit() {
    this.operationsOnChangeOnInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.operationsOnChangeOnInit();
  }

  listaElementiOnPageChange(pageNumber: number = 1) {
    this.numeroPaginaAttuale = pageNumber;
    let elementoIniziale;
    elementoIniziale = ((pageNumber - 1) * this.elementiPerPagina); // es: pagina 1: 0    pagina 2: 10, pagina 3: 20
    let elementoFinale;
    elementoFinale = pageNumber * this.elementiPerPagina - 1; // es: pagina 1: 9, pagina 2: 19, pagina 3: 29
    return this.listaElementi.slice(elementoIniziale, elementoFinale + 1); // +1 se no non include l'elemento
  }

  listaElementiOrdinatiOnPageChange(pageNumber: number = 1) {
    this.numeroPaginaAttuale = pageNumber;
    let elementoIniziale;
    elementoIniziale = ((pageNumber - 1) * this.elementiPerPagina); // es: pagina 1: 0    pagina 2: 10, pagina 3: 20
    let elementoFinale;
    elementoFinale = pageNumber * this.elementiPerPagina - 1; // es: pagina 1: 9, pagina 2: 19, pagina 3: 29
    return this.listaElementiOrdinati.slice(elementoIniziale, elementoFinale + 1); // +1 se no non include l'elemento
  }

  listaElementiOrdinatiOnPageFilter(pageNumber: number = 1) {
    this.numeroPaginaAttuale = pageNumber;
    let elementoIniziale;
    elementoIniziale = ((pageNumber - 1) * this.elementiPerPagina); // es: pagina 1: 0    pagina 2: 10, pagina 3: 20
    let elementoFinale;
    elementoFinale = pageNumber * this.elementiPerPagina - 1; // es: pagina 1: 9, pagina 2: 19, pagina 3: 29
    return this.listaElementiFiltrata.slice(elementoIniziale, elementoFinale + 1); // +1 altrimenti non include l'elemento
  }

  getHeaderKeys(lista: any) {
    if (lista !== undefined) {
      const headerKeys: any[] = [];
      for (const head of lista) {
        headerKeys.push(head.key);
      }
      return headerKeys;
    }
  }

  getHeaderLabels(lista: any) {
    if (lista !== undefined) {
      // return _.keys(this.listaHeader);
      const headerLabels: any[] = [];
      for (const head of lista) {
        headerLabels.push(head.label);
      }
      return headerLabels;
    }
  }


  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
    this.pipeOrder = new PipeOrderByPipe();
    this.listaElementiOrdinati = this.pipeOrder.transform(this.listaElementi, this.key, this.reverse);
    this.listaElementiSliced = this.listaElementiOrdinatiOnPageChange(this.numeroPaginaAttuale);
  }

  prevPage() {
    if (this.numeroPaginaAttuale > 1) {
      this.numeroPaginaAttuale --;
    }
    this.listaElementiSliced = this.listaElementiOnPageChange(this.numeroPaginaAttuale);

  }

  nextPage() {
    if (this.numeroPaginaAttuale < this.numeroPagineTotale) {
      this.numeroPaginaAttuale ++;
    }
    this.listaElementiSliced = this.listaElementiOnPageChange(this.numeroPaginaAttuale);
  }

  setPage(index: number) {
    this.numeroPaginaAttuale = index;
    this.listaElementiSliced = this.listaElementiOnPageChange(this.numeroPaginaAttuale);
  }

  operationsOnChangeOnInit() {
    this.numeroPagineTotale = this.listaElementi.length / this.elementiPerPagina;
    // tslint:disable-next-line:triple-equals
    if (this.listaElementi.length % this.elementiPerPagina != 0) {
      this.numeroPagineTotale = Math.ceil(this.numeroPagineTotale);
    }
    this.arrayNumeriPagina = [];
    for (let i = 1; i <= this.numeroPagineTotale; i++) {
      this.arrayNumeriPagina.push(i);
    }
    if (this.numeroPaginaAttuale > this.numeroPagineTotale) {
      this.numeroPaginaAttuale = 1;
    }
    this.listaElementiSliced = this.listaElementiOnPageChange(this.numeroPaginaAttuale);
  }


  filterSearch() {
    // la colonna selezionata dal radio button è radioSelected
    const radioSelectedString = this.radioSelected;

    const re = new RegExp(this.inputUtente, 'gi');

      // "mystring".replace(re, "newstring");

    this.listaElementiFiltrata = _.filter(this.listaElementi,
      obj =>  re.test(obj[this.radioSelected])
    );
    console.log(this.listaElementiFiltrata);
    // controllare poi con listaElementiOrdinati

    this.listaElementiSliced = this.listaElementiOrdinatiOnPageFilter(1);
    console.log(this.listaElementiSliced);
  }

  // onRichiestaRest(risultato: any) {
  //   this.buttonClickedData.emit(risultato);
  //   // this.setPage(1);
  //   // QUI METTERE ONCHANGE ARRAY SLICED
  //   this.operationsOnChangeOnInit();
  // }

  onClickButtonRequest(url: string, restApi: RestApi, elemento?: any, id?: any): any | any[] {
    if (url != null) {
      let risultato: any;
      switch (restApi) {
        // metto un controllo se redirect è true allora utilizza le routes e cambia pagina?
        case 'GET':
          if (id == null) {
            risultato = this.restApiService.doGetAll(url);
          } else {
            risultato = this.restApiService.doGet(url, id);
          }
          break;
        case 'POST':
          risultato = this.restApiService.doPost(elemento, url);
          break;
        case 'DELETE':
          risultato = this.restApiService.doDelete(id, url);
          break;
        case 'UPDATE':
          risultato = this.restApiService.doUpdate(id, elemento, url);
          break;
      }
      if (risultato != null) {
        risultato.subscribe(data => {
          console.log(data);
          // console.log(JSON.parse(data + ''));
          // this.risultato = data;
          this.buttonClickedData.emit(data);
          // window.location.reload();
          // const something = window.open('data:text/html,' + encodeURIComponent(this.risultatoRichiesta),
          //   '_blank');
          // something.focus();
        });
      }
      // problema: come faccio per passare i parametri della delete, post e update? Il form me li passa automaticamente?
      // va bene anche se uso il button nel form e non il submit, io ho messo la possibilità di inserire come type submit, funziona?
    }
  }
}
