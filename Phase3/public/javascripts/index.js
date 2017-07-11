
var solutionlist;
// index of current solution
var cur;
var currentlist = [];
var convert_day = { "MONDAY": 1,"TUESDAY": 2,"WEDNESDAY": 3,"THURSDAY": 4,"FRIDAY": 5};
var back = ["PaleGoldenRod","lightblue","LightSalmon", "lightgreen", "lightpink", "Chocolate", "GreenYellow", "GoldenRod"];
var option_back = ["MediumPurple", "Fuchsia", "Aqua"];
var semester = '2017 Fall';
// check if two course overlap
var over_lap = function(a, b) {
	for (var i = 0; i < a.length; i++)
		for (var j = 0; j < b.length; j++) 
			if (a[i].day == b[j].day && Math.max(a[i].start, b[j].start) < Math.min(a[i].end, b[j].end))
				return true;
	return false;
};
/*
var draw_option = function(course) {
	color = option_back[0];
	for (var i = 0; i < course.times.length; i++) {
		var col_num = convert_day[course.times[i].day];
		for (var j = course.times[i].start/3600-7; j < course.times[i].end/3600-7; j++) {
			var k = $(".timetable tbody tr:nth-of-type(" + j + ") td:eq(" + col_num + ")");
			k.addClass("course").css("background-color", color);
			if (j == course.times[i].start/3600-7) {
				if (course.code.length == 1) {
					k.text("Option: " + course.code[0]).on("click", function() {
						for (var i = 0; i < currentlist.length; i++)
							if (currentlist[i].courseCode == course.courseCode && currentlist[i].code[0][0] == course.code[0][0]) {
								currentlist.splice(i, 1, course);
								render_solution(cur);
								break;
							}
					});
				} else {
					k.text("Options: " + course.code[0] + "/...");
					k.off().on("click", function() {
						div = $("<div></div>").addClass("stacklist");
						ul = $("<ul></ul>").css("list-style-type", "none");
						ul.css("width", k.css("width"));
						ul.append($("<li></li>").text("Select One").on("click", function(e) {
							e.stopPropagation();
							render_solution(cur);
						}));
						for (var i = 0; i < course.code.length; i++)
							ul.append($("<li></li>").text(course.code[i]).on("click", function(e) {
								e.stopPropagation();
								var index = course.code.indexOf($(this).text());
								// swap code[0] and code[index];
								var temp = course.code[0];
								course.code[0] = course.code[index];
								course.code[index] = temp;
								var replace_index = 0;
								for (var j = 0; j < currentlist.length; j++) 
									if (currentlist[j].courseCode == course.courseCode && currentlist[j].code[0][0] == course.code[0][0]) {
										replace_index = j;
										break;
									}
								
								currentlist.splice(replace_index, 1, course);
								localStorage.solution = JSON.stringify(solutionlist);
								render_solution(cur);
								return;
							}));
						k.append(div.append(ul));
					});
				}
			}
		}
	}
};*/

var draw_option = function(course) {
	color = back[1];
	for (var i = 0; i < course.times.length; i++) {
		var col_num = convert_day[course.times[i].day];
		var k = $(".timetable tbody tr:nth-of-type(" + (course.times[i].start/3600-7) + ") td:eq(" + col_num + ")");
		k.attr("rowspan", course.times[i].duration/3600).addClass("course").css("background-color", color);
		k.css("border", "2px black solid");
		if (course.code.length == 1) {
			k.text("Option: " + course.code[0]).on("click", function() {
				for (var i = 0; i < currentlist.length; i++)
					if (currentlist[i].courseCode == course.courseCode && currentlist[i].code[0][0] == course.code[0][0]) {
						currentlist.splice(i, 1, course);
						render_solution(cur);
						break;
					}
			});
		} else {
			k.text("Options: " + course.code[0] + "/...");
			k.off().on("click", function() {
				div = $("<div></div>").addClass("stacklist");
				ul = $("<ul></ul>").css("list-style-type", "none");
				ul.css("width", k.css("width"));
				ul.append($("<li></li>").text("Select One").on("click", function(e) {
					e.stopPropagation();
					render_solution(cur);
				}));
				for (var i = 0; i < course.code.length; i++)
					ul.append($("<li></li>").text(course.code[i]).on("click", function(e) {
						e.stopPropagation();
						var index = course.code.indexOf($(this).text());
						// swap code[0] and code[index];
						var temp = course.code[0];
						course.code[0] = course.code[index];
						course.code[index] = temp;
						var replace_index = 0;
						for (var j = 0; j < currentlist.length; j++) 
							if (currentlist[j].courseCode == course.courseCode && currentlist[j].code[0][0] == course.code[0][0]) {
								replace_index = j;
								break;
							}
						
						currentlist.splice(replace_index, 1, course);
						localStorage.solution = JSON.stringify(solutionlist);
						render_solution(cur);
						return;
					}));
				k.append(div.append(ul));
			});
		}
	}
	
};
/*
var draw_course = function(course) {
	//if (course.hasOwnProperty('color') == false) 
		//course.color = back[Math.floor(Math.random() * back.length)];
	course.color = back[0];
	for (var i = 0; i < course.times.length; i++) {
		var col_num = convert_day[course.times[i].day];
		for (var j = course.times[i].start/3600-7; j < course.times[i].end/3600-7; j++) {
			var k = $(".timetable tbody tr:nth-of-type(" + j + ") td:eq(" + col_num + ")");
			k.addClass("course").css("background-color", course.color);
			if (j == course.times[i].start/3600-7) {
				k.text(course.courseCode + "\n" + course.code[0]);
				k.on("click", function() {
					render_solution(cur);
					course_data = load_course_data();
					opt_lst = course_data[course.courseCode][semester][course.code[0][0]];
					draw_option(course);
					for (var i = 0; i < opt_lst.length; i++) {
						var ok = true;
						for (var j = 0; j < currentlist.length; j++)
							if (currentlist[j] != course && over_lap(opt_lst[i].times, currentlist[j].times)) {
								ok = false;
								break;
							}
						if (ok) draw_option(opt_lst[i]);
					}
					
				});
			}
		}
	}
};
*/

