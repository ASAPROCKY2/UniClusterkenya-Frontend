// src/dashboard/StudentDashboard/applications/Applications.tsx
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState } from "../../../app/store";
import {
  useGetApplicationsByUserIdQuery,
  type TApplication,
} from "../../../Features/application/applicationAPI";
import { skipToken } from "@reduxjs/toolkit/query/react";
import type { TCluster } from "../../../Features/Cluster/clusterAPI";

/* =============================
   EXTENDED TYPE (SAFE)
============================= */
type TApplicationWithCluster = TApplication & {
  cluster?: TCluster | null;
};

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Approved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

const Applications: React.FC = () => {
  // 🔹 Logged-in student ID
  const reduxUserID = useSelector(
    (state: RootState) => state.user.user?.userID
  );

  // 🔹 Optional param ID
  const params = useParams<{ userID: string }>();
  const paramUserID = params.userID ? Number(params.userID) : undefined;

  const userID = paramUserID ?? reduxUserID;

  const {
    data,
    isLoading,
    isError,
  } = useGetApplicationsByUserIdQuery(userID ?? skipToken);

  // 👇 Cast ONLY here (safe)
  const applications = data as TApplicationWithCluster[] | undefined;

  if (isLoading) {
    return <div className="p-6 text-gray-600">Loading your applications...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-red-600">
        Failed to load applications. Please try again.
      </div>
    );
  }

  if (!applications || applications.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Your Applications</h2>
        <p className="text-gray-500">
          You have not applied for any programmes yet.
        </p>
      </div>
    );
  }

  const sortedApplications = [...applications].sort(
    (a, b) => a.choiceOrder - b.choiceOrder
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Your Programme Choices</h2>

      <div className="space-y-4">
        {sortedApplications.map((app) => (
          <div
            key={app.applicationID}
            className="flex items-center justify-between border rounded-lg p-4 hover:shadow-md transition"
          >
            {/* LEFT */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-gray-500">
                  Choice {app.choiceOrder}
                </span>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    statusColors[app.status] ||
                    "bg-gray-100 text-gray-600"
                  }`}
                >
                  {app.status}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-800">
                {app.programme.name}
              </h3>

              {app.programme.level && (
                <p className="text-sm text-gray-500">
                  Level: {app.programme.level}
                </p>
              )}

              {/* ✅ CLUSTER (NOW TYPE-SAFE) */}
              {app.cluster && (
                <p className="text-sm text-blue-600 mt-1">
                  Cluster: {app.cluster.name}
                  {app.cluster.clusterCode && (
                    <span className="text-gray-400">
                      {" "}
                      ({app.cluster.clusterCode})
                    </span>
                  )}
                </p>
              )}
            </div>

            {/* RIGHT */}
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
