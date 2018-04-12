import {Component, Input, OnInit} from '@angular/core';
import {Timetable} from "../../models/timetable";
import {Term} from "../../models/term";


@Component({
    selector: 'app-timetable',
    templateUrl: './timetable.component.html',
    styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
    @Input() term: Term;
    timetable: Timetable;

    constructor() {
    }

    ngOnInit() {
        this.timetable = new Timetable();
    }
}
