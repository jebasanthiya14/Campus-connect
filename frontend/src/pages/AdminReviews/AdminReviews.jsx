import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";

function AdminReviews() {

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {

      const res = await fetch("http://localhost:5000/api/reviews/admin/all");

      const data = await res.json();

      setReviews(data);

    } catch (err) {
      console.log(err);
    }
  };

  const deleteReview = async (id) => {

    if (!window.confirm("Delete this review?")) return;

    await fetch(
      `http://localhost:5000/api/reviews/admin/delete/${id}`,
      {
        method: "DELETE",
      }
    );

    fetchReviews();
  };

  return (
    <MainLayout>

      <div className="p-8">

        <h1 className="text-3xl font-bold text-blue-700 mb-8">
          Staff Reviews
        </h1>

        <div className="overflow-x-auto">

          <table className="w-full bg-white rounded-xl shadow">

            <thead className="bg-blue-600 text-white">

              <tr>

                <th className="p-3">
                  Faculty
                </th>

                <th>
                  Department
                </th>

                <th>
                  Review
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {reviews.length === 0 ? (

                <tr>

                  <td
                    colSpan="4"
                    className="text-center py-6"
                  >
                    No Reviews Found
                  </td>

                </tr>

              ) : (

                reviews.map((review) => (

                  <tr
                    key={review.id}
                    className="border-b text-center"
                  >

                    <td className="p-3">
                      {review.faculty_name}
                    </td>

                    <td>
                      {review.department}
                    </td>

                    <td className="px-4">
                      {review.review}
                    </td>

                    <td>

                      <button
                        onClick={() => deleteReview(review.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded"
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

    </MainLayout>
  );
}

export default AdminReviews;