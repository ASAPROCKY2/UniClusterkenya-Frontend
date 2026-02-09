// src/components/Dashboard/AdminDashboard/Results/DeleteKcseResults.tsx
import { toast } from "sonner";
import { useDeleteKcseResultsByUserIdMutation } from "../../../../Features/KcseResults/kcseResultsAPI";
import type { TKcseSubjectResult } from "../../../../Features/KcseResults/kcseResultsAPI";


type DeleteKcseResultsProps = {
  userID: number | null;
  userResults?: TKcseSubjectResult[];
};

const DeleteKcseResults = ({ userID, userResults = [] }: DeleteKcseResultsProps) => {
  const [deleteResults, { isLoading }] = useDeleteKcseResultsByUserIdMutation({
    fixedCacheKey: "deleteKcseResults",
  });

  const handleDelete = async () => {
    try {
      if (!userID) {
        toast.error("No user selected for deletion.");
        return;
      }

      await deleteResults(userID).unwrap();
      toast.success("KCSE results deleted successfully!");

      // Close the modal
      (document.getElementById("delete_results_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error deleting KCSE results:", error);
      toast.error("Failed to delete KCSE results. Please try again.");
    }
  };

  return (
    <dialog id="delete_results_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Delete KCSE Results</h3>
        <p className="mb-6">
          Are you sure you want to delete all KCSE results for this user?
          <br />
          <span className="font-semibold">
            {userResults.length} subjects will be removed.
          </span>
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
              (document.getElementById("delete_results_modal") as HTMLDialogElement)?.close()
            }
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteKcseResults;
