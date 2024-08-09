import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getStudents, deleteStudent, updateStudent } from '../api/studentApi';
import StudentDetails from './StudentDetails';
import { getCourses } from '../api/courseApi';
import '../css/style.css';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [editStudent, setEditStudent] = useState(null);
    const [showStudentModal, setShowStudentModal] = useState(false);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetchStudents();
        fetchCourses();
    }, []);


    const fetchStudents = async () => {
        const data = await getStudents();
        setStudents(data);
    };

    const fetchCourses = async () => {
        const data = await getCourses();
        setCourses(data);
    };

    const handleDeleteStudent = async (id) => {
        await deleteStudent(id);
        fetchStudents();
    };

    const handleEditStudent = async (e) => {
        e.preventDefault();
        const updatedStudent = {
            StudentId: editStudent.studentId,
            Name: e.target.name.value,
            Email: e.target.email.value,
            DateOfBirth: e.target.dateOfBirth.value,
            EnrollmentDate: e.target.enrollmentDate.value,
            StudentCourses: editStudent.StudentCourses || []
        };
        await updateStudent(updatedStudent.StudentId, updatedStudent);
        fetchStudents();
        setEditStudent(null);
        setShowStudentModal(false);
    };

    const handleStudentDetails = (student) => {
        setSelectedStudent(student);
    };

    const handleCloseStudentDetails = () => {
        setSelectedStudent(null);
    };

    const handleEditStudentClick = (student) => {
        setEditStudent(student);
        setShowStudentModal(true);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Öğrenciler</h2>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Ad Soyad</th>
                            <th>Email</th>
                            <th>Düzenleme</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student.studentId}>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>
                                    <Button className="btn btn-info btn-sm" onClick={() => handleStudentDetails(student)}>Detaylar</Button>
                                    <Button className="btn btn-warning btn-sm ml-2" onClick={() => handleEditStudentClick(student)}>Düzenle</Button>
                                    <Button className="btn btn-danger btn-sm ml-2" onClick={() => handleDeleteStudent(student.studentId)}>Sil</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedStudent && (
                <StudentDetails student={selectedStudent} onClose={handleCloseStudentDetails} courses={courses} />
            )}

            <Modal show={showStudentModal} onHide={() => setShowStudentModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Öğrenci Düzenle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editStudent && (
                        <form onSubmit={handleEditStudent}>
                            <div className="form-group">
                                <label>Ad Soyad:</label>
                                <input className="form-control" name="name" defaultValue={editStudent.name} required />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input className="form-control" name="email" defaultValue={editStudent.email} required />
                            </div>
                            <div className="form-group">
                                <label>Doğum Tarihi:</label>
                                <input
                                    className="form-control"
                                    name="dateOfBirth"
                                    type="date"
                                    defaultValue={editStudent.dateOfBirth ? new Date(editStudent.dateOfBirth).toISOString().split('T')[0] : ''}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Kayıt Tarihi:</label>
                                <input
                                    className="form-control"
                                    name="enrollmentDate"
                                    type="date"
                                    defaultValue={editStudent.enrollmentDate ? new Date(editStudent.enrollmentDate).toISOString().split('T')[0] : ''}
                                    required
                                />
                            </div>
                            <Button variant="primary" type="submit">Güncelle</Button>
                            <Button variant="secondary" onClick={() => setShowStudentModal(false)} className="ml-2">İptal</Button>
                        </form>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default StudentList;