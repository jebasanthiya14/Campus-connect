import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";

const API = "http://localhost:5000/api/circulars";

function AdminCirculars() {
  const [circulars, setCirculars] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCirculars();
  }, []);

  const fetchCirculars = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setCirculars(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.description ||
      !form.date
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editingId) {
        await fetch(`${API}/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        alert("Circular Updated Successfully");
      } else {
        await fetch(API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        alert("Circular Added Successfully");
      }

      setForm({
        title: "",
        description: "",
        date: "",
      });

      setEditingId(null);

      fetchCirculars();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);

    setForm({
      title: item.title,
      description: item.description,
      date: item.date.split("T")[0],
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this circular?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      fetchCirculars();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainLayout>
      <div className="p-8">

        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Manage Circulars
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-6"
        >

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="font-semibold">
                Circular Title
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            <div>
              <label className="font-semibold">
                Date
              </label>

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

          </div>

          <div className="mt-5">
            <label className="font-semibold">
              Description
            </label>

            <textarea
              rows="4"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-6 hover:bg-blue-700"
          >
            {editingId ? "Update Circular" : "Add Circular"}
          </button>

        </form>

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-5">
            All Circulars
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full bg-white shadow rounded-xl">

              <thead className="bg-blue-600 text-white">

                <tr>

                  <th className="p-3">Title</th>

                  <th>Description</th>

                  <th>Date</th>

                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {circulars.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-6"
                    >
                      No Circulars Found
                    </td>
                  </tr>
                ) : (
                  circulars.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b text-center"
                    >
                      <td className="p-3">
                        {item.title}
                      </td>

                      <td>
                        {item.description}
                      </td>

                      <td>
                        {item.date?.split("T")[0]}
                      </td>

                      <td>

                        <button
                          onClick={() =>
                            handleEdit(item)
                          }
                          className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(item.id)
                          }
                          className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>

                      </td>

                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </MainLayout>
  );
}

export default AdminCirculars;