function Circulars() {
  const circulars = [
    "Semester Fee Payment Notice",
    "Internal Exam Schedule",
    "Workshop Registration Open",
    "Holiday Circular",
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-blue-600 mb-8">
        Circulars
      </h1>

      <div className="space-y-4">

        {circulars.map((item, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl shadow"
          >
            {item}
          </div>
        ))}

      </div>

    </div>
  );
}

export default Circulars;