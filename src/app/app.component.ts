import { Component } from '@angular/core';
import {RestApi} from './services/rest-api.enum';
import {CustomButtonProperties} from './_template/custom-button-properties';
import {HeaderCustomTable} from './_template/header-custom-table';
import {CustomButtonComponent} from './custom-components/custom-button/custom-button.component';
import { Router } from '@angular/router';
import {AuthenticationService} from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'car-rental-angular';
}
