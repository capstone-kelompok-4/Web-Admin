import axios from "axios";

export const BASE_URL = "https://62a160e6cc8c0118ef4a5d6c.mockapi.io";
export const BASE_URL2 = "https://62b6beff6999cce2e806fbe8.mockapi.io";
export const BASE_URL3 = "https://62cec801826a88972d02ebec.mockapi.io";

export const getAllCourses = () => {
  return axios.get(`${BASE_URL}/courses`);
}

export const getCourseByID = (payload) => {
  return axios.get(`${BASE_URL}/courses/${payload}`);
}

export const getAllUsers = () => {
  return axios.get(`${BASE_URL2}/users`);
}

export const getAllMaterials = () => {
  return axios.get(`${BASE_URL2}/materials`);
}

export const getAllRequest = () => {
  return axios.get(`${BASE_URL2}/requestUsers`);
}

export const getUserByID = (payload) => {
  return axios.get(`${BASE_URL2}/users/${payload}`);
}

export const getAllRecentActivity = () => {
  return axios.get(`${BASE_URL3}/Recent_Activity`);
}