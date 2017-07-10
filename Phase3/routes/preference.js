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
      for (k = 0; k < section.times.length; k++) {
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
