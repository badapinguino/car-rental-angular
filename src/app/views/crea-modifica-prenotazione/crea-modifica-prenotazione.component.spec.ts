import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaModificaPrenotazioneComponent } from './crea-modifica-prenotazione.component';

describe('CreaModificaPrenotazioneComponent', () => {
  let component: CreaModificaPrenotazioneComponent;
  let fixture: ComponentFixture<CreaModificaPrenotazioneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreaModificaPrenotazioneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaModificaPrenotazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
