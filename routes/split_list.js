var p1 = {
  type : "mon",
  value : "evening"
};
var p2 = {
  type : "tue",
  value : "evening"
};
var p3 = {
  type : "wed",
  value : "morning"
};
var p4 = {
  type : "thu",
  value : "afternoon"
};
var p5 = {
  type : "fri",
  value : "morning"
};


/*
 * A minimal approach to apply preferece to array of array of class sessions
 * This function takes an array of array of object, add t_value as property
 * of each preference and each session, add days property to session, assign
 * score to each session depending on preference and finally sort
 *

var input = [
  [p1, p2, p3, p4, p5 ],
  [c108l0101, c108l0201, c108l0501],
  [c165l0101, c165l0501]
];*/

var time_overlap = function(a, b) {
  var interval = Math.min(a.end, b.end) - Math.max(a.start, b.start);
  if (interval > 0) return interval;
  return 0;
}

var compute_time_preference = function(t, p) {
  score = 0;
  if (p.day == t.day || p.day == 'any') {
    score += p.exclude * time_overlap(t, p);
  }
  return score;
}

function split_list(input, term, callback){
  if (input == null) return callback(input);
  // convert the format of string value "type" in perference
  for (var i = 0; i < input[0].length; i++) {
    if (input[0][i].day == "mon") input[0][i].day = "MONDAY";
    else if (input[0][i].day == "tue") input[0][i].day = "TUESDAY";
    else if (input[0][i].day == "wed") input[0][i].day = "WEDNESDAY";
    else if (input[0][i].day == "thu") input[0][i].day = "THURSDAY";
    else if (input[0][i].day == "fri") input[0][i].day = "FRIDAY";
  }
  p_lst = input[0];

  input[1] = merge_sections(input.slice(1));
  var coursedata = input[1];
  for (var courseCode in coursedata) {
    var types = coursedata[courseCode][term];
    if (courseCode.indexOf("Y1Y") > -1) types = coursedata[courseCode]["2017 Fall"];
    for (var type in types) {
      var s = types[type];
      for (var i = 0; i < s.length; i++) {
        section = s[i];   // a course section
        section.score = 0;
        for (var j = 0; j < section.times.length; j++) {
          t = section.times[j];   // current timeslot
          for (var k = 0; k < p_lst.length; k++) {
            p = p_lst[k];    // current preference
            section.score += compute_time_preference(t, p);
          }

        }
      }
      s.sort(function (a, b) {
        return b.score - a.score;
      });
    }
  }


  return callback(input);
}

function compare_timeslot(c1, c2) {
  var timeslot1 = c1.times;
  var timeslot2 = c2.times;
  if (timeslot1.length != timeslot2.length
    || c1.code[0] != c2.code[0]) {
    return false;
  }
  for (var i = 0; i < timeslot1.length; i++) {
    if (timeslot1[i].day != timeslot2[i].day
      || timeslot1[i].start != timeslot2[i].start
      || timeslot1[i].end != timeslot2[i].end) {
      return false;
    }
  }
  return true;
}

function remove(lst, item) {
  var i = lst.indexOf(item);
  if (i == -1) {
    return false;
  }
  lst.splice(i, 1);
  return true;
}

function nestedGetList(obj, keys) {
  var cur_obj = obj;
  for (var i = 0; i < keys.length; i++) {
    if (!(keys[i] in cur_obj)) {
      if (i < keys.length - 1) {
        cur_obj[keys[i]] = {};
      } else {
        cur_obj[keys[i]] = [];
      }
    }
    cur_obj = cur_obj[keys[i]];
  }

  return cur_obj;
}

function merge_sections(course_data) {
  // merge section with same timeslots
  var merge_result = {};
  for (var n = 0; n < course_data.length; n++) {
    var all_sections = course_data[n].slice();
    if (all_sections.length == 0) continue;
    var courseCode = all_sections[0].courseCode;
    var term = all_sections[0].term;
    for (var i = 0; i < all_sections.length; i++) {
      var cur_obj = all_sections[i];
      if (cur_obj.times.length == 0) continue;
      var type = cur_obj.code[0];
      var sections = nestedGetList(merge_result, [courseCode, term, type]);
      var merge_unit = {
        courseCode: all_sections[0].courseCode,
        code: [cur_obj.code],
        times: cur_obj.times,
        instructors: cur_obj.instructors,
      };
      for (var k = i + 1; k < all_sections.length; k++) {
        if (compare_timeslot(cur_obj, all_sections[k])) {
          merge_unit.code.push(all_sections[k].code);
          all_sections.splice(k, 1);
          k--;
        }
      }
      sections.push(merge_unit);
    }
  }

  return merge_result;
}




module.exports = split_list;
