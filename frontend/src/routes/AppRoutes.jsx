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
import RegisterEvent from "../pages/student/RegisterEvent";

// NEW
import StaffFeedback from "../pages/StaffFeedback/StaffFeedback";

import ClubEvents from "../pages/Club/ClubEvents";
import ClubDashboard from "../pages/club/ClubDashboard";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Student */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/events" element={<Events />} />
        <Route path="/circulars" element={<Circulars />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/cgpa" element={<CGPA />} />

        {/* Event Registration */}
        <Route path="/register/:id" element={<RegisterEvent />} />

        {/* NEW Staff Feedback */}
        <Route path="/staff-feedback" element={<StaffFeedback />} />

        {/* Admin */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/events" element={<AdminEvents />} />

        <Route path="/club" element={<ClubDashboard />} />
<Route path="/cgpa" element={<CGPA />} />
<Route path="/club-events" element={<ClubEvents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;