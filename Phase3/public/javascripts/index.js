
var solutionlist;
// index of current solution
var cur;
var currentlist;
var convert_weekday = { "mon": 1,"tue": 2,"wed": 3,"thu": 4,"fri": 5};
var back = ["PaleGoldenRod","lightblue","LightSalmon", "lightgreen", "lightpink", "Chocolate", "GreenYellow", "GoldenRod"];
var option_back = ["MediumPurple", "Fuchsia", "Aqua"];
// count number for option
var cnt;
// check if two course overlap
var over_lap = function(a, b) {
	for (var i = 0; i < a.length; i++) {
		for (var j = 0; j < b.length; j++) {
			if (a[i].weekday == b[j].weekday && 
				Math.max(a[i].start, b[j].start) 
				< Math.min(a[i].end, b[j].end))
				return true;
		}
	}
	return false;
};

var draw_option = function(course) {
	var color = option_back[Math.floor(Math.random() * option_back.length)];
    for (var i = 0; i < course.timeslots.length; i++) {
    	var col_num = convert_weekday[course.timeslots[i].weekday];
    	for (var j = course.timeslots[i].start-7; j < course.timeslots[i].end-7; j++) {
    		var k = $(".timetable tbody tr:nth-of-type(" + j + ") td:eq(" + col_num + ")");
    		if (k.hasClass("course"))
    			return;
    		k.addClass("course").css("background-color", color);
    		if (j == course.timeslots[i].start-7) {
    			k.text("option " + cnt).on("click", function() {
    				for (var i = 0; i < currentlist.length; i++)
    					if (currentlist[i].courseCode == course.courseCode) {
    						currentlist.splice(i, 1, course);
    						clear_table();
    						render_solution(cur);
    						break;
    					}
    			});
    		}
    	}
	}
	cnt++;
};

var draw_course = function(course) {
	if (course.hasOwnProperty('color') == false) 
		course.color = back[Math.floor(Math.random() * back.length)]
    for (var i = 0; i < course.timeslots.length; i++) {
    	var col_num = convert_weekday[course.timeslots[i].weekday];
    	for (var j = course.timeslots[i].start-7; j < course.timeslots[i].end-7; j++) {
    		var k = $(".timetable tbody tr:nth-of-type(" + j + ") td:eq(" + col_num + ")");
    		k.addClass("course").css("background-color", course.color);
    		if (j == course.timeslots[i].start-7) {
    			k.text(course.courseCode);
    			k.on("click", function() {
    				clear_table();
    				render_solution(cur);
    				cnt = 1;
    				for (var i = 0; i < solutionlist.length; i++) 
    					for (var j = 0; j < solutionlist[i].length; j++) {
    						if (solutionlist[i][j].courseCode != course.courseCode ||
    							solutionlist[i][j] == course)
    							continue;
    						var success = true;
    						for (var k = 0; k < currentlist.length; k++)
    							if (over_lap(solutionlist[i][j], currentlist[k])) {
    								success = false;
    								break;
    							}
    						if (success) 
    							draw_option(solutionlist[i][j]);
    					}
    			});
    		}
    	}
	}
};
var remove_course = function(course) {
    for (var i = 0; i < course.timeslots.length; i++) {
    	var col_num = convert_weekday[course.timeslots[i].weekday];
    	for (var j = course.timeslots[i].start-7; j < course.timeslots[i].end-7; j++) {
    		var k = $(".timetable tbody tr:nth-of-type(" + j + ") td:eq(" + col_num + ")");
    		k.removeClass("course").css("background-color", "white");
    		if (j == course.timeslots[i].start-7)
    			k.text("").unbind("click");
    	}
	}
};

var clear_table = function() {
	var k = $(".timetable tbody tr").find("td:gt(0)");
    k.removeClass("course").css("background-color", "white");
    k.text("").unbind("click");
};

var render_solution = function(index) {
	var solution = solutionlist[index];
	for (var i = 0; i < currentlist.length; i++) 
		remove_course(currentlist[i]);
	currentlist = solution;
	cur = index;
	for (var i = 0; i < solution.length; i++) 
		draw_course(solution[i]);
};

var course_list = [];
var course_object;
var course_taking;


function delete_course() {
 //var className = $(this).attr('class');
   var name = localStorage.getItem("username");
   var url = 'http://localhost:3000/users/deleteCourse/' + name + '/' + this.id;
   $.ajax({
      url: url,
      type: 'DELETE',
      success: function(response) {
       console.log(response);
       load_courselst();
      },
      error: function(response) {
        console.log(response);
      }
    });
}


