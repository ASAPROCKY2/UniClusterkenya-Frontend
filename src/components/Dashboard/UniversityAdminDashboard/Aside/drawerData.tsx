// src/dashboard/UniversityAdminDashboard/aside/drawerData.ts

import {
  FaTachometerAlt,
  FaBook,
  FaClipboardList,
  FaUserGraduate,
  FaUniversity,
  FaProjectDiagram,
  FaBullseye,
  FaWindowRestore,
  FaChartBar,
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
    link: "/admin/dashboard",
  },

  {
    id: "universities",
    name: "Universities",
    icon: FaUniversity,
    link: "/admin/universities",
  },

  {
    id: "programs",
    name: "Programmes",
    icon: FaBook,
    link: "/admin/programs",
  },

  {
    id: "clusters",
    name: "Programme Clusters",
    icon: FaProjectDiagram,
    link: "/admin/clusters",
  },

  {
    id: "results",
    name: "KCSE Results",
    icon: FaChartBar,
    link: "/admin/results",
  },

  {
    id: "applications",
    name: "Applications",
    icon: FaClipboardList,
    link: "/admin/applications",
  },

  {
    id: "application-window",
    name: "Application Window",
    icon: FaWindowRestore,
    link: "/admin/application-window",
  },

  {
    id: "placements",
    name: "Placements",
    icon: FaBullseye,
    link: "/admin/placements",
  },

  {
    id: "users",
    name: "Users",
    icon: FaUserGraduate,
    link: "/admin/users",
  },

  {
    id: "logout",
    name: "Logout",
    icon: FaSignOutAlt,
    link: "/logout",
  },
];
