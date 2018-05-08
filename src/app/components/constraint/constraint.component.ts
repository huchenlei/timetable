import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Constraint} from "../../course-arrange";

@Component({
    selector: 'app-constraint',
    templateUrl: './constraint.component.html',
    styleUrls: ['./constraint.component.css']
})
export class ConstraintComponent implements OnInit {

    @Input() constraint: Constraint;
    @Output() deleteConstraint: EventEmitter<Constraint> = new EventEmitter<Constraint>();

    constructor() {
    }

    ngOnInit() {
    }

    onClickClose(): void {
        this.deleteConstraint.emit(this.constraint);
    }
}
