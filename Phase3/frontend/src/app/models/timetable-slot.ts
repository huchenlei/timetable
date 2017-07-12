import { TimetableComponent } from '../components/timetable/timetable.component'
import { ViewChild } from '@angular/core';

export class TimetableSlot {
  map : any[5][15];


  constructor() {
    this.map = [];
        for(var i: number = 0; i < 5; i++) {
            this.map[i] = [];
            for(var j: number = 0; j< 15; j++) {
                this.map[i][j] = new Cell();
            }
        }
      }

  setValue(i, j, value) {
    this.map[i][j] = value;
  }
}

export class Cell {
  code: string = "";
  section: string = "";
  color: string = "#fff";
  class: string = "";
  rowspan: number | string = 1;
  delete: boolean = false;
  fn = () => {console.log("别点了")}
}
