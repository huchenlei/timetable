import { Component, OnInit, Input } from '@angular/core';

import {CourseService} from "../../services/course.service"
import {Course} from "../../models/course"


@Component({
  selector: 'app-course-body',
  templateUrl: './course-body.component.html',
  styleUrls: ['./course-body.component.css']
})
export class CourseBodyComponent implements OnInit {
  @Input() courseCode : string;
  body = new Course();
  sections: any[] = [];
  lectures: any[] = [];
  constructor(
    private courseService : CourseService
  ) { }

  ngOnInit() {
    this.courseService.fetchCourseBody(this.courseCode)
      .then(body => {
        this.body = body[0];
        this.sections = body[0].meeting_sections;
        this.sections.forEach(s => {
          if (s.code[0] === "L") {
            let copy = s;
            if (s.instructors.length == 0) {
              copy.instructors.push("TBA")
            }
            let times = new Set();
            s.times.forEach(t => {console.log(t);times.add(t.location);})
            copy.locations = Array.from(times);
            this.lectures.push(copy)
          }
        })
      })
  }



}
