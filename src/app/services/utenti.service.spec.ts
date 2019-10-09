import { TestBed } from '@angular/core/testing';

import { UtenteService } from './utenti.service';

describe('UtenteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UtenteService = TestBed.get(UtenteService);
    expect(service).toBeTruthy();
  });
});
