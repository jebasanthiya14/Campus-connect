import { useState } from "react";
import MainLayout from "../../components/layout/MainLayout";

function CGPA() {
  const [count, setCount] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [cgpa, setCgpa] = useState(null);

  // Generate subject rows
  const createSubjects = () => {
    const arr = [];
    for (let i = 0; i < Number(count); i++) {
      arr.push({
        credit: "",
        grade: "",
      });
    }
    setSubjects(arr);
    setCgpa(null);
  };

  // Handle input changes
  const handleChange = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };

  // Calculate CGPA
  const calculateCGPA = async () => {
    let totalCredits = 0;
    let totalGradePoints = 0;

    for (let i = 0; i < subjects.length; i++) {
      const credit = Number(subjects[i].credit);
      const grade = Number(subjects[i].grade);

      if (
        isNaN(credit) ||
        isNaN(grade) ||
        credit <= 0 ||
        grade < 0 ||
        grade > 10
      ) {
        alert(
          `Please enter valid Credit and Grade Point for Subject ${
            i + 1
          }`
        );
        return;
      }

      totalCredits += credit;
      totalGradePoints += credit * grade;
    }

   const result = (totalGradePoints / totalCredits).toFixed(2);

setCgpa(result);
const user = JSON.parse(localStorage.getItem("user"));

await fetch("http://localhost:5000/api/cgpa", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userId: user.id,
    cgpa: result,
  }),
});

// Save CGPA for Dashboard
localStorage.setItem("cgpa", result);
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold text-blue-600 mb-2">
          🎓 CGPA Calculator
        </h1>

        <p className="text-gray-600 mb-6">
          Enter the number of subjects, credits and grade points to calculate your CGPA.
        </p>

        {/* Number of Subjects */}
        <div className="flex items-center gap-4 mb-6">

          <label className="font-semibold">
            Number of Subjects
          </label>

          <input
            type="number"
            min="1"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="border rounded-lg px-3 py-2 w-28"
          />

          <button
            onClick={createSubjects}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Generate
          </button>

        </div>

        {/* Subject Table */}
        {subjects.length > 0 && (
          <>
            <table className="w-full border border-gray-300">

              <thead className="bg-blue-600 text-white">

                <tr>
                  <th className="border p-3">Subject</th>
                  <th className="border p-3">Credits</th>
                  <th className="border p-3">Grade Point (0-10)</th>
                </tr>

              </thead>

              <tbody>

                {subjects.map((subject, index) => (
                  <tr key={index}>

                    <td className="border p-3 text-center">
                      Subject {index + 1}
                    </td>

                    <td className="border p-3 text-center">
                      <input
                        type="number"
                        min="1"
                        value={subject.credit}
                        onChange={(e) =>
                          handleChange(index, "credit", e.target.value)
                        }
                        className="border rounded px-2 py-1 w-24 text-center"
                      />
                    </td>

                    <td className="border p-3 text-center">
                      <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        value={subject.grade}
                        onChange={(e) =>
                          handleChange(index, "grade", e.target.value)
                        }
                        className="border rounded px-2 py-1 w-24 text-center"
                      />
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

            <div className="text-center mt-8">

              <button
                onClick={calculateCGPA}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700"
              >
                Calculate CGPA
              </button>

            </div>
          </>
        )}

        {/* Result */}
        {cgpa !== null && (
          <div className="mt-10 bg-blue-100 rounded-xl p-6 text-center">

            <h2 className="text-2xl font-bold">
              Your CGPA
            </h2>

            <p className="text-6xl font-bold text-blue-700 mt-4">
              {cgpa}
            </p>

            <p className="mt-3 text-gray-700">
              Formula Used:
            </p>

            <p className="font-semibold mt-2">
              CGPA = Σ(Credit × Grade Point) ÷ Σ(Credits)
            </p>

          </div>
        )}

      </div>
    </MainLayout>
  );
}

export default CGPA;