$(document).ready(function(){
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
    $('#normal-search').click(function() {
      var course_code = $('#search-by-coursecode').val();
      //console.log(course_code);
      var url = 'http://localhost:3000/courses/' + course_code + '?callback=?';
      //console.log(url);
      $('#normal-search-result').empty();
      $.getJSON(url, function(result) {
        // everytime search is clicked show #normal-search-result
        $('#normal-search-result').show();

        var len = result.length;
        for (i = 0; i < len; i++) {
          var classItem = result[i];
          var newList = document.createElement('li');
          newList.id = 'classItem' + '000' + i;
          newList.classList.add('foo');
          var len2 = classItem.sections.length;
          if (len2 > 0) {
            for (n = 0; n < len2; n++) {
              newList.innerHTML = classItem._id +
                                  classItem.sections[n].sectionCode;
            }
          }
          else {
            newList.innerHTML = classItem._id;
          }
          $("#normal-search-result").append(newList);
          console.log(classItem);
        }
      });
    });
    $(document).on("click", "body", function(){
      //每次点body都会清空resultList and hide search result
      $('#normal-search-result').empty();
      $('#normal-search-result').hide();
    });
});
