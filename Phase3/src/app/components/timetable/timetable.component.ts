import { Component, OnInit, Input } from '@angular/core';
// import { Course } from '../../models/course'
import { CourseMin } from '../../models/course-min';
import { TimetableSlot, Cell } from '../../models/timetable-slot';

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
  // @Input() term : string;
  term : string;

  constructor(
    private courseService : CourseService
  ) { }

  ngOnInit() {
    this.term = "2017 Fall";
    this.timetableSlot = new TimetableSlot();
    this.solutionList = this.courseService.loadSolutionList();
    this.renderSolution(0, this.term);
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

  createTd(a: Cell[][], index: number) {
    var result = [];
    for (let i = 0; i < 5; i++) {
      if (!a[i][index].delete) {
        result.push(a[i][index])
      }
    }
    return result;
  }

  countCol(a: Cell[][], i: number) {

  }
  updateSolution(solutionlist) {
    this.solutionList = solutionlist;
  }

  renderSolution(index, term="2017 Fall") {
    this.term = term;
    this.cleanTable();
    // console.log(this.solutionList)
    this.solutionList = this.courseService.loadSolutionList();
    if (this.solutionList[term].length != 0) {
      var solution = this.solutionList[term][index];
    	this.currentlist = solution;
    	this.cur = index;
    	for (var i = 0; i < solution.length; i++)
    		this.drawCourse(solution[i]);
    }
    console.log("rendering", this.term);
  }

  cleanTable() {
    this.timetableSlot = new TimetableSlot();
  }

  initTimetable(timetable) {
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 15; j++) {
        if (timetable.map[i][j].code == "") {
          timetable.setValue(i, j, {
            code: "",
            section: "",
            color: "#fff",
            class: "",
            rowspan: 1,
            delete: false,
            fn: () => {this.renderSolution(this.cur, this.term)}
          });
        }
      }
    }
  }

  drawCourse(course) {
    course.color = this.back[0];
    for (var i = 0; i < course.times.length; i++) {
  		var col_num = this.convert_day[course.times[i].day] - 1;
      // let start = course.times[i].start / 3600 - 7;
      // for (let n = 0; n <= course.times[i].duration/3600; n++) {
      //   // console.log(course.code, col_num - 1, start + n - 1, this.timetableSlot.map[col_num - 1][start + n - 1].delete)
      //   // console.log(this.timetableSlot.printTable());
      //   if (this.timetableSlot.map[col_num - 1][start + n - 1].delete) {
      //     console.log(col_num - 1, start + n - 1)
      //     this.timetableSlot.cleanSpan(col_num - 1, start + n - 1);
      //   }
      // }
  		for (var j = course.times[i].start / 3600 - 7; j < course.times[i].end / 3600 - 7; j++) {
      if (j == course.times[i].start / 3600 - 7) {
        this.timetableSlot.setValue(col_num, j - 1, {
          code: course.courseCode,
          section: course.code[0],
          color: course.color,
          class: "course",
          rowspan: course.times[i].duration/3600,
          delete: false,
          start: course.times[i].start,
          end: course.times[i].end,
          fn: () => {
            this.renderSolution(this.cur, this.term);
            let courseData = this.courseService.loadCourseData(this.term);
            console.log("course", course);
            console.log("data", courseData);
            console.log("term", this.term);
            let optLst = courseData[course.courseCode][this.term][course.code[0][0]];
            // this.drawOption(course);
            for (var i = 0; i < optLst.length; i++) {
              var ok = true;
              for (var j = 0; j < this.currentlist.length; j++)
                if (this.currentlist[j] != course && this.overlap(optLst[i].times, this.currentlist[j].times)) {
                  ok = false;
                  break;
                }
              if (ok) this.drawOption(optLst[i]);
            }
          },
        })
      }
       else {
        this.timetableSlot.setValue(col_num, j - 1, {
          code: " ",
          section: " ",
          color: "",
          class: "",
          delete: true,
          fn: () => {console.log("别点了")}
        })
      }
  		}
    }
  }

  onCLickCourse(course) {
    this.renderSolution(this.cur, this.term);
    let courseData = this.courseService.loadCourseData(this.term);
    let optLst = courseData[course.courseCode][this.term][course.code[0][0]];
    this.drawOption(course);
    for (var i = 0; i < optLst.length; i++) {
      var ok = true;
      for (var j = 0; j < this.currentlist.length; j++)
        if (this.currentlist[j] != course && this.overlap(optLst[i].times, this.currentlist[j].times)) {
          ok = false;
          break;
        }
      if (ok) this.drawOption(optLst[i]);
    }
  }

  drawOption(course) {
    let color = this.back[0];
    this.initTimetable(this.timetableSlot);
    for (var i = 0; i < course.times.length; i++) {
      var col_num = this.convert_day[course.times[i].day];
      let start = course.times[i].start / 3600 - 7;
      for (let n = 0; n <= course.times[i].duration/3600; n++) {
        // console.log(course.code, col_num - 1, start + n - 1, this.timetableSlot.map[col_num - 1][start + n - 1].delete)
        // console.log(this.timetableSlot.printTable());
        if (this.timetableSlot.map[col_num - 1][start + n - 1].delete) {
          this.timetableSlot.cleanSpan(col_num - 1, start + n - 1);
        }
      }

      for (var j = course.times[i].start / 3600 - 7; j < course.times[i].end / 3600 - 7; j++) {
        let k = {
          code: "OPTION",
          section: (course.code.length != 1) ? "multiple" : course.code[0],
          color: color,
          class: "option",
          rowspan: course.times[i].duration/3600,
          start: course.times[i].start,
          end: course.times[i].end,
          // rowspan:1,
          delete: false,
          lst: (course.code.length != 1)?course.code.join('\n'):"",
          fn: () => {
            // if (course.code.length == 1) {
              // console.log(this.currentlist);
            		for (var i = 0; i < this.currentlist.length; i++)
            			if (this.currentlist[i].courseCode == course.courseCode && this.currentlist[i].code[0][0] == course.code[0][0]) {
            				this.solutionList[this.term][this.cur].splice(i, 1, course);
                    this.courseService.storeSolutionList(this.solutionList);
            				this.renderSolution(this.cur, this.term);
            				break;
            			}
                  // console.log(this.currentlist)
            	// }
          }
        }

        if (j == course.times[i].start / 3600 - 7) {
          this.timetableSlot.setValue(col_num - 1, j - 1, k)
        }
        else {
          this.timetableSlot.setValue(col_num - 1, j - 1, {
            code: " ",
            section: " ",
            color: "",
            class: "",
            delete: true
          })
        }
      }
    }
  }
}

