import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [circulars, setCirculars] = useState([]);
  const [calendar, setCalendar] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [eventRes, circularRes, calendarRes, reviewRes] =
        await Promise.all([
          fetch("http://localhost:5000/api/events"),
          fetch("http://localhost:5000/api/circulars"),
          fetch("http://localhost:5000/api/calendar"),
          fetch("http://localhost:5000/api/reviews/admin/pending"),
        ]);

      const eventsData = await eventRes.json();
      const circularData = await circularRes.json();
      const calendarData = await calendarRes.json();
      const reviewData = await reviewRes.json();

      setEvents(eventsData);
      setCirculars(circularData);
      setCalendar(calendarData);
      setReviews(reviewData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainLayout>
      <div className="p-8 bg-gray-100 min-h-screen">

        <h1 className="text-4xl font-bold text-blue-700">
          Admin Control Panel
        </h1>

        <p className="text-gray-600 mt-2 mb-8">
          Manage Events, Circulars, Academic Calendar and Staff Reviews.
        </p>

        {/* Top Cards */}

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-5xl">📅</div>

            <h2 className="mt-3 text-xl font-semibold">
              Total Events
            </h2>

            <p className="text-4xl text-blue-600 font-bold mt-2">
              {events.length}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-5xl">📢</div>

            <h2 className="mt-3 text-xl font-semibold">
              Total Circulars
            </h2>

            <p className="text-4xl text-red-500 font-bold mt-2">
              {circulars.length}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-5xl">🗓️</div>

            <h2 className="mt-3 text-xl font-semibold">
              Calendar Updates
            </h2>

            <p className="text-4xl text-green-600 font-bold mt-2">
              {calendar.length}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-5xl">⭐</div>

            <h2 className="mt-3 text-xl font-semibold">
              Staff Reviews
            </h2>

            <p className="text-4xl text-yellow-500 font-bold mt-2">
              {reviews.length}
            </p>
          </div>

        </div>

        {/* Manage Cards */}

        <div className="grid md:grid-cols-4 gap-6 mt-8">

          <Link
            to="/admin/events"
            className="bg-white shadow rounded-xl p-6 hover:shadow-xl"
          >
            <div className="text-5xl">📅</div>

            <h2 className="text-2xl font-bold mt-3">
              Events
            </h2>

            <p className="mt-2 text-gray-500">
              Create, edit and delete campus events.
            </p>

            <button className="bg-blue-600 text-white rounded mt-5 px-5 py-2 w-full">
              Manage Events
            </button>
          </Link>

          <Link
            to="/admin/circulars"
            className="bg-white shadow rounded-xl p-6 hover:shadow-xl"
          >
            <div className="text-5xl">📢</div>

            <h2 className="text-2xl font-bold mt-3">
              Circulars
            </h2>

            <p className="mt-2 text-gray-500">
              Publish important college announcements.
            </p>

            <button className="bg-blue-600 text-white rounded mt-5 px-5 py-2 w-full">
              Manage Circulars
            </button>
          </Link>

          <Link
            to="/admin/calendar"
            className="bg-white shadow rounded-xl p-6 hover:shadow-xl"
          >
            <div className="text-5xl">🗓️</div>

            <h2 className="text-2xl font-bold mt-3">
              Academic Calendar
            </h2>

            <p className="mt-2 text-gray-500">
              Update schedules and holidays.
            </p>

            <button className="bg-blue-600 text-white rounded mt-5 px-5 py-2 w-full">
              Manage Calendar
            </button>
          </Link>

          <Link
            to="/admin/registrations"
            className="bg-white shadow rounded-xl p-6 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-bold">
              📝 Event Registrations
            </h2>

            <p className="text-gray-600 mt-1">
              View students registered for your events
            </p>
          </Link>

          {/* NEW CARD */}

          <Link
            to="/admin-feedback"
            className="bg-white shadow rounded-xl p-6 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-bold">
              ⭐ Anonymous Feedback
            </h2>

            <p className="text-gray-600 mt-1">
              View anonymous student feedback
            </p>

            <button className="bg-blue-600 text-white rounded mt-5 px-5 py-2 w-full">
              Manage Reviews
            </button>
          </Link>

        </div>

        {/* Recent Data */}

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-xl font-bold mb-4">
              Recent Events
            </h2>

            {events.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className="border-b py-2"
              >
                {item.title}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-xl font-bold mb-4">
              Recent Circulars
            </h2>

            {circulars.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className="border-b py-2"
              >
                {item.title}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-xl font-bold mb-4">
              Recent Calendar
            </h2>

            {calendar.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className="border-b py-2"
              >
                {item.title}
              </div>
            ))}
          </div>

        </div>

        {/* Notice */}

        <div className="bg-blue-100 rounded-xl p-5 mt-8">
          <h3 className="font-bold text-blue-700">
            Admin Notice
          </h3>

          <p className="mt-2">
            Any event, circular or calendar update added here will automatically
            be visible in the Student Dashboard.
          </p>
        </div>

      </div>
    </MainLayout>
  );
}

export default AdminDashboard;