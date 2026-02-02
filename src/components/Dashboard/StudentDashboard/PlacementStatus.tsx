// src/components/Dashboard/StudentDashboard/Placement.tsx
import React from "react";
import { useSelector } from "react-redux";
import { useGetPlacementsByUserIdQuery } from "../../../Features/placement/placementAPI";
import type { RootState } from "../../../app/store";
import { 
  GraduationCap, 
  Building2, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  Download,
  BookOpen,
  Calendar,
  MapPin,
  Award
} from "lucide-react";

// Status colors mapping
const statusColors: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  "ADMITTED": {
    bg: "bg-gradient-to-r from-emerald-50 to-green-50",
    text: "text-emerald-700",
    icon: <CheckCircle className="h-5 w-5 text-emerald-500" />
  },
  "PLACED": {
    bg: "bg-gradient-to-r from-blue-50 to-indigo-50",
    text: "text-blue-700",
    icon: <GraduationCap className="h-5 w-5 text-blue-500" />
  },
  "PENDING": {
    bg: "bg-gradient-to-r from-amber-50 to-orange-50",
    text: "text-amber-700",
    icon: <Clock className="h-5 w-5 text-amber-500" />
  },
  "REJECTED": {
    bg: "bg-gradient-to-r from-rose-50 to-red-50",
    text: "text-rose-700",
    icon: <AlertCircle className="h-5 w-5 text-rose-500" />
  },
};

