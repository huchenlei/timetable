import {Course, CourseComponent, CourseComponentType, CourseSection, Location, Time} from "../../course-arrange";
import _ = require("lodash");


export declare module UofT {
    export interface Time {
        day: string;
        start: number;
        end: number;
        duration: number;
        location: string;
    }

    export interface MeetingSection {
        code: string;
        instructors: string[];
        times: Time[];
        size: number;
        enrolment: number;
    }

    export interface Course {
        id: string;
        code: string;
        name: string;
        description: string;
        division: string;
        department: string;
        prerequisites: string;
        exclusions: string;
        level: number;
        campus: string;
        term: string;
        breadths: number[];
        meeting_sections: MeetingSection[];
    }

    export interface Address {
        street: string;
        city: string;
        province: string;
        country: string;
        postal: string;
    }

    export interface Building {
        id: string;
        code: string;
        name: string;
        short_name: string;
        campus: string;
        address: Address;
        lat: number;
        lng: number;
        polygon: number[][];
    }
}

/**
 * mocking
 * @param {UofT.Course} rawCourse
 * @return {Course}
 */
export function parseCourse(rawCourse: UofT.Course) {
    function weekStringToNum(week: string): number {
        switch (week) {
            case "MONDAY":
                return 1;
            case "TUESDAY":
                return 2;
            case "WEDNESDAY":
                return 3;
            case "THURSDAY":
                return 4;
            case "FRIDAY":
                return 5;
            case "SATURDAY":
                return 6;
            case "SUNDAY":
                return 7;
            default:
                throw new Error("Invalid week string " + week);
        }
    }

    return new Course(rawCourse.id,
        _.toPairs(_.groupBy(rawCourse.meeting_sections,
            section => section.code.charAt(0)))
            .map(
                value => {
                    const type = value[0];
                    const sections = value[1];
                    let componentType;
                    switch (type) {
                        case 'L':
                            componentType = CourseComponentType.LEC;
                            break;
                        case 'T':
                            componentType = CourseComponentType.TUT;
                            break;
                        case 'P':
                            componentType = CourseComponentType.PRA;
                            break;
                        default:
                            componentType = CourseComponentType.UNKNOWN;
                    }
                    return new CourseComponent(componentType,
                        sections.map(section =>
                            new CourseSection(section.times.map(
                                time => {
                                    const start = Math.round(time.start / 3600);
                                    const end = Math.round(time.end / 3600);
                                    const locationName = time.location.split(" ")[0];
                                    const location = new Location(locationName);
                                    return new Time(weekStringToNum(time.day), start, end, location);
                                }
                            ))
                        ));
                }
            )
    );
}

export const CIV = {
    "id": "CIV498H1S20181",
    "code": "CIV498H1S",
    "name": "Group Design Project",
    "description": "The Group Design Project is a significant design experience that integrates the mathematics, basic sciences, engineering sciences, complementary studies, and detailed design aspects of the different civil engineering sub-disciplines.",
    "division": "Faculty of Applied Science & Engineering",
    "department": "Civil Engineering",
    "prerequisites": "",
    "exclusions": "APS490Y1",
    "level": 400,
    "campus": "UTSG",
    "term": "2018 Winter",
    "breadths": [],
    "meeting_sections": [{
        "code": "T0101",
        "instructors": ["K Pressnail"],
        "times": [{"day": "MONDAY", "start": 43200, "end": 54000, "duration": 10800, "location": "BA 2155"}],
        "size": 20,
        "enrolment": 0
    }, {
        "code": "T0103",
        "instructors": ["A Dunets P Cadario"],
        "times": [{"day": "TUESDAY", "start": 32400, "end": 43200, "duration": 10800, "location": "MB 500"}],
        "size": 20,
        "enrolment": 0
    }, {
        "code": "T0105",
        "instructors": ["C Andrews"],
        "times": [{"day": "THURSDAY", "start": 50400, "end": 61200, "duration": 10800, "location": "BA 2179"}],
        "size": 20,
        "enrolment": 0
    }, {
        "code": "T0106",
        "instructors": ["H Hosseini Abrishami"],
        "times": [{"day": "THURSDAY", "start": 64800, "end": 75600, "duration": 10800, "location": "MB 500"}],
        "size": 20,
        "enrolment": 0
    }, {
        "code": "T0107",
        "instructors": ["S Saiyed"],
        "times": [{"day": "THURSDAY", "start": 64800, "end": 75600, "duration": 10800, "location": "BA B026"}],
        "size": 21,
        "enrolment": 0
    }, {
        "code": "T0108",
        "instructors": ["A Hellebust"],
        "times": [{"day": "MONDAY", "start": 32400, "end": 43200, "duration": 10800, "location": "BA B026"}],
        "size": 20,
        "enrolment": 0
    }]
};

