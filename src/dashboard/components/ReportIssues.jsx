import React, { useState, useEffect, useCallback } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const ReportIssues = () => {
  const [rating, setRating] = useState(1);
  const [hover, setHover] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(8); // Customize the number of rows per page
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const storedUserInfos = JSON.parse(localStorage.getItem("userInfos"));
  const user_id = storedUserInfos ? storedUserInfos.user_id : null;

  const fetchFeedbacks = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get-feedbacks`, {
        params: { user_id },
      });
      setFeedbacks(response.data.feedbacks);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      alert("Failed to load feedbacks.");
    }
  }, [API_BASE_URL, user_id]);

  useEffect(() => {
    if (user_id === "1000") {
      fetchFeedbacks();
    }
  }, [user_id, fetchFeedbacks]);

  const handleSubmitFeedback = async () => {
    if (!rating || !feedback) {
      alert("Please provide a rating and describe the issue.");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/submit-feedback`, {
        feedback_by: user_id,
        feedback_desc: feedback,
        rate: rating,
      });

      alert(response.data.message);
      setShowForm(false);
      setFeedback("");
      setRating(1);
      if (user_id === "1000") fetchFeedbacks();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again.");
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Function to get the feedbacks for the current page
  const paginateFeedbacks = (feedbacks) => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return feedbacks.slice(start, end);
  };

  const paginatedFeedbacks = paginateFeedbacks(feedbacks);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {user_id !== "1000" && (
        <button
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
          onClick={() => setShowForm(true)}
        >
          <HiOutlineExclamationCircle size={24} /> Report Issue
        </button>
      )}

      {showForm && user_id !== "1000" && (
        <div className="mt-6 w-full max-w-md bg-white p-6 rounded-lg shadow-lg ">
          <h2 className="text-xl font-semibold mb-4 text-black">
            Report an Issue
          </h2>
          <label className="block mb-2 text-black">Rating:</label>
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, index) => {
              const currentRating = index + 1;
              return (
                <FaStar
                  key={index}
                  size={24}
                  className={`cursor-pointer ${
                    currentRating <= (hover || rating)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                  onClick={() => setRating(currentRating)}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                />
              );
            })}
          </div>
          <label className="block mt-4 mb-2 text-black">
            Describe the Issue:
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="border p-2 rounded w-full text-black"
            rows="3"
          />
          <div className="mt-4 flex justify-end">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400"
              onClick={handleSubmitFeedback}
            >
              Submit
            </button>
            <button
              className="ml-2 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-300"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {user_id === "1000" && (
        <div className="mt-8 w-full max-w-4xl p-6 rounded-lg shadow-lg">
          {feedbacks.length === 0 ? (
            <div className="text-white bg-yellow-400 text-2xl font-semibold text-center my-20">
              No Reported Issues
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4  text-white">
                Report Issues
              </h2>
              <table className="w-full border-collapse border bg-zinc-950 border-gray-300">
                <thead>
                  <tr className="bg-gray-900">
                    <th className="border p-2">Index</th>
                    <th className="border p-2">User ID</th>
                    <th className="border p-2">Issues</th>
                    <th className="border p-2">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedFeedbacks.map((fb) => (
                    <tr key={fb.id} className="border hover:bg-zinc-800">
                      <td className="border p-2 text-center text-white">
                        {fb.id}
                      </td>
                      <td className="border p-2 text-center text-white">
                        {fb.feedback_by}
                      </td>
                      <td className="border p-2 text-white">
                        {fb.feedback_desc}
                      </td>
                      <td className="border p-2 text-center text-white">
                        {fb.rate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Controls */}
          <div className="mt-4 flex justify-center">
            {currentPage > 1 && (
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg mr-2 hover:bg-zinc-600"
              >
                <AiOutlineArrowLeft size={20} />
              </button>
            )}

            {currentPage < Math.ceil(feedbacks.length / rowsPerPage) && (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg ml-2 hover:bg-zinc-600"
              >
                <AiOutlineArrowRight size={20} />
              </button>
            )}
          </div>
          <div className="flex justify-center mt-4">
                <span className="text-white">
                {currentPage} / {Math.ceil(feedbacks.length / rowsPerPage)}
                </span>
                </div>
            
        </div>
        
      )}
     
    </div>
  );
};

export default ReportIssues;
