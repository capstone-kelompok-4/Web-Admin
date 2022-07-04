import axios from "axios";

export const BASE_URL = "https://62a160e6cc8c0118ef4a5d6c.mockapi.io";
export const BASE_URL2 = "https://62b6beff6999cce2e806fbe8.mockapi.io";

export const getAllCourses = () => {
  return axios.get(`${BASE_URL}/courses`);
}

export const getCourseByID = (payload) => {
  return axios.get(`${BASE_URL}/courses/${payload}`);
}

export const getUserByID = (payload) => {
  return axios.get(`${BASE_URL2}/users/${payload}`);
}