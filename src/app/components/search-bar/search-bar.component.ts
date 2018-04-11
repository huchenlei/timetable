import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UofT} from '../../models/course'

import {CourseService} from '../../services/course.service'

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/filter';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
    @Output() addCourse = new EventEmitter<UofT.Course>();
    @Input() term: string;

    /**
     * Attention!
     * fetch course must be an arrow function for "this" to be bind to SearchBarComponent
     * Can not change to regular method declaration
     * @param {string} query query string
     * @return {any}
     */
    public fetchCourse = (query: string): Promise<UofT.Course[]> => {
        if (query == "") {
            return Promise.resolve([]);
        }
        // Do the extended lookup on multiple fields manually here:
        return this.courseService
            .fetchCourse(query)
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

    select(course: UofT.Course) {
        this.addCourse.emit(course);
    }
}
