// src/components/Programmes/ProgrammeUniversities.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetUniversitiesByProgrammeQuery } from "../../../Features/universities/UniversityAPI";

const ProgrammeUniversities: React.FC = () => {
  const { programmeID } = useParams<{ programmeID: string }>();
  const navigate = useNavigate();

  const {
    data: universities,
    isLoading,
    isError,
  } = useGetUniversitiesByProgrammeQuery(Number(programmeID));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading universities...</p>
      </div>
    );
  }

  if (isError || !universities || universities.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">
          No universities found for this programme.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Universities Offering This Programme
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {universities.map((uni) => (
          <div
            key={uni.universityID}
            className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300"
          >
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

            <div className="text-gray-600 mb-4">
              <p>
                <span className="font-semibold">Type:</span> {uni.type}
              </p>
              <p>
                <span className="font-semibold">County:</span> {uni.county ?? "N/A"}
              </p>
              <p>
                <span className="font-semibold">Gov. Scholarship:</span>{" "}
                {uni.governmentScholarship ? "Yes" : "No"}
              </p>
              <p>
                <span className="font-semibold">HELB Eligible:</span>{" "}
                {uni.helbEligible ? "Yes" : "No"}
              </p>
            </div>

            <button
              onClick={() =>
                navigate(`/university/${uni.universityID}/programme/${programmeID}`)
              }
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Programme Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgrammeUniversities;
