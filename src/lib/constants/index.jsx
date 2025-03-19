import {
  HiOutlineViewGrid,
  HiOutlineDocumentText,
  HiOutlineCog,
  HiOutlineLogout,
} from "react-icons/hi";
import { RiFolderHistoryFill } from "react-icons/ri";

import { FaParking } from "react-icons/fa";

import { FiShoppingCart } from "react-icons/fi";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/dashboard/main",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "customers",
    label: "Customers",
    path: "/dashboard/customers",
    icon: <FiShoppingCart />,
  },
  {
    key: "slots",
    label: "Slots",
    path: "/dashboard/slots",
    icon: <FaParking  />,
  },
  {
    key:"manage-slots",
    label:"Manage Slots",
    path:"/dashboard/manage-slots",
    icon:<FaParking/>
  },
  {
    key: "booking-history",
    label: "Booking History",
    path: "/dashboard/booking-history",
    icon: <RiFolderHistoryFill />,
  },
  {
    key: "transactions",
    label: "Transactions",
    path: "/dashboard/transactions",
    icon: <HiOutlineDocumentText />,
  },
  {
    key: "settings",
    label: "settings",
    path: "/dashboard/settings",
    icon: <HiOutlineCog />,
  },

];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
 
 {
    key: "logout",
    label: "Log Out",
    path: "/logout", 
    icon: <HiOutlineLogout />,
  },
];
