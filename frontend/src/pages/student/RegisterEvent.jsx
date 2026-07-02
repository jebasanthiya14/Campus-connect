import { useParams } from "react-router-dom";

function RegisterEvent() {
  const { id } = useParams();

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-3xl font-bold mb-6">Event Registration</h1>

      <p className="mb-6">
        Registering for Event ID: <strong>{id}</strong>
      </p>

      <form>
        <input
          type="text"
          placeholder="Roll Number"
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="text"
          placeholder="Student Name"
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="text"
          placeholder="Department"
          className="w-full border p-3 rounded mb-4"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Submit Registration
        </button>
      </form>
    </div>
  );
}

export default RegisterEvent;