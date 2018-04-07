import * as express from 'express';
import {CourseService} from "../service/course.service";

export const router = express.Router();

/**
 * Get the full course info
 */
router.get('/:code', async (req, res) => {
    res.json(await CourseService.queryCourseInfo(req.params.code));
});

/**
 * Get basic course info
 */
router.get('/s/:code', async (req, res) => {
    res.json(await CourseService.queryCourseInfo(req.params.code, {
        code: 1, name: 1, _id: 0
    }));
});


