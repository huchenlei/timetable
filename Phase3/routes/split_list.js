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



module.exports = split_list;
