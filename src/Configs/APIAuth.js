export const BASE_URL = "https://capstone-project-4.herokuapp.com/api";

export const getUser = () => {
  const userStr = localStorage.getItem("admin");
  if (userStr) return JSON.parse(userStr);
  else return null;
};

export const getToken = () => {
  return localStorage.getItem("token") || null;
};

export const setAdminTokenSession = (token) => {
  localStorage.setItem("token", token);
};

export const setAdminSession = (admin) => {
  localStorage.setItem("admin", JSON.stringify(admin));
};

export const removeAdminSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("admin");
};
