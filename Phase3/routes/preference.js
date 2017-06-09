var p1 = {
  preference : "MONDAY",
  value : "evening"
};
var p2 = {
  preference : "TUESDAY",
  value : "evening"
};
var p3 = {
  preference : "WEDNESDAY",
  value : "morning"
};
var p4 = {
  preference : "THURSDAY",
  value : "afternoon"
};
var p5 = {
  preference : "FRIDAY",
  value : "morning"
};

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
};

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
};

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
};

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
};

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
  times: [
          {day:"TUESDAY", location: "MS1050", start:18, end:21},
          {day:"FRIDAY", location: "MS1050", start:9, end:10}
        ],
  score: 0
};

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
];

function preference_sort(input, callback){
  if (input == null) return callback(input);
  p_lst = input[0];   // preference list
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

  for (i = 0; i < c_lst.length; i++) {
    s_lst = c_lst[i];   // section list
    for (j = 0; j < s_lst.length; j++) {
      section = s_lst[j];   // current section
      section.score = 0;
      for (k = 0; k < section.timeslots.length; k++) {
        t = section.times[k];   // current timeslot
        time = "";
        if (t.start < 12) time = "morning";
        else if (t.start < 18) time = "afternoon";
        else time = "evening";
        for (z = 0; z < p_lst.length; z++) {
          p = p_lst[z];    // current preference
          // loop each preference
          if (p.preference == t.day && p.value == time)
            section.score += t.duration;
        }
      }
    }
    s_lst.sort(function (a, b) {
      return b.score - a.score;
    });
  }
  return callback(c_lst);
}



module.exports = preference_sort;