function load_courselst() {
var name = localStorage.getItem("username");
  if (name != '') {
    console.log("user exist");
    var url = 'http://localhost:3000/users/info/' + name;
    $.get(url, function(result) {
      //store user's current classes inside
      course_taking = result.courses;
      $('#course-list-table').empty();
      for (i = 0; i < result.courses.length; i ++) {
        // console.log(result.courses[i]);
        var session = result.courses[i];
        var new_tr = document.createElement('tr');
            new_tr.classList.add('course-item');
            $('#course-list-table').append(new_tr);

            //add new td to the tr
            var new_td = document.createElement('td');
            new_tr.append(new_td);

            //add new div to the td
            var new_div = document.createElement('div');
            new_div.id = session._id;
            new_div.innerHTML = session.courseCode;
            new_td.append(new_div);

            //add a new delete button to td
            var new_delete = document.createElement('button');
            new_delete.classList.add('delete');
            new_delete.innerHTML = 'x';
            new_delete.id = session._id; 
            new_delete.onclick = delete_course;
            new_td.append(new_delete);
      }
    });
  }
}


$(document).ready(function(){

	
    load_courselst();

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
    	$.get('/smart', function(data) {
           	solutionlist = data;
           	cur = 0;
           	currentlist = solutionlist[cur];
           	render_solution(cur);
           	$("#solutions table").empty();
           	for (var i = 0; i < solutionlist.length; i++) {
              console.log(solutionlist[i]);
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
        });
	});

    /*
     * When click one of the search result, save the clicked section into
     * 'Course List' table
     * Also add the course into user's database
     */
     $(document).on("click", "#normal-search-result li", function(){

        // //add new tr to the table
        // var new_tr = document.createElement('tr');
        // new_tr.classList.add('course-item');
        // $('#course-list-table').append(new_tr);

        // //add new td to the tr
        // var new_td = document.createElement('td');
        // new_tr.append(new_td);

        // //add new div to the td
        // var new_div = document.createElement('div');
        // new_div.id = course_object.id;
        // new_div.innerHTML = this.innerHTML;
        // new_td.append(new_div);

        // //add a new delete button to td
        // var new_delete = document.createElement('button');
        // new_delete.classList.add('delete');
        // new_delete.innerHTML = 'x';
        // new_td.append(new_delete);

        //add course into user's databse
        var name = localStorage.getItem("username");
        var url = 'http://localhost:3000/users/info/' + name + '/addUserCourse';
        var res = this.innerHTML.substr(0,6);
        var course_object;
        console.log(res);
        console.log(course_list);
        for(i = 0; i < course_list.length; i++) {
        	console.log('2');
        	console.log(course_list[i].courseCode);
        	if (course_list[i].courseCode == res ) {
        		course_object = course_list[i];
        	}
        }
        	
        $.post(url,
         {
           courseCode: course_object.courseCode,
           semester: course_object.semester,
           type: course_object.type,
           sectionCode: course_object.sectionCode,
           instructor: course_object.instructor
         }, function(data, status) {
           console.log(data.courses);
           console.log(status);
           load_courselst();
          //  alert("Data:" + data + "\nStatus" + status);
         });
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
        
        $('#normal-search-result').show();

        var len = result.length;
        for (i = 0; i < len; i++) {
          var classItem = result[i];
          var newList = document.createElement('li');

          newList.id = 'classItem' + '000' + i;
          var len2 = classItem.sections.length;
          if (len2 > 0) {
            for (n = 0; n < len2; n++) {
              course_object = {
                courseCode: classItem.sections[n].courseCode,
                semester: classItem.sections[n].semester,
                type: classItem.sections[n].type,
                sectionCode: classItem.sections[n].sectionCode,
                instructor: classItem.sections[n].instructor
              };
              course_list[i] = course_object;
              console.log(course_list);
              newList.innerHTML = classItem.sections[n].courseCode;
              //console.log(course_object);
            }
          }
          else {
            newList.innerHTML = classItem._id;
          }
          $("#normal-search-result").append(newList);

        }
      });
    });
    

    /*
     *每次点body都会清空resultList and hide search result
     */
    $(document).on("click", "body", function(){
      $('#normal-search-result').empty();
      $('#normal-search-result').hide();
    });
});
