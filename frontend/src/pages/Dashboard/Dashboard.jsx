import MainLayout from "../../components/layout/MainLayout";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <MainLayout>

      {/* Welcome */}

      <div className="bg-blue-600 text-white rounded-xl p-8 shadow-lg">

        <h1 className="text-4xl font-bold">
          Good Afternoon 👋
        </h1>

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

          <li>
            📅 AI Workshop registration closes tomorrow
          </li>

          <li>
            📢 New Circular uploaded by CSE Department
          </li>

          <li>
            📆 Mid Semester Exam starts in 5 days
          </li>

        </ul>

      </div>

      {/* Information Cards */}

      <div className="grid md:grid-cols-3 gap-6 mt-8">

        {/* Upcoming Event */}

        <div className="bg-white rounded-xl shadow-md p-6">

          <h2 className="text-xl font-bold mb-4">
            📅 Upcoming Event
          </h2>

          <p className="font-semibold">
            Hackathon 2026
          </p>

          <p className="mt-2">
            Department : IT
          </p>

          <p>
            Venue : Auditorium
          </p>

          <p>
            Date : 12 July 2026
          </p>

          <Link
            to="/events"
            className="inline-block mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            View Details
          </Link>

        </div>

        {/* Circular */}

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
          8.62
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