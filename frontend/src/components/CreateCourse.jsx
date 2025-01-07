import React, { useState } from 'react';

const CreateCourse = ({ course, onCourseCreated, onClose }) => {
    const [formData, setFormData] = useState(course ? { ...course } : {
        title: '',
        description: '',
        instructor: '',
        duration: '',
        level: '',
        topics: [],
        imageUrl: '',
        videoUrl: '',
        price: 0,
        isAvailable: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const closeModal = () => {
    };
   

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = course ? 'PUT' : 'POST';
        const url = course ? `http://localhost:5000/course/${course._id}` : 'http://localhost:5000/course';

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.course);
                
                onCourseCreated(data.course);
            })
            .catch(err => {
                console.error('Error:', err);
                if (err.message.includes('SyntaxError')) {
                    alert('Invalid form data');
                }
            });
    };

    return (
        <div className="container">
            <h2 className="text-center">{course ? 'Edit' : 'Create a New'} Course</h2>
            <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" name="title" placeholder="Title" className="form-control" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea name="description" placeholder="Description" className="form-control" value={formData.description} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="instructor" className="form-label">Instructor</label>
                    <input type="text" name="instructor" placeholder="Instructor" className="form-control" value={formData.instructor} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="duration" className="form-label">Duration</label>
                    <input type="text" name="duration" placeholder="Duration" className="form-control" value={formData.duration} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="level" className="form-label">Level</label>
                    <select name="level" value={formData.level} onChange={handleChange} required className="form-select">
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label htmlFor="topics" className="form-label">Topics</label>
                    <input type="text" name="topics" placeholder="Topics" className="form-control" value={formData.topics} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="imageUrl" className="form-label">Image URL</label>
                    <input type="text" name="imageUrl" placeholder="Image URL" className="form-control" value={formData.imageUrl} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="videoUrl" className="form-label">Video URL</label>
                    <input type="text" name="videoUrl" placeholder="Video URL" className="form-control" value={formData.videoUrl} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" name="price" placeholder="Price" className="form-control" value={formData.price} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="isAvailable" checked={formData.isAvailable} onChange={handleChange} />
                        <label className="form-check-label" htmlFor="isAvailable">
                            Available
                        </label>
                    </div>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button type="reset" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default CreateCourse;
