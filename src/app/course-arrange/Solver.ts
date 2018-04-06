/**
 * On average the user would choose 5 courses, each course typically
 * has 3 course units, and the course unit typically has 3 possible time slots
 * which results in 3^15 possible combinations (Around 14M)
 *
 * Created by Charlie on 2018-03-30.
 */
import {Course, CourseComponent, CourseSolution} from "./Course";
import {Constraint} from "./Constraint";
import Collections = require("typescript-collections");
import log = require("loglevel");
import shuffle = require("shuffle-array");

export abstract class Solver {
    protected courses: Course[];
    protected components: CourseComponent[];
    protected possibleSolutionNum: number;

    protected constructor(courses: Course[]) {
        log.info("Solver with following courses");
        courses.forEach(c => log.info(c.name));
        this.courses = courses;
        this.components = [];
        for (let course of courses) {
            for (let component of course.components) {
                this.components.push(component);
            }
        }
        const optionNums = this.components.map(c => c.sections.length);
        this.possibleSolutionNum = optionNums.reduce((total, num) => total * num, 1);

        log.info(`${this.components.length} components to consider`);
        log.info(`components has respective number of optional section ${optionNums}`);
        log.info(`${this.possibleSolutionNum} possible solutions`);
    }

    public abstract solve(constraints: Constraint[], resultNum: number)
        : CourseSolution[];
}

export class ExhaustiveSolver extends Solver {
    /**
     * Since exhaustive solver attempts to find every possible solution
     * for given array of courses, a threshold is set to avoid futile work
     * if the possible solution set is too large
     *
     * default value is 1M (takes roughly 3 sec)
     */
    private _threshold: number;

    set threshold(value: number) {
        this._threshold = value;
    }

    constructor(courses: Course[], threshold: number = 1000 * 1000) {
        super(courses);
        this._threshold = threshold;
    }

    solve(constraints: Constraint[], resultNum: number = 10): CourseSolution[] {
        if (this.possibleSolutionNum > this._threshold) {
            throw new Error(`Possible solution set is too large(${
                this.possibleSolutionNum}), max ${this._threshold} allowed`);
        }

        const rootSolution = new CourseSolution();
        const components = this.components;
        const solutions = new Collections.PriorityQueue<CourseSolution>(
            (a, b) => a.compareTo(b));
        let solutionCount = 0;

        function _solve(solution: CourseSolution, componentIndex: number) {
            if (componentIndex == components.length) {
                solutionCount++; // Count every possible solution found
                // End of recursion
                if (solutions.size() < resultNum) {
                    solutions.add(solution);
                } else if ((<CourseSolution>solutions.peek()).score < solution.score) {
                    solutions.dequeue();
                    solutions.add(solution);
                }
                return;
            }

            for (let section of components[componentIndex].sections) {
                let newSolution = solution.addCourseSection(constraints, section);
                _solve(newSolution, componentIndex + 1);
            }
        }

        _solve(rootSolution, 0);

        const _solution: CourseSolution[] = [];
        solutions.forEach(s => {
            _solution.push(s);
        });
        return _solution;
    }
}

export class StepHeuristicSolver extends Solver {
    private maxIteration: number;
    private multiStartNum: number;


    /**
     * The algorithm is not guaranteed to find the solution that satisfy
     * the constraints user specified, need to terminate the searching
     * if it takes too long. (after a max iteration num is reached)
     *
     * @param {Course[]} courses
     * @param {number} maxIteration
     * @param {number} multiStartNum
     */
    constructor(courses: Course[],
                maxIteration: number = 1000 * 1000,
                multiStartNum: number = 10) {
        super(courses);
        this.maxIteration = maxIteration;
        this.multiStartNum = multiStartNum;
    }

    /**
     * Based on the simple fact that solutions with highest score is more
     * likely to generate solutions with higher score
     *
     * Each time pick a solution with highest score but not yet complete
     * in queue and advance a step, until we found enough solutions equal to
     * `resultNum`
     *
     * @param {Constraint[]} constraints
     * @param {number} resultNum
     * @return {CourseSolution[]}
     */
    solve(constraints: Constraint[], resultNum: number = 10): CourseSolution[] {
        const result: CourseSolution[] = [];
        for (let i = 0; i < this.multiStartNum; i++) {
            const components = shuffle(this.components, {'copy': true});
            const solution = this.solveWithGivenSequence(components, constraints, resultNum);
            result.push(...solution);
        }
        result.sort((a, b) => -a.compareTo(b));
        return result.slice(0, resultNum);
    }

    private solveWithGivenSequence(components: CourseComponent[],
                                   constraints: Constraint[],
                                   resultNum: number) {
        const result: CourseSolution[] = [];
        const queue = new Collections.PriorityQueue<CourseSolution>(
            (a, b) => a.compareTo(b)); // Max score out first
        const rootSolution = new CourseSolution();
        queue.enqueue(rootSolution);

        for (let i = 0; i < this.maxIteration; i++) {
            const bestSolution = <CourseSolution>queue.dequeue();
            const componentIndex = bestSolution.choices.length;

            if (componentIndex == components.length) {
                // Output to result
                result.push(bestSolution);
                if (result.length == resultNum) {
                    return result;
                }
                continue;
            }

            for (let section of components[componentIndex].sections) {
                const newSolution = bestSolution.addCourseSection(constraints, section);
                queue.enqueue(newSolution);
            }
        }
        return result;
    }
}