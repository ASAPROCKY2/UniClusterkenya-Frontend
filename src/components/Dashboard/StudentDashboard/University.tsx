import React from "react";
import { useGetAllUniversitiesQuery } from "../../../Features/universities/UniversityAPI";

const University: React.FC = () => {
  const { data, isLoading, isError } = useGetAllUniversitiesQuery();

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

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">No universities found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Universities List
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((uni) => (
          <div
            key={uni.universityID}
            className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300"
          >
            {/* University Logo */}
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

            {/* University Details */}
            <div className="text-gray-600">
              <p className="mb-2">
                <span className="font-semibold text-gray-700">Type:</span>{" "}
                {uni.type}
              </p>
              <p className="mb-2">
                <span className="font-semibold text-gray-700">County:</span>{" "}
                {uni.county ?? "Not specified"}
              </p>
              <p className="mb-2">
                <span className="font-semibold text-gray-700">
                  Government Scholarship:
                </span>{" "}
                {uni.governmentScholarship ? "Yes" : "No"}
              </p>
              <p className="mb-2">
                <span className="font-semibold text-gray-700">
                  HELB Eligible:
                </span>{" "}
                {uni.helbEligible ? "Yes" : "No"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default University;
