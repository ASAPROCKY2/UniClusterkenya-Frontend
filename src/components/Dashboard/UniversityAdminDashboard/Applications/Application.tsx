// src/components/Dashboard/AdminDashboard/ManageApplications/Application.tsx

import React, { useState } from "react";
import { FaEdit, FaUserGraduate } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { RiCloseCircleFill } from "react-icons/ri";
import { Skeleton } from "../../../../components/ui/skeleton";

import { applicationAPI, type TApplication } from "../../../../Features/application/applicationAPI";
import UpdateApplication from "./UpdateApplications";
import DeleteApplication from "./DeleteApplication";

const ApplicationComponent: React.FC = () => {
  const { data: applicationsData, isLoading, error } = applicationAPI.useGetAllApplicationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [selectedApplication, setSelectedApplication] = useState<TApplication | null>(null);
  const [applicationToDelete, setApplicationToDelete] = useState<TApplication | null>(null);

  const handleEdit = (application: TApplication) => {
    setSelectedApplication(application);
    (document.getElementById("update_application_modal") as HTMLDialogElement)?.showModal();
  };

  const handleDelete = (application: TApplication) => {
    setApplicationToDelete(application);
    (document.getElementById("delete_application_modal") as HTMLDialogElement)?.showModal();
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg">

      {/* Modals */}
      <UpdateApplication application={selectedApplication} />
      <DeleteApplication application={applicationToDelete} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center">
            <FaUserGraduate className="mr-3 text-blue-600 text-3xl" />
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Applications
            </span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage all student applications
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
            <span className="font-medium text-blue-600">
              {applicationsData?.length || 0}
            </span>
            <span className="text-gray-500 ml-1">applications</span>
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center p-4 bg-white rounded-xl border border-gray-200">
              <Skeleton className="h-10 w-10 rounded-full mr-4" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 flex items-center shadow-inner">
          <RiCloseCircleFill className="mr-3 text-xl flex-shrink-0" />
          <div>
            <p className="font-medium">Error loading applications</p>
            <p className="text-sm">Please refresh the page or try again later</p>
          </div>
        </div>
      )}

      {/* Applications Table */}
      {applicationsData?.length ? (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Student ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Student Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Programme
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Choice Order
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applicationsData.map((application) => (
                <tr key={application.applicationID} className="hover:bg-blue-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{application.student.userID}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {application.student.firstName} {application.student.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{application.programme.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{application.choiceOrder}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{application.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEdit(application)}
                        className="p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg border border-blue-200 hover:border-blue-600 transition-all"
                        title="Edit application"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(application)}
                        className="p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-lg border border-red-200 hover:border-red-600 transition-all"
                        title="Delete application"
                      >
                        <MdDeleteForever size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !isLoading && (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="mx-auto h-24 w-24 text-gray-300">
              <FaUserGraduate size={96} className="opacity-20" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-700">
              No applications available
            </h3>
            <p className="mt-2 text-gray-500 max-w-md mx-auto">
              Applications submitted by students will appear here
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default ApplicationComponent;
