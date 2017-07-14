export class Preference {
    monday      : Day = new Day();
    tuesday     : Day = new Day();
    wednesday   : Day = new Day();
    thursday    : Day = new Day();
    friday      : Day = new Day()
}

export class Day {
    morning     : boolean = false; // 8-12
    noon        : boolean = false; // 12-1
    highTea      : boolean = false; // 1-3
    afternoon   : boolean = false; // 3-6
    evening     : boolean = false; // 6-10
    any         : boolean = true;
    no          : boolean = false;
}
