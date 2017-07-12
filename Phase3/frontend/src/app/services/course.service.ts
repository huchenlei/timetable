import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response }  from '@angular/http';
import { Course } from '../models/course';
import { CourseMin } from '../models/course-min';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class CourseService {

  constructor(
    private http: Http
  ) { }

  fetchCourse(query: string, term: string): Promise<Course[]> {
    var course_code = query;

    var url = '/courses/' + course_code + '/semester/' + term;

    console.log(query);

    return this.http.get(url)
      .toPromise()
      .then(res => {
        return Promise.resolve(res.json() as Course[]);
      })
      .catch(err => Promise.reject(err));
  }

  getSolutions(term: string) {
    console.log("Getting solutions...")
    // if (localStorage.term && localStorage.courselist)
    return this.http.post('/smart', {
      term: term,
      courselist: JSON.stringify(JSON.parse(localStorage.courselist)[term]),
      preferences: localStorage.preferences
    })
      .toPromise()
      .then((data) => {
        console.log(data);
        return data.json();
      })
      .catch(err => {return Promise.reject(err)});
  }

  storeCourseData(courseList: CourseMin[]) {
    localStorage.setItem("course_data", JSON.stringify(courseList))
  }

  loadCourseData() : CourseMin[] {
    return JSON.parse(localStorage.getItem("course_data"));
  }

  storeCourseList(courseList: string[]) {
    localStorage.setItem("courselist", JSON.stringify(courseList))
  }

  loadCourseList() : string[] {
    return JSON.parse(localStorage.getItem("courselist"));
  }

  storeSolutionList(solutionList: any) {
    localStorage.setItem("solution", JSON.stringify(solutionList))
  }

  loadSolutionList() : any {
    return JSON.parse(localStorage.getItem("solution"));
  }

}
