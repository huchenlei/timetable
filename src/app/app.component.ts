import { Component, ViewChild } from '@angular/core';
import { Directive, TemplateRef, ViewContainerRef } from "@angular/core";

import { CourseItemComponent } from './components/course-item/course-item.component'
import { TimetableComponent } from './components/timetable/timetable.component'

import { Course } from './models/course';
import { CourseMin } from './models/course-min';

import { CourseService } from './services/course.service'
import { PreferenceService } from './services/preference.service'
import { AlertService } from './services/alert.service'

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
  loading: boolean = false;
  @ViewChild(TimetableComponent) timetable: TimetableComponent;

  constructor(
    private courseService : CourseService,
    private preferenceService : PreferenceService,
    private alertService : AlertService
  ) {
    this.courses = this.courseService.loadCourseData(this.term);
    this.selectedCourses = this.courseService.loadCourseList();
    this.preferences = this.preferenceService.loadPreferences();
    this.solutionlist = this.courseService.loadSolutionList();

    this.alertService.success("hello world");
  }

  selectTerm(term) {
    this.term = term;
    this.timetable.renderSolution(0, this.term);
  }

  getCourseInOneList() {
    let s = new Set();
    this.selectedCourses["2017 Fall"].forEach(c => s.add(c));
    this.selectedCourses["2018 Winter"].forEach(c => s.add(c));
    return Array.from(s);
  }

  deleteCourse(course : string): void {
      this.selectedCourses["2017 Fall"].splice(this.selectedCourses[this.term].indexOf(course), 1);
      this.selectedCourses["2018 Winter"].splice(this.selectedCourses[this.term].indexOf(course), 1);
      this.courseService.storeCourseList(this.selectedCourses);
  }

  addCourse(course : Course) : void {
    if (course.code.indexOf("H1F") >= 0) {
      if (this.selectedCourses["2017 Fall"].indexOf(course.code) == -1) {
        this.selectedCourses["2017 Fall"].push(course.code);
        this.courseService.storeCourseList(this.selectedCourses);
      }
    } else if (course.code.indexOf("H1S") >= 0) {
      if (this.selectedCourses["2018 Winter"].indexOf(course.code) == -1) {
        this.selectedCourses["2018 Winter"].push(course.code);
        this.courseService.storeCourseList(this.selectedCourses);
      }
    } else {
      if (this.selectedCourses["2017 Fall"].indexOf(course.code) == -1) {
        this.selectedCourses["2017 Fall"].push(course.code);
      }
      if (this.selectedCourses["2018 Winter"].indexOf(course.code) == -1) {
        this.selectedCourses["2018 Winter"].push(course.code);
      }
      this.courseService.storeCourseList(this.selectedCourses);
    }
  }

  getSolutions() : void {
    this.loading = true
    this.courseService.getSolutions(this.term)
      .then((res) => {
        this.solutionlist[this.term] = JSON.parse(res.solutions);
        this.courses = JSON.parse(res.courses);
        this.courseService.storeCourseData(this.courses, this.term);
        this.courseService.storeSolutionList(this.solutionlist);
        this.courseService.load_solution_list(this.solutionlist, this.term)
        this.courseService.storeSolutionList(this.solutionlist);

        this.timetable.updateSolution(this.solutionlist)
        this.timetable.renderSolution(0, this.term);
        this.loading = false;
      })
      .catch(err => {
        console.log(err);
        this.loading = false;
      });
  }

}
