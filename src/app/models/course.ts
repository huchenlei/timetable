import { Section } from './section';

export class Course {
    "id": string;
    "code": string;
    "name": string;
    "description": string;
    "division": string;
    "department": string;
    "prerequisites": string;
    "exclusions": string;
    "level": number;
    "campus": string;
    "term": string;
    "breadths": number[];
    "meeting_sections": Section[];
}
