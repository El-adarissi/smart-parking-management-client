import React, { useState, useEffect } from "react";

const MainContent = () => {
  const [slotData, setSlotData] = useState({
    totalSlots: 0,
    availableSlots: 0,
    lockedSlots: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchSlotData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:5000/get-slots", {
  //         credentials: "include",
  //       });

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch slot data");
  //       }

  //       const data = await response.json();
  //       setSlotData({
  //         totalSlots: data.total_slots,
  //         availableSlots: data.available_slots,
  //         lockedSlots: data.locked_slots,
  //       });
  //     } catch (error) {
  //       console.error("Error fetching slot data:", error);
  //       setError("An error occurred while fetching slot data.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchSlotData();
  // }, []);

  // if (loading) {
  //   return <div className="p-4">Loading...</div>;
  // }

  // if (error) {
  //   return <div className="p-4 text-red-500">{error}</div>;
  // }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Slots Card */}
        <div className="bg-blue-700 p-4 sm:p-6 rounded-lg shadow-lg">
          <h2 className="text-lg sm:text-xl font-semibold">ALL SLOTS</h2>
          {/* <p className="text-white text-xl sm:text-2xl">{slotData.totalSlots}</p> */}
        </div>

        {/* Available Slots Card */}
        <div className="bg-green-500 p-4 sm:p-6 rounded-lg shadow-lg">
          <h2 className="text-lg sm:text-xl font-semibold">Slots Available</h2>
          {/* <p className="text-white text-xl sm:text-2xl">{slotData.availableSlots}</p> */}
        </div>

        {/* Locked Slots Card */}
        <div className="bg-red-700 p-4 sm:p-6 rounded-lg shadow-lg">
          <h2 className="text-lg sm:text-xl font-semibold">Locked Slots</h2>
          {/* <p className="text-white text-xl sm:text-2xl">{slotData.lockedSlots}</p> */}
        </div>
      </div>
    </div>
  );
};

export default MainContent;

// import React, { useState, useEffect } from "react";

// const MainContent = () => {
//   const [slotData, setSlotData] = useState({
//     totalSlots: 0,
//     availableSlots: 0,
//     lockedSlots: 0,
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedSlot, setSelectedSlot] = useState(null); // Track the selected slot
//   const [bookingHours, setBookingHours] = useState(1); // Default booking hours
//   const [isBooking, setIsBooking] = useState(false); // Track booking state

//   // Fetch slot data from the Flask backend
//   const fetchSlotData = async () => {
//     try {
//       const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/slots`, {
//         credentials: "include", // Include cookies if needed
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch slot data");
//       }

//       const data = await response.json();
//       console.log("API Response:", data); // Log the response for debugging

//       // Validate and set slot data
//       setSlotData({
//         totalSlots: data.total_slots || 0,
//         availableSlots: data.available_slots || 0,
//         lockedSlots: data.locked_slots || 0,
//       });
//     } catch (error) {
//       console.error("Error fetching slot data:", error);
//       setError("An error occurred while fetching slot data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch slot data on component mount
//   useEffect(() => {
//     fetchSlotData();
//   }, []);

//   // Handle slot selection
//   const handleSlotClick = (slot) => {
//     if (slot.status === "available") {
//       setSelectedSlot(slot);
//     }
//   };

//   // Handle booking hours change
//   const handleBookingHoursChange = (e) => {
//     const value = parseInt(e.target.value);
//     if (!isNaN(value) && value >= 1) {
//       setBookingHours(value);
//     }
//   };

//   // Handle slot booking
//   const handleBookSlot = async () => {
//     if (!selectedSlot || bookingHours < 1) {
//       alert("Please select a slot and enter a valid number of hours.");
//       return;
//     }

//     setIsBooking(true);

//     try {
//       const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/book-slot`, {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           slot_id: selectedSlot.id,
//           hours: bookingHours,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to book slot");
//       }

//       const data = await response.json();
//       if (data.success) {
//         alert("Slot booked successfully!");
//         setSelectedSlot(null); // Clear the selected slot
//         setBookingHours(1); // Reset booking hours
//         fetchSlotData(); // Refresh slot data
//       } else {
//         throw new Error(data.error || "Failed to book slot");
//       }
//     } catch (error) {
//       console.error("Error booking slot:", error);
//       alert("An error occurred while booking the slot.");
//     } finally {
//       setIsBooking(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="p-4 flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4 text-red-500 text-center">
//         <p>{error}</p>
//         <button
//           onClick={fetchSlotData}
//           className="mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {/* Total Slots Card */}
//         <div className="bg-blue-700 p-4 sm:p-6 rounded-lg shadow-lg">
//           <h2 className="text-lg sm:text-xl font-semibold">ALL SLOTS</h2>
//           <p className="text-white text-xl sm:text-2xl">{slotData.totalSlots}</p>
//         </div>

//         {/* Available Slots Card */}
//         <div className="bg-green-500 p-4 sm:p-6 rounded-lg shadow-lg">
//           <h2 className="text-lg sm:text-xl font-semibold">Slots Available</h2>
//           <p className="text-white text-xl sm:text-2xl">{slotData.availableSlots}</p>
//         </div>

//         {/* Locked Slots Card */}
//         <div className="bg-red-700 p-4 sm:p-6 rounded-lg shadow-lg">
//           <h2 className="text-lg sm:text-xl font-semibold">Locked Slots</h2>
//           <p className="text-white text-xl sm:text-2xl">{slotData.lockedSlots}</p>
//         </div>
//       </div>

//       {/* Booking Form */}
//       {selectedSlot && (
//         <div className="mt-8 bg-neutral-800 p-6 rounded-lg shadow-lg max-w-md mx-auto">
//           <h2 className="text-xl font-bold mb-4">Book Slot {selectedSlot.id}</h2>
//           <div className="mb-4">
//             <label htmlFor="hours" className="block text-neutral-300 mb-2">
//               How many hours?
//             </label>
//             <input
//               type="number"
//               id="hours"
//               value={bookingHours}
//               onChange={handleBookingHoursChange}
//               min="1"
//               className="w-full p-2 bg-neutral-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <button
//             onClick={handleBookSlot}
//             disabled={isBooking}
//             className={`w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ${
//               isBooking ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             {isBooking ? "Booking..." : "Book Slot"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MainContent;
