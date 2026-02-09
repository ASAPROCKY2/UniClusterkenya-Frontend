// src/components/Dashboard/AdminDashboard/Placements/UpdatePlacement.tsx

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  placementAPI,
  type TPlacement,
} from "../../../../Features/placement/placementAPI";

type UpdatePlacementProps = {
  placement: TPlacement | null;
};

const UpdatePlacement = ({ placement }: UpdatePlacementProps) => {
  const [placementStatus, setPlacementStatus] = useState("");
  const [placementDate, setPlacementDate] = useState("");

  // 🔹 Update mutation
  const [updatePlacement, { isLoading }] =
    placementAPI.useUpdatePlacementMutation({
      fixedCacheKey: "updatePlacement",
    });

  // Prefill form when placement changes
  useEffect(() => {
    if (placement) {
      setPlacementStatus(placement.placementStatus || "");
      setPlacementDate(placement.placementDate || "");
    }
  }, [placement]);

  const handleUpdate = async () => {
    try {
      if (!placement) {
        toast.error("No placement selected for update.");
        return;
      }

      await updatePlacement({
        placementID: placement.placementID,
        updates: {
          placementStatus,
          placementDate,
        },
      }).unwrap();

      toast.success("Placement updated successfully!");

      (
        document.getElementById(
          "update_placement_modal"
        ) as HTMLDialogElement
      )?.close();
    } catch (error) {
      console.error("Error updating placement:", error);
      toast.error("Failed to update placement. Please try again.");
    }
  };

  return (
    <dialog id="update_placement_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Update Placement</h3>

        <div className="flex flex-col gap-4">
          {/* Placement Status */}
          <div>
            <label className="label text-sm font-semibold">
              Placement Status
            </label>
            <select
              className="select select-bordered w-full bg-gray-700 text-white"
              value={placementStatus}
              onChange={(e) => setPlacementStatus(e.target.value)}
            >
              <option value="">Select status</option>
              <option value="PLACED">PLACED</option>
              <option value="PENDING">PENDING</option>
              <option value="REJECTED">REJECTED</option>
            </select>
          </div>

          {/* Placement Date */}
          <div>
            <label className="label text-sm font-semibold">
              Placement Date
            </label>
            <input
              type="date"
              className="input input-bordered w-full bg-gray-700 text-white"
              value={placementDate ?? ""}
              onChange={(e) => setPlacementDate(e.target.value)}
            />
          </div>
        </div>

        <div className="modal-action flex gap-4 mt-6">
          <button
            className="btn btn-primary"
            onClick={handleUpdate}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner text-primary" /> Updating...
              </>
            ) : (
              "Update"
            )}
          </button>

          <button
            className="btn"
            type="button"
            onClick={() =>
              (
                document.getElementById(
                  "update_placement_modal"
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

export default UpdatePlacement;