export const CHE = {
    "id": "CHE403H1S20181",
    "code": "CHE403H1S",
    "name": "Professional Practice",
    "description": "In this course, lectures and seminars will be given by practicing engineers who will cover the legal and ethical responsibility an engineer owes to an employer, a client and the public with particular emphasis on environmental issues.",
    "division": "Faculty of Applied Science & Engineering",
    "department": "Chemical Engineering and Applied Chemistry",
    "prerequisites": "",
    "exclusions": "",
    "level": 400,
    "campus": "UTSG",
    "term": "2018 Winter",
    "breadths": [],
    "meeting_sections": [{
        "code": "L0101",
        "instructors": ["V Papangelakis"],
        "times": [{"day": "TUESDAY", "start": 46800, "end": 54000, "duration": 7200, "location": "HS 610"}],
        "size": 214,
        "enrolment": 0
    }]
};

export const ECE = {
    "id": "ECE110H1S20181",
    "code": "ECE110H1S",
    "name": "Electrical Fundamentals",
    "description": "An\u00a0overview of the physics of electricity and magnetism: Coulomb\u2019s law, Gauss\u2019 law, Ampere\u2019s law, Faraday\u2019s law.\u00a0Physics of capacitors, resistors and inductors.\u00a0\u00a0An introduction to circuit analysis: resistive circuits, nodal and mesh analysis, 1st order\u00a0RC and RL transient response and\u00a0sinusoidal steady-state analysis.",
    "division": "Faculty of Applied Science & Engineering",
    "department": "Engineering First Year Office",
    "prerequisites": "",
    "exclusions": "",
    "level": 100,
    "campus": "UTSG",
    "term": "2018 Winter",
    "breadths": [],
    "meeting_sections": [{
        "code": "T0101",
        "instructors": [],
        "times": [{"day": "WEDNESDAY", "start": 57600, "end": 64800, "duration": 7200, "location": "WB 342"}],
        "size": 64,
        "enrolment": 0
    }, {
        "code": "T0102",
        "instructors": [],
        "times": [{"day": "MONDAY", "start": 43200, "end": 50400, "duration": 7200, "location": "HA 403"}],
        "size": 55,
        "enrolment": 0
    }, {
        "code": "T0103",
        "instructors": [],
        "times": [{"day": "THURSDAY", "start": 43200, "end": 50400, "duration": 7200, "location": "HA 403"}],
        "size": 70,
        "enrolment": 0
    }, {
        "code": "P0112",
        "instructors": [],
        "times": [{"day": "THURSDAY", "start": 57600, "end": 64800, "duration": 7200, "location": "GB 341"}],
        "size": 80,
        "enrolment": 0
    }, {
        "code": "T0112",
        "instructors": [],
        "times": [{"day": "FRIDAY", "start": 43200, "end": 50400, "duration": 7200, "location": "WB 119"}],
        "size": 80,
        "enrolment": 0
    }, {
        "code": "P0105",
        "instructors": [],
        "times": [{"day": "THURSDAY", "start": 36000, "end": 43200, "duration": 7200, "location": "GB 341"}],
        "size": 60,
        "enrolment": 0
    }, {
        "code": "P0106",
        "instructors": [],
        "times": [{"day": "THURSDAY", "start": 36000, "end": 43200, "duration": 7200, "location": "GB 341"}],
        "size": 60,
        "enrolment": 0
    }, {
        "code": "T0107",
        "instructors": [],
        "times": [{"day": "FRIDAY", "start": 57600, "end": 64800, "duration": 7200, "location": "BA 1240"}],
        "size": 55,
        "enrolment": 0
    }, {
        "code": "T0108",
        "instructors": [],
        "times": [{"day": "FRIDAY", "start": 57600, "end": 64800, "duration": 7200, "location": "SF 3202"}],
        "size": 60,
        "enrolment": 0
    }, {
        "code": "T0109",
        "instructors": [],
        "times": [{"day": "MONDAY", "start": 57600, "end": 64800, "duration": 7200, "location": "BA 1200"}],
        "size": 72,
        "enrolment": 0
    }, {
        "code": "T0110",
        "instructors": [],
        "times": [{"day": "THURSDAY", "start": 46800, "end": 54000, "duration": 7200, "location": "LM 162"}],
        "size": 60,
        "enrolment": 0
    }, {
        "code": "T0111",
        "instructors": [],
        "times": [{"day": "THURSDAY", "start": 46800, "end": 54000, "duration": 7200, "location": "SS 2135"}],
        "size": 110,
        "enrolment": 0
    }, {
        "code": "T0104",
        "instructors": [],
        "times": [{"day": "FRIDAY", "start": 57600, "end": 64800, "duration": 7200, "location": "HA 403"}],
        "size": 55,
        "enrolment": 0
    }, {
        "code": "T0105",
        "instructors": [],
        "times": [{"day": "WEDNESDAY", "start": 43200, "end": 50400, "duration": 7200, "location": "GB 405"}],
        "size": 62,
        "enrolment": 0
    }, {
        "code": "T0106",
        "instructors": [],
        "times": [{"day": "TUESDAY", "start": 54000, "end": 61200, "duration": 7200, "location": "GB 404"}],
        "size": 63,
        "enrolment": 0
    }, {
        "code": "P0107",
        "instructors": [],
        "times": [{"day": "WEDNESDAY", "start": 43200, "end": 50400, "duration": 7200, "location": "GB 341"}],
        "size": 60,
        "enrolment": 0
    }, {
        "code": "P0108",
        "instructors": [],
        "times": [{"day": "WEDNESDAY", "start": 43200, "end": 50400, "duration": 7200, "location": "GB 341"}],
        "size": 61,
        "enrolment": 0
    }, {
        "code": "P0109",
        "instructors": [],
        "times": [{"day": "MONDAY", "start": 43200, "end": 50400, "duration": 7200, "location": "GB 341"}],
        "size": 72,
        "enrolment": 0
    }, {
        "code": "P0110",
        "instructors": [],
        "times": [{"day": "THURSDAY", "start": 57600, "end": 64800, "duration": 7200, "location": "GB 341"}],
        "size": 60,
        "enrolment": 0
    }, {
        "code": "P0111",
        "instructors": [],
        "times": [{"day": "MONDAY", "start": 43200, "end": 50400, "duration": 7200, "location": "GB 341"}],
        "size": 800,
        "enrolment": 0
    }, {
        "code": "L0102",
        "instructors": ["M Mojahedi"],
        "times": [{
            "day": "MONDAY",
            "start": 54000,
            "end": 57600,
            "duration": 3600,
            "location": "BA 1170"
        }, {
            "day": "THURSDAY",
            "start": 54000,
            "end": 57600,
            "duration": 3600,
            "location": "BA 1170"
        }, {"day": "WEDNESDAY", "start": 43200, "end": 46800, "duration": 3600, "location": "BA 1170"}],
        "size": 110,
        "enrolment": 0
    }, {
        "code": "L0101",
        "instructors": ["M Mojahedi"],
        "times": [{
            "day": "MONDAY",
            "start": 43200,
            "end": 46800,
            "duration": 3600,
            "location": "MC 252"
        }, {"day": "WEDNESDAY", "start": 36000, "end": 39600, "duration": 3600, "location": "MC 252"}, {
            "day": "FRIDAY",
            "start": 50400,
            "end": 54000,
            "duration": 3600,
            "location": "MC 252"
        }],
        "size": 110,
        "enrolment": 0
    }, {
        "code": "L0103",
        "instructors": ["P Yoo"],
        "times": [{
            "day": "MONDAY",
            "start": 57600,
            "end": 61200,
            "duration": 3600,
            "location": "GB 220"
        }, {"day": "THURSDAY", "start": 57600, "end": 61200, "duration": 3600, "location": "MC 254"}, {
            "day": "TUESDAY",
            "start": 61200,
            "end": 64800,
            "duration": 3600,
            "location": "GB 220"
        }],
        "size": 120,
        "enrolment": 0
    }, {
        "code": "L0104",
        "instructors": ["B Bardakjian"],
        "times": [{
            "day": "WEDNESDAY",
            "start": 61200,
            "end": 64800,
            "duration": 3600,
            "location": "SF 1101"
        }, {"day": "MONDAY", "start": 61200, "end": 64800, "duration": 3600, "location": "SF 1101"}, {
            "day": "THURSDAY",
            "start": 61200,
            "end": 64800,
            "duration": 3600,
            "location": "SF 1101"
        }],
        "size": 140,
        "enrolment": 0
    }, {
        "code": "L0105",
        "instructors": ["B Wang"],
        "times": [{
            "day": "THURSDAY",
            "start": 39600,
            "end": 43200,
            "duration": 3600,
            "location": "BA 1180"
        }, {"day": "FRIDAY", "start": 39600, "end": 43200, "duration": 3600, "location": "BA 1180"}, {
            "day": "TUESDAY",
            "start": 39600,
            "end": 43200,
            "duration": 3600,
            "location": "BA 1180"
        }],
        "size": 129,
        "enrolment": 0
    }, {
        "code": "L0106",
        "instructors": ["J Aitchison"],
        "times": [{
            "day": "THURSDAY",
            "start": 43200,
            "end": 46800,
            "duration": 3600,
            "location": "BA 1130"
        }, {"day": "FRIDAY", "start": 50400, "end": 54000, "duration": 3600, "location": "BA 1130"}, {
            "day": "TUESDAY",
            "start": 57600,
            "end": 61200,
            "duration": 3600,
            "location": "BA 1130"
        }],
        "size": 132,
        "enrolment": 0
    }, {
        "code": "P0101",
        "instructors": [],
        "times": [{"day": "THURSDAY", "start": 43200, "end": 50400, "duration": 7200, "location": "GB 341"}],
        "size": 57,
        "enrolment": 0
    }, {
        "code": "P0102",
        "instructors": [],
        "times": [{"day": "THURSDAY", "start": 43200, "end": 50400, "duration": 7200, "location": "GB 341"}],
        "size": 55,
        "enrolment": 0
    }, {
        "code": "P0103",
        "instructors": [],
        "times": [{"day": "FRIDAY", "start": 43200, "end": 50400, "duration": 7200, "location": "GB 341"}],
        "size": 55,
        "enrolment": 0
    }, {
        "code": "P0104",
        "instructors": [],
        "times": [{"day": "FRIDAY", "start": 43200, "end": 50400, "duration": 7200, "location": "GB 341"}],
        "size": 55,
        "enrolment": 0
    }]
};


