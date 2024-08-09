import axios from 'axios';

const API_URL = 'http://localhost:5033/api' + '/students';

export const getStudents = async () => {
    
        const response = await axios.get(`${API_URL}`);

        if (Array.isArray(response.data)) {
            return response.data;
        } else {
            console.error('Unexpected response format:', response.data);
            return [];
        }
};

export const getStudent = async (student) => {

        const response = await axios.post(`${API_URL}`, student);
        return response.data;  
};

export const createStudent = async (student) => {
    const response = await axios.post(`${API_URL}`, student);
    return response.data;
};

export const updateStudent = async (id, student) => {

        const response = await axios.put(`${API_URL}/${id}`, student);
        return response.data;   
};

export const deleteStudent = async (id) => {
   
        await axios.delete(`${API_URL}/${id}`);                         
};

export const addCourseToStudent = async (studentId, courseId) => {
    
        const response = await axios.post(`${API_URL}/${studentId}/courses/${courseId}`);
        return response.data;
};