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
    /*
     * When 'x' is pressed, delete that particular course off
     * 'Course List' table
     */
     $(document).on("click", ".delete", function() {
       //var className = $(this).attr('class');
       $(this).parents('tr').remove();

     });
    /*
     * When click one of the search result, save the clicked section into
     * 'Course List' table
     */
     $(document).on("click", "#normal-search-result li", function(){
       //add new tr to the table
       var new_tr = document.createElement('tr');
       new_tr.classList.add('course-item');
       $('#course-list-table').append(new_tr);

       //add new td to the tr
       var new_td = document.createElement('td');
       new_tr.append(new_td);

       //add new div to the td
       var new_div = document.createElement('div');
       new_div.id = this.id;
       new_div.innerHTML = this.innerHTML;
       new_td.append(new_div);

       //add a new delete button to td
       var new_delete = document.createElement('button');
       new_delete.classList.add('delete');
       new_delete.innerHTML = 'x';
       new_td.append(new_delete);


     });
    /* Display all sections of courses searched
     * after typing some string inside search bar and press "search"
     */
    $('#normal-search').click(function() {
      var course_code = $('#search-by-coursecode').val();

      var url = 'http://localhost:3000/courses/' + course_code + '?callback=?';

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

    /*
     *每次点body都会清空resultList and hide search result
     */
    $(document).on("click", "body", function(){
      $('#normal-search-result').empty();
      $('#normal-search-result').hide();
    });
});
