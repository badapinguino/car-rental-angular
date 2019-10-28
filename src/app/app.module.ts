import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CustomButtonComponent } from './custom-components/custom-button/custom-button.component';
import { CustomTableComponent } from './custom-components/custom-table/custom-table.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PipeOrderByPipe } from './custom-components/custom-table/pipe-order-by.pipe';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RestApiRequests} from './services/rest-api-requests';
import {RouterModule} from '@angular/router';
import {RoutingModuleModule} from './routing/routing-module/routing-module.module';
import {MyLinkDirective} from './_directive/my-link.directive';
import { NavBarComponent } from './custom-components/nav-bar/nav-bar.component';
import { LoginComponent } from './views/login/login.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { CreaModificaUtenteComponent } from './views/crea-modifica-utente/crea-modifica-utente.component';
import {ErrorInterceptor} from './interceptors/error-interceptor';
import {JwtInterceptor} from './interceptors/jwt-interceptor';
import { ParcoAutoComponent } from './views/parco-auto/parco-auto.component';
import { CreaModificaVeicoloComponent } from './views/crea-modifica-veicolo/crea-modifica-veicolo.component';
import { PrenotazioniUtenteComponent } from './views/prenotazioni-utente/prenotazioni-utente.component';
import { CreaModificaPrenotazioneComponent } from './views/crea-modifica-prenotazione/crea-modifica-prenotazione.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomButtonComponent,
    CustomTableComponent,
    PipeOrderByPipe,
    MyLinkDirective,
    NavBarComponent,
    LoginComponent,
    HomePageComponent,
    CreaModificaUtenteComponent,
    ParcoAutoComponent,
    CreaModificaVeicoloComponent,
    PrenotazioniUtenteComponent,
    CreaModificaPrenotazioneComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    RoutingModuleModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    RestApiRequests
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
