import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RestApiRequests} from '../../services/rest-api-requests';
import {CustomButtonProperties} from '../../_template/custom-button-properties';
import {RestApi} from '../../services/rest-api.enum';
import {Router} from '@angular/router';

// import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.css']
})
export class CustomButtonComponent implements OnInit {

  @Input() buttonProperties: CustomButtonProperties;
  @Input() elementoCliccato?: any;
  @Input() id?: any;
  @Input() nomeCampoId?: any;
  @Output() risultatoRichiesta: EventEmitter<any> = new EventEmitter();
  private risultato: any | any[];

  constructor(public restApiService: RestApiRequests/*http: HttpClient*/, private router: Router) {
    // http.get()
    this.restApiService = restApiService;
  }

  ngOnInit() {
  }

  onClickRequest(url: string, restApi: RestApi, redirect: boolean, elemento?: any, id?: any, nomeCampoId?: any): any | any[] {
    if (url != null) {
      let risultato: any;
      if (redirect || redirect === undefined || redirect === null) {
        if (id != null && nomeCampoId != null) {
          this.router.navigate([url], {queryParams: {[nomeCampoId]: id}});
        } else if (id != null && nomeCampoId == null) {
          this.router.navigate(['/' + url + id]);
        } else {
          this.router.navigate(['/' + url]);
        }
      } else {
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
      }
      if (risultato != null) {
        risultato.subscribe((data: {}) => {
          // console.log(data);
          console.log(JSON.parse(data + ''));
          this.risultato = JSON.parse(data + '');
          this.risultatoRichiesta.emit(this.risultato);
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
