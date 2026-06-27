import { useState } from "react";

function AdminEvents() {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    department: "",
    location: "",
    event_date: "",
    registration_deadline: "",
  });

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("✅ Event Added Successfully");

      setEvent({
        title: "",
        description: "",
        department: "",
        location: "",
        event_date: "",
        registration_deadline: "",
      });

    } catch (err) {
      console.log(err);
      alert("Server Error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white p-8 rounded-xl shadow-lg w-[550px]">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Add Event
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="title"
            placeholder="Event Title"
            value={event.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={event.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="department"
            placeholder="Department"
            value={event.department}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="location"
            placeholder="Venue"
            value={event.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <div>
            <label className="font-semibold">
              Event Date
            </label>

            <input
              type="date"
              name="event_date"
              value={event.event_date}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="font-semibold">
              Registration Deadline
            </label>

            <input
              type="date"
              name="registration_deadline"
              value={event.registration_deadline}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Add Event
          </button>

        </form>

      </div>

    </div>
  );
}

export default AdminEvents;