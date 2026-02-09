import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { toast } from "sonner";
import { ChevronLeft, Clock, BookOpen, Award, Check, X } from "lucide-react";

import { useGetProgrammeByIdQuery } from "../../../Features/programmes/ProgrammesAPI";
import { useGetKcseResultsByUserIdQuery } from "../../../Features/KcseResults/kcseResultsAPI";
import type { TClusterSubject, TProgrammeCluster } from "../../../Features/programmes/ProgrammesAPI";
import { skipToken } from "@reduxjs/toolkit/query/react";

const ProgrammeDetail: React.FC = () => {
  const { programmeID } = useParams<{ programmeID: string }>();
  const navigate = useNavigate();

  // Get user ID
  const userID = useSelector((state: RootState) => state.user.user?.userID);
  const numericProgrammeID = programmeID ? Number(programmeID) : undefined;

  // Fetch data
  const { data: programme, isLoading, isError } = useGetProgrammeByIdQuery(
    numericProgrammeID ?? skipToken
  );

  const { data: kcseResults } = useGetKcseResultsByUserIdQuery(
    userID ?? skipToken
  );

  // Prepare student subjects
  const studentSubjects = useMemo(() => {
    if (!kcseResults) return {};
    return kcseResults.reduce((acc: Record<string, number>, r: any) => {
      acc[r.subjectCode] = Number(r.points);
      return acc;
    }, {});
  }, [kcseResults]);

  // Check if student meets requirements
  const meetsRequirements = useMemo(() => {
    if (!programme?.clusters?.length || !kcseResults?.length) return false;

    for (const cluster of programme.clusters) {
      const grouped = groupSubjects(cluster.subjects);
      const failedGroups = grouped.filter(
        (group) =>
          !group.some(
            (s) =>
              studentSubjects[s.subjectCode] !== undefined &&
              studentSubjects[s.subjectCode] >= s.minPoints
          )
      );
      if (failedGroups.length > 0) return false;
    }
    return true;
  }, [programme, kcseResults, studentSubjects]);

  // Apply handler
  const handleApply = () => {
    if (!programme?.clusters?.length) {
      toast.error("Programme requirements are not available");
      return;
    }

    if (!kcseResults?.length) {
      toast.error("Your KCSE results are missing");
      return;
    }

    if (!meetsRequirements) {
      toast.error("You do not meet the programme requirements");
      return;
    }

    navigate(`/applications/new?programmeID=${programme.programmeID}`);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading programme details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError || !programme) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <X className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Programme Not Found</h2>
          <p className="text-gray-600 mb-6">Unable to load programme details.</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-lg transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 pt-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-lg transition"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Programmes
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Programme Header Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {programme.level || "Undergraduate"}
                </div>
                {programme.helbEligible && (
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    HELB Eligible
                  </div>
                )}
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {programme.name}
              </h1>
              
              <p className="text-gray-600 mb-6 max-w-3xl">
                Explore this programme's requirements and check your eligibility.
              </p>
              
              <div className="flex flex-wrap gap-6 text-gray-700">
                {programme.durationYears && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span>{programme.durationYears} years</span>
                  </div>
                )}
                {programme.minAGP !== null && programme.minAGP !== undefined && (
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-gray-400" />
                    <span>Min AGP: {programme.minAGP}</span>
                  </div>
                )}
                {programme.scholarshipAvailable && (
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-gray-400" />
                    <span>Scholarship Available</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Eligibility Badge */}
            <div className="bg-gray-50 rounded-xl p-6 min-w-[200px] border">
              <div className="text-center mb-4">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${meetsRequirements ? 'bg-green-100' : 'bg-red-100'} mb-3`}>
                  {meetsRequirements ? (
                    <Check className="w-6 h-6 text-green-600" />
                  ) : (
                    <X className="w-6 h-6 text-red-600" />
                  )}
                </div>
                <h3 className="font-semibold text-gray-800">Eligibility</h3>
                <p className={`text-sm mt-1 ${meetsRequirements ? 'text-green-600' : 'text-red-600'}`}>
                  {meetsRequirements ? 'You meet requirements' : 'Requirements not met'}
                </p>
              </div>
              <button
                onClick={handleApply}
                disabled={!meetsRequirements}
                className={`w-full py-3 rounded-lg font-medium transition ${meetsRequirements 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>

        {/* Cluster Requirements */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Cluster Requirements
          </h2>
          
          {!programme.clusters || programme.clusters.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center border">
              <p className="text-gray-500">No cluster requirements specified for this programme.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {programme.clusters.map((cluster: TProgrammeCluster) => {
                const groups = groupSubjects(cluster.subjects);
                const isClusterMet = groups.every(group =>
                  group.some(s => 
                    studentSubjects[s.subjectCode] !== undefined &&
                    studentSubjects[s.subjectCode] >= s.minPoints
                  )
                );

                return (
                  <div key={cluster.clusterID} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {cluster.name}
                        </h3>
                        <p className="text-gray-500 text-sm">{cluster.clusterCode}</p>
                      </div>
                      <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${isClusterMet 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                      }`}>
                        {isClusterMet ? 'Met' : 'Not Met'}
                      </span>
                    </div>

                    <div className="space-y-4">
                      {groups.map((group, idx) => {
                        const isGroupMet = group.some(s =>
                          studentSubjects[s.subjectCode] !== undefined &&
                          studentSubjects[s.subjectCode] >= s.minPoints
                        );
                        const studentPoints = group.map(s => ({
                          name: s.subjectName,
                          required: s.minPoints,
                          actual: studentSubjects[s.subjectCode] || 0,
                          met: studentSubjects[s.subjectCode] !== undefined && 
                               studentSubjects[s.subjectCode] >= s.minPoints
                        }));

                        return (
                          <div key={idx} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <div className={`w-3 h-3 rounded-full ${isGroupMet ? 'bg-green-500' : 'bg-red-500'}`}></div>
                              <span className="text-sm text-gray-500">
                                Choose at least one subject from this group:
                              </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                              {studentPoints.map((subject, sIdx) => (
                                <div
                                  key={sIdx}
                                  className={`p-3 rounded-lg border ${subject.met 
                                    ? 'border-green-200 bg-green-50' 
                                    : 'border-gray-200'
                                  }`}
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <span className="font-medium text-gray-900">{subject.name}</span>
                                    {subject.met ? (
                                      <Check className="w-4 h-4 text-green-600" />
                                    ) : (
                                      <X className="w-4 h-4 text-gray-400" />
                                    )}
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Required: {subject.required} pts</span>
                                    <span className={subject.met ? 'text-green-600 font-medium' : 'text-gray-600'}>
                                      You: {subject.actual} pts
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {group.length > 1 && (
                              <div className="text-center mt-3">
                                <span className="text-sm text-gray-400">OR</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom Apply Button */}
        <div className="bg-white rounded-xl shadow-lg p-6 sticky bottom-4 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-gray-900">Ready to apply?</h3>
              <p className="text-gray-600 text-sm">
                {meetsRequirements 
                  ? 'You meet all requirements for this programme.' 
                  : 'Please check your subject requirements before applying.'
                }
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Back
              </button>
              <button
                onClick={handleApply}
                disabled={!meetsRequirements}
                className={`px-8 py-3 rounded-lg font-medium transition ${meetsRequirements 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Helper function */
function groupSubjects(subjects: TClusterSubject[]): TClusterSubject[][] {
  const groups: Record<number, TClusterSubject[]> = {};
  const singles: TClusterSubject[][] = [];

  subjects.forEach((subject) => {
    if (subject.alternativeGroup) {
      if (!groups[subject.alternativeGroup]) groups[subject.alternativeGroup] = [];
      groups[subject.alternativeGroup].push(subject);
    } else {
      singles.push([subject]);
    }
  });

  return [...Object.values(groups), ...singles];
}

export default ProgrammeDetail;