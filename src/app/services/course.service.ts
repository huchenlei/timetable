import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response }  from '@angular/http';
import { Course } from '../models/course';
import { CourseMin } from '../models/course-min';
import { PreferenceService } from './preference.service'

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class CourseService {

  constructor(
    private http : Http,
    private preferenceService : PreferenceService
  ) { }

  fetchCourse(query: string, term: string): Promise<Course[]> {
    var course_code = query;

    var url = 'courses/s/' + course_code;

    return this.http.get(url)
      .toPromise()
      .then(res => {
        return Promise.resolve(res.json() as Course[]);
      })
      .catch(err => Promise.reject(err));
  }

  fetchCourseBody(query: string): Promise<Course[]> {
    var course_code = query;

    var url = 'courses/' + course_code;

    return this.http.get(url)
      .toPromise()
      .then(res => {
        return Promise.resolve(res.json() as Course[]);
      })
      .catch(err => Promise.reject(err));
  }

  getSolutions(term: string) {
    // if (localStorage.term && localStorage.courselist)
    return this.http.post('/smart', {
      term: term,
      courselist: JSON.stringify(JSON.parse(localStorage.courselist)[term]),
      preferences: JSON.stringify(this.preferenceService.parsePreference(this.preferenceService.loadPreferences()))
    })
      .toPromise()
      .then((data) => {
        return data.json();
      })
      .catch(err => {return Promise.reject(err)});
  }

  storeCourseData(courseList: any, term: string) {
    var course_data = JSON.parse(localStorage.getItem("course_data"));
    if (!(course_data && (term in course_data))) {
      this.initLocalStorage();
    }
    course_data[term] = courseList;
    localStorage.setItem("course_data", JSON.stringify(course_data));
  }

  // removeCourseData(course: string) {
  //   var course_data = this.loadCourseData();
  //   delete course_data[course];
  //   localStorage.setItem("course_data", JSON.stringify(course_data));
  // }

  initLocalStorage() {
    localStorage.setItem("course_data", JSON.stringify({
      "2017 Fall": [],
      "2018 Winter": []
    }));
    localStorage.setItem("solution", JSON.stringify({
      "2017 Fall": [],
      "2018 Winter": []
    }));
    localStorage.setItem("courselist", JSON.stringify({
      "2017 Fall": [],
      "2018 Winter": []
    }));
  }
  loadCourseData(term: string) : any {
    var data = JSON.parse(localStorage.getItem("course_data"));
    if (!(data && (term in data))) {
      this.initLocalStorage();
    }
    return JSON.parse(localStorage.getItem("course_data"))[term];
  }

  storeCourseList(courseList: string[]) {
    localStorage.setItem("courselist", JSON.stringify(courseList))
  }

  loadCourseList() : string[] {
    return JSON.parse(localStorage.getItem("courselist"))
    ? JSON.parse(localStorage.getItem("courselist"))
    : {"2017 Fall":[], "2018 Winter":[]};
  }

  storeSolutionList(solutionList: any) {
    localStorage.setItem("solution", JSON.stringify(solutionList))
  }

  loadSolutionList() : any {
    return JSON.parse(localStorage.getItem("solution"))
    ? JSON.parse(localStorage.getItem("solution"))
    : {"2017 Fall":[], "2018 Winter":[]};
  }

  load_solution_list(solutionlist, semester) {
  	const courselist = JSON.parse(localStorage.getItem('courselist'));
  	var not_complete = false;
  	for (var i = 0; i < solutionlist[semester].length; i++) {
  		var extra_title = "";
  		var solution = solutionlist[semester][i];
  		var dict_sol_courselst = {};
  		for (var j = 0; j < solution.length; j++)
  			dict_sol_courselst[solution[j].courseCode] = true;
  		console.log(dict_sol_courselst);
  		for (var j = 0; j < courselist[semester].length; j++)
  			if (!dict_sol_courselst.hasOwnProperty(courselist[semester][j].substr(0,6))) {
  				solutionlist[semester][i].extraTitle =  "(not include " + courselist[semester][j] + ")";
          console.log(semester, i, "(not include " + courselist[semester][j] + ")")
  				not_complete = true;
  				break;
  			}
  	}
  	if (not_complete) alert("No valid solution on all of your course. We tried our best to show you some solutions.");
    return solutionlist;
  }

}
