import Course from '../models/course_model.js';
import asyncHandler from 'express-async-handler';

export const getAllCourses = (req, res, next) => {
  Course.find()
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      console.log(err.stack);
    });
};

export const getOneCourse = (req, res, next) => {
  Course.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
};

export const SearchCourse = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { Name: { $regex: req.query.search, $options: 'i' } },
          { Date: { $regex: req.query.search, $options: 'i' } },
        ],
      }
    : {};
  const courses = await Course.find(keyword);
  res.send(courses);
});

export const AddCourse = (req, res, next) => {
  const course = new Course({
    ...req.body,
    imageUrl: `${req.protocol}://${req.get('host')}/images/course/${
      req.file.filename
    }`,
  });
  course
    .save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch((error) => console.log(error.stack));
};

export default { getAllCourses, AddCourse, SearchCourse, getOneCourse };
