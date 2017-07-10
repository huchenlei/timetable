import { Component, OnInit } from '@angular/core';
// import { Course } from '../../models/course'
import { CourseMin } from '../../models/course-min';
import { TimetableSlot } from '../../models/timetable-slot';
const sample = [
  [{
    "code": "L5101",
    "size": 150,
    "enrolment": 0,
    "times": [{
      "day": "THURSDAY",
      "start": 64800,
      "end": 75600,
      "duration": 10800,
      "location": "SF 1101"
    }],
    "instructors": ["J Sin"],
    "courseCode": "CSC108"
  }, {
    "code": "L0101",
    "size": 130,
    "enrolment": 0,
    "times": [{
      "day": "WEDNESDAY",
      "start": 46800,
      "end": 57600,
      "duration": 10800,
      "location": "MP 202"
    }, {
      "day": "FRIDAY",
      "start": 46800,
      "end": 57600,
      "duration": 10800,
      "location": "MP 202"
    }],
    "instructors": ["G Patil B Navarro Lameda"],
    "courseCode": "MAT137"
  }, {
    "code": "T0101",
    "size": 35,
    "enrolment": 0,
    "times": [{
      "day": "MONDAY",
      "start": 39600,
      "end": 43200,
      "duration": 3600,
      "location": "BA 2145"
    }, {
      "day": "WEDNESDAY",
      "start": 39600,
      "end": 43200,
      "duration": 3600,
      "location": "BA 2145"
    }],
    "instructors": [],
    "courseCode": "MAT137"
  }, {
    "code": "L5101",
    "size": 150,
    "enrolment": 0,
    "times": [{
      "day": "TUESDAY",
      "start": 64800,
      "end": 75600,
      "duration": 10800,
      "location": "BA 1130"
    }, {
      "day": "WEDNESDAY",
      "start": 64800,
      "end": 72000,
      "duration": 7200,
      "location": "BA 1130"
    }],
    "instructors": ["I Dema"],
    "courseCode": "CSC165"
  }]
];

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
  solutionlist: CourseMin[][];
  // index of current solution
  cur;
  currentlist : CourseMin[] = [];
  convert_day = { "MONDAY": 1,"TUESDAY": 2,"WEDNESDAY": 3,"THURSDAY": 4,"FRIDAY": 5};
  back = ["PaleGoldenRod","lightblue","LightSalmon", "lightgreen", "lightpink", "Chocolate", "GreenYellow", "GoldenRod"];
  option_back = ["MediumPurple", "Fuchsia", "Aqua"];

  sampleSolution: CourseMin[][] = sample;
  timetableSlot : TimetableSlot = new TimetableSlot();
  constructor() { }

  ngOnInit() {
    console.log(sample);
    this.timetableSlot = new TimetableSlot();
    this.renderSolution(0)
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

  renderSolution(index) {
  	console.log("render_solution");
  	var solution = this.sampleSolution[index];
  	this.currentlist = solution;
  	this.cur = index;
  	for (var i = 0; i < solution.length; i++)
  		this.drawCourse(solution[i]);
    console.log(this.timetableSlot.map);
  }

  drawCourse(course) {
  	if (course.hasOwnProperty('color') == false)
  		course.color = this.back[Math.floor(Math.random() * this.back.length)]
  	for (var i = 0; i < course.times.length; i++) {
  		var col_num = this.convert_day[course.times[i].day];
  		for (var j = course.times[i].start/3600-7; j < course.times[i].end/3600-7; j++) {
        if (j == course.times[i].start/3600-7) {
        this.timetableSlot.setValue(i, j , {
          code: course.courseCode,
          section: course.code,
          color: course.color,
        })
      } else {
        this.timetableSlot.setValue(i, j , {
          code: " ",
          section: " ",
          color: course.color,
        })
      }
  		// 	var k = $(".timetable tbody tr:nth-of-type(" + j + ") td:eq(" + col_num + ")");
  		// 	k.addClass("course").css("background-color", course.color);
  		// 	if (j == course.times[i].start/3600-7) {
  		// 		k.text(course.courseCode + "\n" + course.code);
  		// 	}
  		}
  	}
  }

}
