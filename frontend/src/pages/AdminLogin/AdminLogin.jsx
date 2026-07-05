import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

const [form, setForm] = useState({
  email: "",
  password: "",
  department: "",
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
        alert(data.message);
        return;
      }

      if (data.user.role !== "admin") {
        alert("Access Denied! Admins only.");
        return;
      }

      localStorage.setItem("token", data.token);
localStorage.setItem("user", JSON.stringify(data.user));

const clubAdmins = ["YRC", "NSS", "NCC", "NSO"];

if (clubAdmins.includes(form.department)) {
  navigate("/club");
} else {
  navigate("/admin");
}

    } catch (err) {
      console.log(err);
      alert("Server Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-lg rounded-xl p-8 w-96">

        <h1 className="text-3xl font-bold text-center text-red-600">
          Admin Login
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Campus Connect Administrator
        </p>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
            required
          />

          <select
  name="department"
  value={form.department}
  onChange={handleChange}
  className="w-full border px-3 py-2 rounded-md mt-4"
  required
>
  <option value="">Select Department / Club</option>

  <optgroup label="Clubs">
    <option value="YRC">YRC</option>
    <option value="NSS">NSS</option>
    <option value="NCC">NCC</option>
    <option value="NSO">NSO</option>
  </optgroup>

  <optgroup label="Departments">
    <option value="IT">IT</option>
    <option value="CSE">CSE</option>
    <option value="ECE">ECE</option>
    <option value="EEE">EEE</option>
    <option value="Mechanical">Mechanical</option>
    <option value="Civil">Civil</option>
  </optgroup>
</select>

<button
  type="submit"
  className="w-full bg-red-600 text-white py-2 rounded-md mt-4"
>
  Login
</button>
         


        </form>

        <p className="text-center mt-5">
          <Link
            to="/"
            className="text-blue-600"
          >
            ← Back to Student Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default AdminLogin;