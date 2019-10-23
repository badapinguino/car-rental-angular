import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrenotazioniUtenteComponent } from './prenotazioni-utente.component';

describe('PrenotazioniUtenteComponent', () => {
  let component: PrenotazioniUtenteComponent;
  let fixture: ComponentFixture<PrenotazioniUtenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrenotazioniUtenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrenotazioniUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
