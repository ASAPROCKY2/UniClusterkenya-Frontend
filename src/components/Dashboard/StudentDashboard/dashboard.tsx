import React from "react";
import StudentHeader from "./ Header";
import StudentFooter from "./Footer";
import StudentCard from "./StudentCard";
import KcseResultsTable from "./KCSEResultsTable";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store"; // <-- type-only import
import { useGetPlacementsByUserIdQuery } from "../../../Features/placement/placementAPI";


const Dashboard: React.FC = () => {
  // 🔑 Get logged-in user ID from Redux
  const userID = useSelector((state: RootState) => state.user.user?.userID);

  // 🔹 Fetch placements for this student
  const { data: placements, isLoading, isError } = useGetPlacementsByUserIdQuery(
    userID ?? 0,
    { skip: !userID }
  );

  // 🔹 Get the latest placement (by placementDate)
  const latestPlacement = placements?.length
    ? placements.reduce((latest, current) => {
        if (!latest.placementDate) return current;
        if (!current.placementDate) return latest;
        return new Date(current.placementDate) > new Date(latest.placementDate)
          ? current
          : latest;
      })
    : null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* ===== HEADER ===== */}
      <StudentHeader />

      {/* ===== BODY ===== */}
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Welcome to Your Student Dashboard
          </h1>

          {/* ===== STUDENT INFO CARD ===== */}
          <StudentCard />

          {/* ===== KCSE RESULTS ===== */}
          <KcseResultsTable />

          {/* ===== Other Dashboard Cards ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {/* Ongoing Applications */}
            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">Ongoing Applications</h2>
              <p>No applications yet</p>
            </div>

            {/* Current Placement */}
            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">Current Placement</h2>

              {isLoading ? (
                <p className="text-gray-500">Loading placement...</p>
              ) : isError ? (
                <p className="text-red-500">Failed to load placement.</p>
              ) : latestPlacement ? (
                <div className="text-gray-700">
                  <p>
                    <span className="font-semibold">Programme:</span>{" "}
                    {latestPlacement.programme.name}
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    {latestPlacement.placementStatus}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {latestPlacement.placementDate
                      ? new Date(latestPlacement.placementDate).toLocaleDateString()
                      : "Not specified"}
                  </p>
                </div>
              ) : (
                <p>Not placed yet</p>
              )}
            </div>

            {/* Quick Stats */}
            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">Quick Stats</h2>
              <p>More stats coming soon...</p>
            </div>
          </div>
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <StudentFooter />
    </div>
  );
};

export default Dashboard;
