import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../../views/login/login.component';
import {AppComponent} from '../../app.component';
import {AuthGuard} from '../../services/auth-guard.guard';
import {HomePageComponent} from '../../views/home-page/home-page.component';
import {CreaModificaUtenteComponent} from '../../views/crea-modifica-utente/crea-modifica-utente.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: AppComponent
  // },
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
