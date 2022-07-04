// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from "./Pages/Dashboard/Dashboard"
import Login from './Pages/Login/Login';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import ManageCourses from './Pages/ManageCourses/ManageCourses';
import AddCourse from './Pages/ManageCourses/AddCourse';
import EditCourse from './Pages/ManageCourses/EditCourse';
import ManageUsers from './Pages/ManageUsers/ManageUsers';
import AddUser from './Pages/ManageUsers/AddUser/AddUser';
import EditUser from './Pages/ManageUsers/EditUser/EditUser';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/forgot_password" exact element={<ForgotPassword />} />
        <Route path="/manage_courses" exact element={<ManageCourses/>} />
        <Route path="/manage_courses/add_course" element={<AddCourse/>} />
        <Route path="/manage_courses/edit_course/:course_id" element={<EditCourse/>} />
        <Route path="/manage_users" exact element={<ManageUsers/>} />
        <Route path="/manage_users/add_user" element={<AddUser/>} />
        <Route path="/manage_users/edit_user/:1" element={<EditUser/>} />
      </Routes>
    </>
  );
}

export default App;
