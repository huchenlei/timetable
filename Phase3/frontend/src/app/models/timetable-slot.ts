export class TimetableSlot {
  map : any[5][15];

  constructor() {
    this.map = [];
        for(var i: number = 0; i < 5; i++) {
            this.map[i] = [];
            for(var j: number = 0; j< 15; j++) {
                this.map[i][j] = {code:' ', section:' ', color:"#fff"};
            }
        }
      }

  setValue(i, j, value) {
    this.map[i][j] = value
  }
}
