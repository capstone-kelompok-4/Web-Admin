// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from "./Pages/Dashboard/Dashboard"
import Login from './Pages/Login/Login';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import ManageCourses from './Pages/ManageCourses/ManageCourses';
import AddCourse from './Pages/ManageCourses/AddCourse';
import EditCourse from './Pages/ManageCourses/EditCourse';


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
      </Routes>
    </>
  );
}

export default App;
