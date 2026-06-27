import { useState } from "react";

function CGPA() {
  const [gpa, setGpa] = useState("");
  const [cgpa, setCgpa] = useState("");

  function calculate() {
    setCgpa(gpa);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-blue-600 mb-8">
        CGPA Calculator
      </h1>

      <div className="bg-white rounded-xl shadow p-6 max-w-md">

        <input
          type="number"
          placeholder="Enter GPA"
          value={gpa}
          onChange={(e) => setGpa(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <button
          onClick={calculate}
          className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg w-full"
        >
          Calculate
        </button>

        {cgpa && (
          <h2 className="mt-5 text-2xl font-bold">
            CGPA : {cgpa}
          </h2>
        )}

      </div>

    </div>
  );
}

export default CGPA;