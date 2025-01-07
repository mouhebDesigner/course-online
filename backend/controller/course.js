const Course = require('../models/course');
const mongoose = require('mongoose');


const getCourses = async (req, res) => {
    try {
        const courses = await Course.find().sort({ createdAt: -1 });
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addCourse = async (req, res) => {
    const course = new Course(req.body);
    try {
        await course.save();
        res.status(201).json({ course: course, message: 'Course added!' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const editCourse = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'No course with that ID' });
    }
    try {
        const course = await Course.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ course: course, message: 'Course updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteCourse = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'No course with that ID' });
    }
    try {
        const course = await Course.findByIdAndDelete(id);
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = { getCourses, addCourse, editCourse, deleteCourse };

