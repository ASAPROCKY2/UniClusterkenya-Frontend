// src/components/Dashboard/StudentDashboard/KcseResultsTable.tsx
import React from "react";
import { useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { useGetKcseResultsByUserIdQuery } from "../../../Features/KcseResults/kcseResultsAPI";
import type { RootState } from "../../../app/store";

const KcseResultsTable: React.FC = () => {
  // Get logged-in user ID from Redux
  const userID = useSelector((state: RootState) => state.user.user?.userID);

  // Fetch student's KCSE results
  const { data: results, isLoading, isError } =
    useGetKcseResultsByUserIdQuery(userID ?? skipToken);

  if (isLoading)
    return (
      <div className="flex justify-center items-center p-10">
        <p className="text-gray-500">Loading KCSE results...</p>
      </div>
    );

  if (isError || !results)
    return (
      <div className="flex justify-center items-center p-10">
        <p className="text-red-500">Failed to load KCSE results.</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">KCSE RESULTS</h2>

      {/* ===== Subjects Table ===== */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border-b text-left text-gray-600">
                Code
              </th>
              <th className="px-4 py-2 border-b text-left text-gray-600">
                Subject
              </th>
              <th className="px-4 py-2 border-b text-left text-gray-600">
                Grade
              </th>
            </tr>
          </thead>
          <tbody>
            {results.map((sub) => (
              <tr key={sub.resultID} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{sub.subjectCode}</td>
                <td className="px-4 py-2 border-b">{sub.subjectName}</td>
                <td className="px-4 py-2 border-b">{sub.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KcseResultsTable;
