// src/components/Dashboard/AdminDashboard/ManageApplicationWindows/ApplicationWindow.tsx
import React, { useState } from "react";
import { FaCalendarAlt, FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { RiCloseCircleFill } from "react-icons/ri";
import { Skeleton } from "../../../../components/ui/skeleton";
import {
  applicationWindowAPI,
  type TApplicationWindow,
} from "../../../../Features/ApplicationWindow/applicationWindowAPI";

import CreateApplicationWindow from "./createApplicationWindow";
import UpdateApplicationWindow from "./UpdateApplicationWindow";
import DeleteApplicationWindow from "./DeleteApplicationWindow";

const ApplicationWindowComponent: React.FC = () => {
  const { data: windowsData, isLoading, error } =
    applicationWindowAPI.useGetAllApplicationWindowsQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });

  const [selectedWindow, setSelectedWindow] = useState<TApplicationWindow | null>(null);
  const [windowToDelete, setWindowToDelete] = useState<TApplicationWindow | null>(null);

  // Control modal display
  const [showCreate, setShowCreate] = useState(false);

  const handleEdit = (window: TApplicationWindow) => {
    setSelectedWindow(window);
    (document.getElementById("update_window_modal") as HTMLDialogElement)?.showModal();
  };

  const handleDelete = (window: TApplicationWindow) => {
    setWindowToDelete(window);
    (document.getElementById("delete_window_modal") as HTMLDialogElement)?.showModal();
  };

  const handleCreateOpen = () => {
    setShowCreate(true);
    setTimeout(() => {
      (document.getElementById("create_window_modal") as HTMLDialogElement)?.showModal();
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-2xl">
      {/* Modals */}
      {showCreate && <CreateApplicationWindow />}
      <UpdateApplicationWindow window={selectedWindow} />
      <DeleteApplicationWindow window={windowToDelete} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FaCalendarAlt className="text-blue-600" />
            Application Windows
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage all application windows in the system
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-sm">
            <span className="font-semibold text-blue-600">{windowsData?.length || 0}</span>{" "}
            <span className="text-gray-500">windows</span>
          </div>

          <button
            onClick={handleCreateOpen}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            + Add Window
          </button>
        </div>
      </div>

      {/* Loading */}
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

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 flex items-center gap-3">
          <RiCloseCircleFill className="text-xl" />
          <div>
            <p className="font-medium">Error loading application windows</p>
            <p className="text-sm">Please refresh or try again later</p>
          </div>
        </div>
      )}

      {/* Windows Grid */}
      {windowsData?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {windowsData.map((win) => (
            <div
              key={win.windowID}
              className="group bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-xl transition-all p-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-800 truncate group-hover:text-blue-700">
                    {win.name}
                  </h3>

                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                      win.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {win.isActive ? "ACTIVE" : "INACTIVE"}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-700">
                    Start: {new Date(win.startDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-700">
                    End: {new Date(win.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-700">
                    Total Slots: {win.totalSlots}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-700">
                    Available Slots: {win.availableSlots}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(win)}
                  className="flex-1 py-2 text-sm font-semibold text-blue-700 bg-blue-50 rounded-xl hover:bg-blue-100 transition flex items-center justify-center gap-2"
                >
                  <FaEdit />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(win)}
                  className="flex-1 py-2 text-sm font-semibold text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition flex items-center justify-center gap-2"
                >
                  <MdDeleteForever />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !isLoading && (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 shadow-sm">
            <FaCalendarAlt size={72} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">
              No application windows available
            </h3>
            <p className="text-gray-500 mt-2">
              Click “Add Window” to get started
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default ApplicationWindowComponent;
