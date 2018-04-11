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

    async fetchCourseBody(query: string) {
        const cache = localStorage.getItem(this.queryKey(query));
        if (cache != null) {
            return <UofT.Course[]>JSON.parse(cache);
        }

        const url = 'course/' + query;
        try {
            const res = await this.http.get(url).toPromise();
            const courses = res.json() as UofT.Course[];
            this.cacheCourses(query, courses);
            return courses;
        } catch (e) {
            return [e];
        }
    }

    queryKey(query: string) {
        return "[CourseCache]" + this.terms[0].toString() + query;
    }

    /**
     * Cache courses associated with particular search query(Course Code) to localstorage
     * in order to minimize server pressure
     * @param {string} query
     * @param {UofT.Course[]} courses
     */
    cacheCourses(query: string, courses: UofT.Course[]) {
        localStorage.setItem(this.queryKey(query), JSON.stringify(courses));
    }

    storeCourseData(courseList: any, term: string) {
        var course_data = JSON.parse(localStorage.getItem("course_data"));
        if (!(course_data && (term in course_data))) {
            this.initLocalStorage();
        }
        course_data[term] = courseList;
        localStorage.setItem("course_data", JSON.stringify(course_data));
    }

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

    loadCourseData(term: string): any {
        var data = JSON.parse(localStorage.getItem("course_data"));
        if (!(data && (term in data))) {
            this.initLocalStorage();
        }
        return JSON.parse(localStorage.getItem("course_data"))[term];
    }

    storeCourseList(courseList: string[]) {
        localStorage.setItem("courselist", JSON.stringify(courseList))
    }

    loadCourseList(): string[] {
        console.log("load course list");
        var data = JSON.parse(localStorage.getItem("courselist"));
        if (data) {
            console.log("2017 Fall", data["2017 Fall"]);
            console.log("2018 Winter", data["2018 Winter"]);
            if ((data["2017 Fall"].length > 0 && data["2017 Fall"][0].length == 6)
                || (data["2018 Winter"].length > 0 && data["2018 Winter"][0].length == 6)) {
                console.log(data);
                this.initLocalStorage();
            }
        }
        return JSON.parse(localStorage.getItem("courselist"))
            ? JSON.parse(localStorage.getItem("courselist"))
            : {"2017 Fall": [], "2018 Winter": []};
    }
}
