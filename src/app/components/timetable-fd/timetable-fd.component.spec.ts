import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableFdComponent } from './timetable-fd.component';

describe('TimetableFdComponent', () => {
  let component: TimetableFdComponent;
  let fixture: ComponentFixture<TimetableFdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimetableFdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimetableFdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
