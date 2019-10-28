import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../../views/login/login.component';
import {AuthGuard} from '../../services/auth-guard.guard';
import {HomePageComponent} from '../../views/home-page/home-page.component';
import {CreaModificaUtenteComponent} from '../../views/crea-modifica-utente/crea-modifica-utente.component';
import {ParcoAutoComponent} from '../../views/parco-auto/parco-auto.component';
import {CreaModificaVeicoloComponent} from '../../views/crea-modifica-veicolo/crea-modifica-veicolo.component';
import {PrenotazioniUtenteComponent} from '../../views/prenotazioni-utente/prenotazioni-utente.component';
import {CreaModificaPrenotazioneComponent} from '../../views/crea-modifica-prenotazione/crea-modifica-prenotazione.component';

const routes: Routes = [
  {
    path: 'homePage',
    component: HomePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'creaModificaUtente',
    component: CreaModificaUtenteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'parcoAuto',
    component: ParcoAutoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'creaModificaVeicolo',
    component: CreaModificaVeicoloComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'prenotazioniUtente',
    component: PrenotazioniUtenteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'creaModificaPrenotazione',
    component: CreaModificaPrenotazioneComponent,
    canActivate: [AuthGuard]
  }/*,
  {
    path: '**',
    redirectTo: 'login'
  }*/,
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModuleModule { }
