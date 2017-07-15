var over_lap = function(a, b) {
	for (var i = 0; i < a.length; i++)
		for (var j = 0; j < b.length; j++)
			if (a[i].day == b[j].day &&
				Math.max(a[i].start, b[j].start) < Math.min(a[i].end, b[j].end))
				return true;
	return false;
}
var solutionlist, currentlist, course_data;
var backtrack = function(courselist, clip_max) {
	if (solutionlist.length >= 1000) return;
	if (currentlist.length == courselist.length) {
		solutionlist.push(JSON.parse(JSON.stringify(currentlist)));
	} else {
		var depth = currentlist.length;
		var clip = Math.min(7, courselist[depth].length);
		for (var i = 0; i < clip; i++) {
			var ok = true;
			for (var j = 0; j < depth; j++)
				if (over_lap(courselist[depth][i].times, currentlist[j].times)) {
					ok = false;
					break;
				}
			if (ok) {
				currentlist.push(courselist[depth][i]);
				backtrack(courselist, clip_max);
				currentlist.pop();
			}
		}
	}
}

var time_overlap = function(a, b) {
	var interval = Math.min(a.end,b.end) - Math.max(a.start,b.start);
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

var compute_valid_solutions = function(input, term, callback) {
	solutionlist = [];
	currentlist = [];

	course_data = input[1];
	p_lst = input[0];
	c_lst = [];
	for (var key in course_data) {
		if (key.indexOf("Y1Y") > -1) {
			console.log(course_data[key]);
			for (var type in course_data[key]["2017 Fall"])
				c_lst.push(course_data[key]["2017 Fall"][type]);
		} else {
			for (var type in course_data[key][term])
				c_lst.push(course_data[key][term][type]);
		}
	}
	console.log(term, "smart", c_lst);
	backtrack(c_lst, 7);
	if (solutionlist.length == 0)	{
		backtrack(c_lst, 1000);
		if (solutionlist.length == 0) {
			for (var i = 0; i < c_lst.length; i++) {
				var t = c_lst.splice(i, 1);
				backtrack(c_lst, 1000);
				c_lst.splice(i, 0, t[0]);
			}
		}
	}

	for (var i = 0; i < solutionlist.length; i++) {
		s = solutionlist[i];	// a solution
		s.score = 0;
		for (var j = 0; j < s.length; j++) {
			section = s[j];   // a course section
			// for (var k = 0; k < section.times.length; k++) {
			// 	t = section.times[k];   // current timeslot
			// 	for (var z = 0; z < p_lst.length; z++) {
			// 		p = p_lst[z];    // current preference
			// 		s.score += t.score;
			// 	}
			// }
			s.score += section.score;
		}
	}

    solutionlist.sort(function (a, b) {
		return b.score - a.score;
    });
	callback(solutionlist.slice(0, 15));
}
module.exports= compute_valid_solutions;
