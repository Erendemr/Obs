import axios from 'axios';

const API_URL = 'http://localhost:5033/api' + '/courses';

export const getCourses = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getCourse = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createCourse = async (course) => {
  
    const courseData = { ...course, StudentCourses: [] };
    const response = await axios.post(`${API_URL}`, courseData);
    return response.data;
};

export const updateCourse = async (id, course) => {
  const response = await axios.put(`${API_URL}/${id}`, course);
  return response.data;
};

export const deleteCourse = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const addCourseToStudent = async (studentId, courseId) => {
  await axios.post(`${API_URL}/${studentId}/courses/${courseId}`);
};