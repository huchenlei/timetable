import { Component, ViewChild } from '@angular/core';

import { CourseItemComponent } from './components/course-item/course-item.component'
import { TimetableComponent } from './components/timetable/timetable.component'

import { Course } from './models/course';
import { CourseMin } from './models/course-min';

import { CourseService } from './services/course.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  selectedCourses = ['CSC108', 'CSC165', 'MAT137', 'PSY100', 'ECO100'];
  courses;
  term : "2017 Fall" | "2018 Winter";
  solutionlist = [['CSC108L0101'], []]
  preferences = []
  @ViewChild(TimetableComponent) timetable: TimetableComponent;

  constructor(
    private courseService : CourseService
  ) {
    this.courses = this.courseService.loadCourseData();
    this.selectedCourses = this.courseService.loadCourseList();
    // this.solutionlist =
  }

  selectTerm(term) {
    this.term = term;
  }
  deleteCourse(course : string): void {
      this.selectedCourses.splice(this.selectedCourses.indexOf(course), 1);
  }

  addCourse(course : Course) : void {
    this.selectedCourses.push(course.code);
    this.courseService.storeCourseList(this.selectedCourses);
  }

  getSolutions() : void {
    this.courseService.getSolutions()
      .then((res) => {
        console.log(res)
        this.solutionlist = JSON.parse(res.solutions);
        this.courses = JSON.parse(res.courses);
        this.courseService.storeCourseData(this.courses);
        console.log(this.solutionlist);
        this.timetable.updateSolution(this.solutionlist)
        this.timetable.renderSolution(1);
      });
  }

}
