// src/components/Dashboard/AdminDashboard/ManageResults/Results.tsx
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaGraduationCap, FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { RiCloseCircleFill } from "react-icons/ri";
import { Skeleton } from "../../../../components/ui/skeleton";
import { kcseResultsAPI } from "../../../../Features/KcseResults/kcseResultsAPI";
import type { TKcseSubjectResult } from "../../../../Features/KcseResults/kcseResultsAPI";

import CreateResults from "./CreateResults";
import UpdateResults from "./UpdateResults";
import DeleteResults from "./deleteResults";

const ResultsComponent: React.FC = () => {
  const navigate = useNavigate();

  const { data: resultsData, isLoading, error } =
    kcseResultsAPI.useGetAllKcseResultsQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });

  const [selectedResult, setSelectedResult] = useState<TKcseSubjectResult | null>(null);
  const [resultToDelete, setResultToDelete] = useState<TKcseSubjectResult | null>(null);

  // ✅ Control Create Results modal
  const [showCreate, setShowCreate] = useState(false);

  const handleEdit = (result: TKcseSubjectResult) => {
    setSelectedResult(result);
    (document.getElementById("update_results_modal") as HTMLDialogElement)?.showModal();
  };

  const handleDelete = (result: TKcseSubjectResult) => {
    setResultToDelete(result);
    (document.getElementById("delete_results_modal") as HTMLDialogElement)?.showModal();
  };

  const handleCreateOpen = () => {
    setShowCreate(true);
    setTimeout(() => {
      (document.getElementById("create_results_modal") as HTMLDialogElement)?.showModal();
    }, 0);
  };

  // Group results by student (userID)
  const groupedResults = useMemo(() => {
    if (!resultsData) return {};
    return resultsData.reduce((acc, result) => {
      if (!acc[result.userID]) acc[result.userID] = [];
      acc[result.userID].push(result);
      return acc;
    }, {} as Record<number, TKcseSubjectResult[]>);
  }, [resultsData]);

  // Navigate to students page
  const handleViewStudent = (userID: number) => {
    navigate(`/admin/users?userID=${userID}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 p-6 rounded-2xl">
      {/* Modals */}
      {showCreate && <CreateResults />}
      <UpdateResults {...({ result: selectedResult } as any)} />
      <DeleteResults {...({ result: resultToDelete } as any)} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FaGraduationCap className="text-green-600" />
            KCSE Results
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage all KCSE results in the system
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-sm">
            <span className="font-semibold text-green-600">
              {resultsData?.length || 0}
            </span>{" "}
            <span className="text-gray-500">results</span>
          </div>

          <button
            onClick={handleCreateOpen}
            className="px-5 py-2.5 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
          >
            + Add Result
          </button>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-gray-200">
              <Skeleton className="h-4 w-1/3 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 flex items-center gap-3">
          <RiCloseCircleFill className="text-xl" />
          <div>
            <p className="font-medium">Error loading results</p>
            <p className="text-sm">Please refresh or try again later</p>
          </div>
        </div>
      )}

      {/* Results Grouped by Student */}
      {resultsData?.length ? (
        <div className="space-y-8">
          {Object.entries(groupedResults).map(([userID, results]) => {
            const student = results[0].student;
            const studentName = student ? `${student.firstName} ${student.lastName}` : "Unknown";

            return (
              <div key={userID} className="bg-white rounded-2xl border border-gray-200 shadow-md p-4">
                {/* Student Header */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    {studentName} <span className="text-gray-400 text-sm">({userID})</span>
                  </h3>
                  <button
                    onClick={() => handleViewStudent(Number(userID))}
                    className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200"
                  >
                    View Student
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-green-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Code
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Subject
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Grade
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Points
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {results.map((result) => (
                        <tr key={result.resultID} className="hover:bg-green-50 transition">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {result.subjectCode}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {result.subjectName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {result.grade}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {result.points}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right flex gap-2 justify-end">
                            <button
                              onClick={() => handleEdit(result)}
                              className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-lg hover:bg-green-200 flex items-center gap-1"
                            >
                              <FaEdit /> Edit
                            </button>
                            <button
                              onClick={() => handleDelete(result)}
                              className="px-3 py-1 text-sm font-medium text-red-600 bg-red-100 rounded-lg hover:bg-red-200 flex items-center gap-1"
                            >
                              <MdDeleteForever /> Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        !isLoading && (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 shadow-sm">
            <FaGraduationCap size={72} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">No results available</h3>
            <p className="text-gray-500 mt-2">
              Click “Add Result” to get started
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default ResultsComponent;
