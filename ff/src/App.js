import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import StudentList from './components/StudentList';
import CourseList from './components/CourseList';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/students" element={<StudentList />} />
                <Route path="/courses" element={<CourseList />} />
            </Routes>
        </Router>
    );
}

export default App;
