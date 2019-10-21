import { TestBed } from '@angular/core/testing';

import { VeicoliService } from './veicoli.service';

describe('VeicoliService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VeicoliService = TestBed.get(VeicoliService);
    expect(service).toBeTruthy();
  });
});
