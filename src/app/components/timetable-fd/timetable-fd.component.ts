import {Component, OnInit} from '@angular/core';
import {Day, weekdays} from '../../constants/date';
import * as _ from 'lodash';
import {Acorn} from 'acorn-api';

@Component({
    selector: 'app-timetable-fd',
    templateUrl: 'timetable-fd.component.html',
    styleUrls: ['timetable-fd.component.css']
})
export class TimetableFdComponent implements OnInit {
    acorn: Acorn;
    weekdays = _.map(weekdays, weekday => {
        return weekday.slice(0, 3);
    });
    constructor() {
    }

    ngOnInit() {
    }

}
