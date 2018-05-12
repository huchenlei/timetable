import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {UofT} from '../models/course';
import log = require("loglevel");

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Term} from "../models/term";


@Injectable()
export class CourseService {
    terms: Term[];

    constructor(private http: Http) {
        this.terms = Term.getTerms();
    }

    fetchCourse(query: string): Promise<UofT.Course[]> {
        const url = 'course/s/' + query;

        return this.http.get(url)
            .toPromise()
            .then(res => {
                return Promise.resolve(res.json() as UofT.Course[]);
            })
            .catch(err => Promise.reject(err));
    }

    fetchCourseBody = async (query: string) => {
        const cache = this.fetchCourseBodyFromCache(query);
        if (cache != null) return cache;

        const url = 'course/' + query;
        const res = await this.http.get(url).toPromise();
        const courses = res.json() as UofT.Course[];
        this.cacheCourses(query, courses);
        return courses;
    };

    fetchCourseBodyFromCache = (query: string) => {
        const cache = localStorage.getItem(this.queryKey(query));
        return cache == null ? null : <UofT.Course[]>JSON.parse(cache);
    };

    queryKey(query: string) {
        return "[CourseCache]" + this.terms[0].toString() + query;
    }

    /**
     * Cache courses associated with particular search query(Course Code) to localStorage
     * in order to minimize server pressure
     * @param {string} query
     * @param {UofT.Course[]} courses
     */
    cacheCourses(query: string, courses: UofT.Course[]) {
        localStorage.setItem(this.queryKey(query), JSON.stringify(courses));
    }

    static storeCourseList(courseList: string[]) {
        localStorage.setItem("courses", JSON.stringify(courseList))
    }

    static loadCourseList(): string[] {
        const data = localStorage.getItem("courses");
        log.debug(`course list in local storage: ${data}`);
        return data == null ? [] : JSON.parse(data);
    }
}
