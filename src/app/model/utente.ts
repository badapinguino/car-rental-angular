export interface Utente {
  id?: number;
  codiceFiscale?: string;
  cognome?: string;
  nome?: string;
  dataNascita?: string;
  superuser?: boolean;
  vecchiaPassword?: string;
  password?: string;
  immagine?: string;
  verificato?: boolean;
  email?: string;
}
