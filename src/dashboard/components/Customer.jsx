import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BiDownload } from "react-icons/bi";

const Customer = () => {
  const [drivers, setDrivers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${API_BASE_URL}/drivers`)
      .then((res) => res.json())
      .then((data) => setDrivers(data))
      .catch((error) => console.error("Error fetching drivers:", error));
  }, [API_BASE_URL]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDrivers = drivers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(drivers.length / itemsPerPage);

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

  const exportCSV = () => {
    const headers = ["Index", "Owner Name", "Vehicle Name", "RFID Tag", "Bank Number", "Registered Date"];
    const csvRows = [
      headers.join(","), 
      ...drivers.map((driver, index) => [
        index + 1, 
        driver.ownerName,
        driver.vehicle_name,
        driver.user_id,
        driver.BankNumber,
        formatDate(driver.created_at),
      ].join(",")),
    ];

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "drivers_data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Registered Vehicles</h2>
        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={exportCSV}
        >
          <BiDownload size={18} />
          Export
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 shadow-md rounded-lg">
          <thead className="border-b ">
            <tr>
              <th className="p-3 text-center">index</th>
              <th className="p-3 text-center">Owner Name</th>
              <th className="p-3 text-center">Vehicle Name</th>
              <th className="p-3 text-center">RFID Tag</th>
              <th className="p-3 text-center">Bank Number</th>
              <th className="p-3 text-center">Booking Status</th>
              <th className="p-3 text-center">Registered Date</th>
            </tr>
          </thead>
          <tbody>
            {currentDrivers.map((driver, index) => (
              <tr key={driver.id} className="border-b">
                <td className="p-3 text-center">{indexOfFirstItem + index + 1}</td>
                <td className="p-3 text-center">{driver.ownerName}</td>
                <td className="p-3 text-center ">
                   {driver.vehicle_name}
                </td>
                <td className="p-3 text-center">{driver.user_id}</td>
                <td className="p-3 text-center">{driver.BankNumber}</td>

                {driver.slot_id ? (
                  <td className="p-3 text-center">
                    <span className="px-2 py-1 rounded-lg text-white bg-green-500">
                      Slot {driver.slot_number} 🟢
                    </span>
                  </td>
                ) : (
                  <td className="p-3 text-center">
                    <span className="px-2 py-1 rounded-lg text-white bg-red-500">
                      🔴
                    </span>
                  </td>
                )}

                <td className="p-3">{formatDate(driver.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
    </div>
  );
};

export default Customer;
