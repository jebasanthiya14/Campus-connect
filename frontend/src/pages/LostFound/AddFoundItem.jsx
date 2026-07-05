import { useState } from "react";
import MainLayout from "../../components/layout/MainLayout";

function AddFoundItem() {
  const [form, setForm] = useState({
    item_name: "",
    colour: "",
    category: "",
    description: "",
    pickup_location: "",
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("image", image);
    formData.append("item_name", form.item_name);
    formData.append("colour", form.colour);
    formData.append("category", form.category);
    formData.append("description", form.description);
    formData.append("pickup_location", form.pickup_location);

    try {
      const response = await fetch(
        "http://localhost:5000/api/lostfound",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Item uploaded successfully.");

        setForm({
          item_name: "",
          colour: "",
          category: "",
          description: "",
          pickup_location: "",
        });

        setImage(null);

        document.getElementById("image").value = "";
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.log(error);
      setMessage("Server Error");
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Found an Item?
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="text"
            name="item_name"
            placeholder="Item Name"
            value={form.item_name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="text"
            name="colour"
            placeholder="Colour"
            value={form.colour}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <textarea
            rows="4"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="text"
            name="pickup_location"
            placeholder="Pickup Location (Hidden)"
            value={form.pickup_location}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
          >
            Upload Found Item
          </button>

        </form>

        {message && (
          <p className="mt-5 text-center text-green-600 font-semibold">
            {message}
          </p>
        )}

      </div>
    </MainLayout>
  );
}

export default AddFoundItem;