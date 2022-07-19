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
import DataReports from './Pages/DataReport/DataReports';
import UploadFiles from './Pages/Upload/UploadFiles';
import Request from './Pages/Request/Request';
import Section from './Pages/SectionCourse/Section';
import EditRequest from './Pages/Request/EditRequest';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import PublicRoute from './Components/PublicRoute/PublicRoute';


function App() {
  return (
    <>
      <Routes>
        <Route element={<PublicRoute/>}>
          <Route path="/login" exact element={<Login />} />
          <Route path="/forgot_password" exact element={<ForgotPassword />} />
        </Route>
        <Route element={<PrivateRoute/>}>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/manage_courses" exact element={<ManageCourses/>} />
          <Route path="/manage_courses/add_course" element={<AddCourse/>} />
          <Route path="/manage_courses/edit_course/:course_id" element={<EditCourse/>} />
          <Route path="/manage_users" exact element={<ManageUsers/>} />
          <Route path="/manage_users/add_user" element={<AddUser/>} />
          <Route path="/manage_users/edit_user/:user_id" element={<EditUser/>} />
          <Route path="/data_reports" element={<DataReports />}/>
          <Route path="/upload_files" element={<UploadFiles />}/>
          <Route path="/section_courses" element={<Section />}/>
          <Route path="/request" element={<Request />}/>
          <Route path="/request/:id" element={<EditRequest />}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
