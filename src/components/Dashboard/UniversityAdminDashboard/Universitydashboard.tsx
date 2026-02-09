// src/components/Dashboard/UniversityAdminDashboard/UniversityDashboard.tsx
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
  FaCalendarAlt,
  FaChartLine,
  FaUsers,
  FaChartBar,
  FaLightbulb,
  FaPlus,
  FaEye,
  FaUserCheck,
  FaCog,
} from "react-icons/fa";
import { RiCalendarEventFill, RiInformationLine } from "react-icons/ri";
import { TbBooks, TbCertificate } from "react-icons/tb";
import { MdOutlineSchool, MdDashboard } from "react-icons/md";
import { useGetDashboardStatsQuery } from "../../../Features/dashboard/DashbaordAPI";

const tips = [
  "Monitor cluster application trends to adjust program capacities proactively.",
  "Ensure program requirements align with industry standards and student capabilities.",
  "Regularly update cluster cut-off points based on application volume and quality.",
  "Use placement analytics to improve future program offerings and clusters.",
  "Coordinate with other universities to share cluster placement best practices.",
  "Review cluster subject requirements annually to stay current with curriculum changes.",
  "Track student success rates by cluster to optimize program structures.",
];

const UniversityDashboard: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tipOfDay, setTipOfDay] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  // Fetch dashboard stats
  const { data: statsData, isLoading } = useGetDashboardStatsQuery();

  // Random tip on load
  useEffect(() => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTipOfDay(randomTip);
  }, []);

  // Update time every minute
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

  // University-themed color palette
  const colors = {
    primary: "#1a56db", // Deep blue
    secondary: "#059669", // Emerald green
    accent: "#7c3aed", // Purple
    warning: "#d97706", // Amber
    success: "#059669", // Green
    info: "#0ea5e9", // Sky blue
    light: "#f8fafc", // Slate 50
    dark: "#1e293b", // Slate 800
  };

  // Overview Cards with university clustering theme
  const overviewCards = [
    {
      icon: <FaCalendarAlt className="text-white text-2xl" />,
      value: currentTime.toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
      label: "Today's Date",
      bgColor: "bg-gradient-to-br from-blue-600 to-indigo-700",
      iconBg: "bg-blue-500/20",
      trend: "Academic Year 2024/2025",
    },
    {
      icon: <TbBooks className="text-white text-2xl" />,
      value: isLoading ? "..." : statsData?.programmes ?? 0,
      label: "Active Programs",
      bgColor: "bg-gradient-to-br from-emerald-600 to-teal-700",
      iconBg: "bg-emerald-500/20",
      trend: "+2 this month",
    },
    {
      icon: <FaClipboardList className="text-white text-2xl" />,
      value: isLoading ? "..." : statsData?.applications ?? 0,
      label: "Applications",
      bgColor: "bg-gradient-to-br from-purple-600 to-violet-700",
      iconBg: "bg-purple-500/20",
      trend: "↑ 15% from last week",
    },
    {
      icon: <MdOutlineSchool className="text-white text-2xl" />,
      value: isLoading ? "..." : statsData?.students ?? 0,
      label: "Expected Intake",
      bgColor: "bg-gradient-to-br from-amber-600 to-orange-600",
      iconBg: "bg-amber-500/20",
      trend: "Based on clusters",
    },
  ];

  const quickActions = [
    { 
      icon: <FaPlus className="text-xl" />, 
      label: "Add Program", 
      description: "Create new academic program",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
      iconColor: "text-blue-600"
    },
    { 
      icon: <FaEye className="text-xl" />, 
      label: "View Applications", 
      description: "Monitor cluster applications",
      bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-700",
      iconColor: "text-emerald-600"
    },
    { 
      icon: <FaUserCheck className="text-xl" />, 
      label: "Admitted Students", 
      description: "Manage placements",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      borderColor: "border-purple-200",
      textColor: "text-purple-700",
      iconColor: "text-purple-600"
    },
    { 
      icon: <FaChartLine className="text-xl" />, 
      label: "Analytics", 
      description: "Cluster performance",
      bgColor: "bg-gradient-to-br from-amber-50 to-amber-100",
      borderColor: "border-amber-200",
      textColor: "text-amber-700",
      iconColor: "text-amber-600"
    },
  ];

  const HeaderComponent = UniversityHeader as React.ComponentType<any>;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">
      {/* Header */}
      <HeaderComponent onMenuClick={() => setDrawerOpen(true)} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white transform ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition-transform duration-300 shadow-xl`}
        >
          <UniversityDrawer />
        </aside>

        {/* Mobile overlay */}
        {drawerOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setDrawerOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 p-6 lg:ml-64 max-w-7xl mx-auto">
          {/* Welcome Banner */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -right-10 -top-10 opacity-10">
              <FaUniversity className="text-white text-[200px]" />
            </div>
            <div className="absolute -left-10 -bottom-10 opacity-10">
              <MdDashboard className="text-white text-[200px]" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{greeting()}, University Admin</h1>
                  <p className="text-blue-100 text-lg mb-2">
                    Welcome to the University Cluster Management Dashboard
                  </p>
                  <div className="flex items-center space-x-4 text-blue-200">
                    <span className="flex items-center">
                      <RiCalendarEventFill className="mr-2" />
                      {currentTime.toLocaleDateString(undefined, {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center">
                      <FaClock className="mr-2" />
                      {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                    <TbCertificate className="text-4xl text-blue-300" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {overviewCards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`${card.bgColor} p-6 rounded-2xl shadow-lg text-white overflow-hidden relative group cursor-pointer transition-all duration-300`}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl ${card.iconBg} backdrop-blur-sm`}>
                        {card.icon}
                      </div>
                      <FaChartLine className="text-white/70 text-xl" />
                    </div>
                  
                  <h3 className="text-3xl font-bold mb-1">{card.value}</h3>
                  <p className="text-white/90 font-medium mb-2">{card.label}</p>
                  <p className="text-white/70 text-sm">{card.trend}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tip of the Day */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 p-6 rounded-2xl shadow-lg"
          >
            <div className="flex items-start">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-3 rounded-xl mr-4 shadow-md">
                <FaLightbulb className="text-white text-xl" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-slate-800">
                    Cluster Management Tip
                  </h2>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                    Today's Insight
                  </span>
                </div>
                <p className="text-slate-700 mb-3">{tipOfDay}</p>
                <div className="flex items-center text-sm text-slate-500">
                  <span className="flex items-center">
                    <FaChartBar className="mr-2" />
                    Based on cluster analytics
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-slate-800">Quick Actions</h2>
              <span className="text-sm text-slate-500">Manage your university clusters</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {quickActions.map((action, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`${action.bgColor} ${action.borderColor} p-5 rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 text-left group`}
                >
                  <div className="flex items-start mb-3">
                    <div className={`p-3 rounded-lg ${action.iconColor} ${action.bgColor.replace('50', '100').replace('100', '200')} mr-3`}>
                      {action.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold text-lg mb-1 ${action.textColor}`}>
                        {action.label}
                      </h3>
                      <p className="text-slate-600 text-sm">{action.description}</p>
                    </div>
                  </div>
                  <div className={`h-1 w-0 group-hover:w-full ${action.bgColor.replace('50', '300').replace('100', '400')} transition-all duration-300 rounded-full`}></div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Cluster Performance</h2>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center transition">
                <FaChartLine className="mr-2" />
                View Detailed Report
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-blue-800">Top Clusters</h3>
                  <FaChartBar className="text-blue-600" />
                </div>
                <ul className="space-y-2">
                  {["Engineering", "Health Sciences", "Business"].map((cluster, idx) => (
                    <li key={idx} className="flex items-center justify-between">
                      <span className="text-slate-700">{cluster}</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                        {["45%", "32%", "28%"][idx]}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-xl border border-emerald-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-emerald-800">Application Status</h3>
                  <FaClipboardList className="text-emerald-600" />
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-700">Pending Review</span>
                      <span className="font-semibold text-emerald-700">65%</span>
                    </div>
                    <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-700">Approved</span>
                      <span className="font-semibold text-emerald-700">22%</span>
                    </div>
                    <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full" style={{ width: '22%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-xl border border-amber-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-amber-800">System Health</h3>
                  <FaCog className="text-amber-600" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Uptime</span>
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 font-semibold rounded-full">99.8%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Active Users</span>
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 font-semibold rounded-full">247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Data Sync</span>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 font-semibold rounded-full">Up to date</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

// Add missing FaClock icon import
const FaClock = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
  </svg>
);

export default UniversityDashboard;