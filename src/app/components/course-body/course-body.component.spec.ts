import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseBodyComponent } from './course-body.component';

describe('CourseBodyComponent', () => {
  let component: CourseBodyComponent;
  let fixture: ComponentFixture<CourseBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
