import React from "react";
import { useGetAllUniversitiesQuery } from "../../../Features/universities/UniversityAPI";
import type { TUniversity } from "../../../Features/universities/UniversityAPI";
import { 
  Building2, 
  RefreshCw, 
  MapPin, 
  Award, 
  Shield,
  Loader2,
  AlertCircle,
  CheckCircle,
  XCircle
} from "lucide-react";

const University: React.FC = () => {
  const {
    data: universities,
    isLoading,
    isError,
    refetch,
  } = useGetAllUniversitiesQuery();

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl opacity-20 animate-pulse"></div>
              <div className="absolute inset-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Loader2 className="h-10 w-10 text-white animate-spin" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Universities</h2>
            <p className="text-gray-600">Fetching university directory...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-red-500 rounded-2xl opacity-20"></div>
              <div className="absolute inset-4 bg-gradient-to-r from-rose-500 to-red-600 rounded-xl flex items-center justify-center">
                <AlertCircle className="h-10 w-10 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Failed to Load Universities</h2>
            <p className="text-gray-600 mb-6">We couldn't fetch the university directory. Please try again.</p>
            <button 
              onClick={() => refetch()}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 lg:p-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl">
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  Universities Directory
                </h1>
                <p className="text-gray-600 mt-1">
                  Browse all partner universities
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => refetch()}
            className="px-5 py-3 bg-gradient-to-r from-gray-50 to-white text-gray-700 rounded-xl font-medium hover:from-gray-100 hover:to-white transition-all duration-300 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh List
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-3xl font-bold text-gray-800">{universities?.length || 0}</p>
            <p className="text-sm text-gray-500">Universities</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-3xl font-bold text-gray-800">
              {universities?.filter(u => u.helbEligible).length || 0}
            </p>
            <p className="text-sm text-gray-500">HELB Eligible</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-3xl font-bold text-gray-800">
              {universities?.filter(u => u.governmentScholarship).length || 0}
            </p>
            <p className="text-sm text-gray-500">Govt Scholarship</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-3xl font-bold text-gray-800">
              {new Set(universities?.map(u => u.county).filter(Boolean)).size}
            </p>
            <p className="text-sm text-gray-500">Counties</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities?.map((uni: TUniversity) => (
            <div
              key={uni.universityID}
              className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6"
            >
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">{uni.name}</h2>

                {uni.logoURL ? (
                  <img
                    src={uni.logoURL}
                    alt={`${uni.name} logo`}
                    className="w-16 h-16 rounded-2xl object-cover border"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">
                      {uni.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{uni.county || "Not specified"}</p>
                </div>

                <div className="flex items-center gap-2">
                  {uni.governmentScholarship ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <span className="text-emerald-600">Scholarship Available</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">No Scholarship</span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {uni.helbEligible ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <span className="text-emerald-600">HELB Eligible</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Not HELB Eligible</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default University;
