
var solutionlist;
// index of current solution
var cur;
var currentlist = [];
var convert_day = { "MONDAY": 1,"TUESDAY": 2,"WEDNESDAY": 3,"THURSDAY": 4,"FRIDAY": 5};
var back = ["PaleGoldenRod","lightblue","LightSalmon", "lightgreen", "lightpink", "Chocolate", "GreenYellow", "GoldenRod"];
var option_back = ["MediumPurple", "Fuchsia", "Aqua"];
// check if two course overlap
var over_lap = function(a, b) {
	for (var i = 0; i < a.length; i++)
		for (var j = 0; j < b.length; j++) 
			if (a[i].day == b[j].day && Math.max(a[i].start, b[j].start) < Math.min(a[i].end, b[j].end))
				return true;
	return false;
};

var draw_option = function(course) {
	var color = option_back[Math.floor(Math.random() * option_back.length)];
	for (var i = 0; i < course.times.length; i++) {
		var col_num = convert_day[course.times[i].day];
		for (var j = course.times[i].start/3600-7; j < course.times[i].end/3600-7; j++) {
			var k = $(".timetable tbody tr:nth-of-type(" + j + ") td:eq(" + col_num + ")");
			k.addClass("course").css("background-color", color);
			if (j == course.times[i].start/3600-7) {
				if (k.text() == "" || !k.text().includes("Option")) {
					k.text("Option: " + course.code).on("click", function() {
						for (i = 0; i < currentlist.length; i++)
							if (currentlist[i].courseCode == course.courseCode && currentlist[i].code[0] == course.code[0]) {
								currentlist.splice(i, 1, course);
								render_solution(cur);
								break;
							}
					});
				} else if (!k.text().includes(course.code)) {
					k.text(k.text() + "/" + course.code);
					k.off().on("click", function() {
						codes = k.text().slice(8).split("/");
						div = $("<div></div>").addClass("stacklist");
						ul = $("<ul></ul>").css("list-style-type", "none");
						ul.css("width", k.css("width"));
						ul.append($("<li></li>").text("Select One"));
						for (var z = 0; z < codes.length; z++)
							ul.append($("<li></li>").text(codes[z]).on("click", function(e) {
								e.stopPropagation();
								code = $(this).text();
								courseCode = course.courseCode;
								index = 0;
								for (var w = 0; w < currentlist.length; w++) 
									if (currentlist[w].courseCode == courseCode && currentlist[w].code[0] == code[0]) {
										index = w;
										break;
									}
								for (var w = 0; w < solutionlist.length; w++) 
									for (var x = 0; x < solutionlist[w].length; x++) 
										if (solutionlist[w][x].courseCode == courseCode && solutionlist[w][x].code == code) {
											currentlist.splice(index, 1, solutionlist[w][x]);
											render_solution(cur);
											return;
										}
							}));
						k.append(div.append(ul));
					});
				}
			}
		}
	}
	
};

var draw_course = function(course) {
	if (course.hasOwnProperty('color') == false) 
		course.color = back[Math.floor(Math.random() * back.length)]
	for (var i = 0; i < course.times.length; i++) {
		var col_num = convert_day[course.times[i].day];
		for (var j = course.times[i].start/3600-7; j < course.times[i].end/3600-7; j++) {
			var k = $(".timetable tbody tr:nth-of-type(" + j + ") td:eq(" + col_num + ")");
			k.addClass("course").css("background-color", course.color);
			if (j == course.times[i].start/3600-7) {
				k.text(course.courseCode + "\n" + course.code);
				k.on("click", function() {
					render_solution(cur);
					for (var x = 0; x < solutionlist.length; x++) 
						for (var y = 0; y < solutionlist[x].length; y++) {
							if (solutionlist[x][y].courseCode != course.courseCode 
								|| solutionlist[x][y].code[0] != course.code[0] 
								|| solutionlist[x][y] == course)
								continue;
							var success = true;
							for (var z = 0; z < currentlist.length; z++)
								if (currentlist[z] != course && over_lap(solutionlist[x][y].times, currentlist[z].times)) {
									success = false;
									break;
								}
							if (success) 
								draw_option(solutionlist[x][y]);
						}

				});
			}
		}
	}
};

var clear_table = function() {
	console.log("clear");
	var k = $(".timetable tbody tr").find("td:gt(0)");
	k.removeClass("course").css("background-color", "white");
	k.text("").off().empty();
};

