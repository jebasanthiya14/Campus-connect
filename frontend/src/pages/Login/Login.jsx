import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login Failed");
        return;
      }

      // Save token
      localStorage.setItem("token", data.token);

      // Save user
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect based on role
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      alert("Server Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-lg rounded-xl p-8 w-96">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
          🎓 Campus Connect
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Student Login
        </p>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="College Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>

        </form>

        {/* Register */}
        <p className="text-center mt-6 text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

        {/* Divider */}
        <div className="flex items-center my-5">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Admin Login */}
        <Link
          to="/admin-login"
          className="block w-full text-center bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
        >
          🔒 Login as Admin
        </Link>

      </div>

    </div>
  );
}

export default Login;