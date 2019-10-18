export interface Utente {
  id?: number;
  codiceFiscale?: string;
  cognome?: string;
  nome?: string;
  dataNascita?: string; // esiste anche Date, quando inserisco magari fare new Date
  superuser?: boolean;
  password?: string;
  immagine?: string;
// come metto la chiave esterna? O meglio, Utente contiene un set di prenotazioni, come faccio?
}
