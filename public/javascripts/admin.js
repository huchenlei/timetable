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
		    	generateFailureAlert("Course not valid", "alert-container1");
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
		      sectionCode: $("#section-upload-form #sectioncode").val(),
		      instructor: $("#section-upload-form #instructor").val()
		    },
		    success: function (response) {
		    	generateSuccessAlert("Section added!", "alert-container2");
		    },
		    error: function() {
		    	generateFailureAlert("Section not valid", "alert-container2");
		    },
		    statusCode: {
		    	400: generateFailureAlert("Section not valid", "alert-container2")
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
		      sectionCode: $("#time-upload-form #sectioncode").val(),
		      weekday: $("#weekday").val(),
		      start: $("#start").val(),
		      end: $("#end").val(),
		      location: $("#location").val()
		    },
		    success: function (response) {
		    	generateSuccessAlert("Timeslot added!", "alert-container3");
		    },
		    error: function() {
		    	generateFailureAlert("Timeslot not valid", "alert-container3");
		    },
		    statusCode: {
		    	400: generateFailureAlert("Timeslot not valid", "alert-container3")
		    }
		  });
    })
});
