import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import CreateCourse from "./CreateCourse"; // A component to handle course creation and editing
import "../assets/course.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

ReactModal.setAppElement("#root");

const Course = () => {
    const [courses, setCourses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/course")
            .then((res) => res.json())
            .then((data) => setCourses(data));
    }, []);

    const handleCourseCreated = (updatedCourse) => {
        // Re-fetch the courses from the server to ensure the list is up-to-date
        fetch("http://localhost:5000/course")
            .then((res) => res.json())
            .then((data) => setCourses(data)) // Update the courses state with the fresh list
            .catch((err) => console.error(err));
    
        // Close the modals
        setIsModalOpen(false);
        setIsEditModalOpen(false);
    };

    const MySwal = withReactContent(Swal);

    const deleteCourse = (id) => {
        MySwal.fire({
            title: "Are you sure?",
            text: "Once deleted, this course cannot be recovered!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "No, keep it",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/course/${id}`, { method: "DELETE" })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.message) {
                            setCourses(courses.filter((c) => c._id !== id));
                            MySwal.fire("Deleted!", "The course has been deleted.", "success");
                        } else {
                            MySwal.fire("Error!", data.message, "error");
                        }
                    })
                    .catch((err) => console.error(err));
            }
        });
    };

    return (
        <div className="" id="courses">
            <div className="row">
                <div className="col-md-8 d-flex justify-content-start">
                    <h2 className="course-header">Available Online Courses</h2>
                </div>
                <div className="col-md-4">
                    <button className="btn btn-primary float-end" onClick={() => setIsModalOpen(true)}>
                        Create Course
                    </button>
                </div>
            </div>

            <ReactModal 
                isOpen={isModalOpen} 
                onRequestClose={() => setIsModalOpen(false)}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 1000,
                    },
                }}
            >
                <CreateCourse onCourseCreated={handleCourseCreated} onClose={() => setIsModalOpen(false)} />
            </ReactModal>

            <ReactModal
                isOpen={isEditModalOpen}
                onRequestClose={() => setIsEditModalOpen(false)}
                shouldCloseOnOverlayClick={true}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 1000,
                    },
                }}
            >
                {selectedCourse && (
                    <CreateCourse
                        course={selectedCourse}
                        onCourseCreated={handleCourseCreated}
                        onClose={() => setIsEditModalOpen(false)}
                    />
                )}
            </ReactModal>

            <div className="course-list">
                {courses.map((course) => (
                    <div key={`${course._id}`} className="course-card">
                        <img src={course.imageUrl} alt={course.title} className="course-image" />
                        <div className="course-info">
                            <h3 className="course-title">{course.title}</h3>
                            <p className="course-instructor">Instructor: {course.instructor}</p>
                            <p className="course-duration">Duration: {course.duration}</p>
                            <p className="course-level">Level: {course.level}</p>
                            <p className="course-description">{course.description}</p>
                            <p className="course-price">Price: ${course.price}</p>
                            <div className="course-actions">
                                <button
                                    className="btn btn-warning me-2"
                                    onClick={() => {
                                        setSelectedCourse(course);
                                        setIsEditModalOpen(true);
                                    }}
                                >
                                    Edit
                                </button>
                                <button className="btn btn-danger" onClick={() => deleteCourse(course._id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Course;
