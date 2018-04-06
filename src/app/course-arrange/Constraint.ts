'use strict';
import {CourseSection, CourseSolution, Time} from "./Course";
import Set from "typescript-collections/dist/lib/Set";

/**
 * Created by Charlie on 2018-04-02.
 */

export abstract class Constraint {
    public name: string;
    public description: string;
    /**
     * How many lower one level priority constraint are equivalent
     * to one higher one level priority constraint
     * @type {number} default 4
     */
    public static prioritySeparationBase = 4;
    public priority: number;

    /**
     * Default constructor of constraint objects
     *
     * @param {string} name name of constraint
     * @param {number} priority ranges in [0, 10] where 1 means least significant
     * @param {string} description optional description string
     */
    protected constructor(name: string, priority: number = 1, description: string = "") {
        this.name = name;
        this.priority = priority;
        this.description = description;
    }

    public eval(solution: CourseSolution, toAdd: CourseSection) {
        return this._eval(solution, toAdd) *
            Math.pow(Constraint.prioritySeparationBase, this.priority);
    }

    /**
     * The returned score change lies in range [-1, 1]
     *
     * @param {CourseSolution} solution current choices
     * @param {CourseSection} toAdd the course section to add to current choices
     * @return {number} the score change after adding the course to current choices
     */
    protected abstract _eval(solution: CourseSolution, toAdd: CourseSection): number;
}

export class TimeConflictConstraint extends Constraint {
    /**
     * By default NOT having a time conflict is the most important metric
     * for a valid solution
     *
     * @param {number} priority
     */
    constructor(priority: number = 10) {
        super("TimeConflictConstraint", priority);
    }

    protected _eval(solution: CourseSolution, toAdd: CourseSection): number {
        let intersect = false;
        for (let choice of solution.choices) {
            intersect = intersect || toAdd.intersect(choice);
        }
        return intersect ? -1 : 0;
    }
}

export class SectionPreferenceConstraint extends Constraint {
    private sections: Set<CourseSection>;

    /**
     * This Constraint offers an option for user to specify the course section
     * they prefer with a priority
     *
     * @param {CourseSection[]} sections course sections
     * @param {number} priority priority level
     */
    constructor(sections: CourseSection[], priority: number) {
        super("SectionPreferenceConstraint", priority);
        this.sections = new Set<CourseSection>(cs => cs.toString());
        sections.forEach(s => this.sections.add(s));
    }

    protected _eval(solution: CourseSolution, toAdd: CourseSection): number {
        return this.sections.contains(toAdd) ? 1 : 0;
    }
}

export class TimeSlotAvoidConstraint extends Constraint {
    private readonly times: Time[];

    /**
     * This Constraint let user selects time slots where they do NOT want
     * to have class in (like every day at noon for lunch, etc.)
     *
     * @param {Time[]} times time slots the user want to AVOID
     * @param {number} priority priority level
     */
    constructor(times: Time[], priority: number) {
        super("TimeSlotAvoidConstraint", priority);
        this.times = times;
    }

    protected _eval(solution: CourseSolution, toAdd: CourseSection): number {
        let violationCount = 0;
        for (let time of this.times) {
            if (toAdd.intersect(time))
                violationCount++;
        }
        return -violationCount;
    }
}

export class LocationDistanceConstraint extends Constraint {
    private readonly maxDistance: number;

    /**
     * This Constraint allows user to specify a max distance they want to travel
     * when 2 courses is adjacent to each other
     *
     * @param {number} maxDistance in meter
     * @param {number} priority
     */
    constructor(maxDistance: number, priority: number) {
        super("LocationDistanceConstraint", priority);
        this.maxDistance = maxDistance;
    }

    protected _eval(solution: CourseSolution, toAdd: CourseSection): number {
        let violationCount = 0;
        for (let section of solution.choices)
            for (let time of section.times)
                for (let addTime of toAdd.times)
                    if (time.adjacent(addTime) &&
                        time.location.distanceTo(addTime.location))
                        violationCount++;
        return -violationCount;
    }
}