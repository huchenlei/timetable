import {Component, OnInit, QueryList, ViewChildren} from "@angular/core";
import {TimetableComponent} from "./components/timetable/timetable.component";
import {parseCourse, UofT} from "./models/course";
import {CourseService} from "./services/course.service";
import {
    Constraint,
    CourseSolution,
    ExhaustiveSolver,
    LocationDistanceConstraint,
    StepHeuristicSolver,
    TimeConflictConstraint
} from "./course-arrange";
import {Term} from "./models/term";
import {environment} from "../environments/environment";
import {LogLevelDesc} from "loglevel";
import log = require("loglevel");
import _ = require("lodash");
import Collections = require("typescript-collections");
import {AlertService} from "./services/alert.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    /**
     * Controlling term panel
     * and other term related functionality
     */
    terms: Term[];
    activeTerm: Term;

    /**
     * Search-bar loading spin
     * @type {boolean}
     */
    loading: boolean = false;

    // Two timetable one for Fall one for Winter
    @ViewChildren(TimetableComponent) timetables: QueryList<TimetableComponent>;

    /**
     * Current constraint list
     * Used by constraint.component
     */
    constraints: Constraint[];

    /**
     * Holding generated solutions for given terms
     */
    solutionTable: Collections.Dictionary<Term, CourseSolution[]>;

    constructor(private courseService: CourseService,
                private alertService: AlertService) {
        this.terms = Term.getTerms();
        this.activeTerm = this.terms[0];
        this.constraints = [
            new TimeConflictConstraint(),
            new LocationDistanceConstraint(1000, 5)
        ];
        this.solutionTable = new Collections.Dictionary<Term, CourseSolution[]>();
        this.terms.forEach(t => this.getSolutions(t));
    }


    ngOnInit(): void {
        log.setLevel(<LogLevelDesc>environment.logLevel);
    }

    /**
     * Evaluate solution with given course list
     */
    private eval(courses: UofT.Course[]): CourseSolution[] {
        const parsedCourses = courses.map(parseCourse);
        // Try Exhaustive Solver first
        const exSolver = new ExhaustiveSolver(parsedCourses);
        try {
            return exSolver.solve(this.constraints);
        } catch (e) {
            log.info("ExhaustiveSolver failed");
            log.info(e);
            log.info("try heuristic solver");
            this.alertService.warn("Using heuristic solver... Might not get optimum solution");
            // If input too large, then use heuristic solver
            const heSolver = new StepHeuristicSolver(parsedCourses);
            return heSolver.solve(this.constraints);
        }
    }

    renderSolution(solution: CourseSolution, term: Term = this.activeTerm) {
        this.timetables
            .filter(tt => tt.term.equals(term))
            .forEach(tt => tt.parseSolution(solution));
    }

    private getCoursesByName(courseNames: string[]) {
        return Promise.all(courseNames.map(this.courseService.fetchCourseBody));
    }

    getSolutions(term: Term = this.activeTerm): void {
        this.getCoursesByName(this.courseService.activeCourses(term))
            .then(courses => {
                const solutions = this.eval(_.flatten(courses));
                this.solutionTable.setValue(term, solutions);
                if (solutions.length > 0) {
                    this.renderSolution(solutions[0], term);
                }
            });
    }

    /**
     * Delete a given constraint from constraint list
     * @param {Constraint} constraint
     */
    deleteConstraint(constraint: Constraint): void {
        this.constraints.splice(this.constraints.indexOf(constraint), 1);
    }
}

