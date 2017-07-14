import { Injectable } from '@angular/core';

import { Preference, Day } from '../models/preference';

export const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
export const times = ['morning', 'afternoon', 'evening'];

@Injectable()
export class PreferenceService {

  constructor() { }

  updateDay(preference: Preference, day: string, time: string) : void {
    let previous = preference[day][time];
    if (times.indexOf(time) >= 0) {
      preference[day] = new Day();
    }
      preference[day][time] = !previous;
      // console.log(this.print(preference));
      // console.log(this.parsePreference(preference))
      this.storePreferences(preference)
  }

  getDays() : string[] {
      return days;
  }

  getTimes() : string[] {
      return times;
  }

  print(preference: Preference) : string {
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
          exclude,
        });
      if (dayObj.noon) 
        result.push({
          day: day.substr(0, 3),
          start: 12 * 3600,
          end: 13 * 3600,
          exclude,
        });
      if (dayObj.highTea) 
        result.push({
          day: day.substr(0, 3),
          start: 13 * 3600,
          end: 15 * 3600,
          exclude
        });
      if (dayObj.afternoon) 
        result.push({
          day: day.substr(0, 3),
          start: 15 * 3600,
          end: 18 * 3600,
          exclude,
        });
      if (dayObj.evening) 
        result.push({
          day: day.substr(0, 3),
          start: 18 * 3600,
          end: 22 * 3600,
          exclude,
        });
      if (dayObj.no) 
        result.push({
          day: day.substr(0, 3),
          start: 8 * 3600,
          end: 22 * 3600,
          exclude: true,
        });
      return result;
  }

  parsePreference(preference: Preference) {
    let result = [];
    days.forEach(d => {
      // if (preference[d].no) {
      //   result[d.substr(0,3)] = "no-class";
      // } else {
      //   times.forEach(t => {
      //     if (preference[d][t]) {
      //       result[d.substr(0,3)] = t;
      //     }
      //   })
      //   if (!result.hasOwnProperty(d.substr(0,3))) {
      //     result[d.substr(0,3)] = 'any';
      //   }
      // }
      this.convertPrefToTime(preference[d], d).forEach(p => {
          result.push(p);
      });
      
    })
    return result;
  }

  storePreferences(p: Preference) {
    localStorage.setItem("preferences", JSON.stringify(p));
  }

}
