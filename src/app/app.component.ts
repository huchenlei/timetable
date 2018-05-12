import {Component, OnInit, QueryList, ViewChild, ViewChildren} from "@angular/core";
import {TimetableComponent} from "./components/timetable/timetable.component";
import {parseCourse, UofT} from "./models/course";
import {CourseService} from "./services/course.service";
import {
    Constraint, CourseComponent, CourseSection,
    CourseSolution,
    ExhaustiveSolver, LocationDistanceConstraint, SectionPreferenceConstraint,
    StepHeuristicSolver, Time,
    TimeConflictConstraint, TimeSlotAvoidConstraint
} from "./course-arrange";
import {Term} from "./models/term";
import {environment} from "../environments/environment";
import {LogLevelDesc} from "loglevel";
import log = require("loglevel");
import _ = require("lodash");
import Collections = require("typescript-collections");
import {ModalTemplate, SuiModalService, TemplateModalConfig} from "ng2-semantic-ui";
import {Modal} from "ng2-semantic-ui/dist";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    /**
     * A set of selected courses string in course bar
     * @type {string[]}
     */
    selectedCourses: string[];

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
                private modalService: SuiModalService) {
        this.terms = Term.getTerms();
        this.activeTerm = this.terms[0];
        this.selectedCourses = CourseService.loadCourseList();
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
        this.getCoursesByName(this.activeCourses(term)).then(courses => {
            const solutions = this.eval(_.flatten(courses));
            this.solutionTable.setValue(term, solutions);
            if (solutions.length > 0) {
                this.renderSolution(solutions[0], term);
            }
        });
    }

    activeCourses(term: Term = this.activeTerm): string[] {
        return this.selectedCourses.filter(c => {
            return this.courseTerm(c).includes(term);
        });
    }

    selectTerm(term: Term) {
        this.activeTerm = term;
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

    /**
     * Delete a given constraint from constraint list
     * @param {Constraint} constraint
     */
    deleteConstraint(constraint: Constraint): void {
        this.constraints.splice(this.constraints.indexOf(constraint), 1);
    }

    /**
     * Following are the new constraint action support
     * In the future, the feature should be extracted as an one-time-use component
     */
    @ViewChild('modalTemplate')
    public modalTemplate: ModalTemplate<void, Constraint, void>;

    public priority: number;
    public constraintName: string;

    public constraintError: string = "";

    public constraintTimeSlots: Time[] = [];
    public augmentedComponents: AugmentedCourseComponents[];
    public distanceThreshold: number;

    public constraintType: string;
    public CONSTRAINT_TYPES = [
        "Time Conflict Constraint",
        "Section Preference Constraint",
        "Time Slot Avoid Constraint",
        "Location Distance Constraint"
    ];

    /**
     * On click new button, open the modal for user to fill in constraint details
     */
    newConstraint(): void {
        this.augmentedComponents = this.terms.map(t => {
            return {
                components: this.getCourseComponents(t),
                term: t,
            };
        });
        const config = new TemplateModalConfig<void, Constraint, void>(this.modalTemplate);
        config.isClosable = true;
        config.mustScroll = true;

        this.modalService
            .open(config)
            .onApprove(constraint => {
                this.constraints.push(<Constraint>constraint);
            });
    }

    newConstraintTimeSlot(day: number, start: number, end: number): void {
        try {
            this.constraintTimeSlots.push(new Time(day, start, end));
        } catch (e) {
            this.constraintError = e;
        }
    }

    getCourseComponents(term: Term = this.activeTerm) {
        const courses = _.compact(this.activeCourses(term).map(this.courseService.fetchCourseBodyFromCache));
        return _.flatten(
            _.flatten(courses)
                .map(parseCourse).map(c => c.components)
        ).map(c => {
            return <AgumentedCourseComponent>{
                component: c,
                selected: false,
                sectionSelected: null
            }
        });
    }

    private extractSelectedSections(): CourseSection[] {
        return _.flatten(this.augmentedComponents.map(a => a.components))
            .filter(c => c.selected)
            .map(c => c.sectionSelected);
    }

    /**
     * Generate constraint based on current form info
     * @return {Constraint}
     */
    generateConstraint(): Constraint {
        const name = this.constraintName == undefined ? this.constraintType : this.constraintName;

        switch (this.CONSTRAINT_TYPES.indexOf(this.constraintType)) {
            case 0:
                return new TimeConflictConstraint(this.priority, name);
            case 1:
                return new SectionPreferenceConstraint(this.extractSelectedSections(), this.priority, name);
            case 2:
                return new TimeSlotAvoidConstraint(this.constraintTimeSlots, this.priority, name);
            case 3:
                return new LocationDistanceConstraint(100, this.priority, name);
            default:
                throw "Invalid constraint type!" + this.constraintType;
        }
    }

    submitConstraintForm(modal: Modal<void, Constraint, void>) {
        try {
            if (this.priority == undefined)
                throw "priority must be filled";
            if (this.priority < 1 || this.priority > 10)
                throw "priority must be in range [1, 10]";

            const constraint = this.generateConstraint();
            modal.approve(constraint);

        } catch (e) {
            this.constraintError = e;
        }
    }
}

export interface AugmentedCourseComponents {
    components: AgumentedCourseComponent[];
    term: Term;
}

export interface AgumentedCourseComponent {
    component: CourseComponent;
    selected: boolean;
    sectionSelected: CourseSection | null;
}