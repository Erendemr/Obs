import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getCourses, deleteCourse, updateCourse } from '../api/courseApi';
import CourseDetails from './CourseDetails';
import '../css/style.css';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [editCourse, setEditCourse] = useState(null);
    const [showCourseModal, setShowCourseModal] = useState(false);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        const data = await getCourses();
        setCourses(data);
    };

    const handleDeleteCourse = async (id) => {
        await deleteCourse(id);
        fetchCourses();
    };

    const handleEditCourse = async (e) => {
        e.preventDefault();
        const updatedCourse = {
            CourseId: editCourse.courseId,
            Name: e.target.name.value,
            Description: e.target.description.value,
            Credits: e.target.credits.value
        };
        await updateCourse(updatedCourse.CourseId, updatedCourse);
        fetchCourses();
        setEditCourse(null);
        setShowCourseModal(false);
    };

    const handleCourseDetails = (course) => {
        setSelectedCourse(course);
    };

    const handleCloseCourseDetails = () => {
        setSelectedCourse(null);
    };

    const handleEditCourseClick = (course) => {
        setEditCourse(course);
        setShowCourseModal(true);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Dersler</h2>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Ders Adı</th>
                            <th>Açıklama</th>
                            <th>Krediler</th>
                            <th>Düzenleme</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map(course => (
                            <tr key={course.courseId}>
                                <td>{course.name}</td>
                                <td>{course.description}</td>
                                <td>{course.credits}</td>
                                <td>
                                    <Button className="btn btn-info btn-sm" onClick={() => handleCourseDetails(course)}>Detaylar</Button>
                                    <Button className="btn btn-warning btn-sm ml-2" onClick={() => handleEditCourseClick(course)}>Düzenle</Button>
                                    <Button className="btn btn-danger btn-sm ml-2" onClick={() => handleDeleteCourse(course.courseId)}>Sil</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedCourse && (
                <CourseDetails course={selectedCourse} onClose={handleCloseCourseDetails} />
            )}

            <Modal show={showCourseModal} onHide={() => setShowCourseModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Ders Düzenle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editCourse && (
                        <form onSubmit={handleEditCourse}>
                            <div className="form-group">
                                <label>Ders Adı:</label>
                                <input className="form-control" name="name" defaultValue={editCourse.name} required />
                            </div>
                            <div className="form-group">
                                <label>Açıklama:</label>
                                <input className="form-control" name="description" defaultValue={editCourse.description} required />
                            </div>
                            <div className="form-group">
                                <label>Krediler:</label>
                                <input className="form-control" name="credits" type="number" defaultValue={editCourse.credits} required />
                            </div>
                            <Button variant="primary" type="submit">Güncelle</Button>
                            <Button variant="secondary" onClick={() => setShowCourseModal(false)} className="ml-2">İptal</Button>
                        </form>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CourseList;