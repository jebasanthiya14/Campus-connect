import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import AdminLogin from "../pages/AdminLogin/AdminLogin";
import AdminEvents from "../pages/AdminEvents/AdminEvents";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Events from "../pages/Events/Events";
import Circulars from "../pages/Circulars/Circulars";
import Calendar from "../pages/Calendar/Calendar";
import CGPA from "../pages/CGPA/CGPA";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/events" element={<Events />} />
        <Route path="/circulars" element={<Circulars />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/cgpa" element={<CGPA />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/events" element={<AdminEvents />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;