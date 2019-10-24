import {Veicolo} from './veicolo';
import {Utente} from './utente';

export interface Prenotazione {
  id?: number;
  dataInizio?: string;
  dataFine?: string;
  approvata?: boolean;

  veicolo?: Veicolo;
  utente?: Utente;
}
