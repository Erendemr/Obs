import React, { useEffect, useState, useRef } from 'react';
import { createStudent, getStudents } from '../api/studentApi';
import { getCourses, createCourse } from '../api/courseApi';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Main = () => {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    
    const courseNameRef = useRef(null);
    const courseDescriptionRef = useRef(null);
    const courseCreditsRef = useRef(null);

    const studentNameR = useRef(null);
    const studentEmailR = useRef(null);
    const studentBRef = useRef(null);
    const studentEnRef = useRef(null);

    const fetchStudents = async () => {
        const data = await getStudents();
        setStudents(data);
    };

    const fetchCourses = async () => {
        const data = await getCourses();
        setCourses(data);
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();
        const student = {
            Name: e.target.name.value,
            Email: e.target.email.value,
            DateOfBirth: e.target.dateOfBirth.value,
            EnrollmentDate: e.target.enrollmentDate.value,
            StudentCourses: []
        };
        await createStudent(student);
        fetchStudents();

        studentNameR.current.value = '';
        studentEmailR.current.value = '';
        studentBRef.current.value = '';
        studentEnRef.current.value = '';

        toast.success("Öğrenci Başarıyla Eklendi", {
            position:"top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });

    };

    const handleAddCourse = async (e) => {
        e.preventDefault();
        const course = {
            Name: e.target.name.value,
            Description: e.target.description.value,
            Credits: e.target.credits.value
        };
        await createCourse(course);
        fetchCourses();
        
        courseNameRef.current.value = '';
        courseDescriptionRef.current.value = '';
        courseCreditsRef.current.value = '';

        toast.success('Ders başarıyla eklendi!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme : "dark",
            transition: Bounce
        });
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <ToastContainer />
            <div className="row w-100 justify-content-center">
                <div className="col-md-4 mb-5">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Öğrenci</h2>
                            <form onSubmit={handleAddStudent}>
                                <div className="form-group mb-3">
                                    <label className="me-2">Ad Soyad:</label>
                                    <input ref={studentNameR} className="form-control-sm" name="name" required />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="me-2">Email:</label>
                                    <input ref={studentEmailR} className="form-control-sm" name="email" required />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="me-2">Doğum Tarihi:</label>
                                    <input ref={studentBRef} className="form-control-sm" name="dateOfBirth" type="date" required />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="me-2">Kayıt Tarihi:</label>
                                    <input ref={studentEnRef} className="form-control-sm" name="enrollmentDate" type="date" required />
                                </div>
                                <button className="btn btn-success" type="submit">Öğrenci Ekle</button>
                            </form>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Ders</h2>
                            <form onSubmit={handleAddCourse}>
                                <div className="form-group mb-3">
                                    <label className="me-2">Ders Adı:</label>
                                    <input ref={courseNameRef} className="form-control-sm" name="name" required />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="me-2">Açıklama:</label>
                                    <input ref={courseDescriptionRef} className="form-control-sm" name="description" required />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="me-2">Krediler:</label>
                                    <input ref={courseCreditsRef} className="form-control-sm" name="credits" type="number" required />
                                </div>
                                <button className="btn btn-success" type="submit">Ders Ekle</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;