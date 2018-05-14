import {Component, Host, OnInit, ViewChild} from '@angular/core';
import {Term} from "../../models/term";
import {
    Constraint,
    CourseComponent,
    CourseSection,
    LocationDistanceConstraint,
    SectionPreferenceConstraint,
    Time,
    TimeConflictConstraint,
    TimeSlotAvoidConstraint
} from "../../course-arrange";
import {ModalTemplate, SuiModalService, TemplateModalConfig} from "ng2-semantic-ui";
import {Modal} from "ng2-semantic-ui/dist";
import {parseCourse} from "../../models/course";
import {CourseService} from "../../services/course.service";
import _ = require("lodash");
import {AppComponent} from "../../app.component";

/**
 * Following are the new constraint action support
 */
@Component({
    selector: 'app-constraint-creator',
    templateUrl: './constraint-creator.component.html',
    styleUrls: ['./constraint-creator.component.css']
})
export class ConstraintCreatorComponent implements OnInit {
    @ViewChild('modalTemplate')
    public modalTemplate: ModalTemplate<void, Constraint, void>;

    public priority: number;
    public constraintName: string;

    public constraintError: string = "";

    public constraintTimeSlots: Time[] = [];
    public augmentedComponents: AugmentedCourseComponents[];
    public distanceThreshold: number;

    public constraintType: string;
    private CONSTRAINT_TYPES = [
        'Time Conflict Constraint',
        'Section Preference Constraint',
        'Time Slot Avoid Constraint',
        'Location Distance Constraint'
    ];

    public terms: Term[];

    public main: AppComponent;
    constructor(public courseService: CourseService,
                public modalService: SuiModalService,
                @Host() main: AppComponent) {
        this.main = main;
        this.terms = Term.getTerms();
    }

    ngOnInit() {
    }

    /**
     * On click new button, open the modal for user to fill in constraint details
     */
    newConstraint(): void {
        this.augmentedComponents = this.terms.map(t => {
            return <AugmentedCourseComponents>{
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
                this.main.constraints.push(<Constraint>constraint);
            });
    }

    newConstraintTimeSlot(day: number, start: number, end: number): void {
        try {
            this.constraintTimeSlots.push(new Time(day, start, end));
        } catch (e) {
            this.constraintError = e;
        }
    }

    getCourseComponents(term: Term) {
        const courses = _.compact(this.courseService.activeCourses(term).map(this.courseService.fetchCourseBodyFromCache));
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