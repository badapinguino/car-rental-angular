import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import {TableViewComponentComponent} from '../../views/table-view-component/table-view-component.component';
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
    path: 'tabella',
    component: TableViewComponentComponent,
    canActivate: [AuthGuard]
  },
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
