function Events() {
  const events = [
    {
      title: "AI Workshop",
      department: "CSE",
      date: "10 July 2026",
      deadline: "5 July 2026",
    },
    {
      title: "Hackathon",
      department: "IT",
      date: "20 July 2026",
      deadline: "15 July 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-blue-600 mb-8">
        Events & Workshops
      </h1>

      <input
        type="text"
        placeholder="Search Events..."
        className="w-full border rounded-lg p-3 mb-8"
      />

      <div className="grid md:grid-cols-2 gap-6">

        {events.map((event, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-6"
          >

            <h2 className="text-2xl font-bold">
              {event.title}
            </h2>

            <p>Department : {event.department}</p>

            <p>Date : {event.date}</p>

            <p>Registration Ends : {event.deadline}</p>

            <button className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg">
              Register
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Events;