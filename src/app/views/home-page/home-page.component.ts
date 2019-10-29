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
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  currentUser: Utente;

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
      nameMaterialIcon: 'edit',
      buttonTypeBootstrap: 'btn-outline-warning',
      url: '/creaModificaUtente'
    },
    {
      nameMaterialIcon: 'delete',
      buttonTypeBootstrap: 'btn-danger',
      urlRestApi: 'http://localhost:8080/api/utenti/',
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
    private utentiService: UtentiService,
    private titleService: Title
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.titleService.setTitle('Home Page');
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
