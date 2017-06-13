interface Section {
    code: string;
}

export class Tutorial implements Section {
    code: string;
    ta: string
}

export class Lecture implements Section {
    code: string;
    instructor: string;
}

export class Lab implements Section {
    code: string;
    ta: string;
}
