import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CustomButtonComponent } from './custom-components/custom-button/custom-button.component';
import { CustomTableComponent } from './custom-components/custom-table/custom-table.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PipeOrderByPipe } from './custom-components/custom-table/pipe-order-by.pipe';
import { HttpClientModule } from '@angular/common/http';
import {RestApiRequests} from './services/rest-api-requests';
import {RouterModule} from '@angular/router';
import {RoutingModuleModule} from './routing/routing-module/routing-module.module';
import { TableViewComponentComponent } from './views/table-view-component/table-view-component.component';
import {MyLinkDirective} from './_directive/my-link.directive';
import { NavBarComponent } from './custom-components/nav-bar/nav-bar.component';
import { LoginComponent } from './views/login/login.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { CreaModificaUtenteComponent } from './views/crea-modifica-utente/crea-modifica-utente.component';
// import {fakeBackendProvider} from './interceptors/fake-backend';

// used to create fake backend


@NgModule({
  declarations: [
    AppComponent,
    CustomButtonComponent,
    CustomTableComponent,
    PipeOrderByPipe,
    TableViewComponentComponent,
    MyLinkDirective,
    NavBarComponent,
    LoginComponent,
    HomePageComponent,
    CreaModificaUtenteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    RoutingModuleModule,
    ReactiveFormsModule,
    // including into imports
  ],
  providers: [
    // provider used to create fake backend
    // fakeBackendProvider,
    RestApiRequests
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
