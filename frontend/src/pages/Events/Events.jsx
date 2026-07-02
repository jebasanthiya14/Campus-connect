import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.log(err));
  }, []);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">
        Events & Workshops
      </h1>

      <input
        type="text"
        placeholder="Search Events..."
        className="w-full border rounded-lg p-3 mb-8"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid md:grid-cols-2 gap-6">
        {filteredEvents.length === 0 ? (
          <p>No events found.</p>
        ) : (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow p-6"
            >
              <h2 className="text-2xl font-bold">
                {event.title}
              </h2>

              <p>Department : {event.department}</p>

              <p>Location : {event.location}</p>

              <p>
                Date :{" "}
                {new Date(event.event_date).toLocaleDateString()}
              </p>

              <p>
                Registration Ends :{" "}
                {new Date(
                  event.registration_deadline
                ).toLocaleDateString()}
              </p>

             <button
    onClick={() => navigate(`/register/${event.id}`)}
    className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
>
    Register
</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Events;