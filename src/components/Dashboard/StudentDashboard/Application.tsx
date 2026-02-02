import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState } from "../../../app/store";
import { useGetApplicationsByUserIdQuery } from "../../../Features/application/applicationAPI";
import { skipToken } from "@reduxjs/toolkit/query/react";

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Approved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

const Applications: React.FC = () => {
  // 🔹 Get logged-in student ID from Redux
  const reduxUserID = useSelector((state: RootState) => state.user.user?.userID);

  // 🔹 Get userID from URL params if available
  const params = useParams<{ userID: string }>();
  const paramUserID = params.userID ? Number(params.userID) : undefined;

  // 🔹 Decide which userID to use: param first, fallback to Redux
  const userID = paramUserID ?? reduxUserID;

  // 🔹 Fetch applications, skip if no userID
  const { data: applications, isLoading, isError } = useGetApplicationsByUserIdQuery(
    userID ?? skipToken
  );

  if (isLoading) {
    return <div className="p-6 text-gray-600">Loading your applications...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-600">Failed to load applications. Please try again.</div>;
  }

  if (!applications || applications.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Your Applications</h2>
        <p className="text-gray-500">You have not applied for any programmes yet.</p>
      </div>
    );
  }

  // 🔹 Sort applications by choice order
  const sortedApplications = [...applications].sort((a, b) => a.choiceOrder - b.choiceOrder);

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Your Programme Choices</h2>
      <div className="space-y-4">
        {sortedApplications.map((app) => (
          <div
            key={app.applicationID}
            className="flex items-center justify-between border rounded-lg p-4 hover:shadow-md transition"
          >
            {/* Left */}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-500">
                  Choice {app.choiceOrder}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    statusColors[app.status] || "bg-gray-100 text-gray-600"
                  }`}
                >
                  {app.status}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mt-1">{app.programme.name}</h3>

              {app.programme.level && (
                <p className="text-sm text-gray-500">Level: {app.programme.level}</p>
              )}
            </div>

            {/* Right */}
            <div className="text-right">
              <p className="text-sm text-gray-500">Applied on</p>
              <p className="text-sm font-medium text-gray-700">
                {new Date(app.applicationDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Applications;
