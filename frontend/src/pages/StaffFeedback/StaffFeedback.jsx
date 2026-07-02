import { useState } from "react";
import MainLayout from "../../components/layout/MainLayout";

function StaffFeedback() {
  const [form, setForm] = useState({
    faculty_name: "",
    department: "",
    review: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);

        setForm({
          faculty_name: "",
          department: "",
          review: "",
        });
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("Server Error");
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Anonymous Staff Feedback
        </h1>

        <p className="text-gray-600 mb-8 text-center">
          Your identity will never be shared with the faculty.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block font-semibold mb-2">
              Faculty Name
            </label>

            <input
              type="text"
              name="faculty_name"
              value={form.faculty_name}
              onChange={handleChange}
              placeholder="Enter Faculty Name"
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Department
            </label>

            <input
              type="text"
              name="department"
              value={form.department}
              onChange={handleChange}
              placeholder="Enter Department"
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Feedback
            </label>

            <textarea
              rows="6"
              name="review"
              value={form.review}
              onChange={handleChange}
              placeholder="Write your anonymous feedback..."
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg w-full"
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