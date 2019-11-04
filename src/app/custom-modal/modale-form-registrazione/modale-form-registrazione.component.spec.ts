import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaleFormRegistrazioneComponent } from './modale-form-registrazione.component';

describe('ModaleFormRegistrazioneComponent', () => {
  let component: ModaleFormRegistrazioneComponent;
  let fixture: ComponentFixture<ModaleFormRegistrazioneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaleFormRegistrazioneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaleFormRegistrazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
