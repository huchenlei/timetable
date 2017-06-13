import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceSelectorComponent } from './preference-selector.component';

describe('PreferenceSelectorComponent', () => {
  let component: PreferenceSelectorComponent;
  let fixture: ComponentFixture<PreferenceSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferenceSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
