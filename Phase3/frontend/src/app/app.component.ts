import { Component, ViewChild } from '@angular/core';

import { CourseItemComponent } from './components/course-item/course-item.component'
import { TimetableComponent } from './components/timetable/timetable.component'

import { Course } from './models/course';
import { CourseMin } from './models/course-min';

import { CourseService } from './services/course.service'
import { PreferenceService } from './services/preference.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  selectedCourses = ['CSC108', 'CSC165', 'MAT137', 'PSY100', 'ECO100'];
  courses;
  term : "2017 Fall" | "2018 Winter" = "2017 Fall";
  solutionlist = {}
  preferences;
  @ViewChild(TimetableComponent) timetable: TimetableComponent;

  constructor(
    private courseService : CourseService,
    private preferenceService : PreferenceService,
  ) {
    this.courses = this.courseService.loadCourseData();
    this.selectedCourses = this.courseService.loadCourseList();
    this.preferences = this.preferenceService.loadPreference();
    this.solutionlist = this.courseService.loadSolutionList();
  }

  selectTerm(term) {
    this.term = term;
    console.log(this.term);
    this.timetable.renderSolution(0, this.term);
  }
  deleteCourse(course : string): void {
      this.selectedCourses[this.term].splice(this.selectedCourses[this.term].indexOf(course), 1);
      this.courseService.storeCourseList(this.selectedCourses);
  }

  addCourse(course : Course) : void {
    this.selectedCourses[this.term].push(course.code);
    this.courseService.storeCourseList(this.selectedCourses);
  }

  getSolutions() : void {
    this.courseService.getSolutions(this.term)
      .then((res) => {
        console.log(res)
        this.solutionlist[this.term] = JSON.parse(res.solutions);
        this.courses = JSON.parse(res.courses);
        this.courseService.storeCourseData(this.courses);
        this.courseService.storeSolutionList(this.solutionlist);
        console.log(this.solutionlist);
        this.timetable.updateSolution(this.solutionlist)
        this.timetable.renderSolution(0, this.term);
      })
      .catch(err => console.log(err));
  }

}
