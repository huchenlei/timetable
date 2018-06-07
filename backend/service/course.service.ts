import {courseSchema} from "../db";

const today = new Date();
const year = today.getFullYear();

export class CourseService {
    constructor() {
    }

    /**
     * Query the course information
     * @param {string} code
     * @param {any | null} projection
     * @return {"mongoose".DocumentQuery<"mongoose".Document[], "mongoose".Document>}
     */
    public static queryCourseInfo(code: string, projection: any | null = null) {
        const condition = {
            code: new RegExp(`^${code}`, 'i'),
            campus: "UTSG",
            term: new RegExp(`${year} Fall|${year + 1} Winter`, 'i')
        };
        if (projection == null)
            return courseSchema.find(condition);
        else
            return courseSchema.find(condition, projection);
    }
}