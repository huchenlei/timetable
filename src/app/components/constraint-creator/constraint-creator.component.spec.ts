import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstraintCreatorComponent } from './constraint-creator.component';

describe('ConstraintCreatorComponent', () => {
  let component: ConstraintCreatorComponent;
  let fixture: ComponentFixture<ConstraintCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstraintCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstraintCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
