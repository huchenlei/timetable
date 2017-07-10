import { Section } from './section';
import { Time } from './time';

export class CourseMin {
  code : string;
  courseCode : string;
  enrolment : number;
  instructors : string[];
  size : number;
  times : Time[]
}
