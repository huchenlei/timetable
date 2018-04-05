import {Component, OnInit} from '@angular/core';
import {CourseMin} from '../../models/course-min';
import {TimetableSlotLegacy} from '../../models/timetable-slot-legacy';

import {CourseService} from '../../services/course.service'
import {Timetable} from "../../models/timetable";
import {StepHeuristicSolver, TimeConflictConstraint} from "../../course-arrange";
import {CHE, CIV, ECE, parseCourse, UofT} from "./mocking";


@Component({
    selector: 'app-timetable',
    templateUrl: './timetable.component.html',
    styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
    /*
    Legacy version
     */
    // index of current solution
    cur;
    currentlist: CourseMin[] = [];
    convert_day = {"MONDAY": 1, "TUESDAY": 2, "WEDNESDAY": 3, "THURSDAY": 4, "FRIDAY": 5};
    back = ["PaleGoldenRod", "lightblue", "LightSalmon", "lightgreen", "lightpink", "Chocolate", "GreenYellow", "GoldenRod"];

    solutionList: CourseMin[][];
    timetableSlot: TimetableSlotLegacy = new TimetableSlotLegacy();
    term: string;

    /*
    New version
     */
    timetable: Timetable;

    constructor(
        private courseService: CourseService
    ) {
    }

    ngOnInit() {
        this.term = "2017 Fall";
        this.timetableSlot = new TimetableSlotLegacy();

        // this.solutionList = this.courseService.loadSolutionList();
        // this.courseService.load_solution_list(this.solutionList, "2017 Fall");
        // this.renderSolution(0, this.term);

        this.timetable = new Timetable();
        const courses: UofT.Course[] = [
            <UofT.Course>CHE,
            <UofT.Course>ECE,
            <UofT.Course>CIV
        ];

        const solver = new StepHeuristicSolver(courses.map(parseCourse));
        this.timetable.parseSolution(solver.solve([new TimeConflictConstraint()])[0]);
    }

    overlap(a, b) {
        for (var i = 0; i < a.length; i++)
            for (var j = 0; j < b.length; j++)
                if (a[i].day == b[j].day && Math.max(a[i].start, b[j].start) < Math.min(a[i].end, b[j].end))
                    return true;
        return false;
    }

    createRange(number) {
        var items: number[] = [];
        for (var i = 1; i <= number; i++) {
            items.push(i);
        }
        return items;
    }

    updateSolution(solutionlist) {
        this.solutionList = solutionlist;
    }

    renderSolution(index, term = "2017 Fall") {
        this.term = term;
        this.cleanTable();
        this.solutionList = this.courseService.loadSolutionList();
        if (this.solutionList[term].length != 0) {
            var solution = this.solutionList[term][index];
            this.currentlist = solution;
            this.cur = index;
            for (var i = 0; i < solution.length; i++)
                this.drawCourse(solution[i]);
        }
        console.log("rendering", this.term);
    }

    cleanTable() {
        this.timetableSlot = new TimetableSlotLegacy();
    }

    initTimetable(timetable) {
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 15; j++) {
                if (timetable.map[i][j].code == "") {
                    timetable.setValue(i, j, {
                        code: "",
                        section: "",
                        color: "#fff",
                        class: "",
                        rowspan: 1,
                        delete: false,
                        fn: () => {
                            this.renderSolution(this.cur, this.term)
                        }
                    });
                }
            }
        }
    }

    drawCourse(course) {
        course.color = this.back[0];
        for (var i = 0; i < course.times.length; i++) {
            var col_num = this.convert_day[course.times[i].day] - 1;
            for (var j = course.times[i].start / 3600 - 7; j < course.times[i].end / 3600 - 7; j++) {
                if (j == course.times[i].start / 3600 - 7) {
                    this.timetableSlot.setValue(col_num, j - 1, {
                        code: course.courseCode,
                        section: course.code[0],
                        color: course.color,
                        class: "course",
                        rowspan: course.times[i].duration / 3600,
                        delete: false,
                        start: course.times[i].start,
                        end: course.times[i].end,
                        fn: () => {
                            this.renderSolution(this.cur, this.term);
                            let courseData = this.courseService.loadCourseData(this.term);
                            console.log("course", course);
                            console.log("data", courseData);
                            console.log("term", this.term);
                            let optLst = courseData[course.courseCode][this.term][course.code[0][0]];
                            // this.drawOption(course);
                            for (var i = 0; i < optLst.length; i++) {
                                var ok = true;
                                for (var j = 0; j < this.currentlist.length; j++)
                                    if (this.currentlist[j] != course && this.overlap(optLst[i].times, this.currentlist[j].times)) {
                                        ok = false;
                                        break;
                                    }
                                if (ok) this.drawOption(optLst[i]);
                            }
                        },
                    })
                }
                else {
                    this.timetableSlot.setValue(col_num, j - 1, {
                        code: " ",
                        section: " ",
                        color: "",
                        class: "",
                        delete: true,
                        fn: () => {
                            console.log("别点了")
                        }
                    })
                }
            }
        }
    }

    drawOption(course) {
        let color = this.back[0];
        this.initTimetable(this.timetableSlot);
        for (var i = 0; i < course.times.length; i++) {
            var col_num = this.convert_day[course.times[i].day];
            let start = course.times[i].start / 3600 - 7;
            for (let n = 0; n <= course.times[i].duration / 3600; n++) {
                // console.log(course.code, col_num - 1, start + n - 1, this.timetableSlot.map[col_num - 1][start + n - 1].delete)
                // console.log(this.timetableSlot.printTable());
                if (this.timetableSlot.map[col_num - 1][start + n - 1].delete) {
                    this.timetableSlot.cleanSpan(col_num - 1, start + n - 1);
                }
            }

            for (var j = course.times[i].start / 3600 - 7; j < course.times[i].end / 3600 - 7; j++) {
                let k = {
                    code: "OPTION",
                    section: (course.code.length != 1) ? "multiple" : course.code[0],
                    color: color,
                    class: "option",
                    rowspan: course.times[i].duration / 3600,
                    start: course.times[i].start,
                    end: course.times[i].end,
                    // rowspan:1,
                    delete: false,
                    lst: (course.code.length != 1) ? course.code.join('\n') : "",
                    fn: () => {
                        // if (course.code.length == 1) {
                        // console.log(this.currentlist);
                        for (var i = 0; i < this.currentlist.length; i++)
                            if (this.currentlist[i].courseCode == course.courseCode && this.currentlist[i].code[0][0] == course.code[0][0]) {
                                this.solutionList[this.term][this.cur].splice(i, 1, course);
                                this.courseService.storeSolutionList(this.solutionList);
                                this.renderSolution(this.cur, this.term);
                                break;
                            }
                        // console.log(this.currentlist)
                        // }
                    }
                }

                if (j == course.times[i].start / 3600 - 7) {
                    this.timetableSlot.setValue(col_num - 1, j - 1, k)
                }
                else {
                    this.timetableSlot.setValue(col_num - 1, j - 1, {
                        code: " ",
                        section: " ",
                        color: "",
                        class: "",
                        delete: true
                    })
                }
            }
        }
    }
}
