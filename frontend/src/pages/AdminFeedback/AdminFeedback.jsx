import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";

function AdminFeedback() {

  const [reviews, setReviews] = useState([]);

  useEffect(() => {

    const admin = JSON.parse(localStorage.getItem("admin"));

    if (!admin) return;

    fetch(
      `http://localhost:5000/api/reviews/my-feedback/${admin.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });

  }, []);

  return (
    <MainLayout>

      <div className="max-w-5xl mx-auto p-6">

        <h1 className="text-4xl font-bold text-blue-600 mb-8">
          Anonymous Feedback
        </h1>

        {reviews.length === 0 ? (

          <div className="bg-white rounded-xl shadow p-10 text-center">

            <h2 className="text-2xl font-semibold">
              No Feedback Yet
            </h2>

          </div>

        ) : (

          <div className="space-y-5">

            {reviews.map((review, index) => (

              <div
                key={index}
                className="bg-white rounded-xl shadow p-6"
              >

                <h2 className="text-xl font-bold text-yellow-500">
                  ⭐ Anonymous Student
                </h2>

                <p className="mt-4 text-gray-700">
                  {review.review}
                </p>

                <p className="text-sm text-gray-500 mt-3">
                  {new Date(review.created_at).toLocaleDateString()}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

    </MainLayout>
  );
}

export default AdminFeedback;