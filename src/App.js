// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from "./Pages/Dashboard/Dashboard"
import Login from './Pages/Login/Login';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/forgot_password" exact element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;
