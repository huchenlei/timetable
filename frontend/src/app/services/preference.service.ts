import { Injectable } from '@angular/core';

import { Preference } from '../models/preference';


const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
const times = ['morning', 'afternoon', 'evening'];

@Injectable()
export class PreferenceService {

  constructor() { }

  updateDay(preference: Preference, day: string, time: string) : void {
      preference[day][time] = !preference[day][time];
      console.log(this.print(preference));
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

}