//
//
// if (course.code.length == 1) {
// 	k.text("Option: " + course.code[0]).on("click", function() {
// 		for (var i = 0; i < currentlist.length; i++)
// 			if (currentlist[i].courseCode == course.courseCode && currentlist[i].code[0][0] == course.code[0][0]) {
// 				currentlist.splice(i, 1, course);
// 				render_solution(cur);
// 				break;
// 			}
// 	});
// } else {
// 	k.text("Options: " + course.code[0] + "/...");
// 	k.off().on("click", function() {
// 		div = $("<div></div>").addClass("stacklist");
// 		ul = $("<ul></ul>").css("list-style-type", "none");
// 		ul.css("width", k.css("width"));
// 		ul.append($("<li></li>").text("Select One").on("click", function(e) {
// 			e.stopPropagation();
// 			render_solution(cur);
// 		}));
// 		for (var i = 0; i < course.code.length; i++)
// 			ul.append($("<li></li>").text(course.code[i]).on("click", function(e) {
// 				e.stopPropagation();
// 				var index = course.code.indexOf($(this).text());
// 				// swap code[0] and code[index];
// 				var temp = course.code[0];
// 				course.code[0] = course.code[index];
// 				course.code[index] = temp;
// 				var replace_index = 0;
// 				for (var j = 0; j < currentlist.length; j++)
// 					if (currentlist[j].courseCode == course.courseCode && currentlist[j].code[0][0] == course.code[0][0]) {
// 						replace_index = j;
// 						break;
// 					}
//
// 				currentlist.splice(replace_index, 1, course);
// 				localStorage.solution = JSON.stringify(solutionlist);
// 				render_solution(cur);
// 				return;
// 			}));
// 		k.append(div.append(ul));
// 	});
// }
