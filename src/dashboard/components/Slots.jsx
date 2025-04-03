import React, { useState, useEffect } from "react";
import { FaCar } from "react-icons/fa";
import axios from "axios";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Payment from "./Payment";

const SLOTS_PER_PAGE = 9;

const Slots = () => {
  const [slots, setSlots] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [cancellableSlots, setCancellableSlots] = useState({});
  const [userBookedSlot, setUserBookedSlot] = useState(null);
  const storedUserInfos = JSON.parse(localStorage.getItem("userInfos"));
  const user_id = storedUserInfos ? storedUserInfos.user_id : null;
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [rating, setRating] = useState(1);
  const [feedback, setFeedback] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [showPayment, setShowPayment] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        // Fetch all available slots
        const response = await axios.get(`${API_BASE_URL}/get-slots`);
        setSlots(response.data);
        setTotalPages(Math.ceil(response.data.length / SLOTS_PER_PAGE));

        if (user_id) {
          // Fetch the booked slot for the user
          const bookedSlotResponse = await axios.get(
            `${API_BASE_URL}/get-booked-slot/${user_id}`
          );
          setUserBookedSlot(bookedSlotResponse.data?.slotId || null);

          // If user has a booked slot, fetch the booking details
          if (bookedSlotResponse.data?.slotId) {
            const bookingDetailsResponse = await axios.get(
              `${API_BASE_URL}/get-booking-details/${user_id}`
            );

            const { entry_time, exit_time, tarif } =
              bookingDetailsResponse.data;

            // Calculate the payment amount based on entry and exit time, and tarif
            if (entry_time && exit_time && tarif) {
              const entryTime = new Date(entry_time);
              const exitTime = new Date(exit_time);
              const timeDifference = (exitTime - entryTime) / 1000 / 60 / 60; // in hours

              // Set payment amount dynamically
              const calculatedAmount = timeDifference * tarif;
              setPaymentAmount(calculatedAmount); // Dynamically update the payment amount
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSlots();
  }, [user_id, API_BASE_URL]); 


  const handleBookSlot = async (slotId) => {
    if (slots.status === "occupied") {
      alert("Slot is already occupied");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/book-slot/${slotId}/${user_id}`
      );

      if (response.data.message === "Slot booked successfully") {
        setSlots((prevSlots) =>
          prevSlots.map((slot) =>
            slot.id === slotId
              ? { ...slot, status: "occupied", driver_id: user_id }
              : slot
          )
        );
        setUserBookedSlot(slotId);

        setCancellableSlots((prev) => ({
          ...prev,
          [slotId]: setTimeout(() => {
            setCancellableSlots((prev) => {
              const updated = { ...prev };
              delete updated[slotId];
              return updated;
            });
          }, 30000),
        }));

        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error booking slot:", error);
      alert("Slot booking failed. Please try again.");
    }
  };

  const handleCancelSlot = async (slotId) => {
    if (!cancellableSlots[slotId]) return alert("Cancellation time exceeded!");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/cancel-slot/${slotId}`
      );
      setSlots((prevSlots) =>
        prevSlots.map((slot) =>
          slot.id === slotId
            ? { ...slot, status: "free", driver_id: null }
            : slot
        )
      );
      setUserBookedSlot(null);

      clearTimeout(cancellableSlots[slotId]);
      setCancellableSlots((prev) => {
        const updated = { ...prev };
        delete updated[slotId];
        return updated;
      });

      alert(response.data.message);
    } catch (error) {
      console.error("Error cancelling slot:", error);
      alert("Failed to cancel slot. Please try again.");
    }
  };

 
  const handleExitSlot = async (slotId) => {
    try {
      // First, call exit-slot to free up the slot
      await axios.post(`${API_BASE_URL}/exit-slot/${slotId}/${user_id}`);

      // Then fetch booking details to calculate payment
      const bookingDetailsResponse = await axios.get(
        `${API_BASE_URL}/get-booking-details/${user_id}`
      );

      const { entry_time, exit_time, tarif } = bookingDetailsResponse.data;

      if (entry_time && exit_time && tarif) {
        const entryTime = new Date(entry_time);
        const exitTime = new Date(exit_time);
        const timeDifference = (exitTime - entryTime) / 1000 / 60 / 60; // in hours
        const calculatedAmount = timeDifference * tarif;

        // Update the slot status locally
        setSlots((prevSlots) =>
          prevSlots.map((slot) =>
            slot.id === slotId
              ? { ...slot, status: "free", driver_id: null }
              : slot
          )
        );
        setUserBookedSlot(null);

        // Show payment form with calculated amount
        setPaymentAmount(calculatedAmount);
        setShowPayment(true);
      } else {
        throw new Error("Missing booking details for payment calculation");
      }
    } catch (error) {
      console.error("Error exiting slot:", error);
      alert("Failed to exit slot. Please try again.");
    }
  };

  const handlePaymentSuccess = (paymentIntent) => {
    console.log("Payment succeeded:", paymentIntent);
    setShowPayment(false);
     
  };

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

  const paginatedSlots = slots.slice(
    (currentPage - 1) * SLOTS_PER_PAGE,
    currentPage * SLOTS_PER_PAGE
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Parking Slots </h2>
      {userBookedSlot && (
        <div className="p-4 bg-yellow-500 text-white text-center rounded-lg mb-4">
          You have successfully booked a slot. You have 30 seconds to unbook the
          slot (Cancel) and book another.
        </div>
      )}
      <h3 className="text-lg bg-yellow-500 text-white font-semibold text-center mb-4">
        You cannot book more than one slot
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {paginatedSlots.map((slot) => (
          <div
            key={slot.id}
            className={`p-4 rounded-lg flex flex-col items-center justify-center shadow-md transition-all duration-300 ${
              slot.status === "occupied" ? "bg-red-500" : "bg-green-500"
            } text-white`}
          >
            <FaCar size={30} />
            <p className="mt-2 text-lg font-semibold">
              Slot {slot.slot_number}
            </p>
            {slot.status === "free" ? (
              <button
                className="mt-2 px-4 py-2 bg-black hover:bg-gray-800 rounded-lg text-white font-semibold"
                onClick={() => handleBookSlot(slot.id)}
                disabled={!!userBookedSlot}
              >
                Book Slot
              </button>
            ) : userBookedSlot === slot.id ? (
              <>
                <button
                  className={`mt-2 px-4 py-2 rounded-lg font-semibold ${
                    cancellableSlots[slot.id]
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-gray-500 cursor-not-allowed"
                  } text-white`}
                  onClick={() => handleCancelSlot(userBookedSlot)}
                  disabled={!cancellableSlots[slot.id]}
                >
                  {cancellableSlots[slot.id] ? "Cancel Slot" : "Occupied"}
                </button>
                <button
                  className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold"
                  onClick={() => handleExitSlot(userBookedSlot)}
                >
                  Exit
                </button>
              </>
            ) : (
              <button className="mt-2 px-4 py-2 bg-gray-500 cursor-not-allowed rounded-lg text-white font-semibold">
                Occupied
              </button>
            )}
          </div>
        ))}
      </div>

      {showPayment && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <Payment
            amount={paymentAmount} // Use the dynamically calculated amount
            // amount={0.60}
            onSuccess={handlePaymentSuccess}
            onClose={() => setShowPayment(false)}
          />
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-4">
        {currentPage > 1 && (
          <button
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-zinc-600"
            onClick={handlePrevPage}
          >
            <AiOutlineArrowLeft size={20} />
          </button>
        )}

        {currentPage < totalPages && (
          <button
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-zinc-600"
            onClick={handleNextPage}
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

export default Slots;
