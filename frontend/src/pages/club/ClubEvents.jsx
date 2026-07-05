import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";

function ClubEvents() {
  const [clubEvents, setClubEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => {
        const clubs = data.filter((event) => event.club_name);
        setClubEvents(clubs);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <MainLayout>
      <div className="p-6">

        <h1 className="text-3xl font-bold text-pink-600 mb-6">
          🎉 Club Events
        </h1>

        {clubEvents.length === 0 ? (
          <p>No Club Events Available.</p>
        ) : (
          clubEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white shadow rounded-xl p-6 mb-5"
            >
              <h2 className="text-2xl font-bold text-blue-600">
                {event.title}
              </h2>

              <p className="mt-2">
                <strong>Club:</strong> {event.club_name}
              </p>

              <p>
                <strong>Description:</strong> {event.description}
              </p>

              <p>
                <strong>Venue:</strong> {event.location}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(event.event_date).toLocaleDateString()}
              </p>
            </div>
          ))
        )}

      </div>
    </MainLayout>
  );
}

export default ClubEvents;