import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Course } from '../../models/course'

import { CourseService } from '../../services/course.service'

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  options : Course[] = [];
  @Output() addCourse = new EventEmitter<Course>()
  public fetchCourse = (query: string) => {
    // if (/[a-z]{3}[0-9]{3}/i.test(query)) {
      if (query == "") {
        return Promise.resolve([]);
      }
      // Do the extended lookup on multiple fields manually here:
      if (query.length >= 3) {
        return this.courseService
          .fetchCourse(query)
          .then(result => Promise.resolve(result))
      }
      return Promise.resolve([]);
    }
    // else {
    //   return Promise.reject("Invalid cosecode");
    // }

  constructor(
    public courseService : CourseService
  ) {

  }

  ngOnInit() {
  }

  select(course) {
    // console.log(course)
    // alert(text);
    this.addCourse.emit(course)
  }
  // public async fetchCourse(query: string): Promise<Course[]> {
  //   console.log("loglog")
  //   return this.courseService.fetchCourse(query);
  // }

}
