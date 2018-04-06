import {connect, courseSchema} from "./backend/db";
import fs = require("fs");
import Collections = require("typescript-collections");

const COURSE_DATA_ROOT = './resources/courses/';
const BUILDING_DATA_ROOT = './resources/buildings/';

/**
 * Data structure used by UofT scrapper
 */
declare module UofT {
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

const LOC_TABLE = new Collections.Dictionary<string, UofT.Location>();
{
    const files = fs.readdirSync(BUILDING_DATA_ROOT);
    for (let file of files) {
        const building = <UofT.Building>JSON.parse(
            fs.readFileSync(BUILDING_DATA_ROOT + file, 'utf-8'));
        LOC_TABLE.setValue(building.code, {
            building: building.code,
            lat: building.lat,
            lng: building.lng
        });
    }
}

{
    const files = fs.readdirSync(COURSE_DATA_ROOT);
    const courses = files.map(file => {
        const course = <UofT.Course>JSON.parse(
            fs.readFileSync(COURSE_DATA_ROOT + file, 'utf-8'));
        course.meeting_sections.forEach(
            ms => ms.times.forEach(
                t => {
                    const info = t.location.split(" ");
                    const building = info[0];
                    const room = info[1];
                    let loc = LOC_TABLE.getValue(building);
                    if (loc == undefined) {
                        loc = {
                            building: "unknown",
                            lat: 0.0,
                            lng: 0.0
                        }
                    }
                    loc.room = room;
                    t.extended_location = loc;
                }));
        return course;
    });

    connect().then(
        mongoose => {
            courseSchema.insertMany(courses, (err, docs) => {
                if (err) {
                    console.error("DB init failed");
                    console.error(err);
                } else {
                    console.log("DB init successful");
                    console.log(`${docs.length} item(s) added`);
                }
            });
        }
    );
}

