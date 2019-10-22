import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaModificaVeicoloComponent } from './crea-modifica-veicolo.component';

describe('CreaModificaVeicoloComponent', () => {
  let component: CreaModificaVeicoloComponent;
  let fixture: ComponentFixture<CreaModificaVeicoloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreaModificaVeicoloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaModificaVeicoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
