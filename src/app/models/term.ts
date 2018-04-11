export class Term {
    year: number;
    semester: "Winter" | "Fall";


    constructor(year: number, semester) {
        this.year = year;
        this.semester = semester;
    }

    static getTerms(): Term[] {
        const today = new Date();
        const year = today.getFullYear();
        return [
            new Term(year, "Fall"),
            new Term(year + 1, "Winter")
        ];
    }

    public toString() {
        return this.year + " " + this.semester;
    }

    public equals(other: Term) {
        return this.year == other.year && this.semester == other.semester;
    }
}