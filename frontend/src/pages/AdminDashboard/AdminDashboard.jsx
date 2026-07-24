import MainLayout from "../../components/layout/MainLayout";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <MainLayout>
      <div className="p-6">

        <h1 className="text-4xl font-bold text-blue-600">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          Welcome Admin 👋 Manage your campus system here.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

          <Link
            to="/admin/events"
            className="bg-white shadow rounded-xl p-6 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-bold">
              📅 Manage Events
            </h2>

            <p className="text-gray-600 mt-1">
              Add, Edit or Delete Events
            </p>
          </Link>

          <Link
            to="/admin/circulars"
            className="bg-white shadow rounded-xl p-6 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-bold">
              📢 Manage Circulars
            </h2>

            <p className="text-gray-600 mt-1">
              Publish college circulars
            </p>
          </Link>

          <Link
            to="/admin/calendar"
            className="bg-white shadow rounded-xl p-6 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-bold">
              📆 Academic Calendar
            </h2>

            <p className="text-gray-600 mt-1">
              Update academic schedule
            </p>
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
          </Link>

        </div>

      </div>
    </MainLayout>
  );
}

export default AdminDashboard;