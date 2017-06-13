export class Preference {
    monday      : Day = new Day();
    tuesday     : Day = new Day();
    wednesday   : Day = new Day();
    thursday    : Day = new Day();
    friday      : Day = new Day()
}

export class Day {
    morning     : boolean = false;
    afternoon   : boolean = false;
    evening     : boolean = false
}
