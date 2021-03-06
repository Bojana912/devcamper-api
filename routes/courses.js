const express = require('express');
const {getCourses, getCourse, addCourse, updateCourse, deleteCourse} = require('../controllers/courses');

const Coutrse = require('../models/Course');

const advancedResults = require('../middleware/advancedResults');

const router = express.Router({ mergeParams: true});

const { protect, authorize } = require('../middleware/auth');

router.route('/').get(advancedResults(Coutrse, {
    path: 'bootcamp',
    select: 'name'
}), getCourses).post(protect, authorize('publisher', 'admin'), addCourse);

router.route('/:id')
.get(getCourse)
.put(protect, authorize('publisher', 'admin'), updateCourse)
.delete(protect, authorize('publisher', 'admin'),  deleteCourse);

module.exports = router;