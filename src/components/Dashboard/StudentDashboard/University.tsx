// src/components/Dashboard/AdminDashboard/ManageUniversities/University.tsx
import React, { useState } from "react";
import { useGetAllUniversitiesQuery } from "../../../Features/universities/UniversityAPI";
import UpdateUniversity from "./UpdateUniversity";
import type { TUniversity } from "../../../Features/universities/UniversityAPI";
import { 
  Building2, 
  Plus, 
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
  const [selectedUniversity, setSelectedUniversity] = useState<Partial<TUniversity> | null>(null);
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
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Universities Directory</h1>
                <p className="text-gray-600 mt-1">Browse and manage all partner universities</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => refetch()}
              className="px-5 py-3 bg-gradient-to-r from-gray-50 to-white text-gray-700 rounded-xl font-medium hover:from-gray-100 hover:to-white transition-all duration-300 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh List
            </button>
            <button
              onClick={() => {
                setSelectedUniversity(null);
                (document.getElementById("update_university_modal") as HTMLDialogElement)?.showModal();
              }}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Add University
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Total</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{universities?.length || 0}</p>
            <p className="text-sm text-gray-500">Universities</p>
          </div>
          
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <Shield className="h-5 w-5 text-emerald-600" />
              </div>
              <span className="text-sm text-gray-500">Eligible</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">
              {universities?.filter(u => u.helbEligible).length || 0}
            </p>
            <p className="text-sm text-gray-500">HELB Eligible</p>
          </div>
          
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Award className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-sm text-gray-500">Scholarship</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">
              {universities?.filter(u => u.governmentScholarship).length || 0}
            </p>
            <p className="text-sm text-gray-500">Govt Scholarship</p>
          </div>
          
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-amber-50 rounded-lg">
                <MapPin className="h-5 w-5 text-amber-600" />
              </div>
              <span className="text-sm text-gray-500">Counties</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">
              {new Set(universities?.map(u => u.county).filter(Boolean)).size}
            </p>
            <p className="text-sm text-gray-500">Different Locations</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {/* Empty state */}
        {!universities || universities.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl opacity-20"></div>
              <div className="absolute inset-4 bg-gradient-to-r from-gray-300 to-gray-400 rounded-xl flex items-center justify-center">
                <Building2 className="h-12 w-12 text-gray-600" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Universities Found</h2>
            
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start by adding the first university to the UniCluster system.
            </p>

            <button
              onClick={() => {
                setSelectedUniversity(null);
                (document.getElementById("update_university_modal") as HTMLDialogElement)?.showModal();
              }}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto"
            >
              <Plus className="h-5 w-5" />
              Add First University
            </button>
          </div>
        ) : (
          <>
            {/* University Grid - Directly showing all universities */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {universities.map((uni) => (
                <div
                  key={uni.universityID}
                  className="group bg-white rounded-3xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl hover:border-blue-200 transition-all duration-500 transform hover:-translate-y-1"
                >
                  {/* Card Header with Logo */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-bold text-gray-800 truncate group-hover:text-blue-700 transition-colors">
                        {uni.name}
                      </h2>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          uni.type === 'public' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {uni.type?.toUpperCase() || 'UNIVERSITY'}
                        </span>
                        {uni.governmentScholarship && (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                            Scholarship
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Logo */}
                    {uni.logoURL ? (
                      <div className="ml-4 flex-shrink-0 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <img
                          src={uni.logoURL}
                          alt={`${uni.name} logo`}
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-gray-100 group-hover:border-blue-300 transition-all duration-300 shadow-sm"
                        />
                      </div>
                    ) : (
                      <div className="ml-4 flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center border-2 border-gray-100 group-hover:border-blue-300 transition-all duration-300">
                        <span className="text-2xl font-bold text-blue-600">
                          {uni.name?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* University Details */}
                  <div className="space-y-4 mb-6">
                    {/* Location */}
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <MapPin className="h-4 w-4 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium text-gray-800">{uni.county || "Not specified"}</p>
                      </div>
                    </div>

                    {/* Scholarship Status */}
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <Award className="h-4 w-4 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Government Scholarship</p>
                        <div className="flex items-center gap-2">
                          {uni.governmentScholarship ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-emerald-500" />
                              <span className="font-medium text-emerald-600">Available</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-4 w-4 text-gray-400" />
                              <span className="font-medium text-gray-600">Not Available</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* HELB Eligibility */}
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <Shield className="h-4 w-4 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">HELB Eligible</p>
                        <div className="flex items-center gap-2">
                          {uni.helbEligible ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-emerald-500" />
                              <span className="font-medium text-emerald-600">Eligible</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-4 w-4 text-gray-400" />
                              <span className="font-medium text-gray-600">Not Eligible</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Update Button */}
                  <button
                    onClick={() => {
                      setSelectedUniversity(uni);
                      (document.getElementById("update_university_modal") as HTMLDialogElement)?.showModal();
                    }}
                    className="w-full py-3 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-xl font-semibold hover:from-blue-100 hover:to-indigo-100 hover:text-blue-800 transition-all duration-300 border border-blue-200 hover:border-blue-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Update Details
                  </button>
                </div>
              ))}
            </div>

            {/* Footer Stats */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-gray-600">
                  Showing <span className="font-semibold text-gray-800">{universities.length}</span> universities
                </p>
                <div className="text-sm text-gray-500">
                  UniCluster Kenya • University Directory
                </div>
              </div>
            </div>
          </>
        )}

        {/* Modal for update */}
        {selectedUniversity !== null && (
          <UpdateUniversity
            university={selectedUniversity}
            refetch={refetch}
          />
        )}
      </div>
    </div>
  );
};

export default University;