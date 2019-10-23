export interface Prenotazione {
  id?: number;
  dataInizio?: string;
  dataFine?: string;
  approvata?: boolean;

  veicolo?: string;
  utente?: string;
}
