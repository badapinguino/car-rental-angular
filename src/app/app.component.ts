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

  buttonProperties: CustomButtonProperties = {
    testo: 'Press me',
    colour: '#2ecc71',
    textColour: '#ecf0f1'
  };
  buttonProperties2: CustomButtonProperties = {
    urlImmagine: '/images/baseline_save_black_18dp.png',
    width: 40,
    height: 40
  };
  buttonProperties3: CustomButtonProperties = {
    testo: 'Submit',
    textColour : 'Blue',
    type: 'submit'
  };
  buttonProperties4: CustomButtonProperties = {
    nameMaterialIcon: 'delete',
    buttonTypeBootstrap: 'btn-warning'
  };
}