var draw_course = function(course) {
	console.log(semester);
	course.color = back[0];
	for (var i = 0; i < course.times.length; i++) {
		var col_num = convert_day[course.times[i].day];
		var k = $(".timetable tbody tr:nth-of-type(" + (course.times[i].start/3600-7) + ") td:eq(" + col_num + ")");
		k.attr("rowspan", course.times[i].duration/3600).addClass("course").css("background-color", course.color);
		k.css("border", "2px black solid");
		k.text(course.courseCode + "\n" + course.code[0]).on("click", function() {
			render_solution(cur);
			course_data = load_course_data();
			opt_lst = course_data[course.courseCode][semester][course.code[0][0]];
			draw_option(course);
			for (var i = 0; i < opt_lst.length; i++) {
				var ok = true;
				for (var j = 0; j < currentlist.length; j++)
					if (currentlist[j] != course && over_lap(opt_lst[i].times, currentlist[j].times)) {
						ok = false;
						break;
					}
				if (ok) draw_option(opt_lst[i]);
			}
		});
	}
};
var clear_table = function() {
	var k = $(".timetable tbody tr").find("td:gt(0)");
	k.removeClass("course").css("background-color", "white");
	k.attr("rowspan", 1).css("border", "none").css("border-bottom", "1px solid #ccc");
	k.text("").off().empty();
};

var render_solution = function(index) {
	clear_table();
	if (solutionlist.length > 0) {
		var solution = solutionlist[index];
		currentlist = solution;
		cur = index;
		for (var i = 0; i < solution.length; i++) 
			draw_course(solution[i]);
	}
};

var course_list = [];
var course_object;
var course_taking;


function delete_course() {
   const courselist = JSON.parse(localStorage.courselist);
   var i = courselist.indexOf(this.id);
   if (i >= 0) {
   	  courselist.splice(i , 1);
   }
   localStorage.courselist = JSON.stringify(courselist);
   load_courselst();
   getSolutions();
}

function load_preference() {
	let preferences = {}
	if (localStorage.preferences && localStorage.preferences != '{}') {
		preferences_data = JSON.parse(localStorage.preferences);
	} else {
		preferences_data = {
			mon: 'any',
			tue: 'any',
			wed: 'any',
			thu: 'any',
			fri: 'any'
		};
		localStorage.preferences = JSON.stringify(preferences);
	}
	$('#mon_preference').val(preferences_data.mon);
	$('#tue_preference').val(preferences_data.tue);
	$('#wed_preference').val(preferences_data.wed);
	$('#thu_preference').val(preferences_data.thu);
	$('#fri_preference').val(preferences_data.fri);
}


function load_courselst() {
	localStorage.term = '2017 Fall';
	$('#course-list-table').empty();
	let courselist;
	if (localStorage.courselist) {
		courselist = JSON.parse(localStorage.courselist);

	} else {
		courselist = [];
		localStorage.courselist = JSON.stringify(courselist);
	}
	for (var i = 0; i < courselist.length; i++) {
		course = courselist[i];
		var new_tr = document.createElement('tr');
		new_tr.classList.add('course-item');
		$('#course-list-table').append(new_tr);

		//add new td to the tr
		var new_td = document.createElement('td');
		new_tr.append(new_td);

		//add new div to the td
		var new_div = document.createElement('div');
		new_div.id = course;
		new_div.innerHTML = course;
		new_td.append(new_div);

		//add a new delete button to td
		var new_delete = document.createElement('span');
		new_delete.setAttribute('class', 'glyphicon glyphicon-remove');
		new_delete.setAttribute('aria-hidden', 'true');
		new_delete.setAttribute('style', 'display:none;');
		new_delete.id = course; 
		new_delete.onclick = delete_course;
		new_td.append(new_delete);
		$(new_td).hover(() => new_delete.setAttribute('style', 'display:block;'),
			() => new_delete.setAttribute('style', 'display:none;'));
	}
	getSolutions();

}

