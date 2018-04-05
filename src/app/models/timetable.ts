import {CourseSection, CourseSolution, Time} from "../course-arrange";
import {isNull} from "util";
import Collections = require("typescript-collections");
import log = require("loglevel");


export class TimeTableColumn {
    /**
     * Which day this track belongs to, 1 ~ MAX_DAYS
     */
    day: number;
    /**
     * Track number index starting from 0
     */
    trackNum: number;

    /**
     * Course times on this track(column)
     */
    times: Time[];

    constructor(day: number, trackNum: number = 0, times: Time[] = []) {
        this.day = day;
        this.trackNum = trackNum;
        this.times = times;
    }

    /**
     * Try to add a time Object to this column
     * @param {Time} time
     * @return {boolean} whether addition is successful
     */
    addTime(time: Time): boolean {
        for (let t of this.times) {
            if (t.intersect(time))
                return false;
        }
        this.times.push(time);
        return true;
    }

    /**
     * Convert the column to a list of timetable cells
     * @param {number} startHour
     * @param {number} endHour
     * @return {TimetableCell[]}
     */
    toTimeTableCells(startHour: number, endHour: number): TimetableCell[] {
        // After sort, ascending order
        this.times.sort((a, b) => {
            if (a.start == b.start)
                return 0;
            else if (a.start < b.start)
                return -1;
            else
                return 1;
        });
        const result: TimetableCell[] = [];
        let prevHour = startHour;
        for (let time of this.times) {
            // Pad some extra blank cells before the course start
            for (let i = 0; i < (time.start - prevHour); i++) {
                result.push(new TimetableCell());
            }
            result.push(new TimetableCell(time));
            prevHour = time.end;
        }

        // Pad blank cells until the end of day
        for (let i = 0; i < (endHour - prevHour); i++) {
            result.push(new TimetableCell());
        }

        return result;
    }
}

export class TimetableCell {
    /*
    Following attrs are from legacy code
     */
    code: string = "";
    section: string = "";
    color: string = "#fff";
    class: string = "";
    rowspan: number | string = 1;
    colspan: number | string = 1;
    delete: boolean = false;
    fn = () => {
        console.log("别点了")
    };
    start: number;
    end: number;
    lst: string = "";

    /*
     Newly added attrs
     */

    constructor(time: Time | null = null) {
        if (!isNull(time)) {
            this.rowspan = time.end - time.start;

            const section = time.belongsTo;
            const component = section.belongsTo;
            const course = component.belongsTo;

            this.code = course.name;
            this.section = component.type.toString();
            this.color = "#cff";
        }
    }
}

export const MAX_DAYS: number = 5;
export const MAX_HOURS: number = 15;
export const START_HOUR = 9;

export class Timetable {
    /**
     * Final rendered version which is directly used to generate table content
     * in HTML
     */
    table: TimetableCell[][];

    /**
     * The earliest course hour and the latest course hour
     */
    minTime: number;
    maxTime: number;

    /**
     * Key: 1 ~ MAX_DAYS for days
     * Value: tracks that belongs to given day
     */
    trackTable: Collections.Dictionary<number, TimeTableColumn[]>;

    constructor() {
        this.trackTable = new Collections.Dictionary<number, TimeTableColumn[]>();
    }

    /**
     * Clear the trackTable and fill it with default values
     */
    private initTrackTable() {
        this.minTime = START_HOUR + MAX_HOURS;
        this.maxTime = START_HOUR;
        this.trackTable.clear();
        for (let i = 0; i < MAX_DAYS; i++) {
            const dayIndex = i + 1;
            this.trackTable.setValue(dayIndex, [new TimeTableColumn(dayIndex)]);
        }
    }

    /**
     * Add a course time to current table
     * @param {Time} time
     */
    private addTime(time: Time) {
        if (this.minTime > time.start)
            this.minTime = time.start;
        if (this.maxTime < time.end)
            this.maxTime = time.end;

        const trackList = this.trackTable.getValue(time.day);
        // trackList should not be empty
        for (let track of trackList) {
            if (track.addTime(time))
                return;
        }
        // If all tracks rejects the time create a new track and add the time
        trackList.push(new TimeTableColumn(time.day, trackList.length, [time]));
    }

    /**
     * Add a course section to current table
     * @param {CourseSection} section
     */
    private addCourseSection(section: CourseSection) {
        for (let time of section.times)
            this.addTime(time);
    }

    /**
     * Generate course table based on tracks information
     */
    private generateTable() {
        const totalColumn = this.trackTable.values()
            .reduce((total, val) => total + val.length, 0);
        let totalRow = this.maxTime - this.minTime;
        if (totalRow < 0) { // No time added
            totalRow = MAX_HOURS;
            this.minTime = START_HOUR;
            this.maxTime = START_HOUR + MAX_HOURS;
        }

        this.table = [];
        for (let columns of this.trackTable.values()) {
            for (let column of columns) {
                this.table.push(column.toTimeTableCells(this.minTime, this.maxTime));
            }
        }
    }

    /**
     * parse a solution to render-able table for HTML structure to display
     * @param {CourseSolution} solution
     */
    parseSolution(solution: CourseSolution) {
        log.info(`Course solution: score ${solution.score}, ${solution.choices.length} sections`);
        this.initTrackTable();
        for (let section of solution.choices) {
            this.addCourseSection(section);
        }
        this.generateTable();
    }
}
