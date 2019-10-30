import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaleEliminazioneComponent } from './modale-eliminazione.component';

describe('ModaleEliminazioneComponent', () => {
  let component: ModaleEliminazioneComponent;
  let fixture: ComponentFixture<ModaleEliminazioneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaleEliminazioneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaleEliminazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
