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
  dirty: any = {"2017 Fall": true, "2018 Winter": true};
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

  markDirty() {
    this.dirty["2017 Fall"] = true;
    this.dirty["2018 Winter"] = true;
  }


  getCourseInOneList() {
    let s = new Set();
    this.selectedCourses["2017 Fall"].forEach(c => s.add(c));
    this.selectedCourses["2018 Winter"].forEach(c => s.add(c));
    return Array.from(s);
  }

  determineTerm(code) {
    if (code.indexOf("H1F") > -1) return ["2017 Fall"];
    if (code.indexOf("H1S") > -1) return ["2018 Winter"];
    if (code.indexOf("Y1Y") > -1) return ["2017 Fall", "2018 Winter"];
    else return [];
  }

  deleteCourse(course : string): void {
    console.log(course);
      if (this.selectedCourses["2017 Fall"].indexOf(course) > -1) this.selectedCourses["2017 Fall"].splice(this.selectedCourses["2017 Fall"].indexOf(course), 1);
      if (this.selectedCourses["2018 Winter"].indexOf(course) >-1) this.selectedCourses["2018 Winter"].splice(this.selectedCourses["2018 Winter"].indexOf(course), 1);
      this.courseService.storeCourseList(this.selectedCourses);
      this.determineTerm(course).forEach(term => this.dirty[term] = true);
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
    this.determineTerm(course.code).forEach(term => this.dirty[term] = true);
  }

  receiveSolution(res, term) {
    this.dirty[term] = false;
    this.solutionlist[term] = JSON.parse(res.solutions);
    this.courses = JSON.parse(res.courses);
    this.courseService.storeCourseData(this.courses, term);
    this.courseService.storeSolutionList(this.solutionlist);
    this.courseService.load_solution_list(this.solutionlist, term);
    this.courseService.storeSolutionList(this.solutionlist);
    this.timetable.updateSolution(this.solutionlist);
  }

  getSolutions() : void {
    let emptyRes = {
      solutions: JSON.stringify([]),
      courses: JSON.stringify({})
    }
    var otherTerm = '2018 Winter';
    if (this.term == otherTerm) otherTerm = '2017 Fall';
    if (this.dirty[this.term]) {
      this.loading = true;
      this.courseService.getSolutions(this.term)
        .then((res) => {
          this.receiveSolution(res, this.term);
          this.timetable.renderSolution(0, this.term);
          this.loading = false;
        })
        .catch(err => {
          this.receiveSolution(emptyRes, this.term);
          this.timetable.renderSolution(0, this.term);
          this.loading = false;
        })
        .then(() => {
          if (this.dirty[otherTerm]) {
            this.courseService.getSolutions(otherTerm)
            .then((res) => {
              this.receiveSolution(res, otherTerm);
              this.loading = false;
            })
            .catch(err => {
              this.receiveSolution(emptyRes, otherTerm);
              this.dirty[otherTerm] = false;
              this.loading = false;
            });
          }
        });
    } else if (this.dirty[otherTerm]){
      this.loading = true;
      this.courseService.getSolutions(otherTerm)
      .then((res) => {
        this.receiveSolution(res, otherTerm);
        this.dirty[otherTerm] = false;
        this.loading = false;
      })
      .catch(err => {
        this.receiveSolution(emptyRes, otherTerm);
        this.dirty[otherTerm] = false;
        this.loading = false;
      });
    }
  }
}
