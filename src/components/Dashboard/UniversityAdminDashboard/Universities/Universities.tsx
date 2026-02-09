import React, { useState } from "react";
import { FaUniversity, FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { RiCloseCircleFill } from "react-icons/ri";
import {
  MapPin,
  ShieldCheck,
  Award,
  ImageIcon,
  GraduationCap,
} from "lucide-react";
import { Skeleton } from "../../../../components/ui/skeleton";
import {
  universityAPI,
  type TUniversity,
} from "../../../../Features/universities/UniversityAPI";

import CreateUniversity from "./CreateUniversity";
import UpdateUniversity from "./UpdateUniversity";
import DeleteUniversity from "./DeleteUniversity";

const UniversityComponent: React.FC = () => {
  const { data: universitiesData, isLoading, error } =
    universityAPI.useGetAllUniversitiesQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });

  const [selectedUniversity, setSelectedUniversity] =
    useState<TUniversity | null>(null);
  const [universityToDelete, setUniversityToDelete] =
    useState<TUniversity | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  /* =============================
     HANDLERS
  ============================= */

  const handleEdit = (university: TUniversity) => {
    setSelectedUniversity(university);
    (
      document.getElementById("update_university_modal") as HTMLDialogElement
    )?.showModal();
  };

  const handleDelete = (university: TUniversity) => {
    setUniversityToDelete(university);
    (
      document.getElementById("delete_university_modal") as HTMLDialogElement
    )?.showModal();
  };

  const handleCreate = () => {
    setShowCreate(true);
    setTimeout(() => {
      (
        document.getElementById(
          "create_university_modal"
        ) as HTMLDialogElement
      )?.showModal();
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-2xl">

      {/* =============================
          MODALS
      ============================= */}
      {showCreate && <CreateUniversity />}
      <UpdateUniversity university={selectedUniversity} />
      <DeleteUniversity university={universityToDelete} />

      {/* =============================
          HEADER
      ============================= */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FaUniversity className="text-blue-600" />
            Universities Management
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Administer institutions, eligibility, and visibility
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-sm">
            <span className="font-semibold text-blue-600">
              {universitiesData?.length || 0}
            </span>{" "}
            <span className="text-gray-500">registered</span>
          </div>

          <button
            onClick={handleCreate}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition shadow-md"
          >
            + Create University
          </button>
        </div>
      </div>

      {/* =============================
          LOADING
      ============================= */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-gray-200"
            >
              <Skeleton className="h-16 w-16 rounded-xl mb-4" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      )}

      {/* =============================
          ERROR
      ============================= */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 flex items-center gap-3">
          <RiCloseCircleFill className="text-xl" />
          <div>
            <p className="font-medium">Error loading universities</p>
            <p className="text-sm">Please refresh or try again later</p>
          </div>
        </div>
      )}

      {/* =============================
          UNIVERSITIES GRID
      ============================= */}
      {universitiesData?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {universitiesData.map((uni) => {
            const eligibilityScore =
              Number(uni.helbEligible) + Number(uni.governmentScholarship);

            return (
              <div
                key={uni.universityID}
                className="group bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-xl transition-all p-6"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-800 truncate group-hover:text-blue-700">
                      {uni.name}
                    </h3>

                    <span
                      className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                        uni.type === "public"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {uni.type?.toUpperCase()}
                    </span>
                  </div>

                  {uni.logoURL ? (
                    <img
                      src={uni.logoURL}
                      alt={`${uni.name} logo`}
                      className="w-16 h-16 rounded-2xl object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700">
                      <ImageIcon />
                    </div>
                  )}
                </div>

                {/* Admin Insights */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">
                      {uni.county || "County not specified"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">
                      {uni.helbEligible ? "HELB Eligible" : "No HELB Support"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Award className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">
                      {uni.governmentScholarship
                        ? "Govt Scholarship"
                        : "No Govt Scholarship"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">
                      Eligibility Score:{" "}
                      <strong>{eligibilityScore}/2</strong>
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(uni)}
                    className="flex-1 py-2 text-sm font-semibold text-blue-700 bg-blue-50 rounded-xl hover:bg-blue-100 transition flex items-center justify-center gap-2"
                  >
                    <FaEdit />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(uni)}
                    className="flex-1 py-2 text-sm font-semibold text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition flex items-center justify-center gap-2"
                  >
                    <MdDeleteForever />
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        !isLoading && (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 shadow-sm">
            <FaUniversity size={72} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">
              No universities available
            </h3>
            <p className="text-gray-500 mt-2">
              Click “Create University” to add institutions
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default UniversityComponent;
