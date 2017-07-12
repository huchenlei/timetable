import { Component, OnInit, Input } from '@angular/core';
// import { Course } from '../../models/course'
import { CourseMin } from '../../models/course-min';
import { TimetableSlot } from '../../models/timetable-slot';

import { CourseService } from '../../services/course.service'
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
  @Input() term : string;

  constructor(
    private courseService : CourseService
  ) { }

  ngOnInit() {
    console.log(sample);
    this.timetableSlot = new TimetableSlot();
    this.solutionList = this.courseService.loadSolutionList();
    this.renderSolution(0);
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
    this.cleanTable();
  	console.log("render_solution");
    console.log(this.solutionList)
    if (this.solutionList[this.term] && this.solutionList[this.term].length != 0) {
      var solution = this.solutionList[this.term][index];
    	this.currentlist = solution;
    	this.cur = index;
    	for (var i = 0; i < solution.length; i++)
    		this.drawCourse2(solution[i]);
      console.log(this.timetableSlot.map);
    }

  }

  cleanTable() {
    this.timetableSlot = new TimetableSlot();
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
          class: "head" + (((course.times[i].start / 3600 - 7 + 1) == (course.times[i].end / 3600 - 7)) ? " lone" : "")
        })
      } else if (j == (course.times[i].end / 3600 - 7 - 1)) {
        this.timetableSlot.setValue(col_num, j, {
          code: " ",
          section: " ",
          color: course.color,
          class: "tail"
        })
      } else {
        this.timetableSlot.setValue(col_num, j, {
          code: " ",
          section: " ",
          color: course.color,
          class: "follow-up"
        })
      }
  		}
    }
  }

  drawCourse2(course) {
    // console.log(semester);
  	course.color = this.back[0];
  	for (var i = 0; i < course.times.length; i++) {
  		var col_num = this.convert_day[course.times[i].day];
  		var first_row = course.times[i].start/3600-7;
  		for (var j = 1 + first_row; j < course.times[i].end/3600 - 7; j++) {
  			// table_delete_counter[j-1][col_num-1] = 1;
        this.timetableSlot.setValue(j-1, col_num-1, {
          code: " ",
          section: " ",
          color: " ",
          class: " ",
          rowspan: " ",
          delete: true
        })

  		}
  		var cnt = 0;
  		for (var z = 0; z < col_num-1; z++)
  			// cnt += table_delete_counter[first_row-1][z];
  		// var k = $(".timetable tbody tr:nth-of-type(" + first_row + ") td:eq(" + (col_num - cnt) + ")");
      this.timetableSlot.setValue(col_num, first_row, {
        code: course.courseCode,
        section: course.code,
        color: course.color,
        class: " ",
        rowspan: course.times[i].duration/3600,
        delete: true
      })
  		// k.attr("rowspan", course.times[i].duration/3600).addClass("course").css("background-color", course.color);
  		// k.css("border", "2px black solid");
  		// k.text(course.courseCode + "\n" + course.code[0]).on("click", function() {
  		// 	render_solution(cur);
  		// 	course_data = load_course_data();
  		// 	opt_lst = course_data[course.courseCode][semester][course.code[0][0]];
  		// 	draw_option(course);
  		// 	for (var i = 0; i < opt_lst.length; i++) {
  		// 		var ok = true;
  		// 		for (var j = 0; j < currentlist.length; j++)
  		// 			if (currentlist[j] != course && over_lap(opt_lst[i].times, currentlist[j].times)) {
  		// 				ok = false;
  		// 				break;
  		// 			}
  		// 		if (ok) draw_option(opt_lst[i]);
  		// 	}
  		// });
  	}
  }

  // drawOption()

}
