import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Course} from '../models/course';
import {PreferenceService} from './preference.service'

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class CourseService {

    constructor(private http: Http,
                private preferenceService: PreferenceService) {
    }

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
