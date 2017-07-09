import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response }  from '@angular/http';
import { Course } from '../models/course';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class CourseService {

  constructor(
    private http: Http
  ) { }

  fetchCourse(query: string): Promise<Course[]> {
	  var course_code = query;

	  var url = '/courses/' + course_code;

    console.log (query);

	  return this.http.get(url)
    .toPromise()
    .then(res => {
      return Promise.resolve(res.json() as Course[]);
    })
    .catch(err => Promise.reject(err));
  }

  fetchCoursePromise(query: string) {
    var course_code = query;

	  var url = '/courses/' + course_code;

    console.log (query);

  }
}
