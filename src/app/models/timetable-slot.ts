export class TimetableSlot {
  map : any[5][15];


  constructor() {
    this.map = [];
        for(var i: number = 0; i < 5; i++) {
            this.map[i] = [];
            for(var j: number = 0; j< 15; j++) {
                this.map[i][j] = new Cell();
            }
        }
      }

  setValue(i, j, value) {
    this.map[i][j] = value;
  }

  cleanSpan(i, j) {
    console.log("clean")
    for (let k = j; k > 0; k-- ) {
      if (this.map[i][k].rowspan > 1) {
        this.map[i][k].rowspan = 1;
        this.map[i][k].color="#a00"
        break;
      }
    }
  }

  printTable() {
    let res = ""
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 5; j++) {
        if (this.map[j][i].delete) {
          res += "| d "
        } else {
          res += "|   "
        }
      }
      res += '\n'
    }
    return res;
  }
}

export class Cell {
  code: string = "";
  section: string = "";
  color: string = "#fff";
  class: string = "";
  rowspan: number | string = 1;
  delete: boolean = false;
  fn = () => {console.log("别点了")};
  start: number;
  end: number;
  lst: string="";
}
