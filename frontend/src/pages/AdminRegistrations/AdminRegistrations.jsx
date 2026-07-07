import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";

function AdminRegistrations() {
  const [registrations, setRegistrations] = useState([]);

  const admin = JSON.parse(localStorage.getItem("admin"));

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/registrations/${encodeURIComponent(
          admin.department
        )}`
      );

      const data = await res.json();

      setRegistrations(data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainLayout>

      <div className="p-6">

        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Event Registrations
        </h1>

        <p className="mb-6 text-gray-600">
          Department / Club : <b>{admin.department}</b>
        </p>

        {registrations.length === 0 ? (

          <div className="bg-white rounded-xl shadow p-10 text-center">

            <h2 className="text-2xl font-semibold">
              No Registrations Yet
            </h2>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full border-collapse bg-white shadow rounded-lg">

              <thead>

                <tr className="bg-blue-600 text-white">

                  <th className="p-3">Event</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Roll No</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Venue</th>
                  <th className="p-3">Event Date</th>

                </tr>

              </thead>

              <tbody>

                {registrations.map((reg) => (

                  <tr
                    key={reg.id}
                    className="border-b text-center"
                  >

                    <td className="p-3">{reg.title}</td>
                    <td className="p-3">{reg.student_name}</td>
                    <td className="p-3">{reg.roll_no}</td>
                    <td className="p-3">{reg.student_department}</td>
                    <td className="p-3">{reg.location}</td>
                    <td className="p-3">
                      {new Date(reg.event_date).toLocaleDateString()}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </MainLayout>
  );
}

export default AdminRegistrations;