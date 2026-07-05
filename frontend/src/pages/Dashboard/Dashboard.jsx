import MainLayout from "../../components/layout/MainLayout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [cgpa, setCgpa] = useState("-");
 
  const adminEvents = events.filter(
  (event) => !event.club_name
);

const clubEvents = events.filter(
  (event) => event.club_name
);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/events");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
      useEffect(() => {
  const savedCGPA = localStorage.getItem("cgpa");

  if (savedCGPA) {
    setCgpa(savedCGPA);
  }
}, []);
    };

    fetchEvents();
  }, []);

  return (
    <MainLayout>
      {/* Welcome */}
      <div className="bg-blue-600 text-white rounded-xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold">Good Afternoon 👋</h1>

        <p className="mt-3 text-lg">
          Welcome to Campus Connect
        </p>

        <p className="mt-2 text-blue-100">
          Stay updated with events, circulars and academic activities.
        </p>
      </div>

      {/* Today's Updates */}
      <div className="bg-white rounded-xl shadow-md p-6 mt-8">
        <h2 className="text-2xl font-bold mb-5">
          🔔 Today's Updates
        </h2>

        <ul className="space-y-4 text-lg">
          <li>📅 AI Workshop registration closes tomorrow</li>
          <li>📢 New Circular uploaded by CSE Department</li>
          <li>📆 Mid Semester Exam starts in 5 days</li>
        </ul>
      </div>

     {/* Information Cards */}
<div className="grid md:grid-cols-2 gap-6 mt-8">

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
  {/* Upcoming Events */}
  <div className="bg-white rounded-xl shadow-md p-6">
    <h2 className="text-xl font-bold mb-4">
      📅 Upcoming Events
    </h2>

    {events.length === 0 ? (
      <p className="text-gray-500">No events available.</p>
    ) : (
      events.slice(0, 3).map((event) => (
        <div
          key={event.id}
          className="border-b pb-3 mb-3"
        >
          <h3 className="font-bold text-blue-600">
            {event.title}
          </h3>

          <p>
            <strong>Type :</strong>{" "}
            {event.club_name ? "Club Event" : "College Event"}
          </p>

          {event.club_name && (
            <p>
              <strong>Club :</strong> {event.club_name}
            </p>
          )}

          <p>
            <strong>Venue :</strong> {event.location}
          </p>

          <p>
            <strong>Date :</strong> {event.event_date}
          </p>
        </div>
      ))
    )}

    <Link
      to="/events"
      className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg"
    >
      View All Events
    </Link>
  </div>

  {/* Latest Circular */}
  <div className="bg-white rounded-xl shadow-md p-6">
    <h2 className="text-xl font-bold mb-4">
      📢 Latest Circular
    </h2>

    <p className="font-semibold">
      Semester Fee Payment
    </p>

    <p className="mt-2">
      Last Date : 30 June
    </p>

    <Link
      to="/circulars"
      className="inline-block mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
    >
      Read More
    </Link>
  </div>

  {/* Academic Calendar */}
  <div className="bg-white rounded-xl shadow-md p-6">
    <h2 className="text-xl font-bold mb-4">
      📆 Academic Calendar
    </h2>

    <p className="font-semibold">
      Internal Assessment
    </p>

    <p className="mt-2">
      15 July 2026
    </p>

    <Link
      to="/calendar"
      className="inline-block mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg"
    >
      View Calendar
    </Link>
  </div>

  {/* Club Events */}
  <div className="bg-white rounded-xl shadow-md p-6">
    <h2 className="text-xl font-bold mb-4">
      🎉 Club Events
    </h2>

    {clubEvents.length === 0 ? (
      <p className="text-gray-500">
        No Club Events Available.
      </p>
    ) : (
      clubEvents.slice(0, 3).map((event) => (
        <div
          key={event.id}
          className="border-b pb-3 mb-3"
        >
          <h3 className="font-bold text-blue-600">
            {event.title}
          </h3>

          <p>
            <strong>Club :</strong> {event.club_name}
          </p>

          <p>
            <strong>Venue :</strong> {event.location}
          </p>

          <p>
            <strong>Date :</strong> {event.event_date}
          </p>
        </div>
      ))
    )}

    <Link
      to="/club-events"
      className="inline-block mt-3 bg-pink-600 text-white px-4 py-2 rounded-lg"
    >
      View Club Events
    </Link>
  </div>

        <div className="bg-white rounded-xl shadow-md p-6">

          <h2 className="text-xl font-bold mb-4">
            📢 Latest Circular
          </h2>

          <p className="font-semibold">
            Semester Fee Payment
          </p>

          <p className="mt-2">
            Last Date : 30 June
          </p>

          <Link
            to="/circulars"
            className="inline-block mt-5 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
          >
            Read More
          </Link>

        </div>

        {/* Calendar */}

        <div className="bg-white rounded-xl shadow-md p-6">

          <h2 className="text-xl font-bold mb-4">
            📆 Next Academic Date
          </h2>

          <p className="font-semibold">
            Internal Assessment
          </p>

          <p className="mt-2">
            15 July 2026
          </p>

          <Link
            to="/calendar"
            className="inline-block mt-5 bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700"
          >
            View Calendar
          </Link>

        </div>

        {/* NEW STAFF FEEDBACK */}

        <div className="bg-white rounded-xl shadow-md p-6">

          <h2 className="text-xl font-bold mb-4">
            👨‍🏫 Staff Feedback
          </h2>

          <p className="font-semibold">
            Share your anonymous feedback
          </p>

          <p className="mt-2">
            Help improve teaching quality.
          </p>

          <p>
            Your identity will remain private.
          </p>

          <Link
            to="/staff-feedback"
            className="inline-block mt-5 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
          >
            Give Feedback
          </Link>

        </div>

      </div>
</div>

      {/* CGPA */}
      <div className="bg-white rounded-xl shadow-md p-6 mt-8">
        <h2 className="text-2xl font-bold">
          🎓 CGPA
        </h2>

        <p className="mt-4 text-lg">
          Current CGPA
        </p>

       <h1 className="text-5xl font-bold text-blue-600 mt-3">
  {cgpa}
</h1>

        <Link
          to="/cgpa"
          className="inline-block mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
        >
          Open Calculator
        </Link>
      </div>
    </MainLayout>
  );
}

export default Dashboard;