import React from "react";
import StudentHeader from "./ Header";
import StudentFooter from "./Footer";
import StudentCard from "./StudentCard";
import KcseResultsTable from "./KCSEResultsTable";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { useGetApplicationsByUserIdQuery } from "../../../Features/application/applicationAPI";
import { useGetPlacementsByUserIdQuery } from "../../../Features/placement/placementAPI";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { 
  Calendar, 
  Clock, 
  Download, 
  CheckCircle, 
  BookOpen, 
  University,
  AlertCircle,
  TrendingUp
} from "lucide-react";

const statusColors: Record<string, string> = {
  Pending: "bg-amber-50 text-amber-700 border border-amber-200",
  Approved: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Rejected: "bg-rose-50 text-rose-700 border border-rose-200",
  Placed: "bg-blue-50 text-blue-700 border border-blue-200",
  "Not Placed": "bg-gray-50 text-gray-700 border border-gray-200"
};

const Dashboard: React.FC = () => {
  const userID = useSelector((state: RootState) => state.user.user?.userID);
  const user = useSelector((state: RootState) => state.user.user);

  const {
    data: applications,
    isLoading: applicationsLoading,
    isError: applicationsError,
  } = useGetApplicationsByUserIdQuery(userID ?? skipToken);

  const pendingApplications = applications?.filter((app) => app.status === "Pending");
  const totalApplications = applications?.length || 0;

  const { 
    data: placements, 
    isLoading: placementsLoading, 
    isError: placementsError 
  } = useGetPlacementsByUserIdQuery(userID ?? skipToken);

  const latestPlacement = placements?.length
    ? placements.reduce((latest, current) => {
        if (!latest.placementDate) return current;
        if (!current.placementDate) return latest;
        return new Date(current.placementDate) > new Date(latest.placementDate)
          ? current
          : latest;
      })
    : null;

  // Mock deadlines
  const deadlines = [
    { name: "Application Period", date: "2024-03-15" },
    { name: "Transfer Window", date: "2024-04-10" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <StudentHeader />

      <main className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Welcome Banner */}
        <div className="mb-8 p-6 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Welcome back, {user ? `${user.firstName} ${user.lastName}` : "Student"}! 🎓
              </h1>
              <p className="text-blue-100 opacity-90">
                Track your university placement journey with UniCluster Kenya
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span className="font-medium">
                {new Date().toLocaleDateString('en-KE', { 
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Student Profile */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <University className="w-5 h-5 text-blue-600" />
                  </div>
                  Student Profile
                </h2>
                <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                  Active Student
                </span>
              </div>
              <StudentCard />
            </div>

            {/* KCSE Results */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-amber-600" />
                  </div>
                  KCSE Performance Report
                </h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition">
                  <Download className="w-4 h-4" />
                  Export PDF
                </button>
              </div>
              <KcseResultsTable />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Application Status */}
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg border border-blue-100 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                </div>
                Application Status
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Applications</p>
                      <p className="text-2xl font-bold text-gray-800">{totalApplications}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-xl font-bold text-amber-600">{pendingApplications?.length || 0}</p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="relative pl-8 pt-4">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 to-indigo-200"></div>
                  {applications?.slice(0, 3).map((app, index) => (
                    <div key={app.applicationID} className="relative mb-6">
                      <div className={`absolute left-0 w-3 h-3 rounded-full transform -translate-x-1/2 
                        ${index === 0 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[app.status]}`}>
                              {app.status}
                            </span>
                            <h4 className="font-semibold text-gray-800 mt-2">{app.programme.name}</h4>
                            <p className="text-sm text-gray-500 mt-1">Choice {app.choiceOrder}</p>
                          </div>
                          <span className="text-xs text-gray-400">
                            {new Date(app.applicationDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Placement Status */}
            <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-lg border border-emerald-100 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                Placement Status
              </h2>

              {placementsLoading ? (
                <div className="animate-pulse h-32 bg-gray-200 rounded-xl"></div>
              ) : placementsError ? (
                <div className="p-4 bg-rose-50 rounded-xl border border-rose-200 flex items-center gap-2 text-rose-600">
                  <AlertCircle className="w-5 h-5" />
                  Failed to load placement
                </div>
              ) : latestPlacement ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl p-5 text-white">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm">ADMITTED</span>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded">
                        #{latestPlacement.placementID.toString().slice(0, 8)}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{latestPlacement.programme.name}</h3>
                    <p className="text-emerald-100 text-sm">
                      {/* ✅ Fixed: Use programme.university instead of institution */}
                      {latestPlacement.programme.university?.name || "University Placement"}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                      <span className="text-gray-600">Status</span>
                      <span className="font-semibold text-emerald-600">{latestPlacement.placementStatus}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                      <span className="text-gray-600">Placement Date</span>
                      <span className="font-semibold">
                        {latestPlacement.placementDate
                          ? new Date(latestPlacement.placementDate).toLocaleDateString()
                          : "Pending"}
                      </span>
                    </div>
                    <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Admission Letter
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <Clock className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-gray-700 mb-2">Awaiting Placement</h3>
                  <p className="text-gray-500 text-sm">Your placement results will appear here once processed</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <StudentFooter />
    </div>
  );
};

export default Dashboard;
