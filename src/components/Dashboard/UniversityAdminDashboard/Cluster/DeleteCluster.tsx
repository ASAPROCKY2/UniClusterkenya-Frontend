// src/components/Dashboard/AdminDashboard/Clusters/DeleteCluster.tsx

import { toast } from "sonner";
import { clusterAPI, type TCluster } from "../../../../Features/Cluster/clusterAPI";

type DeleteClusterProps = {
  cluster: TCluster | null;
};

const DeleteCluster = ({ cluster }: DeleteClusterProps) => {
  // Hook for delete mutation
  const [deleteCluster, { isLoading }] = (clusterAPI as any).useDeleteClusterMutation({
    fixedCacheKey: "deleteCluster",
  });

  const handleDelete = async () => {
    try {
      if (!cluster) {
        toast.error("No cluster selected for deletion.");
        return;
      }

      await deleteCluster(cluster.clusterID).unwrap();
      toast.success("Cluster deleted successfully!");

      // Close the modal
      (
        document.getElementById("delete_cluster_modal") as HTMLDialogElement
      )?.close();
    } catch (error) {
      console.error("Error deleting cluster:", error);
      toast.error("Failed to delete cluster. Please try again.");
    }
  };

  return (
    <dialog id="delete_cluster_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Delete Cluster</h3>
        <p className="mb-6">
          Are you sure you want to delete cluster{" "}
          <span className="font-semibold">{cluster?.name}</span>?
        </p>
        <div className="modal-action flex gap-4">
          <button className="btn btn-error" onClick={handleDelete} disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="loading loading-spinner text-primary" /> Deleting...
              </>
            ) : (
              "Yes, Delete"
            )}
          </button>
          <button
            className="btn"
            type="button"
            onClick={() =>
              (document.getElementById("delete_cluster_modal") as HTMLDialogElement)?.close()
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteCluster;
