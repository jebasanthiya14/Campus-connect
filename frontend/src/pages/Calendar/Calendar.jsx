function Calendar() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-blue-600 mb-8">
        Academic Calendar
      </h1>

      <div className="bg-white rounded-xl shadow p-6">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">Event</th>

              <th className="text-left py-3">Date</th>

            </tr>

          </thead>

          <tbody>

            <tr>

              <td className="py-3">Semester Begins</td>

              <td>15 July 2026</td>

            </tr>

            <tr>

              <td className="py-3">Internal Exam</td>

              <td>20 August 2026</td>

            </tr>

            <tr>

              <td className="py-3">Semester Exam</td>

              <td>15 November 2026</td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Calendar;