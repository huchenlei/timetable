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
    /**
     * A set of selected courses string in course bar
     * @type {string[]}
     */
    selectedCourses: string[];

    constructor(private http: Http) {
        this.terms = Term.getTerms();
        this.selectedCourses = CourseService.loadCourseList();
    }

    /**
     * Extract term information from course code
     * @param code full course code
     * @return {Term[]} which term the course belongs to
     */
    private courseTerm(code): Term[] {
        if (code.indexOf("H1F") > -1) return [this.terms[0]];
        if (code.indexOf("H1S") > -1) return [this.terms[1]];
        if (code.indexOf("Y1Y") > -1) return this.terms;
        else {
            log.warn("Unrecognizable course term for course " + code);
            return [];
        }
    }

    activeCourses(term: Term): string[] {
        return this.selectedCourses.filter(c => {
            return this.courseTerm(c).filter(t => t.equals(term)).length > 0;
        });
    }

    /**
     * Delete a given course
     * @param {string} course
     */
    deleteCourse(course: string): void {
        const courses = this.selectedCourses;
        courses.splice(courses.indexOf(course), 1);
        CourseService.storeCourseList(this.selectedCourses);
    }

    /**
     * Add a given course to course list
     * @param {UofT.Course} course
     */
    addCourse(course: UofT.Course): void {
        this.selectedCourses.push(course.code);
        CourseService.storeCourseList(this.selectedCourses);
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
