/**
 * Data structure used by UofT scrapper
 */
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