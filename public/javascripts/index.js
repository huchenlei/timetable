
var solutionlist;
// index of current solution
var cur;
var currentlist = [];
var convert_day = { "MONDAY": 1,"TUESDAY": 2,"WEDNESDAY": 3,"THURSDAY": 4,"FRIDAY": 5};
var back = ["PaleGoldenRod","lightblue","LightSalmon", "lightgreen", "lightpink", "Chocolate", "GreenYellow", "GoldenRod"];
var option_back = ["MediumPurple", "Fuchsia", "Aqua"];
var table_delete_counter = [];
var semester = '2017 Fall';
// check if two course overlap
var over_lap = function(a, b) {
	for (var i = 0; i < a.length; i++)
		for (var j = 0; j < b.length; j++)
			if (a[i].day == b[j].day && Math.max(a[i].start, b[j].start) < Math.min(a[i].end, b[j].end))
				return true;
	return false;
};

var draw_option = function(course) {
	color = back[1];
	for (var i = 0; i < course.times.length; i++) {
		var col_num = convert_day[course.times[i].day];
		var first_row = course.times[i].start/3600-7;
		for (var j = 1 + first_row; j < course.times[i].end/3600 - 7; j++) {
			table_delete_counter[j-1][col_num-1] = 1;
			var cnt = 0;
			for (var z = 0; z < col_num-1; z++)
				cnt += table_delete_counter[j-1][z];
			var t = $(".timetable table tr:nth-of-type(" + j + ") td:eq(" + (col_num - cnt) + ")");
			t.remove();
		}
		var cnt = 0;
		for (var z = 0; z < col_num-1; z++)
			cnt += table_delete_counter[first_row-1][z];
		var k = $(".timetable tbody tr:nth-of-type(" + first_row + ") td:eq(" + (col_num - cnt) + ")");
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


var draw_course = function(course) {
	console.log(semester);
	course.color = back[0];
	for (var i = 0; i < course.times.length; i++) {
		var col_num = convert_day[course.times[i].day];
		var first_row = course.times[i].start/3600-7;
		for (var j = 1 + first_row; j < course.times[i].end/3600 - 7; j++) {
			table_delete_counter[j-1][col_num-1] = 1;
			var cnt = 0;
			for (var z = 0; z < col_num-1; z++)
				cnt += table_delete_counter[j-1][z];
			var t = $(".timetable table tr:nth-of-type(" + j + ") td:eq(" + (col_num - cnt) + ")");
			t.remove();
		}
		var cnt = 0;
		for (var z = 0; z < col_num-1; z++)
			cnt += table_delete_counter[first_row-1][z];
		var k = $(".timetable tbody tr:nth-of-type(" + first_row + ") td:eq(" + (col_num - cnt) + ")");
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
	table_delete_counter = [];
	for (var i = 0; i < 15; i++) {
		var t = [];
		for (var j = 0; j < 5; j++) t.push(0);
		table_delete_counter.push(t);
	}

	var t = $("template").clone();
	$(".timetable table").remove();
	$(".timetable").append(t.html());
};

var render_solution = function(index) {
	clear_table();
	if (solutionlist[semester].length > 0) {
		var solution = solutionlist[semester][index];
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
   var i = courselist[semester].indexOf(this.id);
   if (i >= 0) {
   	  courselist[semester].splice(i , 1);
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
	$('#course-list-table').empty();
	let courselist;
	if (localStorage.courselist) {
		courselist = JSON.parse(localStorage.courselist);

	} else {
		courselist = {"2017 Fall":[], "2018 Winter":[]};
		localStorage.courselist = JSON.stringify(courselist);
	}
	for (var i = 0; i < courselist[semester].length; i++) {
		course = courselist[semester][i];
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
		new_delete.setAttribute('class', 'glyphicon glyphicon-remove hide');
		new_delete.setAttribute('aria-hidden', 'true');
		new_delete.id = course;
		new_delete.onclick = delete_course;

		$(new_td).hover(function () {$(this).find("span").toggleClass('hide')},
			function () {$(this).find("span").toggleClass('hide')});
		new_td.append(new_delete);
	}
}

function store_course_data(data) {
	localStorage.course_data = JSON.stringify(data);
}

function load_course_data() {
	return JSON.parse(localStorage.course_data);
}

function load_solution_list() {
	const courselist = JSON.parse(localStorage.courselist);
	$("#solutions ul").empty();
	var not_complete = false;
	for (var i = 0; i < solutionlist[semester].length; i++) {
		var extra_title = "";
		var solution = solutionlist[semester][i];
		var dict_sol_courselst = {};
		for (var j = 0; j < solution.length; j++)
			dict_sol_courselst[solution[j].courseCode] = true;
		console.log(dict_sol_courselst);
		for (var j = 0; j < courselist[semester].length; j++)
			if (!dict_sol_courselst.hasOwnProperty(courselist[semester][j])) {
				extra_title += "(not include " + courselist[semester][j] + ")";
				not_complete = true;
				break;
			}
	  	$("#solutions ul").append("<li>Solution " + (i+1) + extra_title + "</li>");
	}
	if (not_complete) alert("No valid solution on all of your course. We tried our best to show you some solutions.");
	$("#solutions li").on("click", function() {
	  console.log($("#solutions li").index(this));
	  render_solution($("#solutions li").index(this));
	});
	$("#switch-left").on("click",function() {
	  render_solution((cur-1+solutionlist[semester].length)%solutionlist[semester].length);
    });
    $("#switch-right").on("click",function() {
	  render_solution((cur+1)%solutionlist[semester].length);
    });
}

function getSolutions() {
	console.log("get solutionlist");
	const courselist = JSON.parse(localStorage.courselist);
	if (courselist[semester].length == 0) {
		solutionlist[semester] = [];
		$("#solutions ul").empty();
		clear_table();
	} else {
		$.ajax({
			type: 'POST',
			url: '/smart',
			data: {
				term: semester,
			  	courselist: JSON.stringify(courselist[semester]),
			  	preferences: localStorage.preferences
			},
			success: function(data) {
				var course_data = JSON.parse(data.courses);
				if (!solutionlist) solutionlist = {"2017 Fall": [], "2018 Winter": []};
				solutionlist[semester] = JSON.parse(data.solutions);
				store_course_data(course_data);
				currentlist = solutionlist[semester][cur];
				render_solution(cur);
				localStorage.solution = JSON.stringify(solutionlist);
				console.log(solutionlist);
				load_solution_list();
			}
	  	});
	}
	if (solutionlist == undefined) {
		localStorage.solution = JSON.stringify({"2017 Fall": [], "2018 Winter": []});
	} else {
		localStorage.solution = JSON.stringify(solutionlist);
	}
}
function add_course(course_code) {
	const courselist = JSON.parse(localStorage.courselist);
	if (courselist[semester].indexOf(course_code) == -1)
		courselist[semester].push(course_code);

	localStorage.courselist = JSON.stringify(courselist);
	load_courselst();
	getSolutions();
};

function set_semester(choice) {
	$('#select-fall').removeClass('active');
	$('#select-winter').removeClass('active');
	if (choice == 'Fall') {
		$('#select-fall').addClass('active');
		semester = '2017 Fall';
	} else if (choice == 'Winter') {
		$('#select-winter').addClass('active');
		semester = '2018 Winter';
	}
	load_courselst();
	$('#semester-content').text(semester);
	if (localStorage.solution) {
		solutionlist = JSON.parse(localStorage.solution);
		render_solution(0);
	}
}
$(document).ready(function(){
	cur = 0;
	load_courselst();
	load_preference();
	$('#select-fall').on('click', () => set_semester('Fall'));
	$('#select-winter').on('click', () => set_semester('Winter'));
	$('#select-fall').click();

	$("#reset-btn").on("click", function() {
		localStorage.clear();
		window.location.reload(true);
	});

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
	clear_table();
	if (localStorage.solution) {
		solutionlist = JSON.parse(localStorage.solution);
		render_solution(0);
		load_solution_list();
	}
	/* Display all sections of courses searched
	 * after typing some string inside search bar and press "search"
	 */
	$('#normal-search').click(function() {
	  var course_code = $('#search-by-coursecode').val();

	  var url = '/courses/' + course_code + '/semester/' + semester;

	  $('#normal-search-result').empty();
	  $.getJSON(url, function(result) {
		//response data are now in the result variable
		//result = array of objects
		// everytime search is clicked show #normal-search-result

		let len = result.length;
		var courses = new Set();
		var course_name_mapping = {};
		for (i = 0; i < len; i++) {
		  var new_code = result[i].code.substr(0, 6);
		  if (!courses.has(new_code)) {
			courses.add(new_code);
			course_name_mapping[new_code] = result[i].name;
		  }
		}
		if (courses.size == 1)
			add_course(courses.entries().next().value[0]);
		else {
			$('#resultViewWrapper').css('top', $('.left-bar h2').css('height') + $('.left-bar .search-bar').css('height')).show();
			courses.forEach(
			  (classItem) => {
				var newList = document.createElement('li');
				newList.innerHTML = classItem + ' (' +  course_name_mapping[classItem] + ')';
				$(newList).on("click", () => add_course(classItem));
				$("#normal-search-result").append(newList);
			  }
			);
		}

	  }).catch(() => alert('Course not found in term ' + semester));
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
