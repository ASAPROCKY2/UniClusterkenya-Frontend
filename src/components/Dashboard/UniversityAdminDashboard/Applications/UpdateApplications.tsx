import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  applicationAPI,
  type TApplication,
  type TUpdateApplicationPayload,
} from "../../../../Features/application/applicationAPI";

/* =============================
   APPLICATION STATUS ENUM
   (MUST MATCH DB ENUM)
============================= */
const APPLICATION_STATUSES = [
  "pending",
  "confirmed",
  "rejected",
  "under_review",
  "accepted",
  "withdrawn",
] as const;

/* =============================
   LABELS FOR UI ONLY
============================= */
const STATUS_LABELS: Record<(typeof APPLICATION_STATUSES)[number], string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  rejected: "Rejected",
  under_review: "Under Review",
  accepted: "Accepted",
  withdrawn: "Withdrawn",
};

type UpdateApplicationProps = {
  application: TApplication | null;
};

const UpdateApplication = ({ application }: UpdateApplicationProps) => {
  const [updateApplication, { isLoading }] =
    applicationAPI.useUpdateApplicationMutation({
      fixedCacheKey: "updateApplication",
    });

  const [formData, setFormData] = useState<{
    choiceOrder: string;
    status: string;
    clusterScore: string;
  }>({
    choiceOrder: "",
    status: "",
    clusterScore: "",
  });

  /* =============================
     POPULATE FORM
  ============================= */
  useEffect(() => {
    if (application) {
      setFormData({
        choiceOrder: application.choiceOrder?.toString() || "",
        status: application.status || "",
        clusterScore: application.clusterScore || "",
      });
    }
  }, [application]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* =============================
     UPDATE HANDLER
  ============================= */
  const handleUpdate = async () => {
    if (!application) {
      toast.error("No application selected for update.");
      return;
    }

    try {
      const updates: TUpdateApplicationPayload["updates"] = {
        choiceOrder: formData.choiceOrder
          ? Number(formData.choiceOrder)
          : undefined,
        status: formData.status || undefined,
        clusterScore: formData.clusterScore || undefined,
      };

      await updateApplication({
        applicationID: application.applicationID,
        updates,
      }).unwrap();

      toast.success("Application updated successfully!");
      (
        document.getElementById(
          "update_application_modal"
        ) as HTMLDialogElement
      )?.close();
    } catch (error) {
      console.error("Error updating application:", error);
      toast.error("Failed to update application.");
    }
  };

  return (
    <dialog id="update_application_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Update Application</h3>

        <form className="flex flex-col gap-4">
          {/* Choice Order */}
          <input
            name="choiceOrder"
            type="number"
            min={1}
            placeholder="Choice Order"
            className="input input-bordered"
            value={formData.choiceOrder}
            onChange={handleChange}
          />

          {/* ✅ STATUS DROPDOWN */}
          <select
            name="status"
            className="select select-bordered text-gray-800"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Application Status
            </option>
            {APPLICATION_STATUSES.map((status) => (
              <option key={status} value={status}>
                {STATUS_LABELS[status]}
              </option>
            ))}
          </select>

          {/* Cluster Score */}
          <input
            name="clusterScore"
            type="text"
            placeholder="Cluster Score (optional)"
            className="input input-bordered"
            value={formData.clusterScore}
            onChange={handleChange}
          />
        </form>

        <div className="modal-action flex gap-4 mt-6">
          <button
            className="btn btn-primary"
            onClick={handleUpdate}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner" /> Updating...
              </>
            ) : (
              "Save Changes"
            )}
          </button>

          <button
            className="btn"
            type="button"
            onClick={() =>
              (
                document.getElementById(
                  "update_application_modal"
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

export default UpdateApplication;
