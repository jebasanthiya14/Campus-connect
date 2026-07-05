import { useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";

function ClaimItem() {
  const { id } = useParams();

  const [form, setForm] = useState({
    item_name: "",
    colour: "",
    description: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/lostfound/verify/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();
      setResult(data);

    } catch (err) {
      console.log(err);

      setResult({
        success: false,
        message: "Server Error",
      });
    }
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold text-center mb-8">
          Claim Found Item
        </h1>

        <form
          onSubmit={handleVerify}
          className="space-y-5"
        >

          <input
            type="text"
            name="item_name"
            placeholder="Item Name"
            value={form.item_name}
            onChange={handleChange}
            className="w-full border rounded p-3"
            required
          />

          <input
            type="text"
            name="colour"
            placeholder="Colour"
            value={form.colour}
            onChange={handleChange}
            className="w-full border rounded p-3"
            required
          />

          <textarea
            rows="4"
            name="description"
            placeholder="Describe the item"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded p-3"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
          >
            Verify Ownership
          </button>

        </form>

        {result && (

          <div className="mt-8">

            {result.success ? (

              <div className="bg-green-100 border border-green-400 rounded-lg p-5">

                <h2 className="text-2xl font-bold text-green-700">
                  ✅ Verification Successful
                </h2>

                <p className="mt-4">
                  Pickup Location:
                </p>

                <p className="font-bold text-lg">
                  {result.pickup_location}
                </p>

              </div>

            ) : (

              <div className="bg-red-100 border border-red-400 rounded-lg p-5">

                <h2 className="text-2xl font-bold text-red-700">
                  ❌ Verification Failed
                </h2>

                <p className="mt-3">
                  {result.message}
                </p>

              </div>

            )}

          </div>

        )}

      </div>
    </MainLayout>
  );
}

export default ClaimItem;