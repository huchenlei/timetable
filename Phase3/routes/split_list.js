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

function split_list(input, callback){
  if (input == null) return callback(input);
  p_lst = input[0];   // preference list
  // convert the format of string value "type" in perference
  for (z = 0; z < p_lst.length; z++) {
    if (p_lst[z].type == "mon") p_lst[z].type = "MONDAY";
    else if (p_lst[z].type == "tue") p_lst[z].type = "TUESDAY";
    else if (p_lst[z].type == "wed") p_lst[z].type = "WEDNESDAY";
    else if (p_lst[z].type == "thu") p_lst[z].type = "THURSDAY";
    else if (p_lst[z].type == "fri") p_lst[z].type = "FRIDAY";
  }

  // split meeting-sections to 3 list: l, t and p
  raw_lst = input.slice(1);
  c_lst = [];   // course list
  for (i = 0; i < raw_lst.length; i++) {
    lectures = [];
    tut = [];
    pract = [];
    for (j = 0; j < raw_lst[i].length; j++) {
      if (raw_lst[i][j].code[0] == 'L') lectures.push(raw_lst[i][j]);
      else if (raw_lst[i][j].code[0] == 'T') tut.push(raw_lst[i][j]);
      else pract.push(raw_lst[i][j]);
    }
    if (lectures.length != 0) c_lst.push(lectures);
    if (tut.length != 0) c_lst.push(tut);
    if (pract.length != 0) c_lst.push(pract);
  }
  return callback([p_lst, c_lst]);
}

function compare_timeslot(c1, c2) {
  const timeslot1 = c1.times;
  const timeslot2 = c2.times;
  if (timeslot1.length !== timeslot2.length
    || c1.code[0] !== c2.code[0]) {
    return false;
  }
  for (var i = 0; i < timeslot1.length; i++) {
    if (timeslot1[i].day !== timeslot2[i].day
      || timeslot1[i].start !== timeslot2[i].start
      || timeslot1[i].end !== timeslot2[i].end) {
      return false;
    }
  }
  return true;
}

function remove(lst, item) {
  const i = lst.indexOf(item);
  if (i === -1) {
    return false;
  } else {
    lst.splice(i, 1);
    return true;
  }
}

function nestedGetList(obj, keys) {
  let cur_obj = obj;
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
  const merge_result = {};
  for (var n = 0; n < course_data.length; n++) {
    const all_sections = course_data[n].slice();
    const courseCode = all_sections[0].courseCode;
    const term = all_sections[0].term;
    for (var i = 0; i < all_sections.length; i++) {
      const cur_obj = all_sections[i];
      const type = cur_obj.code[0];
      const sections = nestedGetList(merge_result, [courseCode, term, type]);
      const merge_unit = {
        courseCode: all_sections[0].courseCode,
        code: [cur_obj.code],
        times: cur_obj.times
      };
      for (var k = i + 1; k < all_sections.length; k++) {
        if (compare_timeslot(cur_obj, all_sections[k])) {
          merge_unit.code.push(all_sections[k].code);
          all_sections.splice(k, 1);
        }
      }
      sections.push(merge_unit);
    }
  }

  return merge_result;
}




module.exports = split_list;
