// src/dashboard/UniversityAdminDashboard/aside/drawerData.ts

import {
  FaTachometerAlt,
  FaBook,
  FaClipboardList,
  FaUserGraduate,
  FaSignOutAlt,
} from "react-icons/fa";

export type DrawerData = {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number }>;
  link: string;
};

export const universityAdminDrawerData: DrawerData[] = [
  {
    id: "dashboard-overview",
    name: "Dashboard Overview",
    icon: FaTachometerAlt,
    link: "/university/dashboard",
  },
  {
    id: "programs",
    name: "Programs",
    icon: FaBook,
    link: "/university/programs",
  },
  {
    id: "applications",
    name: "Applications",
    icon: FaClipboardList,
    link: "/university/applications",
  },
  {
    id: "students",
    name: "Students",
    icon: FaUserGraduate,
    link: "/university/students",
  },
  {
    id: "logout",
    name: "Logout",
    icon: FaSignOutAlt,
    link: "/logout",
  },
];
