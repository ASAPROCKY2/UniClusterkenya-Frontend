// src/components/Universities/UniversityProgramDetail.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetUniversityWithProgrammesQuery } from "../../../Features/universities/UniversityAPI";

const UniversityProgramDetail: React.FC = () => {
  const { universityID, programmeID } = useParams<{
    universityID: string;
    programmeID: string;
  }>();

  const navigate = useNavigate();

  const { data: university, isLoading, isError } =
    useGetUniversityWithProgrammesQuery(Number(universityID));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading programme details...</p>
      </div>
    );
  }

  if (isError || !university) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">
          Failed to load university or programme details.
        </p>
      </div>
    );
  }

  const programme = university.programmes.find(
    (p) => p.programmeID === Number(programmeID)
  );

  if (!programme) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">
          This university does not offer the selected programme.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        {programme.name} at {university.name}
      </h1>

      {university.logoURL && (
        <img
          src={university.logoURL}
          alt={`${university.name} logo`}
          className="w-24 h-24 rounded-full mb-4"
        />
      )}

      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <p className="mb-2">
          <span className="font-semibold">Level:</span>{" "}
          {programme.level ?? "N/A"}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Duration (Years):</span>{" "}
          {programme.durationYears ?? "N/A"}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Minimum AGP:</span>{" "}
          {programme.minAGP ?? "N/A"}
        </p>
        <p className="mb-2">
          <span className="font-semibold">HELB Eligible:</span>{" "}
          {programme.helbEligible ? "Yes" : "No"}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Scholarship Available:</span>{" "}
          {programme.scholarshipAvailable ? "Yes" : "No"}
        </p>
      </div>

      {/* APPLY BUTTON — NEW FEATURE */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() =>
            navigate(
              `/applications/new?universityID=${universityID}&programmeID=${programmeID}`
            )
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Apply for this Programme
        </button>
      </div>
    </div>
  );
};

export default UniversityProgramDetail;
