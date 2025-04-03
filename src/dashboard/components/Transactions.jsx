import React, { useState, useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BiDownload } from "react-icons/bi";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isGeneratingCSV, setIsGeneratingCSV] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  const storedUserInfos = JSON.parse(localStorage.getItem("userInfos"));
  const user_id = storedUserInfos ? storedUserInfos.user_id : null;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/transactions?user_id=${user_id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        if (data.success && Array.isArray(data.transactions)) {
          setTransactions(data.transactions);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (user_id) {
      fetchTransactions();
    } else {
      setError("User not authenticated");
      setLoading(false);
    }
  }, [user_id, API_BASE_URL]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstRow,
    indexOfLastRow
  );
  const totalPages = Math.ceil(transactions.length / rowsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const downloadJSON = () => {
    const data = {
      system: "Parking Management",
      tariff: "1.2$ per hour",
      transactions: transactions,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `parking_data_${user_id}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSV = () => {
    setIsGeneratingCSV(true);
    try {
      const headers = [
        "ID",
        "User",
        "Slot",
        "Vehicle",
        "Entry Time",
        "Exit Time",
        "Duration (hrs)",
        "Amount ($)",
        "Status",
      ];
      const rows = transactions.map((t) => [
        t.transaction_id,
        t.user_id,
        t.slot_number,
        t.vehicle_name,
        new Date(t.entry_time).toLocaleString(),
        t.exit_time ? new Date(t.exit_time).toLocaleString() : "Active",
        t.duration_hours?.toFixed(2) || "0.00",
        t.amount?.toFixed(2) || "0.00",
        t.status?.toUpperCase() || "UNKNOWN",
      ]);
      let csv = headers.join(",") + "\n";
      rows.forEach((row) => (csv += row.join(",") + "\n"));
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `parking_transactions_${new Date()
        .toISOString()
        .slice(0, 10)}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError("CSV generation failed: " + err.message);
    } finally {
      setIsGeneratingCSV(false);
    }
  };

  if (loading) return <div className="p-4">Loading transactions...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (transactions.length === 0)
    return (
      <div className="text-center py-6 my-20 bg-yellow-400 text-3xl text-white">
        No Transactions Found
      </div>
    );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {user_id === "1000" ? "All Transactions" : "Parking Transactions History"}
      </h1>
      <h5 className="mb-4 mt-5 text-center text-yellow-400">You Spent 1.2$ per hour</h5>

      <div className="flex justify-between mb-4">
        <button
          onClick={downloadJSON}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        > <BiDownload size={18} />
           JSON
        </button>
        <button
          onClick={downloadCSV}
          disabled={isGeneratingCSV}
          className={`flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 ${
            isGeneratingCSV ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          } text-white rounded`}
        >
          <BiDownload size={18} />
          {isGeneratingCSV ? "Generating..." : "CSV"}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 bg-zinc-950 shadow-md ">
          <thead className="bg-gray-900 text-white">
            <tr>
              {user_id === "1000" && <th className="p-2">User</th>}
              <th className="p-2">Vehicle</th>
              <th className="p-2">Slot</th>
              <th className="p-2">Entry Time</th>
              <th className="p-2">Exit Time</th>
              <th className="p-2">Duration</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody className="">
            {currentTransactions.map((txn) => (
              <tr
                key={txn.transaction_id}
                className="border-b hover:bg-zinc-800"
              >
                {user_id === "1000" && <td className="p-2">{txn.user_id}</td>}
                <td className="p-2">{txn.vehicle_name}</td>
                <td className="p-2">{txn.slot_number}</td>
                <td className="p-2">
                  {new Date(txn.entry_time).toLocaleString()}
                </td>
                <td className="p-2">
                  {txn.exit_time
                    ? new Date(txn.exit_time).toLocaleString()
                    : "-"}
                </td>
                <td className="p-2">{txn.duration_hours.toFixed(2)} hrs</td>
                <td className="p-2 font-medium">${txn.amount.toFixed(2)}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      txn.status === "completed"
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {txn.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center mt-4 space-x-4">
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-zinc-600"
            >
              <AiOutlineArrowLeft size={20} />
            </button>
          )}
          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-zinc-600"
            >
              <AiOutlineArrowRight size={20} />
            </button>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <span className="text-white">
            {currentPage} / {totalPages}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
