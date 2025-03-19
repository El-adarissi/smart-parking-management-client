import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BiDownload } from "react-icons/bi";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const storedUserInfos = JSON.parse(localStorage.getItem("userInfos"));
  const user_id = storedUserInfos ? storedUserInfos.user_id : null;
  const itemsPerPage = 9;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (user_id) {
      fetch(`${API_BASE_URL}/booking-history?user_id=${user_id}`)
        .then((res) => res.json())
        .then((data) => setBookings(data))
        .catch((error) =>
          console.error("Error fetching booking history:", error)
        );
    }
  }, [user_id,API_BASE_URL]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = bookings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toUTCString().slice(0, 16);
  };

  const calculateTimePassed = (entryTime, exitTime) => {
    const entryDate = new Date(entryTime);
    const exitDate = new Date(exitTime);
    const timeDiff = Math.abs(exitDate - entryDate);

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  };

  const exportCSV = () => {
    const headers = [
      "Index",
      "Owner Name",
      "Vehicle Name",
      "Slot Number",
      "Entry Time",
      "Exit Time",
      "Hours",
      "Minutes",
      "Seconds",
    ];

    const csvRows = [
      headers.join(","),
      ...bookings.map((booking, index) => {
        const { hours, minutes, seconds } = calculateTimePassed(
          booking.entry_time,
          booking.exit_time
        );

        return [
          index + 1,
          booking.ownerName,
          booking.vehicle_name,
          booking.slot_number,
          formatDate(booking.entry_time),
          formatDate(booking.exit_time),
          hours,
          minutes,
          seconds,
        ].join(",");
      }),
    ];

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "booking_history.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Booking History</h2>
        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={exportCSV}
        >
          <BiDownload size={18} />
          Export
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-6 my-20 bg-yellow-400 text-3xl text-white">
          No Booking
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 shadow-md rounded-lg">
              <thead className="border-b ">
                <tr>
                  <th className="p-3 text-center">Index</th>
                  <th className="p-3 text-center">Owner Name</th>
                  <th className="p-3 text-center">Vehicle Name</th>
                  <th className="p-3 text-center">Slot Number</th>
                  <th className="p-3 text-center">Entry Time</th>
                  <th className="p-3 text-center">Exit Time</th>
                  <th className="p-3 text-center">Hours</th>
                  <th className="p-3 text-center">Minutes</th>
                  <th className="p-3 text-center">Seconds</th>
                </tr>
              </thead>
              <tbody>
                {currentBookings.map((booking, index) => {
                  const { hours, minutes, seconds } = calculateTimePassed(
                    booking.entry_time,
                    booking.exit_time
                  );
                  return (
                    <tr key={index} className="border-b">
                      <td className="p-3 text-center">
                        {indexOfFirstItem + index + 1}
                      </td>
                      <td className="p-3 text-center">{booking.ownerName}</td>
                      <td className="p-3 text-center">
                        {booking.vehicle_name}
                      </td>
                      <td className="p-3 text-center">{booking.slot_number}</td>
                      <td className="p-3 text-center">
                        {formatDate(booking.entry_time)}
                      </td>
                      <td className="p-3 text-center">
                        {formatDate(booking.exit_time)}
                      </td>
                      <td className="p-3 text-center">{hours}</td>
                      <td className="p-3 text-center">{minutes}</td>
                      <td className="p-3 text-center">{seconds}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4 space-x-4">
            <button
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-zinc-600"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <AiOutlineArrowLeft size={20} />
            </button>
            <span className="text-lg font-semibold">
              {currentPage} / {totalPages}
            </span>
            <button
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-zinc-600"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <AiOutlineArrowRight size={20} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingHistory;
