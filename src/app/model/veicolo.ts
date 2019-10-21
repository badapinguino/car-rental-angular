export interface Veicolo {
  id?: number;
  codiceMezzo?: string;
  targa?: string;
  casaCostruttrice?: string;
  modello?: string;
  anno?: number;
  tipologia?: string;
  prezzoGiornata?: number;
  // in teoria ci sarebbe un set di prenotazioni
}
