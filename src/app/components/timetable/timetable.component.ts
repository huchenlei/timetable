import {Component, OnInit} from '@angular/core';

import {CourseService} from '../../services/course.service'
import {Timetable} from "../../models/timetable";
import {ExhaustiveSolver, StepHeuristicSolver, TimeConflictConstraint} from "../../course-arrange";
import {CHE, CIV, ECE, parseCourse, UofT} from "./mocking";
import log = require("loglevel");



@Component({
    selector: 'app-timetable',
    templateUrl: './timetable.component.html',
    styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
    /*
    Legacy version
     */
    back = ["PaleGoldenRod", "lightblue", "LightSalmon", "lightgreen", "lightpink", "Chocolate", "GreenYellow", "GoldenRod"];

    term: string;

    /*
    New version
     */
    timetable: Timetable;

    constructor(private courseService: CourseService) {
    }

    ngOnInit() {
        this.term = "2017 Fall";
        this.timetable = new Timetable();
        
        log.enableAll();
        const courses: UofT.Course[] = [
            <UofT.Course>CHE,
            <UofT.Course>ECE
            ,
            <UofT.Course>CIV
        ];
        // const solver = new ExhaustiveSolver(courses.map(parseCourse));
        const solver = new StepHeuristicSolver(courses.map(parseCourse), 1000 * 1000, 50);
        this.timetable.parseSolution(solver.solve([new TimeConflictConstraint()], 10)[0]);
    }

    createRange(number) {
        const items: number[] = [];
        for (let i = 1; i <= number; i++) {
            items.push(i);
        }
        return items;
    }
}
