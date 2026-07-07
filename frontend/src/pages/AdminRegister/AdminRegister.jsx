import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";

function AdminRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Admin Registered Successfully");
        navigate("/admin-login");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Server Error");
    }
  };

  return (
    <MainLayout>
      <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">

        <h2 className="text-3xl font-bold text-center mb-6">
          Admin Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            className="w-full border p-3 rounded"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-3 rounded"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-3 rounded"
            onChange={handleChange}
            required
          />

          <select
            name="department"
            className="w-full border p-3 rounded"
            onChange={handleChange}
            required
          >
            <option value="">Select Department / Club</option>

            <optgroup label="Departments">
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Geoinformatics Engineering">Geoinformatics Engineering</option>
              <option value="Agricultural Engineering">Agricultural Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Industrial Engineering">Industrial Engineering</option>
              <option value="Manufacturing Engineering">Manufacturing Engineering</option>
              <option value="Materials Science and Engineering">Materials Science and Engineering</option>
              <option value="Mining Engineering">Mining Engineering</option>
              <option value="Printing Technology">Printing Technology</option>
              <option value="Electrical and Electronics Engineering (EEE)">
                Electrical and Electronics Engineering (EEE)
              </option>
              <option value="Computer Science and Engineering (CSE)">
                Computer Science and Engineering (CSE)
              </option>
              <option value="Electronics and Communication Engineering (ECE)">
                Electronics and Communication Engineering (ECE)
              </option>
              <option value="Biomedical Engineering">Biomedical Engineering</option>
              <option value="Information Science and Technology">
                Information Science and Technology
              </option>
            </optgroup>

            <optgroup label="Clubs">
              <option value="NSO">NSO</option>
              <option value="NCC">NCC</option>
              <option value="YRC">YRC</option>
              <option value="NSS">NSS</option>
            </optgroup>

          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/admin-login" className="text-blue-600">
            Login
          </Link>
        </p>

      </div>
    </MainLayout>
  );
}

export default AdminRegister;