function store_course_data(courselist) {
	localStorage.course_data = JSON.stringify(courselist);
}

function load_course_data() {
	return JSON.parse(localStorage.course_data);
}

function getSolutions() {
	if (JSON.parse(localStorage.courselist).length == 0) {
		solutionlist = [];
		$("#solutions ul").empty();
		clear_table();
	} else {
		$.ajax({
			type: 'POST',
			url: '/smart', 
			data: {
				term: localStorage.term,
			  	courselist: localStorage.courselist,
			  	preferences: localStorage.preferences
			}, 
			success: function(data) {
				var course_data = JSON.parse(data.courses);
				solutionlist = JSON.parse(data.solutions);
				store_course_data(course_data);
				cur = 0;
				currentlist = solutionlist[cur];
				render_solution(cur);
				$("#solutions ul").empty();
				for (var i = 0; i < solutionlist.length; i++) {
				  $("#solutions ul").append("<li>Solution " + (i+1) + "</li>");
				}
				$("#solutions li").on("click", function() {
				  console.log($("#solutions li").index(this));
				  render_solution($("#solutions li").index(this));

				});
				$("#switch-left").on("click",function() {
				  render_solution((cur-1+solutionlist.length)%solutionlist.length);
			    });
			    $("#switch-right").on("click",function() {
				  render_solution((cur+1)%solutionlist.length);
			    });
			}
	  	});
	}
	if (solutionlist == undefined) {
		localStorage.removeItem("solution");
	} else {
		localStorage.solution = JSON.stringify(solutionlist);
	}
}
function add_course(course_code) {
	if (!localStorage.courselist) {
		localStorage.courselist = JSON.stringify([course_code]);
	} else {
		const courselist = JSON.parse(localStorage.courselist);
		if (courselist.indexOf(course_code) == -1) {
			courselist.push(course_code);
		}
		localStorage.courselist = JSON.stringify(courselist);
	}
	load_courselst();
	getSolutions();
};

function set_semester(choice) {
	$('#select-fall').removeClass('active');
	$('#select-winter').removeClass('active');
	$('#select-summer').removeClass('active');
	if (choice == 'Fall') {
		$('#select-fall').addClass('active');
		semester = '2017 Fall';
	} else if (choice == 'Winter') {
		$('#select-winter').addClass('active');
		semester = '2017 Winter';
	} else {
		$('#select-summer').addClass('active');
		semester = '2017 Summer';
	}
	$('#semester-content').text(semester);
	if (localStorage.solution) {
		solutionlist = JSON.parse(localStorage.solution);
		render_solution(0);
	}
}
$(document).ready(function(){

	load_courselst();
	load_preference();
	if (localStorage.solution) {
		solutionlist = JSON.parse(localStorage.solution);
		render_solution(0);
	}
	$('#select-fall').on('click', () => set_semester('Fall'));
	$('#select-winter').on('click', () => set_semester('Winter'));
	$('#select-summer').on('click', () => set_semester('Summer'));
	$('#select-fall').click();
	//normal search area is initially hidden
	$('#resultViewWrapper').hide();

	$("#save_preference").on("click", function() {
		var preferences_data = {
  			mon: $("#mon_preference").val(),
  			tue: $("#tue_preference").val(),
  			wed: $("#wed_preference").val(),
  			thu: $("#thu_preference").val(),
  			fri: $("#fri_preference").val()
  		};
  		localStorage.preferences = JSON.stringify(preferences_data);
  		load_preference();
  		getSolutions();
	});
	

	/* Display all sections of courses searched
	 * after typing some string inside search bar and press "search"
	 */
	$('#normal-search').click(function() {
	  var course_code = $('#search-by-coursecode').val();

	  var url = 'http://localhost:3000/courses/' + course_code;

	  $('#normal-search-result').empty();
	  $.getJSON(url, function(result) {
		//response data are now in the result variable
		//result = array of objects
		// everytime search is clicked show #normal-search-result
		
		let len = result.length;
		const courses = new Set();
		for (i = 0; i < len; i++) {
		  const new_code = result[i].code.substr(0, 6);
		  if (!courses.has(new_code)) {
			courses.add(new_code);
		  }
		}
		if (courses.size == 1) 
			add_course(courses.entries().next().value[0]);
		else {
			$('#resultViewWrapper').css('top', $('.left-bar h2').css('height') + $('.left-bar .search-bar').css('height')).show();
			courses.forEach(
			  (classItem) => {
				var newList = document.createElement('li');
				newList.innerHTML = classItem;
				$(newList).on("click", () => add_course(classItem));
				$("#normal-search-result").append(newList);
			  }
			);
		}
		
	  });
	});
	

	/*
	 *每次点body都会清空resultList and hide search result
	 */
	$("body").on("click", function(){
	  $('#normal-search-result').empty();
	  $('#resultViewWrapper').hide();
	});

	$('body').on('keypress', 'input', function(args) {
	    if (args.keyCode == 13) {
	        $('#normal-search').click();
	        return false;
	    }
	});


});
