import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRegister from "../pages/AdminRegister/AdminRegister";
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

import StaffFeedback from "../pages/StaffFeedback/StaffFeedback";

// NEW
import LostFound from "../pages/LostFound/LostFound";
import AddFoundItem from "../pages/LostFound/AddFoundItem";
import ClaimItem from "../pages/LostFound/ClaimItem";
import AdminCirculars from "../pages/Admincircular/AdminCirculars";
import AdminCalendar from "../pages/Admincalendar/AdminCalendar";
import ClubEvents from "../pages/Club/ClubEvents";
import ClubDashboard from "../pages/club/ClubDashboard";
import AdminRegistrations from "../pages/AdminRegistrations/AdminRegistrations";
import AdminFeedback from "../pages/AdminFeedback/AdminFeedback";

import AdminReviews from "../pages/AdminReviews/AdminReviews";
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
        <Route path="/staff-feedback" element={<StaffFeedback />} />
<Route path="/admin-register" element={<AdminRegister />} />
        {/* Lost & Found */}
        <Route path="/lost-found" element={<LostFound />} />
        <Route path="/add-found-item" element={<AddFoundItem />} />
        <Route path="/claim-item/:id" element={<ClaimItem />} />

        {/* Register Event */}
        <Route path="/register/:id" element={<RegisterEvent />} />

        {/* Admin */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/events" element={<AdminEvents />} />
<Route
  path="/admin/registrations"
  element={<AdminRegistrations />}
  path="/admin/circulars"
  element={<AdminCirculars />}
/>
        <Route path="/club" element={<ClubDashboard />} />

<Route
  path="/admin/calendar"
  element={<AdminCalendar />}
/>
<Route
    path="/admin/reviews"
    element={<AdminReviews />}
/>
<Route path="/club-events" element={<ClubEvents />} />
<Route
  path="/admin-feedback"
  element={<AdminFeedback />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;