import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    username: "",
    uid: "",
    profilePicture: null,
  }, 
  reducers: {
    login: (state, action) => {
      const userData = action.payload;
      state.isLogin = true;
      state.username = userData.username;
      state.uid = userData.uid;
      state.profilePicture = userData.profilePicture;
    },
    logout: (state, action) => {
      state.isLogin = false;
      state.username = "";
      state.uid = "";
      state.profilePicture = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice;