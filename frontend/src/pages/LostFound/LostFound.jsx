import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";

function LostFound() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/lostfound"
      );

      const data = await response.json();

      setItems(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold">
            🔍 Lost & Found
          </h1>

          <Link
            to="/add-found-item"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            + Found an Item
          </Link>

        </div>

        {items.length === 0 ? (

          <div className="bg-white rounded-xl shadow p-10 text-center">

            <h2 className="text-2xl font-semibold">
              No Found Items Yet
            </h2>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {items.map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >

                <img
                  src={`http://localhost:5000/uploads/${item.image}`}
                  alt="Found Item"
                  className="w-full h-56 object-cover"
                />

                <div className="p-5">

                  <h2 className="text-xl font-bold">
                    {item.category}
                  </h2>

                  <p className="mt-2 text-gray-600">
                    Found On:
                  </p>

                  <p>
                    {new Date(item.created_at).toLocaleDateString()}
                  </p>

                  <Link
                    to={`/claim-item/${item.id}`}
                    className="inline-block mt-5 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
                  >
                    Claim Item
                  </Link>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </MainLayout>
  );
}

export default LostFound;