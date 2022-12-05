import express from 'express';
import auth from '../Middlewares/auth.js';
const router = express.Router();

import {
  AddCourse,
  getAllCourses,
  SearchCourse,
  getOneCourse,
} from '../controllers/course.controller.js';
import Multer from '../Middlewares/multer-config.course.js';

router.get('/course', auth, getAllCourses);

router.get('/onecourse/:id', auth, getOneCourse);

router.post('/course/register', Multer, auth, AddCourse);

router.get('/course/filter', auth, SearchCourse);

export default router;
