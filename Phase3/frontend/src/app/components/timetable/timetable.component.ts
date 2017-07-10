import { Component, OnInit, Input } from '@angular/core';
// import { Course } from '../../models/course'
import { CourseMin } from '../../models/course-min';
import { TimetableSlot } from '../../models/timetable-slot';
const sample = [
  [{
      "courseCode": "CSC120",
      "code": ["L0101"],
      "times": [{
        "day": "MONDAY",
        "start": 46800,
        "end": 50400,
        "duration": 3600,
        "location": "NF 003"
      }, {
        "day": "WEDNESDAY",
        "start": 46800,
        "end": 50400,
        "duration": 3600,
        "location": "NF 003"
      }, {
        "day": "FRIDAY",
        "start": 46800,
        "end": 50400,
        "duration": 3600,
        "location": "NF 003"
      }, {
        "day": "THURSDAY",
        "start": 54000,
        "end": 61200,
        "duration": 7200,
        "location": ""
      }]
    }, {
      "courseCode": "CSC108",
      "code": ["L0101"],
      "times": [{
        "day": "MONDAY",
        "start": 36000,
        "end": 39600,
        "duration": 3600,
        "location": "MP 102"
      }, {
        "day": "WEDNESDAY",
        "start": 36000,
        "end": 39600,
        "duration": 3600,
        "location": "MP 102"
      }, {
        "day": "FRIDAY",
        "start": 36000,
        "end": 39600,
        "duration": 3600,
        "location": "MP 102"
      }]
    }]
];

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
  // solutionlist: CourseMin[][];
  // index of current solution
  cur;
  currentlist : CourseMin[] = [];
  convert_day = { "MONDAY": 1,"TUESDAY": 2,"WEDNESDAY": 3,"THURSDAY": 4,"FRIDAY": 5};
  back = ["PaleGoldenRod","lightblue","LightSalmon", "lightgreen", "lightpink", "Chocolate", "GreenYellow", "GoldenRod"];
  option_back = ["MediumPurple", "Fuchsia", "Aqua"];

  // sampleSolution: CourseMin[][] = sample;
  solutionList : CourseMin[][];
  timetableSlot : TimetableSlot = new TimetableSlot();
  constructor() { }

  ngOnInit() {
    console.log(sample);
    this.timetableSlot = new TimetableSlot();
  }

  overlap(a, b) {
  	for (var i = 0; i < a.length; i++)
  		for (var j = 0; j < b.length; j++)
  			if (a[i].day == b[j].day && Math.max(a[i].start, b[j].start) < Math.min(a[i].end, b[j].end))
  				return true;
  	return false;
  }

  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }
  updateSolution(solutionlist) {
    this.solutionList = solutionlist;
  }

  renderSolution(index) {
  	console.log("render_solution");
    console.log(this.solutionList)
  	var solution = this.solutionList[index];
  	this.currentlist = solution;
  	this.cur = index;
  	for (var i = 0; i < solution.length; i++)
  		this.drawCourse(solution[i]);
    console.log(this.timetableSlot.map);
  }

  drawCourse(course) {
    course.color = this.back[0];
    for (var i = 0; i < course.times.length; i++) {
  		var col_num = this.convert_day[course.times[i].day] - 1;
  		for (var j = course.times[i].start / 3600 - 7; j < course.times[i].end / 3600 - 7; j++) {
      if (j == course.times[i].start / 3600 - 7) {
        this.timetableSlot.setValue(col_num, j, {
          code: course.courseCode,
          section: course.code,
          color: course.color,
        })
      } else {
        this.timetableSlot.setValue(col_num, j, {
          code: " ",
          section: " ",
          color: course.color,
        })
      }
  		}
    }
  }

}
