// import React, { useState, useEffect } from "react";

// const Transactions = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch transaction data from the Flask backend
//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/transactions`, {
//           credentials: "include", 
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch transaction data");
//         }

//         const data = await response.json();
//         if (data.success) {
//           setTransactions(data.transactions);
//         } else {
//           throw new Error(data.error || "Failed to fetch transaction data");
//         }
//       } catch (error) {
//         console.error("Error fetching transactions:", error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTransactions();
//   }, []);

//   // Function to download JSON file
//   const downloadJSON = () => {
//     const jsonData = JSON.stringify(transactions, null, 2);
//     const blob = new Blob([jsonData], { type: "application/json" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "transactions.json";
//     link.click();
//     URL.revokeObjectURL(url);
//   };

//   // Function to download CSV file
//   const downloadCSV = () => {
//     const endpoint = `${import.meta.env.VITE_BACKEND_URL}/api/transactions/csv`;
//     const link = document.createElement("a");
//     link.href = endpoint;
//     link.download = "transactions.csv";
//     link.click();
//   };

//   if (loading) {
//     return <div className="p-4 text-neutral-400">Loading transactions...</div>;
//   }

//   if (error) {
//     return <div className="p-4 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Transactions</h1>

//       {/* Download Buttons */}
//       <div className="mb-4">
//         <button
//           onClick={downloadJSON}
//           className="mr-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//         >
//           Download JSON
//         </button>
//         <button
//           onClick={downloadCSV}
//           className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
//         >
//           Download CSV
//         </button>
//       </div>

//       {/* Transactions Table */}
//       <div className="overflow-x-auto bg-neutral-800 rounded-lg shadow-lg">
//         <table className="min-w-full">
//           <thead>
//             <tr className="bg-neutral-700">
//               <th className="px-6 py-3 text-left text-sm font-semibold text-white">
//                 Transaction ID
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-semibold text-white">
//                 User ID
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-semibold text-white">
//                 Amount
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-semibold text-white">
//                 Status
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-semibold text-white">
//                 Timestamp
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-neutral-700">
//             {transactions.map((transaction) => (
//               <tr
//                 key={transaction.transaction_id}
//                 className="hover:bg-neutral-700 transition-colors"
//               >
//                 <td className="px-6 py-4 text-sm text-neutral-300">
//                   {transaction.transaction_id}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-neutral-300">
//                   {transaction.user_id}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-neutral-300">
//                   ${transaction.amount}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-neutral-300">
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                       transaction.status === "success"
//                         ? "bg-green-500 text-green-900"
//                         : transaction.status === "pending"
//                         ? "bg-yellow-500 text-yellow-900"
//                         : "bg-red-500 text-red-900"
//                     }`}
//                   >
//                     {transaction.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 text-sm text-neutral-300">
//                   {new Date(transaction.timestamp).toLocaleString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Transactions;

import React from 'react'

const Transactions = () => {
  return (
    <div className='text-white bg-yellow-400 text-2xl font-semibold text-center my-20'>
          Transactions History Comming Soon
    </div>
  )
}

export default Transactions
