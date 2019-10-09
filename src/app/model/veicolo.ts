export interface Veicolo {
  codiceMezzo?: string;
  targa?: string;
  modello?: string;
  anno?: number;
  tipologia?: string;
  prezzoGiornata?: number;
  // in teoria ci sarebbe un set di prenotazioni
}
