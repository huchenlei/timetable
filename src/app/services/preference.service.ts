import {Injectable} from '@angular/core';

import {Preference, Day} from '../models/preference';

export const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
export const times = ['morning', 'noon', 'afternoon', 'evening'];

@Injectable()
export class PreferenceService {

    constructor() {
    }

    updateDay(preference: Preference, day: string, time: string): void {
        let previous = preference[day][time];
        // if (times.indexOf(time) >= 0) {
        //   preference[day] = new Day();
        // }
        preference[day][time] = !previous;
        // console.log(this.print(preference));
        // console.log(this.parsePreference(preference))
        this.storePreferences(preference)
    }

    excludeTime(preference: Preference, time: string): void {
        let excluded = (this.getDaySum(preference, time) == -5);
        days.forEach(day => {
            if (excluded) preference[day][time] = 0;
            else preference[day][time] = -1
        })
        this.storePreferences(preference)
    }

    excludeDay(preference: Preference, day: string): void {
        let excluded = (this.getTimeSum(preference, day) == -4);
        times.forEach(time => {
            if (excluded) preference[day][time] = 0;
            else preference[day][time] = -1
        })
        this.storePreferences(preference)
    }

    getTimeSum(preference: Preference, day: string): number {
        return preference[day]['morning']
            + preference[day]['noon']
            + preference[day]['afternoon']
            + preference[day]['evening']
    }

    getDaySum(preference: Preference, time: string): number {
        return preference.monday[time]
            + preference.tuesday[time]
            + preference.wednesday[time]
            + preference.thursday[time]
            + preference.friday[time]
    }

    getDays(): string[] {
        return days;
    }

    getTimes(): string[] {
        return times;
    }

    print(preference: Preference): string {
        let table = "   | M | U | W | T | F \n---+---+---+---+---+---\n"
        times.forEach(t => {
            table += " " + t[0] + " "
            days.forEach(d => {
                table += "| " + (preference[d][t] ? 'O' : ' ') + " "
            })
            table += "\n"
        })
        return table;
    }

    loadPreferences() {
        let p = localStorage.getItem("preferences")
        return (p && p != "undefined") ? JSON.parse(p) : (new Preference());
    }

    convertPrefToTime(dayObj: Day, day: string) {
        var result = [];
        var exclude = false;
        if (dayObj.morning)
            result.push({
                day: day.substr(0, 3),
                start: 8 * 3600,
                end: 12 * 3600,
                exclude: dayObj.morning,
            });
        if (dayObj.noon)
            result.push({
                day: day.substr(0, 3),
                start: 12 * 3600,
                end: 15 * 3600,
                exclude: dayObj.noon,
            });
        if (dayObj.afternoon)
            result.push({
                day: day.substr(0, 3),
                start: 15 * 3600,
                end: 18 * 3600,
                exclude: dayObj.afternoon,
            });
        if (dayObj.evening)
            result.push({
                day: day.substr(0, 3),
                start: 18 * 3600,
                end: 22 * 3600,
                exclude: dayObj.evening,
            });
        return result;
    }

    storePreferences(p: Preference) {
        localStorage.setItem("preferences", JSON.stringify(p));
    }

}
