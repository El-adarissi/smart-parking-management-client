import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./dashboard/components/DashboardLayout.jsx";
import Settings from "./dashboard/components/Settings.jsx"
import Authentification from "./authentification/components/Authentification.jsx";
import Transactions from "./dashboard/components/Transactions.jsx";
import { UserProvider } from "./context/UserContext";
import MainContent from "./dashboard/components/MainContent.jsx";
import Customer from "./dashboard/components/Customer.jsx";
import Slots from "./dashboard/components/Slots.jsx";
import MangeSlots from "./dashboard/components/MangeSlots.jsx";
import BookingHistory from "./dashboard/components/BookingHistory.jsx";
import Payment from "./dashboard/components/Payment.jsx";
import ReportIssues from "./dashboard/components/ReportIssues.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <UserProvider>
      <Routes>
        <Route path="/" element={<App />}></Route> 
        
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="settings" element={<Settings />}></Route>
          <Route path="transactions" element={<Transactions />}></Route>
          <Route path="main" element={<MainContent />}></Route>
          <Route path="customers" element={<Customer />}></Route>
          <Route path="logout" element={<Navigate to="/" replace />} />
          <Route path="slots" element={<Slots />} > </Route>
          <Route path="manage-slots" element={<MangeSlots />} > </Route>
          <Route path="booking-history" element={<BookingHistory/>} ></Route>
          <Route path="payment" element={<Payment />}></Route>
          <Route path="report-issues" element={<ReportIssues />}></Route>
        </Route> 
        <Route path="/authentificate" element={<Authentification/>}/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
