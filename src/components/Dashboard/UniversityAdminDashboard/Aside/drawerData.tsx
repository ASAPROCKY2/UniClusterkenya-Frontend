// src/dashboard/UniversityAdminDashboard/aside/drawerData.ts
import {
  FaTachometerAlt,
  FaUniversity,
  FaBook,
  FaUserFriends,
  FaChartBar,
  FaCog,
  FaUserCircle,
} from "react-icons/fa";

export type DrawerData = {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number }>;
  link: string;
};

export const universityAdminDrawerData: DrawerData[] = [
  {
    id: "dashboard",
    name: "Dashboard Overview",
    icon: FaTachometerAlt,
    link: "/university",
  },
  {
    id: "university",
    name: "University Info",
    icon: FaUniversity,
    link: "/university/info",
  },
  {
    id: "programs",
    name: "Programs & Slots",
    icon: FaBook,
    link: "/university/programs",
  },
  {
    id: "applicants",
    name: "Applicants List",
    icon: FaUserFriends,
    link: "/university/applicants",
  },
  {
    id: "admission",
    name: "Admission Stats",
    icon: FaChartBar,
    link: "/university/admission-stats",
  },
 
  {
    id: "settings",
    name: "Settings",
    icon: FaCog,
    link: "/university/settings",
  },
  {
    id: "profile",
    name: "My Profile",
    icon: FaUserCircle,
    link: "/university/profile",
  },
];