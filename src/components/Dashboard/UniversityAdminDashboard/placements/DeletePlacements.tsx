// src/components/Dashboard/AdminDashboard/Placements/DeletePlacement.tsx

import { toast } from "sonner";
import {
  placementAPI,
  type TPlacement,
} from "../../../../Features/placement/placementAPI";

type DeletePlacementProps = {
  placement: TPlacement | null;
};

const DeletePlacement = ({ placement }: DeletePlacementProps) => {
  // Hook for delete mutation
  const [deletePlacement, { isLoading }] =
    placementAPI.useDeletePlacementMutation({
      fixedCacheKey: "deletePlacement",
    });

  const handleDelete = async () => {
    try {
      if (!placement) {
        toast.error("No placement selected for deletion.");
        return;
      }

      await deletePlacement(placement.placementID).unwrap();
      toast.success("Placement deleted successfully!");

      // Close the modal
      (
        document.getElementById(
          "delete_placement_modal"
        ) as HTMLDialogElement
      )?.close();
    } catch (error) {
      console.error("Error deleting placement:", error);
      toast.error("Failed to delete placement. Please try again.");
    }
  };

  return (
    <dialog id="delete_placement_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Delete Placement</h3>

        <p className="mb-6">
          Are you sure you want to delete placement for{" "}
          <span className="font-semibold">
            {placement?.programme?.name}
          </span>
          ?
        </p>

        <div className="modal-action flex gap-4">
          <button
            className="btn btn-error"
            onClick={handleDelete}
            disabled={isLoading}
          >
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
              (
                document.getElementById(
                  "delete_placement_modal"
                ) as HTMLDialogElement
              )?.close()
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeletePlacement;
