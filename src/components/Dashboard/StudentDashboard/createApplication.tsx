// src/dashboard/StudentDashboard/applications/CreateApplication.tsx
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import {
  applicationAPI,
  type TApplicationProgramme,
  type TCreateApplicationPayload,
} from "../../../Features/application/applicationAPI";
import { FaClipboardList, FaPlusCircle } from "react-icons/fa";

// If you don't have a Skeleton component yet, remove this import or create one
import { Skeleton } from "../../../components/ui/skeleton";

const CreateApplication = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const userId = user?.userID; 

  const [selectedProgramme, setSelectedProgramme] = useState<TApplicationProgramme | null>(null);
  const [choiceOrder, setChoiceOrder] = useState<number>(1);

  // Fetch all application windows to check if application period is active
  const { data: windows, isLoading: windowsLoading } = applicationAPI.useGetAllApplicationWindowsQuery();

  // Mutation to create application
  const [createApplication, { isLoading: creating, error: createError, reset }] =
    applicationAPI.useCreateApplicationMutation();

  const handleApply = async () => {
    if (!userId || !selectedProgramme) return;

    const payload: TCreateApplicationPayload = {
      userID: userId,
      programmeID: selectedProgramme.programmeID,
      choiceOrder,
    };

    try {
      await createApplication(payload).unwrap();
      alert("Application submitted successfully!");
      setSelectedProgramme(null);
      setChoiceOrder(1);
      reset();
    } catch (err: any) {
      console.error(err);
      alert("Failed to submit application: " + err?.data?.message || err.message);
    }
  };

  if (!userId) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <FaClipboardList className="mr-2 text-blue-600" />
          Apply for Programmes
        </h2>
        <p className="text-gray-600">
          You are not logged in as a student, so you cannot apply for programmes.
        </p>
      </div>
    );
  }

  // Check for active application window
  const activeWindow = windows?.find((w) => w.isActive);

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaPlusCircle className="mr-2 text-blue-600" />
          Apply for Programmes
        </h2>
        <div className="text-sm text-gray-500">
          {activeWindow
            ? `Application window: ${activeWindow.name} (${new Date(
                activeWindow.startDate
              ).toLocaleDateString()} - ${new Date(
                activeWindow.endDate
              ).toLocaleDateString()})`
            : "No active application window"}
        </div>
      </div>

      {/* Loading */}
      {windowsLoading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      )}

      {/* Application Form */}
      {activeWindow ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Programme
            </label>
            <select
              value={selectedProgramme?.programmeID || ""}
              onChange={(e) =>
                setSelectedProgramme(
                  e.target.selectedIndex >= 0
                    ? {
                        programmeID: Number(e.target.value),
                        name: e.target.options[e.target.selectedIndex].text,
                      }
                    : null
                )
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">-- Select a programme --</option>
              {/* TODO: Replace with real programmes list */}
              <option value={1}>Computer Science</option>
              <option value={2}>Business Administration</option>
              <option value={3}>Mechanical Engineering</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Choice Order
            </label>
            <input
              type="number"
              min={1}
              value={choiceOrder}
              onChange={(e) => setChoiceOrder(Number(e.target.value))}
              className="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <button
            onClick={handleApply}
            disabled={!selectedProgramme || creating}
            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {creating ? "Applying..." : "Apply"}
          </button>

          {createError && (
            <div className="p-2 bg-red-50 text-red-600 rounded-md mt-2">
              Failed to submit application.
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <FaClipboardList size={64} className="mx-auto text-gray-300" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No active application window
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            You cannot apply at this time.
          </p>
        </div>
      )}
    </div>
  );
};

export default CreateApplication;
