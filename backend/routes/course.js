const express = require('express');
const router = express.Router();
const { getCourses, addCourse, editCourse, deleteCourse } = require('../controller/course');

router.get('/', getCourses);
router.post('/', addCourse);
router.put('/:id', editCourse);
router.delete('/:id', deleteCourse);

module.exports = router;
