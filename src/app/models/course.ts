/**
 * Data structure used by UofT scrapper
 */
import {Course, CourseComponent, CourseComponentType, CourseSection, Time, Location} from "../course-arrange";
import _ = require("lodash");

export declare module UofT {
    export interface Location {
        building: string;
        room?: string;
        lat: number;
        lng: number;
    }

    export interface Time {
        day: string;
        start: number;
        end: number;
        duration: number;
        location: string;
        extended_location?: Location;
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
                                    const location = new Location(locationName,
                                        time.extended_location.lat, time.extended_location.lng);
                                    return new Time(weekStringToNum(time.day), start, end, location);
                                }
                            ), section.code)
                        ));
                }
            )
    );
}