import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {Course} from '../../models/course'

import {CourseService} from '../../services/course.service'

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/filter';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
    // options : Course[] = [];
    @Output() addCourse = new EventEmitter<Course>();
    @Input() term: string;

    public fetchCourse = (query: string) => {
        if (query == "") {
            return Promise.resolve([]);
        }
        // Do the extended lookup on multiple fields manually here:
        return this.courseService
            .fetchCourse(query, this.term)
            .then(result => {
                return Promise.resolve(result);
            })
            .catch(err => {
                return Promise.reject("Course not found")
            });
    };

    constructor(
        public courseService: CourseService
    ) {

    }

    ngOnInit() {
    }

    select(course) {
        this.addCourse.emit(course)
    }
}
