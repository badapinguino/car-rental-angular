export interface Utente {
  id?: number;
  codiceFiscale?: string;
  cognome?: string;
  nome?: string;
  dataNascita?: string;
  superuser?: boolean;
  password?: string;
  immagine?: string;
}
