import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfermaIscrizioneComponent } from './conferma-iscrizione.component';

describe('ConfermaIscrizioneComponent', () => {
  let component: ConfermaIscrizioneComponent;
  let fixture: ComponentFixture<ConfermaIscrizioneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfermaIscrizioneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfermaIscrizioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
