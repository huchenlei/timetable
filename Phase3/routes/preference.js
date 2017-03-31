var p1 = {
  preference : "mon",
  value : "evening"
}
var p2 = {
  preference : "tue",
  value : "evening"
}
var p3 = {
  preference : "wed",
  value : "morning"
}
var p4 = {
  preference : "thur",
  value : "morning"
}
var p5 = {
  preference : "fri",
  value : "morning"
}

//csc108 L0101 Monday 16:00 - 17:00, Wednesday 16:00 - 17:00, Friday
//16:00 - 17:00
var c108l0101 = {
  _id: "csc108",
  sectionCode: "L0101",
  description: "afternoon csc108",
  title: "",
  br: 4,
  type:"lec",
  instructor: "Dianne",
  timeslots:
        [
          {weekday:"mon", location: "BA1070", start:16, end:17},
          {weekday:"wed", location: "BA1070", start:16, end:17},
          {weekday:"fri", location: "BA1070", start:9, end:10}
        ],
  score: 0
}

//csc108 L0201 Monday 9:00 - 10:00, Wednesday 9:00 - 10:00, Friday
//9:00 - 10:00
var c108l0201 = {
  _id: "csc108",
  sectionCode: "L0201",
  description: "morning csc108",
  title: "",
  br: 4,
  type:"lec",
  instructor: "Liu",
  timeslots: [
          {weekday:"mon", location: "MS1050", start:9, end:10},
          {weekday:"wed", location: "MS1050", start:9, end:10},
          {weekday:"fri", location: "MS1050", start:9, end:10}
        ],
  score: 0
}

//csc108 L0201 Monday 19:00 - 21:00
var c108l0501 = {
  _id: "csc108",
  sectionCode: "L0501",
  description: "night csc108",
  title: "",
  br: 4,
  type:"lec",
  instructor: "Liu",
  timeslots: [
          {weekday:"mon", location: "MS1050", start:19, end:21},
        ],
  score: 0
}

//csc165 L0501 Wednesday 18:00 - 21:00, Friday
//9:00 - 10:00 Tutorial
var c165l0501 = {
  _id: "csc165",
  sectionCode: "L0501",
  description: "wednesday night csc165",
  title: "",
  br: 3,
  type:"lec",
  instructor: "Liu",
  timeslots: [
          {weekday:"wed", location: "MS1050", start:18, end:21},
          {weekday:"fri", location: "MS1050", start:9, end:10}
        ],
  score: 0
}

//csc165 L0101 Tuesday 18:00 - 21:00, Friday
//9:00 - 10:00 Tutorial
var c165l0101 = {
  _id: "csc165",
  sectionCode: "L0101",
  description: "tuesday night csc165",
  title: "",
  br: 3,
  type:"lec",
  instructor: "Liu",
  timeslots: [
          {weekday:"tue", location: "MS1050", start:18, end:21},
          {weekday:"fri", location: "MS1050", start:9, end:10}
        ],
  score: 0
}

/*
 * A minimal approach to apply preferece to array of array of class sessions
 * This function takes an array of array of object, add t_value as property
 * of each preference and each session, add days property to session, assign
 * score to each session depending on preference and finally sort
 *
 */
var input = [
  [p1, p2, p3, p4, p5 ],
  [c108l0101, c108l0201, c108l0501],
  [c165l0101, c165l0501]
]

/* This function takes a list of objects and add property: t_value to
 * every object in the list.
 */

function parse_tValue(list){

  var len_list = list.length;
  for (i = 0; i < len_list; i++) {
    var item = list[i];
    if (item.preference != undefined){
      switch (item.value) {
        case "morning":
          item.t_value = 1;
          break;
        case "afternoon":
          item.t_value = 2;
          break;
        case "evening":
          item.t_value = 3;
          break;
        default:
          console.log("Wrong input");
      }
    }
  }
}


function preference_sort(input){

  //store first list of preference in to a variable called preference_list
  //now input[0] is class list
  var preference_list = input.shift();
  var preference_len = preference_list.length;
  parse_tValue(preference_list);

  // for (i = 0; i < preference_len; i++) {
  //   var item = preference_list[i];
  //   /*
  //    * Assign t_value to object in preference list
  //    * t_value = 1 if its morning class, t_value = 2 if its afternoon class,
  //    * and t_value = 3 if its evening class.
  //    */
  //   switch (item.value) {
  //     case "morning":
  //       item.t_value = 1;                 //morning classes
  //       break;
  //     case "afternoon":
  //       item.t_value = 2;                 //afternoon classes
  //       break;
  //     case "evening":
  //       item.t_value = 3;                 //night classes
  //       break;
  //   }
  //   // console.log(preference_list[i]);
  // }

  // console.log("break line here");
  var inputlen = input.length;
  for (x = 0; x < inputlen; x++) {
    for (y = 0; y < input[x].length; y++) {
    /*
     * Assign t_value to object in input list
     * t_value = 1 if its morning class, t_value = 2 if its afternoon class,
     * and t_value = 3 if its evening class.
     */
      // console.log(input[x][y]);
      var class_item = input[x][y];
      class_item.days = "";
      // console.log(class_item.timeslots);
      var time_len = class_item.timeslots.length;

      //add class_item.days property
      for (z = 0; z < time_len; z++){
        item_time = class_item.timeslots[z];
        class_item.days = class_item.days.concat(item_time.weekday);
      }
      //add class_item.t_value property
      for (z = 0; z < time_len; z++){
        item_time = class_item.timeslots[z];
        if (item_time.start < 12) {             //morning classes
          class_item.t_value = 1;
          break;
        } else if (item_time.start >= 12 && item_time.start < 18){
          class_item.t_value = 2;             //afternoon classes
          break;
        } else if (item_time.start >= 18){
          class_item.t_value = 3;             //evening classes
          break;
        } else {
          console.log("shouldn't reach this code");
        }
      }
    }
  }
  //Comparing between preference list and class + section list

  for (i = 0; i < preference_len; i++){
    var pref_item = preference_list[i];
    for (x = 0; x < inputlen; x++){
      for (y = 0; y < input[x].length; y++) {
        var class_item = input[x][y];
        //if class_session have same day as pref_item then score ++
        var day_compare = class_item.days.includes(pref_item.preference);
        if (day_compare){
          class_item.score ++;
        }
        //if class_session have same t_value as pref_item then score += 2
        var time_bool = class_item.t_value == pref_item.t_value;
        if (time_bool && day_compare){
          class_item.score += 2;
        }
        // console.log(class_item);
      }
    }
  }

  //Sort the input list by scores
  for (x = 0; x < inputlen; x++){
    var session_list = input[x];
    session_list.sort(function(a, b) {
      return parseInt(b.score) - parseInt(a.score);
    });
  }
  return input;
}
//test block
var result = preference_sort(input);
for (x = 0; x < result.length; x++){
  for (y = 0; y < result[x].length; y++){
    console.log(result[x][y]);
  }
}

module.exports = preference_sort;
