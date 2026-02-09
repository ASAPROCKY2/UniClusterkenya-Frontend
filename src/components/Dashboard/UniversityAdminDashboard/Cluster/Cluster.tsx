// src/components/Dashboard/AdminDashboard/ManageClusters/Cluster.tsx

import React, { useState } from "react";
import { FaLayerGroup } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { RiCloseCircleFill } from "react-icons/ri";
import { Skeleton } from "../../../../components/ui/skeleton";

import { clusterAPI, type TCluster } from "../../../../Features/Cluster/clusterAPI";
import CreateCluster from "./CreateCluster";
import DeleteCluster from "./DeleteCluster";

const ClusterComponent: React.FC = () => {
  const { data: clustersData, isLoading, error } = clusterAPI.useGetClustersByProgrammeQuery(0, {
    refetchOnMountOrArgChange: true,
  });

  const [clusterToDelete, setClusterToDelete] = useState<TCluster | null>(null);

  const handleDelete = (cluster: TCluster) => {
    setClusterToDelete(cluster);
    (document.getElementById("delete_cluster_modal") as HTMLDialogElement)?.showModal();
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg">

      {/* Modals */}
      <CreateCluster />
      <DeleteCluster cluster={clusterToDelete} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center">
            <FaLayerGroup className="mr-3 text-blue-600 text-3xl" />
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Clusters
            </span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage all clusters
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
            <span className="font-medium text-blue-600">
              {clustersData?.length || 0}
            </span>
            <span className="text-gray-500 ml-1">clusters</span>
          </div>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() =>
              (document.getElementById("create_cluster_modal") as HTMLDialogElement)?.showModal()
            }
          >
            + Add Cluster
          </button>
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
            <p className="font-medium">Error loading clusters</p>
            <p className="text-sm">Please refresh the page or try again later</p>
          </div>
        </div>
      )}

      {/* Clusters Table */}
      {clustersData?.length ? (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Cluster Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Cluster Code
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clustersData.map((cluster) => (
                <tr key={cluster.clusterID} className="hover:bg-blue-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{cluster.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{cluster.clusterCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleDelete(cluster)}
                        className="p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-lg border border-red-200 hover:border-red-600 transition-all"
                        title="Delete cluster"
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
              <FaLayerGroup size={96} className="opacity-20" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-700">
              No clusters available
            </h3>
            <p className="mt-2 text-gray-500 max-w-md mx-auto">
              You can create a new cluster using the button above
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default ClusterComponent;
