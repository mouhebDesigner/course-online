const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    instructor: {
        type: String,
        required: true,
    },
    duration: {
        type: String,  // Use String for duration like "6 Weeks" instead of a number
        required: true,
    },
    level: {
        type: String,
        required: true,
        enum: ['beginner', 'intermediate', 'advanced'],
    },
    topics: {
        type: [String],  // Array of topics covered in the course
        required: true,
    },
    imageUrl: {
        type: String,  // URL or path to the course image
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,  // Automatically add createdAt and updatedAt fields
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
