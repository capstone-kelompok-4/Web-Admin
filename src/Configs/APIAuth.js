// import axios from "axios";

export const BASE_URL = "https://capstone-project-4.herokuapp.com/api";

export const getUser = () => {
  const userStr = sessionStorage.getItem("admin");
  if (userStr) return JSON.parse(userStr);
  else return null;
};

export const getToken = () => {
  return sessionStorage.getItem("token") || null;
};

export const setAdminTokenSession = (token) => {
  sessionStorage.setItem("token", token);
};

export const setAdminSession = (admin) => {
  sessionStorage.setItem("admin", JSON.stringify(admin));
};

export const removeAdminSession = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("admin");
};

// export const getUserData = () => {
//   return axios.get(`${BASE_URL}/users`);
// }