var render_solution = function(index) {
	clear_table();
	console.log("render_solution");
	var solution = solutionlist[index];
	currentlist = solution;
	cur = index;
	for (var i = 0; i < solution.length; i++) 
		draw_course(solution[i]);
};

var course_list = [];
var course_object;
var course_taking;


function delete_course() {
   const courselist = JSON.parse(localStorage.courselist);
   i = courselist.indexOf(this.id)
   if (i >= 0) {
   	  courselist.splice(i , 1);
   }
   localStorage.courselist = JSON.stringify(courselist);
   load_courselst();
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
		courselist = [];
		localStorage.courselist = JSON.stringify(courselist);
	}
	console.log(courselist.length);
	for (i = 0; i < courselist.length; i ++) {
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
		var new_delete = document.createElement('button');
		new_delete.classList.add('delete');
		new_delete.innerHTML = 'x';
		new_delete.id = course; 
		new_delete.onclick = delete_course;
		new_td.append(new_delete);
	}

}

function store_course_data(courselist) {
	localStorage.course_data = JSON.stringify(courselist);
}

function load_course_data() {
	return JSON.parse(localStorage.course_data);
}

$(document).ready(function(){

  
	load_courselst();
	load_preference();
	//normal search area is initially hidden
	$('#normal-search-result').hide();
	$("#show-advanced").on("click", function() {
		$(".advanced-search").toggleClass("hide");
	});
	$("#smart").on("click", function() {
		$(".right-bar").toggleClass("hide");
		$("#smart").toggleClass("button-position");
		$(".main").toggleClass("main-size");
		$(".arrowright").toggleClass("movearrow");
	});
	$("#getSolutions").on("click", function() {
	  $.ajax({
	  	type: 'POST',
	  	url: '/smart', 
	  	data: {
		  	courselist: localStorage.courselist,
		  	preferences: localStorage.preferences
		}, 
		success: function(data) {
			solutionlist = JSON.parse(data.solutions);
			const course_data = JSON.parse(data.courses);
			store_course_data(course_data);
			cur = 0;
			currentlist = solutionlist[cur];
			render_solution(cur);
			$("#solutions table").empty();
			for (var i = 0; i < solutionlist.length; i++) {
			  $("#solutions table").append("<tr class='solution'><td>Solution " + (i+1) + "</td></tr>");
			}
			$("#solutions td").on("click", function() {
			  render_solution($("#solutions td").index(this));
			});
			$("#switch-left").on("click",function() {
			  render_solution((cur-1+solutionlist.length)%solutionlist.length);
		    });
		    $("#switch-right").on("click",function() {
			  render_solution((cur+1)%solutionlist.length);
		    });
		}
	  });
  	});

  	$("#save_preference").on("click", function() {
  		const preferences_data = {
  			mon: $("#mon_preference").val(),
  			tue: $("#tue_preference").val(),
  			wed: $("#wed_preference").val(),
  			thu: $("#thu_preference").val(),
  			fri: $("#fri_preference").val()
  		};
  		console.log(preferences_data);
  		localStorage.preferences = JSON.stringify(preferences_data);
  		load_preference();
  	});

	/*
	 * When click one of the search result, save the clicked section into
	 * 'Course List' table
	 * Also add the course into user's database
	 */




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
		
		$('#normal-search-result').show();
		let len = result.length;
		const courses = new Set();
		for (i = 0; i < len; i++) {
		  const new_code = result[i].code.substr(0, 6);
		  if (!courses.has(new_code)) {
			courses.add(new_code);
		  }
		}
		len = courses.length;
		i = 0;
		courses.forEach(
		  (classItem) => {
			var newList = document.createElement('li');
			newList.id = 'classItem' + '000' + i;
			newList.innerHTML = classItem;
			newList.onclick = () => {
			   if (!localStorage.courselist) {
			   	  localStorage.courselist = JSON.stringify([classItem]);
			   } else {
			   	  const courselist = JSON.parse(localStorage.courselist);
			   	  if (courselist.indexOf(classItem) == -1) {
			   	  	courselist.push(classItem);
			   	  }
			   	  localStorage.courselist = JSON.stringify(courselist);
			   }
			   load_courselst();
			};
			$("#normal-search-result").append(newList);
		  }
		);
	  });
	});
	

	/*
	 *每次点body都会清空resultList and hide search result
	 */
	$("body").on("click", function(){
	  $('#normal-search-result').empty();
	  $('#normal-search-result').hide();
	});

	$('body').on('keypress', 'input', function(args) {
	    if (args.keyCode == 13) {
	        $('#normal-search').click();
	        return false;
	    }
	});
});
