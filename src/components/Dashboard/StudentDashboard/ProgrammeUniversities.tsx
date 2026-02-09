import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetUniversitiesByProgrammeQuery } from "../../../Features/universities/UniversityAPI";
import { 
  ChevronLeft, 
  Building, 
  MapPin, 
  Award, 
  Shield, 
  BookOpen, 
  GraduationCap,
  Globe,
  Loader,
  ExternalLink,
  AlertCircle
} from "lucide-react";

const ProgrammeUniversities: React.FC = () => {
  const { programmeID } = useParams<{ programmeID: string }>();
  const navigate = useNavigate();

  const {
    data: universities,
    isLoading,
    isError,
  } = useGetUniversitiesByProgrammeQuery(Number(programmeID));

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-4 py-2.5 rounded-lg transition mb-8"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Programme
          </button>
          
          <div className="text-center py-16">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading universities...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error or Empty State
  if (isError || !universities || universities.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-4 py-2.5 rounded-lg transition mb-8"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Programme
          </button>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No Universities Found</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Currently, no universities are offering this programme. Please check back later or explore other programmes.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition"
            >
              Browse Other Programmes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-10">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-4 py-2.5 rounded-lg transition mb-6"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Programme
          </button>
          
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Building className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Universities Offering This Programme
              </h1>
              <p className="text-gray-600 mt-1">
                Explore all universities offering this programme across the country
              </p>
            </div>
          </div>
          
          <div className="mt-6 bg-white rounded-xl p-4 border border-gray-200 inline-flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{universities.length}</div>
              <div className="text-sm text-gray-500">Total Universities</div>
            </div>
            <div className="h-8 w-px bg-gray-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {universities.filter(uni => uni.helbEligible).length}
              </div>
              <div className="text-sm text-gray-500">HELB Eligible</div>
            </div>
          </div>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((uni) => (
            <div
              key={uni.universityID}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              {/* University Logo/Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white line-clamp-1">
                      {uni.name}
                    </h2>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="bg-white/20 text-white/90 px-3 py-1 rounded-full text-xs font-medium">
                        {uni.type}
                      </span>
                      {uni.governmentScholarship && (
                        <span className="bg-green-500/20 text-green-100 px-3 py-1 rounded-full text-xs font-medium">
                          Gov. Scholarship
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {uni.logoURL ? (
                    <div className="w-16 h-16 rounded-xl bg-white p-2 shadow-lg">
                      <img
                        src={uni.logoURL}
                        alt={`${uni.name} logo`}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center">
                      <Building className="w-8 h-8 text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* University Details */}
              <div className="p-6">
                <div className="space-y-4">
                  {/* Location */}
                  {uni.county && (
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 p-2 rounded-lg">
                        <MapPin className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium text-gray-900">{uni.county} County</p>
                      </div>
                    </div>
                  )}

                  {/* Financial Aid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className={`p-3 rounded-lg ${uni.helbEligible ? 'bg-green-50 border border-green-100' : 'bg-gray-50 border border-gray-100'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <Shield className={`w-4 h-4 ${uni.helbEligible ? 'text-green-600' : 'text-gray-400'}`} />
                        <span className="text-sm font-medium">HELB</span>
                      </div>
                      <p className={`text-sm ${uni.helbEligible ? 'text-green-700' : 'text-gray-500'}`}>
                        {uni.helbEligible ? 'Eligible' : 'Not Eligible'}
                      </p>
                    </div>

                    <div className={`p-3 rounded-lg ${uni.governmentScholarship ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50 border border-gray-100'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <Award className={`w-4 h-4 ${uni.governmentScholarship ? 'text-blue-600' : 'text-gray-400'}`} />
                        <span className="text-sm font-medium">Scholarship</span>
                      </div>
                      <p className={`text-sm ${uni.governmentScholarship ? 'text-blue-700' : 'text-gray-500'}`}>
                        {uni.governmentScholarship ? 'Available' : 'Not Available'}
                      </p>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Facts</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">University Type</span>
                        <span className="font-medium text-gray-900">{uni.type}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Campus Type</span>
                        <span className="font-medium text-gray-900">
                          {uni.type?.toLowerCase().includes('public') ? 'Public' : 'Private'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-6 pb-6">
                <button
                  onClick={() =>
                    navigate(`/university/${uni.universityID}/programme/${programmeID}`)
                  }
                  className="w-full group/btn bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <GraduationCap className="w-5 h-5" />
                  View Programme Details
                  <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Footer */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Need Help Choosing?</h3>
                <p className="text-sm text-gray-600">
                  Consider factors like location, HELB eligibility, and scholarship availability when selecting a university.
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => navigate(-1)}
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Back to Programme
                </button>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-5 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Understanding Your Options
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-gray-600">HELB Eligible = Student loan available</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-600" />
                <span className="text-gray-600">Gov. Scholarship = Government funding available</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-purple-600" />
                <span className="text-gray-600">Public universities offer government-subsidized fees</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgrammeUniversities;