import { useState } from "react";
import MainLayout from "../../components/layout/MainLayout";

function StaffFeedback() {
  const [form, setForm] = useState({
    admin_id: "",
    faculty_name: "",
    department: "",
    review: "",
  });

  const [facultyList, setFacultyList] = useState([]);
  const [message, setMessage] = useState("");

  const departments = [
    "Civil Engineering",
    "Geoinformatics Engineering",
    "Agricultural Engineering",
    "Mechanical Engineering",
    "Industrial Engineering",
    "Manufacturing Engineering",
    "Materials Science and Engineering",
    "Mining Engineering",
    "Printing Technology",
    "Electrical and Electronics Engineering (EEE)",
    "Computer Science and Engineering (CSE)",
    "Electronics and Communication Engineering (ECE)",
    "Biomedical Engineering",
    "Information Science and Technology",
    "NCC",
    "NSS",
    "NSO",
    "YRC",
  ];

  // Handle Department Selection
  const handleDepartmentChange = async (e) => {
    const department = e.target.value;

    setForm({
      admin_id: "",
      faculty_name: "",
      department,
      review: form.review,
    });

    if (!department) {
      setFacultyList([]);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/faculty/${encodeURIComponent(
          department
        )}`
      );

      const data = await res.json();

      setFacultyList(data);

    } catch (err) {
      console.log(err);
      setFacultyList([]);
    }
  };

  // Handle Faculty Selection
  const handleFacultyChange = (e) => {
    const faculty = facultyList.find(
      (item) => item.full_name === e.target.value
    );

    setForm((prev) => ({
      ...prev,
      faculty_name: e.target.value,
      admin_id: faculty ? faculty.id : "",
    }));
  };

  // Handle Feedback Text
  const handleReviewChange = (e) => {
    setForm((prev) => ({
      ...prev,
      review: e.target.value,
    }));
  };

  // Submit Feedback
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/reviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Feedback Submitted Successfully");

        setForm({
          admin_id: "",
          faculty_name: "",
          department: "",
          review: "",
        });

        setFacultyList([]);

      } else {
        setMessage(data.message);
      }

    } catch (err) {
      console.log(err);
      setMessage("Server Error");
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Anonymous Staff Feedback
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Your identity will never be shared with the faculty.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Department */}

          <div>
            <label className="block font-semibold mb-2">
              Department / Club
            </label>

            <select
              value={form.department}
              onChange={handleDepartmentChange}
              className="w-full border rounded-lg p-3"
              required
            >
              <option value="">Select Department / Club</option>

              <optgroup label="Departments">
                {departments.slice(0, 14).map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </optgroup>

              <optgroup label="Clubs">
                {departments.slice(14).map((club) => (
                  <option key={club} value={club}>
                    {club}
                  </option>
                ))}
              </optgroup>

            </select>
          </div>

          {/* Faculty */}

          <div>
            <label className="block font-semibold mb-2">
              Faculty / Coordinator
            </label>

            <select
              value={form.faculty_name}
              onChange={handleFacultyChange}
              className="w-full border rounded-lg p-3"
              required
              disabled={facultyList.length === 0}
            >
              <option value="">Select Faculty</option>

              {facultyList.map((faculty) => (
                <option
                  key={faculty.id}
                  value={faculty.full_name}
                >
                  {faculty.full_name}
                </option>
              ))}

            </select>
          </div>

          {/* Feedback */}

          <div>
            <label className="block font-semibold mb-2">
              Feedback
            </label>

            <textarea
              rows="6"
              value={form.review}
              onChange={handleReviewChange}
              placeholder="Write your anonymous feedback..."
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            Submit Feedback
          </button>

        </form>

        {message && (
          <div className="mt-6 text-center font-semibold text-green-600">
            {message}
          </div>
        )}

      </div>
    </MainLayout>
  );
}

export default StaffFeedback;