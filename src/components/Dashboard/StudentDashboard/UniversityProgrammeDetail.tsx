import React, { useMemo, useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetUniversityWithProgrammesQuery } from "../../../Features/universities/UniversityAPI";
import { useGetUserByIdQuery } from "../../../Features/users/UsersApi";
import { useGetKcseResultsByUserIdQuery } from "../../../Features/KcseResults/kcseResultsAPI";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../app/store";

// Import from programmesAPI instead of clusterAPI
import {
  programmesAPI,
  type TSProgrammeCluster as TCluster, // Rename for consistency
  type TClusterSubject,
} from "../../../Features/programmes/ProgrammesAPI";

const UniversityProgramDetail: React.FC = () => {
  const { universityID, programmeID } = useParams<{ universityID: string; programmeID: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const userID = 1; // Replace with actual logged-in user ID
  const { data: user } = useGetUserByIdQuery(userID ?? skipToken);
  const { data: kcseResults } = useGetKcseResultsByUserIdQuery(userID ?? skipToken);

  const universityIdNum = Number(universityID);
  const { data: university, isLoading, isError } =
    useGetUniversityWithProgrammesQuery(universityIdNum, { skip: !universityID || isNaN(universityIdNum) });

  const [clusters, setClusters] = useState<TCluster[]>([]);
  const [clusterSubjectsData, setClusterSubjectsData] = useState<Record<number, TClusterSubject[]>>({});
  const [isClustersLoading, setIsClustersLoading] = useState(false);

  const fetchClustersAndSubjects = useCallback(async () => {
    if (!university || !programmeID || !Number(programmeID)) return;

    setIsClustersLoading(true);
    try {
      const programmeIdNum = Number(programmeID);

      // FIXED: Use programmesAPI instead of clusterAPI
      // Get clusters from the programme endpoint
      const programmeResult = await dispatch(
        programmesAPI.endpoints.getProgrammeById.initiate(programmeIdNum)
      ).unwrap();
      
      // Extract clusters from the programme response
      const clustersResult = programmeResult?.clusters || [];
      setClusters(clustersResult);

      // Fetch subjects for each cluster
      const subjectsData: Record<number, TClusterSubject[]> = {};
      for (const cluster of clustersResult) {
        const subjectResult = await dispatch(
          // FIXED: Use the correct endpoint from programmesAPI
          programmesAPI.endpoints.getClusterSubjectsByCluster.initiate(cluster.clusterID)
        ).unwrap();
        subjectsData[cluster.clusterID] = subjectResult ?? [];
      }

      setClusterSubjectsData(subjectsData);
    } catch (err) {
      console.error("Failed to fetch clusters or subjects", err);
    } finally {
      setIsClustersLoading(false);
    }
  }, [university, programmeID, dispatch]);

  useEffect(() => {
    fetchClustersAndSubjects();
  }, [fetchClustersAndSubjects]);

  // --- Compute unmet requirements using separate KCSE results ---
  const unmetRequirements = useMemo(() => {
    if (!user || !clusters.length || !kcseResults) return [];

    const missing: string[] = [];

    clusters.forEach((cluster) => {
      const subjects = clusterSubjectsData[cluster.clusterID] || [];

      subjects.forEach((subject) => {
        const studentSubject = kcseResults.find((s) => s.subjectCode === subject.subjectCode);
        if (!studentSubject || studentSubject.points < subject.minPoints) {
          missing.push(
            `${subject.subjectName} - Required: ${subject.minPoints}, Your Points: ${studentSubject?.points ?? 0}`
          );
        }
      });

      // Optional: check cluster total points
      const clusterTotal = subjects.reduce((sum, subj) => {
        const s = kcseResults.find((x) => x.subjectCode === subj.subjectCode);
        return sum + (s?.points ?? 0);
      }, 0);

      const clusterMinTotal = subjects.reduce((sum, subj) => sum + subj.minPoints, 0);
      if (clusterTotal < clusterMinTotal) {
        missing.push(`Total points for ${cluster.name} too low: ${clusterTotal} (required: ${clusterMinTotal})`);
      }
    });

    return missing;
  }, [user, clusters, clusterSubjectsData, kcseResults]);

  const programme = useMemo(() => {
    if (!university || !programmeID) return null;
    return university.programmes?.find((p) => p.programmeID === Number(programmeID));
  }, [university, programmeID]);

  if (isLoading || isClustersLoading) {
    return <div className="max-w-4xl mx-auto py-8"><p>Loading programme details...</p></div>;
  }

  if (isError || !university) {
    return <div className="max-w-4xl mx-auto py-8"><p>Failed to load university details</p></div>;
  }

  if (!programme) {
    return <div className="max-w-4xl mx-auto py-8"><p>Programme not offered by this university</p></div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{programme.name} at {university.name}</h1>

      {university.logoURL && <img src={university.logoURL} alt={`${university.name} logo`} className="w-32 h-32 rounded-full mb-4" />}

      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <p className="mb-2"><strong>Level:</strong> {programme.level ?? "N/A"}</p>
        <p className="mb-2"><strong>Duration:</strong> {programme.durationYears ?? "N/A"} years</p>
        <p className="mb-2"><strong>Min AGP:</strong> {programme.minAGP ?? "N/A"}</p>
        <p className="mb-2"><strong>HELB Eligible:</strong> {programme.helbEligible ? "Yes" : "No"}</p>
        <p className="mb-2"><strong>Scholarship Available:</strong> {programme.scholarshipAvailable ? "Yes" : "No"}</p>
      </div>

      {clusters.length > 0 && (
        <div className="bg-gray-50 p-6 rounded-xl border mb-6">
          <h2 className="text-xl font-semibold mb-4">Cluster Requirements</h2>
          {clusters.map((cluster) => (
            <div key={cluster.clusterID} className="mb-4">
              <h3 className="font-semibold mb-2">{cluster.name} ({cluster.clusterCode})</h3>
              <ul className="list-disc ml-5">
                {clusterSubjectsData[cluster.clusterID]?.map((subject) => (
                  <li key={subject.id} className="mb-1">
                    {subject.subjectName} - Min Points: {subject.minPoints}
                  </li>
                )) || <li>No specific subject requirements found.</li>}
              </ul>
            </div>
          ))}
        </div>
      )}

      {clusters.length === 0 && !isClustersLoading && (
        <div className="bg-yellow-50 p-4 rounded-xl border mb-6">
          <p>No specific cluster requirements found for this programme.</p>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button
          disabled={unmetRequirements.length > 0}
          onClick={() => navigate(`/applications/new?universityID=${universityID}&programmeID=${programmeID}`)}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            unmetRequirements.length > 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {unmetRequirements.length > 0 ? "Cannot Apply - Requirements Missing" : "Apply for this Programme"}
        </button>
      </div>

      {unmetRequirements.length > 0 && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
          <p className="font-semibold mb-2">Missing Requirements:</p>
          <ul className="list-disc ml-5">
            {unmetRequirements.map((req, idx) => <li key={idx}>{req}</li>)}
          </ul>
        </div>
      )}

      {user && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="font-semibold">Your Information:</p>
          <p>Name: {user.firstName} {user.lastName}</p>
          <p>Mean Grade: {user.meanGrade}</p>
          <p>AGP: {user.agp}</p>
          <p>KCSE Index: {user.kcseIndex}</p>
        </div>
      )}
    </div>
  );
};

export default UniversityProgramDetail;