import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PrenotazioniService} from '../../services/prenotazioni.service';
import {VeicoliService} from '../../services/veicoli.service';
import {UtentiService} from '../../services/utenti.service';
import {CustomButtonProperties} from '../../_template/custom-button-properties';

@Component({
  selector: 'app-conferma-iscrizione',
  templateUrl: './conferma-iscrizione.component.html',
  styleUrls: ['./conferma-iscrizione.component.css']
})
export class ConfermaIscrizioneComponent implements OnInit {
  private testoConferma: string;
  private testoErrore: string;

  private loginButtonProperties: CustomButtonProperties = {
    testo: 'Login',
    url: '/login',
    buttonTypeBootstrap: 'btn btn-success'
  };

  constructor(
    private route: ActivatedRoute,
    private utentiService: UtentiService
  ) { }

  ngOnInit() {
    const codiceFiscaleUtenteDaConfermare = this.route.snapshot.queryParamMap.get('codiceFiscale');
    this.utentiService.confermaIscrizioneUtente(codiceFiscaleUtenteDaConfermare).subscribe(
      data => this.testoConferma = 'Iscrizione completata, è ora possibile procedere al login.',
      error => this.testoErrore = 'Si è verificato un errore: ' + error
    );
  }

}
