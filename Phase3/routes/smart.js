var over_lap = function(a, b) {
	for (var i = 0; i < a.length; i++)
		for (var j = 0; j < b.length; j++)
			if (a[i].day == b[j].day && 
				Math.max(a[i].start, b[j].start) < Math.min(a[i].end, b[j].end))
				return true;
	return false;
}
var solutionlist, currentlist, course_data;
var backtrack = function(courselist) {
	if (currentlist.length == courselist.length) 
		solutionlist.push(JSON.parse(JSON.stringify(currentlist)));
	else {
		var depth = currentlist.length;
		for (var i = 0; i < courselist[depth].length; i++) {
			var ok = true;
			for (var j = 0; j < depth; j++) 
				if (over_lap(courselist[depth][i].times, currentlist[j].times)) {
					ok = false;
					break;
				}
			if (ok) {
				currentlist.push(courselist[depth][i]);
				backtrack(courselist);
				currentlist.pop();
			}
		}
	}
}

var compute_valid_solutions = function(input, term, callback) {
	solutionlist = [];
	currentlist = [];

	course_data = input[1];
	p_lst = input[0];
	c_lst = [];
	for (var key in course_data) 
		for (var type in course_data[key][term]) 
			c_lst.push(course_data[key][term][type]);

	console.log(c_lst);

	backtrack(c_lst);

	
	for (i = 0; i < solutionlist.length; i++) {
		s = solutionlist[i];	// a solution
		s.score = 0;
		for (j = 0; j < s.length; j++) {
			section = s[j];   // a course section
			for (k = 0; k < section.times.length; k++) {
				t = section.times[k];   // current timeslot
				time = "";
				if (t.start < 43200) time = "morning";
				else if (t.start < 64800) time = "afternoon";
				else time = "evening";
				for (z = 0; z < p_lst.length; z++) {
					p = p_lst[z];    // current preference
					if (p.type == t.day && p.value == time)
						s.score += t.duration;
				}
			}
		}
	}
    
    solutionlist.sort(function (a, b) {
		return b.score - a.score;
    });
	callback(solutionlist);
}
module.exports= compute_valid_solutions;