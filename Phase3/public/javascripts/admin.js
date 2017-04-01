function generateSuccessAlert(status, containername) {
	var alertTemplate = document.getElementById("success_template");
	var container = document.getElementById(containername);
  	container.innerHTML = "";
  	var template = alertTemplate.content.cloneNode(true);
  	template.getElementById("msg").innerHTML = status;
  	container.appendChild(template);
  	window.scrollTo(0, 0);
}

function generateFailureAlert(status, containername) {
	var alertTemplate = document.getElementById("fail_template");
	var container = document.getElementById(containername);
  	container.innerHTML = "";
  	var template = alertTemplate.content.cloneNode(true);
  	template.getElementById("msg").innerHTML = status;
  	container.appendChild(template);
  	window.scrollTo(0, 0);
}
$(document).ready(function(){
    $("#insertcourse").on("click", function() {
    	$.ajax({
    		method: "post",
		    url: "/courses/insertCourse",
		    data: {
		      courseCode: $("#course-upload-form #courseCode").val(),
		      title: $("#title").val(),
		      description: $("#description").val(),
		      br: $("#br").val(),
		      courseLevel: $("#courseLevel").val()
		    },
		    success: function (response) {
		    	generateSuccessAlert("Course added!", "alert-container1");
		    },
		    error: function() {
		    	generateFailureAlert("Course exists", "alert-container1");
		    }
		  });
    });
    $("#insertsection").on("click", function() {
    	$.ajax({
    		method: "post",
		    url: "/courses/insertSection",
		    data: {
		      courseCode: $("#section-upload-form #courseCode").val(),
		      semester: $("#section-upload-form #semester").val(),
		      type: $("#section-upload-form #type").val(),
		      sectionCode: $("#section-upload-form #sectionCode").val(),
		      instructor: $("#section-upload-form #instructor").val()
		    },
		    success: function (response) {
		    	var container = document.getElementById();
		    	generateSuccessAlert("Section added!", "alert-container2");
		    },
		    error: function() {
		    	var container = document.getElementById();
		    	generateFailureAlert("Section exists", "alert-container2");
		    }
		  });
    });
    $("#inserttime").on("click", function() {
    	$.ajax({
    		method: "post",
		    url: "/courses/insertTimeslot",
		    data: {
		      courseCode: $("#time-upload-form #courseCode").val(),
		      semester: $("#time-upload-form #semester").val(),
		      type: $("#time-upload-form #type").val(),
		      sectionCode: $("#time-upload-form #sectionCode").val(),
		      weekday: $("#weekday").val(),
		      start: $("#start").val(),
		      end: $("#end").val(),
		      location: $("#location").val()
		    },
		    success: function (response) {
		    	var container = document.getElementById();
		    	generateSuccessAlert("Timeslot added!", "alert-container3");
		    },
		    error: function() {
		    	var container = document.getElementById();
		    	generateFailureAlert("Timeslot not valid", "alert-container3");
		    }
		  });
    })
});
