import React, { useState } from "react";
import { addCourseToStudent } from "../api/studentApi";

const StudentDetails = ({ student, onClose, courses }) => {
    const [selectedCourseId, setSelectedCourseId] = useState("");

    const handleAddCourse = async () => {
        if (selectedCourseId) {
            await addCourseToStudent(student.studentId, selectedCourseId);
            alert("Başarıyla Eklendi");
            setSelectedCourseId("");
        } else {
            alert("Lütfen Ders Seçiniz");
        }
    };

    if (!student) return null;

    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{student.name} Kişisinin Bilgileri</h5>
                        <button type="button" className="close" onClick={onClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p><strong>Email:</strong> {student.email}</p>
                        <p><strong>Doğum Tarihi:</strong> {new Date(student.dateOfBirth).toLocaleDateString()}</p>
                        <p><strong>Kayıt Tarihi:</strong> {new Date(student.enrollmentDate).toLocaleDateString()}</p>
                        <h5>Dersler:</h5>
                        <ul className="list-group">
                            {student.studentCourses && student.studentCourses.length > 0 ? (
                                student.studentCourses.map(sc => (
                                    <li className="list-group-item" key={sc.courseId}>
                                        {sc.courseName ? sc.courseName : "Ders bilgisi bulunamadı"}
                                    </li>
                                ))
                            ) : (
                                <li className="list-group-item">Ders bulunamadı</li>
                            )}
                        </ul>
                        <h5 className="mt-4">Ders Ekle</h5>
                        <div className="form-group">
                            <select className="form-control" value={selectedCourseId} onChange={(e) => setSelectedCourseId(e.target.value)}>
                                <option value="">Ders Seçin</option>
                                {courses.map(course => (
                                    <option key={course.courseId} value={course.courseId}>{course.name}</option>
                                ))}
                            </select>
                        </div>
                        <button className="btn btn-primary" onClick={handleAddCourse}>Ders Ekle</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDetails;