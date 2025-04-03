/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const MangeSlots = () => {
  const [slots, setSlots] = useState([]);
  const [totalSlots, setTotalSlots] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [newSlot, setNewSlot] = useState("");
  const [error, setError] = useState("");
  const [editingSlot, setEditingSlot] = useState(null);
  const [editedSlotNumber, setEditedSlotNumber] = useState("");
  const [editedOccupiedStatus, setEditedOccupiedStatus] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchSlots = async (page = 1) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/get-slots-args?page=${page}&per_page=6`
      );
      setSlots(response.data.slots || []);
      setTotalSlots(response.data.total);
      setTotalPages(response.data.pages);
      setCurrentPage(response.data.current_page);
    } catch (error) {
      setError("Failed to load slots");
    }
  };

  useEffect(() => {
    fetchSlots(currentPage);
  }, [currentPage, API_BASE_URL]);

  const handleAddSlot = async () => {
    if (!newSlot.trim()) {
      setError("Slot number is required");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/add-slot`, {
        slot_number: newSlot,
      });

      if (response.status === 201) {
        // Refresh the slots data from server instead of adding locally
        fetchSlots(currentPage);
        setNewSlot("");
        setError("");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || "Something went wrong");
      } else {
        setError("Network error");
      }
    }
  };

  const handleEdit = (slot) => {
    setEditingSlot(slot);
    setEditedSlotNumber(slot.slot_number); // Use slot_number instead of slotNumber
    setEditedOccupiedStatus(slot.status === "occupied");
  };

  const handleSaveEdit = async () => {
    if (!editedSlotNumber.trim()) {
      setError("Slot number is required");
      return;
    }

    try {
      const response = await axios.put(
        `${API_BASE_URL}/edit-slot/${editingSlot.id}`,
        {
          slot_number: editedSlotNumber,
          status: editedOccupiedStatus ? "occupied" : "free",
        }
      );

      if (response.status === 200) {
        fetchSlots(currentPage); // Refresh data from server
        setEditingSlot(null);
        setError("");
      }
    } catch (error) {
      setError("Failed to update slot");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/delete-slot/${id}`
      );

      if (response.status === 200) {
        fetchSlots(currentPage); // Refresh data from server
        setError("");
      }
    } catch (error) {
      setError("Failed to delete slot");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Parking Slots </h2>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Enter slot number"
          value={newSlot}
          onChange={(e) => setNewSlot(e.target.value)}
          className="px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none w-full sm:w-auto"
        />
        <button
          onClick={handleAddSlot}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-400 focus:outline-none mt-2 sm:mt-0"
        >
          <FaPlus className="mr-2" />
          Add Slot
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      {editingSlot && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Edit Slot</h3>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <input
              type="text"
              value={editedSlotNumber}
              onChange={(e) => setEditedSlotNumber(e.target.value)}
              className="px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none w-full sm:w-auto"
              placeholder="New Slot Number"
            />
            <select
              value={editedOccupiedStatus}
              onChange={(e) =>
                setEditedOccupiedStatus(e.target.value === "true")
              }
              className="px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none w-full sm:w-auto"
            >
              <option value={false}>Available</option>
              <option value={true}>Occupied</option>
            </select>
            <button
              onClick={handleSaveEdit}
              className="inline-flex items-center px-4 py-2 text-sm font-medium bg-blue-500 rounded hover:bg-blue-400 focus:outline-none mt-2 sm:mt-0"
            >
              Save
            </button>
            <button
              onClick={() => setEditingSlot(null)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium bg-gray-500 rounded hover:bg-gray-400 focus:outline-none mt-2 sm:mt-0"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg shadow-md bg-zinc-950">
          <thead >
            <tr>
              <th className="px-6 py-3 text-center text-sm font-medium text-white bg-gray-900">
                Index
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-white bg-gray-900">
                Slot Number
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-white bg-gray-900">
                Status
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-white bg-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(slots) && slots.length > 0 ? (
              slots.map((slot, index) => (
                <tr key={slot.id} className="border-b hover:bg-zinc-800">
                  <td className="px-6 py-4 text-sm text-white text-center">{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-white text-center">
                    {slot.slot_number}
                  </td>
                  <td className="px-6 py-8 text-center text-sm text-white">
                    {slot.status === "free" ? (
                      <span className="bg-green-500 px-2 py-1 rounded-lg text-white">
                        🟢
                      </span>
                    ) : (
                      <span className="bg-red-500 px-2 py-1 rounded-lg text-white">
                        🔴
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-white">
                    <button
                      onClick={() => handleEdit(slot)}
                      className="inline-flex items-center px-4 py-2 mr-5 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                    >
                      <FaEdit className="mr-2" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(slot.id)}
                      className="inline-flex mt-2 items-center px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none"
                    >
                      <FaTrash className="mr-2" /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-4 text-sm text-center text-white"
                >
                  No slots available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination mt-4 flex justify-center items-center gap-4">
        {currentPage > 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-zinc-600"
            disabled={currentPage === 1}
          >
            <AiOutlineArrowLeft size={20} />
          </button>
        )}

        {currentPage < totalPages && (
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-zinc-600 "
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
  );
};

export default MangeSlots;