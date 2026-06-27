import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

        <h1 className="text-2xl font-bold">
          🎓 Campus Connect
        </h1>

        <div className="flex gap-6 items-center">

          <Link to="/dashboard" className="hover:text-yellow-300">
            Dashboard
          </Link>

          <Link to="/events" className="hover:text-yellow-300">
            Events
          </Link>

          <Link to="/circulars" className="hover:text-yellow-300">
            Circulars
          </Link>

          <Link to="/calendar" className="hover:text-yellow-300">
            Calendar
          </Link>

          <Link to="/cgpa" className="hover:text-yellow-300">
            CGPA
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;