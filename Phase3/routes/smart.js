var over_lap = function(a, b) {
	for (var i = 0; i < a.length; i++)
		for (var j = 0; j < b.length; j++)
			if (a[i].day == b[j].day && 
				Math.max(a[i].start, b[j].start) < Math.min(a[i].end, b[j].end))
				return true;
	return false;
}
var result;
var currentlist;
var backtrack = function(courselist) {
	if (currentlist.length == courselist.length) {
		result.push(JSON.parse(JSON.stringify(currentlist)));
		console.log("pushed");
	}
	else {
		var deapth = currentlist.length;
		for (var i = 0; i < courselist[deapth].length; i++) {
			var ok = true;
			for (var j = 0; j < deapth; j++) 
				if (over_lap(courselist[deapth][i].times, currentlist[j].times)) {
					ok = false;
				}
			if (ok) {
				currentlist.push(courselist[deapth][i]);
				backtrack(courselist);
				currentlist.pop();
			}
		}
	}
}

var compute_valid_solutions = function(courselist, callback) {
	result = [];
	currentlist = [];
	backtrack(courselist);
	callback(result);
}
module.exports= compute_valid_solutions;