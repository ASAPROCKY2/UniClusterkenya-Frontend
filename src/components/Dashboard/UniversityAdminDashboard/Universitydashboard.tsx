// src/dashboard/UniversityAdminDashboard/UniversityDashboard.tsx
import React, { useState, useEffect } from "react";
import UniversityHeader from "./Header";
import Footer from "./Footer";
import UniversityDrawer from "./Aside/UniversityDrawer";
import { motion } from "framer-motion";
import {
  FaUniversity,
  FaBook,
  FaClipboardList,
  FaUserGraduate,
} from "react-icons/fa";
import { RiCalendarEventFill, RiInformationLine } from "react-icons/ri";

const tips = [
  "Ensure program cut-off points align with available teaching resources.",
  "Review application numbers early to anticipate capacity issues.",
  "Accurate program data improves fair placement outcomes.",
  "Regularly export applicant lists for internal planning.",
  "Clear program descriptions help students make better choices.",
];

const UniversityDashboard: React.FC = () => {
  const [tipOfDay, setTipOfDay] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [drawerOpen, setDrawerOpen] = useState(false);

  /* Pick a random tip on load */
  useEffect(() => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTipOfDay(randomTip);
  }, []);

  /* Update time every minute */
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const greeting = (): string => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const overviewCards = [
    {
      icon: <RiCalendarEventFill className="text-indigo-500 text-2xl" />,
      value: currentTime.toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
      label: "Today's Date",
      bgColor: "bg-indigo-50",
    },
    {
      icon: <FaBook className="text-green-600 text-2xl" />,
      value: "Programs Active",
      label: "Academic Programs",
      bgColor: "bg-green-50",
    },
    {
      icon: <FaClipboardList className="text-blue-600 text-2xl" />,
      value: "Applications",
      label: "Total Applications",
      bgColor: "bg-blue-50",
    },
    {
      icon: <FaUserGraduate className="text-purple-600 text-2xl" />,
      value: "Students",
      label: "Expected Intake",
      bgColor: "bg-purple-50",
    },
  ];

  const quickActions = [
    {
      icon: <FaBook className="text-2xl text-green-600" />,
      label: "Add Program",
    },
    {
      icon: <FaClipboardList className="text-2xl text-blue-600" />,
      label: "View Applications",
    },
    {
      icon: <FaUserGraduate className="text-2xl text-purple-600" />,
      label: "Admitted Students",
    },
    {
      icon: <FaUniversity className="text-2xl text-indigo-600" />,
      label: "University Profile",
    },
  ];

  
  const HeaderComponent = UniversityHeader as React.ComponentType<any>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white transform transition-transform duration-300
          ${drawerOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <UniversityDrawer />
      </aside>

      {/* Overlay for mobile */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <HeaderComponent onMenuClick={() => setDrawerOpen(true)} />

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto">
          {/* Welcome Banner */}
          <div className="mb-8 bg-gradient-to-r from-indigo-600 to-blue-700 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="absolute right-6 top-6 opacity-20">
              <FaUniversity className="text-white text-8xl" />
            </div>
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-1">{greeting()}, University Admin</h1>
              <p className="text-indigo-100 text-lg mb-4">
                {currentTime.toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {overviewCards.map((card, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`${card.bgColor} p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center`}
              >
                <div className="p-3 rounded-full bg-white shadow-sm mb-3">{card.icon}</div>
                <span className="text-sm font-medium text-gray-600 text-center">{card.label}</span>
                <h3 className="mt-2 text-xl font-bold text-gray-800">{card.value}</h3>
              </motion.div>
            ))}
          </div>

          {/* Tip of the Day */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-100 p-5 rounded-xl shadow-sm"
          >
            <div className="flex items-start">
              <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                <RiInformationLine className="text-indigo-600 text-xl" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-indigo-800 mb-1">University Tip of the Day</h2>
                <p className="text-indigo-700">{tipOfDay}</p>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 transition flex flex-col items-center"
              >
                {action.icon}
                <span className="text-sm font-medium mt-2">{action.label}</span>
              </button>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default UniversityDashboard;
