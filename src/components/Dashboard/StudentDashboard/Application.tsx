import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import type { RootState } from "../../../app/store";
import {
  useGetApplicationsByUserIdQuery,
  type TApplication,
} from "../../../Features/application/applicationAPI";
import { skipToken } from "@reduxjs/toolkit/query/react";
import type { TCluster } from "../../../Features/Cluster/clusterAPI";
import { 
  ChevronLeft, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Building,
  GraduationCap,
  Calendar,
  Loader,
  ExternalLink
} from "lucide-react";

type TApplicationWithCluster = TApplication & {
  cluster?: TCluster | null;
};

const Applications: React.FC = () => {
  const navigate = useNavigate();
  const reduxUserID = useSelector(
    (state: RootState) => state.user.user?.userID
  );

  const params = useParams<{ userID: string }>();
  const paramUserID = params.userID ? Number(params.userID) : undefined;
  const userID = paramUserID ?? reduxUserID;

  const { data, isLoading, isError } = useGetApplicationsByUserIdQuery(
    userID ?? skipToken
  );

  const applications = data as TApplicationWithCluster[] | undefined;

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-4 py-2.5 rounded-lg transition mb-8"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          
          <div className="text-center py-16">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your applications...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-4 py-2.5 rounded-lg transition mb-8"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Unable to Load Applications</h2>
            <p className="text-gray-600 mb-6">
              Please check your connection and try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No Applications State
  if (!applications || applications.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-4 py-2.5 rounded-lg transition mb-8"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">No Applications Yet</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven't applied to any programmes yet. Start exploring programmes and submit your applications.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg transition"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => navigate("/programmes")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
              >
                Browse Programmes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Sort applications by choice order
  const sortedApplications = [...applications].sort(
    (a, b) => a.choiceOrder - b.choiceOrder
  );

  // Get status icon and color
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "Approved":
        return {
          icon: CheckCircle,
          color: "bg-green-100 text-green-800 border-green-200",
          iconColor: "text-green-600"
        };
      case "Rejected":
        return {
          icon: XCircle,
          color: "bg-red-100 text-red-800 border-red-200",
          iconColor: "text-red-600"
        };
      case "Pending":
        return {
          icon: Clock,
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          iconColor: "text-yellow-600"
        };
      default:
        return {
          icon: AlertCircle,
          color: "bg-gray-100 text-gray-800 border-gray-200",
          iconColor: "text-gray-600"
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <button
              onClick={() => navigate("/dashboard")}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-4 py-2.5 rounded-lg transition mb-4 md:mb-0"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
            
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-xl">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
                <p className="text-gray-600 mt-1">
                  Track your programme applications and their status
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{applications.length}</div>
                <div className="text-sm text-gray-500">Total Applications</div>
              </div>
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {applications.filter(app => app.status === "Approved").length}
                </div>
                <div className="text-sm text-gray-500">Approved</div>
              </div>
            </div>
          </div>
        </div>

        {/* Applications Grid */}
        <div className="grid gap-6">
          {sortedApplications.map((app) => {
            const StatusIcon = getStatusInfo(app.status).icon;
            const statusInfo = getStatusInfo(app.status);
            
            return (
              <div
                key={app.applicationID}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    {/* Left Section */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                            <GraduationCap className="w-4 h-4" />
                            Choice {app.choiceOrder}
                          </div>
                          <div className={`px-3 py-1 rounded-full text-sm font-medium border ${statusInfo.color} flex items-center gap-1`}>
                            <StatusIcon className={`w-4 h-4 ${statusInfo.iconColor}`} />
                            {app.status}
                          </div>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition">
                        {app.programme?.name || "Programme not available"}
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {app.programme?.level && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <div className="bg-gray-100 p-2 rounded-lg">
                              <GraduationCap className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="text-sm text-gray-500">Level</span>
                              <p className="font-medium">{app.programme.level}</p>
                            </div>
                          </div>
                        )}

                        {app.programme?.university?.name && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <div className="bg-gray-100 p-2 rounded-lg">
                              <Building className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="text-sm text-gray-500">University</span>
                              <p className="font-medium">{app.programme.university.name}</p>
                            </div>
                          </div>
                        )}

                        {app.cluster && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <div className="bg-blue-50 p-2 rounded-lg">
                              <FileText className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <span className="text-sm text-gray-500">Cluster</span>
                              <p className="font-medium">
                                {app.cluster.name}
                                {app.cluster.clusterCode && (
                                  <span className="text-gray-400 text-sm ml-2">({app.cluster.clusterCode})</span>
                                )}
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-gray-600">
                          <div className="bg-gray-100 p-2 rounded-lg">
                            <Calendar className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Applied Date</span>
                            <p className="font-medium">
                              {new Date(app.applicationDate).toLocaleDateString('en-US', {
                                weekday: 'short',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Section - Status Details */}
                    <div className="lg:w-64">
                      <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                        <h4 className="font-semibold text-gray-700 mb-3">Application Status</h4>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Current Status</span>
                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
                              {app.status}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Application ID</span>
                            <span className="text-sm font-mono text-gray-500">{app.applicationID}</span>
                          </div>
                          
                          <div className="pt-4 border-t border-gray-200">
                            <button
                              onClick={() => navigate(`/programmes/${app.programme?.programmeID}`)}
                              className="w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 py-2.5 rounded-lg transition text-sm font-medium"
                            >
                              View Programme Details
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Progress Bar */}
                <div className="h-2 bg-gray-100">
                  <div 
                    className={`h-full transition-all duration-1000 ${
                      app.status === "Approved" ? "bg-green-500 w-full" :
                      app.status === "Rejected" ? "bg-red-500 w-full" :
                      app.status === "Pending" ? "bg-yellow-500 w-2/3" :
                      "bg-gray-300 w-1/2"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Footer */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Application Summary</h3>
                <p className="text-sm text-gray-600">
                  You've applied to {applications.length} programme{applications.length !== 1 ? 's' : ''} across {new Set(applications.map(app => app.programme?.university?.name)).size} universities
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Back to Dashboard
                </button>
                <button
                  onClick={() => navigate("/programmes")}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Apply to More Programmes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;