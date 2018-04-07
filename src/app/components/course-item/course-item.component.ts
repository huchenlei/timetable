import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-course-item',
    templateUrl: './course-item.component.html',
    styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent implements OnInit {

    @Input() course: string;
    @Input() term: string;
    @Output() deleteCourse: EventEmitter<string> = new EventEmitter<string>();
    right = "right";

    constructor() {
    }

    ngOnInit() {
    }

    onClickClose(): void {
        this.deleteCourse.emit(this.course);
    }
}