const Placement: React.FC = () => {
  const userID = useSelector((state: RootState) => state.user.user?.userID);
  const user = useSelector((state: RootState) => state.user.user);

  const { data: placements, isLoading, isError } = useGetPlacementsByUserIdQuery(userID!, {
    skip: !userID,
  });

  // Helper function to safely get university name
  const getUniversityName = (placement: any) => {
    // Try to get university name from programme.university
    if (placement?.programme?.university?.name) {
      return placement.programme.university.name;
    }
    
    // Fallback if structure is different
    if (placement?.university?.name) {
      return placement.university.name;
    }
    
    return "University Placement";
  };

  // Helper function to safely get programme name
  const getProgrammeName = (placement: any) => {
    return placement?.programme?.name || "Programme not specified";
  };

  // Helper function to safely get programme level
  const getProgrammeLevel = (placement: any) => {
    return placement?.programme?.level || "Not specified";
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="w-16 h-16 mx-auto mb-4 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl opacity-20 animate-pulse"></div>
              <div className="absolute inset-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-white animate-spin" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Loading Placement</h2>
            <p className="text-gray-600">Fetching your university placement details...</p>
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
          <div className="relative mb-6">
            <div className="w-16 h-16 mx-auto mb-4 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-red-500 rounded-2xl opacity-20"></div>
              <div className="absolute inset-4 bg-gradient-to-r from-rose-500 to-red-600 rounded-xl flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Failed to Load Placement</h2>
            <p className="text-gray-600 mb-6">We couldn't fetch your placement details. Please try again later.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!placements || placements.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto p-4 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">University Placement</h1>
            <p className="text-gray-600">Your placement details and current status</p>
          </div>

          {/* Empty State Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl opacity-10"></div>
              <div className="absolute inset-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Clock className="h-10 w-10 text-white" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Awaiting Placement</h2>
            
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Your university placement is currently being processed. Check back soon for updates on your admission status.
            </p>

            {/* Progress Indicator */}
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-8">
              <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 w-2/3 animate-pulse"></div>
            </div>

            {/* Helpful Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:border-blue-200 transition-all duration-300">
                <div className="flex items-center justify-center gap-3">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-700">Browse Programs</span>
                </div>
              </button>
              <button className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100 hover:border-emerald-200 transition-all duration-300">
                <div className="flex items-center justify-center gap-3">
                  <Building2 className="h-5 w-5 text-emerald-600" />
                  <span className="font-medium text-emerald-700">View Universities</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get the latest placement (use reduce to find the most recent by placementDate)
  const latestPlacement = placements.length > 0 
    ? placements.reduce((latest, current) => {
        if (!latest.placementDate) return current;
        if (!current.placementDate) return latest;
        return new Date(current.placementDate) > new Date(latest.placementDate)
          ? current
          : latest;
      })
    : placements[0];

  const status = latestPlacement?.placementStatus?.toUpperCase() || "PENDING";
  const statusConfig = statusColors[status] || statusColors["PENDING"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">University Placement</h1>
            <p className="text-gray-600">Your official university admission details</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-sm">
              <span className="text-sm text-gray-500">Student ID:</span>
              <span className="ml-2 font-semibold text-gray-800">{user?.kcseIndex || "N/A"}</span>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export PDF
            </button>
          </div>
        </div>

        {/* Status Banner */}
        <div className={`${statusConfig.bg} rounded-2xl border ${statusConfig.text} p-6 mb-8`}>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/50 rounded-xl backdrop-blur-sm">
              {statusConfig.icon}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1">Placement Status: {latestPlacement?.placementStatus}</h2>
              <p className="opacity-80">
                {status === "ADMITTED" 
                  ? "Congratulations! You have been admitted to the following programme."
                  : status === "PLACED"
                  ? "You have been successfully placed in a university programme."
                  : "Your placement is currently being processed."}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Placement Details Card */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                    <GraduationCap className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Placement Details</h3>
                    <p className="text-gray-500 text-sm">Your assigned programme and university</p>
                  </div>
                </div>
                <span className="px-4 py-2 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 rounded-full text-sm font-semibold">
                  ASSIGNED
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Programme Info */}
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      <h4 className="font-semibold text-gray-800">Programme</h4>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {getProgrammeName(latestPlacement)}
                    </p>
                    <p className="text-gray-600 mt-1">University Programme</p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Award className="h-5 w-5 text-emerald-600" />
                      <h4 className="font-semibold text-gray-800">Level</h4>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">
                      {getProgrammeLevel(latestPlacement)}
                    </p>
                    <p className="text-gray-600 mt-1">Academic Level</p>
                  </div>
                </div>

                {/* University Info */}
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Building2 className="h-5 w-5 text-purple-600" />
                      <h4 className="font-semibold text-gray-800">University</h4>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {getUniversityName(latestPlacement)}
                    </p>
                    <p className="text-gray-600 mt-1">Chartered University</p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="h-5 w-5 text-amber-600" />
                      <h4 className="font-semibold text-gray-800">Placement Date</h4>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">
                      {latestPlacement?.placementDate
                        ? new Date(latestPlacement.placementDate).toLocaleDateString()
                        : "Pending"}
                    </p>
                    <p className="text-gray-600 mt-1">Date of placement</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Section */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Clock className="h-6 w-6 text-blue-600" />
                Placement Timeline
              </h3>
              
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 to-indigo-200"></div>
                
                <div className="space-y-8">
                  {[
                    { step: "Application Submitted", date: "Jan 15, 2024", status: "completed" },
                    { step: "Application Reviewed", date: "Feb 1, 2024", status: "completed" },
                    { step: "Placement Processing", date: "Feb 20, 2024", status: "completed" },
                    { step: "Admission Issued", date: latestPlacement?.placementDate || "Mar 15, 2024", status: "current" },
                    { step: "Registration", date: "Apr 30, 2024", status: "pending" },
                  ].map((item, index) => (
                    <div key={index} className="relative flex items-start gap-4">
                      <div className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center ${
                        item.status === "completed" 
                          ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/25"
                          : item.status === "current"
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                          : "bg-gray-100 text-gray-400"
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1 pt-3">
                        <h4 className="font-semibold text-gray-800 mb-1">{item.step}</h4>
                        <p className="text-gray-600">{item.date}</p>
                        <p className={`text-sm mt-2 font-medium ${
                          item.status === "completed" ? "text-emerald-600" :
                          item.status === "current" ? "text-blue-600" : "text-gray-500"
                        }`}>
                          {item.status === "completed" ? "✓ Completed" :
                           item.status === "current" ? "● In Progress" : "○ Pending"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-8">
            {/* Admission Letter */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
                Admission Letter
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                  <p className="text-sm text-gray-600 mb-1">Letter Number</p>
                  <p className="text-lg font-bold text-gray-900">
                    ADM-{latestPlacement?.placementID}-{new Date().getFullYear()}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Issued</p>
                    <p className="font-medium text-gray-800">
                      {latestPlacement?.placementDate
                        ? new Date(latestPlacement.placementDate).toLocaleDateString()
                        : "Pending"}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Valid Until</p>
                    <p className="font-medium text-gray-800">
                      {latestPlacement?.placementDate
                        ? new Date(new Date(latestPlacement.placementDate).setFullYear(new Date(latestPlacement.placementDate).getFullYear() + 1)).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
                
                <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
                  <Download className="h-5 w-5" />
                  Download Admission Letter
                </button>
              </div>
            </div>

            {/* Campus Information */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <MapPin className="h-6 w-6 text-purple-600" />
                Campus Information
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Building2 className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Campus</p>
                    <p className="font-medium text-gray-800">Main Campus</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <MapPin className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-medium text-gray-800">Nairobi, Kenya</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition">
                  <div className="p-2 bg-rose-100 rounded-lg">
                    <span className="text-rose-600 font-medium">📞</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Contact</p>
                    <p className="font-medium text-gray-800">+254 20 123 4567</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            Accept Placement
          </button>
          <button className="px-6 py-3 bg-white text-gray-800 rounded-xl font-semibold border border-gray-300 hover:border-gray-400 hover:shadow-lg transition-all duration-300">
            Request Transfer
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-xl font-semibold border border-blue-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Placement;