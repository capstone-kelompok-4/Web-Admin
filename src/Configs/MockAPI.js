import axios from "axios";

export const BASE_URL = "https://62a160e6cc8c0118ef4a5d6c.mockapi.io";

export const getAllCourses = () => {
  return axios.get(`${BASE_URL}/courses`);
}

export const getCourseByID = (payload) => {
  return axios.get(`${BASE_URL}/courses/${payload}`);
}