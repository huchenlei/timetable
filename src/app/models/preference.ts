export class Preference {
    monday      : Day = new Day();
    tuesday     : Day = new Day();
    wednesday   : Day = new Day();
    thursday    : Day = new Day();
    friday      : Day = new Day()
}

export class Day {
    morning     : number = 0; // 8-12
    noon        : number = 0; // 12-1
    afternoon   : number = 0; // 3-6
    evening     : number = 0; // 6-10
}
