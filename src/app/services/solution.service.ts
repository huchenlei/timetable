import {Injectable} from '@angular/core';
import {Constraint, CourseSolution, ExhaustiveSolver, StepHeuristicSolver} from "../course-arrange";

@Injectable()
export class SolutionService {
    exhaustiveSolver: ExhaustiveSolver;
    heuristicSolver: StepHeuristicSolver;

    /**
     *
     */
    constraints: Constraint[];

    /**
     * Current solution displaying on the right part of main screen
     * Consumed by timetable.component
     */
    currentSolution: CourseSolution;
    /**
     * Currently displayed solution list on the scroll bar
     * Consumed by app.component
     */
    solutionList: CourseSolution[];

    constructor() {
    }


}
