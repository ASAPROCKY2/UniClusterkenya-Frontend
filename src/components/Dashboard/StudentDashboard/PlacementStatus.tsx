// src/components/Dashboard/StudentDashboard/Placement.tsx
import React from "react";
import { useSelector } from "react-redux";
import { useGetPlacementsByUserIdQuery } from "../../../Features/placement/placementAPI";
import type { RootState } from "../../../app/store";

const Placement: React.FC = () => {
  //  Get logged-in userID from Redux
  const userID = useSelector((state: RootState) => state.user.user?.userID);

  //  Fetch placements for the logged-in user
  const { data: placements, isLoading, isError } = useGetPlacementsByUserIdQuery(userID!, {
    skip: !userID, // skip query if userID is not available
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading placement...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">Failed to load placement.</p>
      </div>
    );
  }

  if (!placements || placements.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Placement not yet done.</p>
      </div>
    );
  }

  // Assuming we only display the first placement (if multiple)
  const placement = placements[0];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Placement</h1>

      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Programme: {placement.programme.name}
        </h2>

        <p className="mb-2 text-gray-700">
          <span className="font-semibold">Level:</span>{" "}
          {placement.programme.level ?? "Not specified"}
        </p>

        <p className="mb-2 text-gray-700">
          <span className="font-semibold">Placement Status:</span>{" "}
          {placement.placementStatus ?? "Not Placed"}
        </p>

        <p className="mb-2 text-gray-700">
          <span className="font-semibold">Placement Date:</span>{" "}
          {placement.placementDate ?? "Not available"}
        </p>
      </div>
    </div>
  );
};

export default Placement;
