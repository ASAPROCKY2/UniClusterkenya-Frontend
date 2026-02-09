// src/components/Dashboard/AdminDashboard/Clusters/DeleteCluster.tsx
import { toast } from "sonner";
import { clusterAPI, type TCluster } from "../../../../Features/Cluster/clusterAPI";
import { useDispatch } from "react-redux";

type DeleteClusterProps = {
  cluster: TCluster | null;
};

const DeleteCluster = ({ cluster }: DeleteClusterProps) => {
  const dispatch = useDispatch();
  
  // FIXED: Remove the fixedCacheKey and check if hook exists
  const useDeleteClusterMutation = (clusterAPI as any).useDeleteClusterMutation;
  const [deleteCluster, { isLoading }] = useDeleteClusterMutation
    ? useDeleteClusterMutation()
    : [() => Promise.reject(new Error("Hook not available")), { isLoading: false }];

  const handleDelete = async () => {
    try {
      if (!cluster) {
        toast.error("No cluster selected for deletion.");
        return;
      }

      // FIXED: Add proper error handling
      await deleteCluster(cluster.clusterID).unwrap();
      toast.success(`Cluster "${cluster.name}" deleted successfully!`);

      // Optional: Refetch clusters after deletion
      dispatch(clusterAPI.util.invalidateTags(['Clusters']));

      // Close the modal
      (
        document.getElementById("delete_cluster_modal") as HTMLDialogElement
      )?.close();
    } catch (error: any) {
      console.error("Error deleting cluster:", error);
      toast.error(error?.data?.message || "Failed to delete cluster. Please try again.");
    }
  };

  return (
    <dialog id="delete_cluster_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg shadow-xl">
        <h3 className="font-bold text-lg text-red-600 mb-4">Delete Cluster</h3>
        <p className="mb-4 text-gray-700">
          Are you sure you want to delete cluster{" "}
          <span className="font-semibold text-gray-900">{cluster?.name}</span>?
        </p>
        <p className="text-sm text-gray-500 mb-6">
          This action cannot be undone. All associated programs will be affected.
        </p>
        <div className="modal-action flex gap-4">
          <button
            className="btn btn-outline hover:bg-gray-100"
            type="button"
            onClick={() =>
              (document.getElementById("delete_cluster_modal") as HTMLDialogElement)?.close()
            }
            disabled={isLoading}
          >
            Cancel
          </button>
          <button 
            className="btn btn-error hover:bg-red-700 text-white" 
            onClick={handleDelete} 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-sm mr-2"></span>
                Deleting...
              </>
            ) : (
              "Delete Cluster"
            )}
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default DeleteCluster;