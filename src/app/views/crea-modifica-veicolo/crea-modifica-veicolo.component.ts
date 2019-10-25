import { Component, OnInit } from '@angular/core';
import {Veicolo} from '../../model/veicolo';
import {Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {VeicoliService} from '../../services/veicoli.service';
import {CustomButtonProperties} from '../../_template/custom-button-properties';
import {Utente} from '../../model/utente';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-crea-modifica-veicolo',
  templateUrl: './crea-modifica-veicolo.component.html',
  styleUrls: ['./crea-modifica-veicolo.component.css']
})
export class CreaModificaVeicoloComponent implements OnInit {

  error: string;
  private successMessage: string;
  private warningMessage: string;

  private creaVeicoloButtonProperties: CustomButtonProperties;

  private veicoloGiaEsistente: Veicolo;

  private titoloPagina = 'Crea o modifica un veicolo';
  model: Veicolo;
  listaTipologiaVeicoli = [
    'Berlina',
    'City car',
    'Furgone',
    'Lusso',
    'Monovolume',
    'Sportiva',
    'Supercar',
    'Suv',
    'Utilitaria'
  ];
  private codiceMezzoVeicoloDaModificare: string;

  constructor(private route: ActivatedRoute, private veicoliService: VeicoliService) { }

  ngOnInit() {
    this.codiceMezzoVeicoloDaModificare = this.route.snapshot.queryParamMap.get('codiceMezzo');

    if (this.codiceMezzoVeicoloDaModificare) {
      this.veicoliService.selezionaVeicolo(this.codiceMezzoVeicoloDaModificare)
        .subscribe(data => {
          this.model = data;
        });
      this.creaVeicoloButtonProperties = {
        testo: 'Modifica veicolo',
        buttonTypeBootstrap: 'btn-primary'
      };
      this.titoloPagina = 'Modifica veicolo già esistente';
    } else {
      this.creaVeicoloButtonProperties = {
        testo: 'Crea Veicolo',
        buttonTypeBootstrap: 'btn-primary'
      };
      this.model = {};
      this.model.tipologia = this.listaTipologiaVeicoli[0];
      this.titoloPagina = 'Inserisci un nuovo veicolo';
    }
  }

  onSubmit() {
    // TODO: inserire l'onsubmit

    // this.submitted = true;
    this.error = '';
    this.successMessage = '';
    this.warningMessage = '';

    if (this.model.prezzoGiornata <= 0) {
      this.error = 'ERRORE: Il prezzo del veicolo deve essere maggiore di 0€.';
      return;
    }
    // controllo se l'anno
    const annoVeicolo = this.model.anno;
    if (annoVeicolo > (new Date().getFullYear() + 1)) {
      this.error = 'ERRORE: L\'anno del veicolo non può essere superiore all\'anno successivo quello attuale.';
      return;
    }
    if (annoVeicolo < 1900) {
      this.error = 'ERRORE: L\'anno del veicolo non può essere antecedente al 1900.';
      return;
    }

    // stop here if form is invalid
    // if (this.model.form.invalid) {
    //   return;
    // }

    this.veicoliService.selezionaVeicolo(this.model.codiceMezzo + '')
      .subscribe( data => {
        this.veicoloGiaEsistente = data;
        let veicolo: Veicolo;
        if (this.veicoloGiaEsistente != null) {
          veicolo = this.model;
          veicolo.id = data.id;
        } else {
          veicolo = this.model;
        }

        this.veicoliService.salvaVeicolo(veicolo)
          .pipe(first())
          .subscribe(
            dati => {
              this.successMessage = 'Veicolo inserito correttamente';
            },
            error => {
              this.error = 'Errore: Il veicolo non è stato inserito.';
              console.log(this.error);
            });

      });

  }
}