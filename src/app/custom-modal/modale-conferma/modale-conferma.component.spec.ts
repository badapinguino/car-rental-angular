import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaleConfermaComponent } from './modale-conferma.component';

describe('ModaleConfermaComponent', () => {
  let component: ModaleConfermaComponent;
  let fixture: ComponentFixture<ModaleConfermaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaleConfermaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaleConfermaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
