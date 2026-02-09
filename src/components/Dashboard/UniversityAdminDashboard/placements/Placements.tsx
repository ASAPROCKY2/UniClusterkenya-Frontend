// src/components/Dashboard/AdminDashboard/Placements/Placement.tsx
import React from "react";
import { GraduationCap, PlayCircle } from "lucide-react";
import { RiCloseCircleFill } from "react-icons/ri";
import { Skeleton } from "../../../../components/ui/skeleton";
import { placementAPI, type TPlacement } from "../../../../Features/placement/placementAPI";
import { toast } from "sonner";

const PlacementComponent: React.FC = () => {
  const {
    data: placements,
    isLoading,
    error,
    refetch,
  } = placementAPI.useGetAllPlacementsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [autoPlacement, { isLoading: isAutoPlacing }] = placementAPI.useAutoPlacementMutation();

  const handleAutoPlacement = async () => {
    try {
      const currentYear = new Date().getFullYear();
      const res = await autoPlacement({ year: currentYear }).unwrap();
      toast.success(res.message || "Auto placement completed successfully");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Auto placement failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-6 rounded-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <GraduationCap className="text-indigo-600" />
            Placements
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage and automate student placements
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-sm">
            <span className="font-semibold text-indigo-600">{placements?.length || 0}</span>{" "}
            <span className="text-gray-500">placements</span>
          </div>

          <button
            onClick={handleAutoPlacement}
            disabled={isAutoPlacing}
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center gap-2 disabled:opacity-50"
          >
            <PlayCircle className="h-5 w-5" />
            {isAutoPlacing ? "Running..." : "Run Auto Placement"}
          </button>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200">
              <Skeleton className="h-6 w-3/4 mb-3" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 flex items-center gap-3">
          <RiCloseCircleFill className="text-xl" />
          <div>
            <p className="font-medium">Error loading placements</p>
            <p className="text-sm">Please refresh or try again later</p>
          </div>
        </div>
      )}

      {/* Placements Grid */}
      {placements?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placements.map((placement: TPlacement) => {
            const universityName =
              placement.programme?.university?.name ||
              placement.university?.name ||
              "N/A";

            const studentName = placement.student
              ? `${placement.student.firstName || ""} ${placement.student.lastName || ""}`.trim() || "Student info unavailable"
              : "Student info unavailable";

            const placementStatus = placement.placementStatus || "N/A";

            const placementDate = placement.placementDate
              ? new Date(placement.placementDate).toLocaleDateString()
              : "Date not recorded";

            return (
              <div
                key={placement.placementID}
                className="bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-xl transition-all p-6"
              >
                {/* Programme */}
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {placement.programme?.name || "Programme N/A"}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  {placement.programme?.level || "Programme level not specified"}
                </p>

                {/* University */}
                <div className="text-sm text-gray-700 mb-4">
                  <span className="font-semibold">University:</span> {universityName}
                </div>

                {/* Student */}
                <div className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Student:</span> {studentName}
                </div>

                {/* Status */}
                <span
                  className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold ${
                    placementStatus.toLowerCase() === "placed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {placementStatus.toUpperCase()}
                </span>

                {/* Date */}
                <p className="text-xs text-gray-400 mt-2">{placementDate}</p>
              </div>
            );
          })}
        </div>
      ) : (
        !isLoading && (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 shadow-sm">
            <GraduationCap size={72} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">
              No placements available
            </h3>
            <p className="text-gray-500 mt-2">
              Run auto placement to generate placements
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default PlacementComponent;
