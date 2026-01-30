import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllUniversitiesQuery } from "../../../Features/universities/UniversityAPI";

const University: React.FC = () => {
  const navigate = useNavigate();

  const {
    data: universities,
    isLoading,
    isError,
    refetch,
  } = useGetAllUniversitiesQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading universities...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">Failed to load universities.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Universities
        </h1>

        <button
          onClick={() => navigate("/admin/universities/create")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Create University
        </button>
      </div>

      {/* Empty state */}
      {!universities || universities.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-gray-500 mb-4">
            No universities found.
          </p>
          <button
            onClick={() => navigate("/admin/universities/create")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Create First University
          </button>
        </div>
      ) : (
        <>
          {/* Refresh button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={refetch}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              🔄 Refresh
            </button>
          </div>

          {/* University cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {universities.map((uni) => (
              <div
                key={uni.universityID}
                className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {uni.name}
                  </h2>

                  {uni.logoURL ? (
                    <img
                      src={uni.logoURL}
                      alt={`${uni.name} logo`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                      UN
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="text-gray-600 text-sm space-y-2">
                  <p>
                    <span className="font-semibold text-gray-700">Type:</span>{" "}
                    {uni.type}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">County:</span>{" "}
                    {uni.county ?? "Not specified"}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">
                      Government Scholarship:
                    </span>{" "}
                    {uni.governmentScholarship ? "Yes" : "No"}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">
                      HELB Eligible:
                    </span>{" "}
                    {uni.helbEligible ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default University;
