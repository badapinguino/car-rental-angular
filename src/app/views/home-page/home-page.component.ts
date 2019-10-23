import {Component, OnInit} from '@angular/core';
import {Utente} from '../../model/utente';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {CustomButtonProperties} from '../../_template/custom-button-properties';
import {UtentiService} from '../../services/utenti.service';
import {HeaderCustomTable} from '../../_template/header-custom-table';
import {RestApi} from '../../services/rest-api.enum';
import {map} from 'rxjs/operators';
import {CustomTableComponent} from '../../custom-components/custom-table/custom-table.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  currentUser: Utente;

  // come gestire i due utenti? Se metto solo un controllo nell'html qualcuno potrebbe comunque visualizzare
  // l'indirzzo del pulsante per creare un nuovo user
  creaUtentePulsanteProprieta: CustomButtonProperties = {
    testo: 'Crea un nuovo customer',
    buttonTypeBootstrap: 'btn-primary',
    url: '/creaModificaUtente'
  };

  listaUtenti: Utente[];

  listaHeaderUtenti: HeaderCustomTable[] = [
    {
      key: 'codiceFiscale',
      label: 'Codice Fiscale'
    },
    {
      key: 'cognome',
      label: 'Cognome'
    },
    {
      key: 'nome',
      label: 'Nome'
    },
    {
      key: 'dataNascita',
      label: 'Data di nascita'
    },
    {
      key: 'superuser',
      label: 'Amministratore'
    }
    // {
    //   key: 'password_utente',
    //   label: 'Password'
    // },
    // {
    //   key: 'immagine',
    //   label: 'Immagine'
    // }
  ];

  listaHeaderPulsanti: HeaderCustomTable[] = [
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

  listaPulsanti: CustomButtonProperties[] = [
    {
      testo: 'Modifica',
      buttonTypeBootstrap: 'btn-outline-primary',
      url: '/creaModificaUtente'
    },
    {
      testo: 'Elimina',
      buttonTypeBootstrap: 'btn-danger',
      urlRestApi: 'http://localhost:8080/api/utenti/',
      // queryParameters: {queryParams: {codiceFiscale: ''}}
      restApi: RestApi.Delete
    },
    {
      testo: 'Prenotazioni',
      buttonTypeBootstrap: 'btn-outline-primary',
      url: '/prenotazioniUtente'
    }
  ];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private utentiService: UtentiService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    // this.authenticationService.currentUserSuperuser.subscribe(superuser => this.currentUserSuperuser = superuser);
  }

  ngOnInit(): void {
    this.inizializzaListaUtenti();
  }

  inizializzaListaUtenti() {
    this.utentiService.selezionaTuttiUtenti().pipe(
      map((r: any[]) => r.map(user => {
        user.superuser = user.superuser ? 'Sì' : 'No';
        return user;
      }))
    ).subscribe(utenti => {
      this.listaUtenti = utenti;
    });
  }

  onRichiestaRest(risultato: any) {
    this.inizializzaListaUtenti();
  }
}
