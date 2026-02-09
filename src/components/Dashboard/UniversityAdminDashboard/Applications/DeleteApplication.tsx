// src/dashboard/UniversityAdminDashboard/applications/DeleteApplication.tsx

import { toast } from "sonner";
import { applicationAPI, type TApplication } from "../../../../Features/application/applicationAPI";

type DeleteApplicationProps = {
  application: TApplication | null;
};

const DeleteApplication = ({ application }: DeleteApplicationProps) => {
  // Hook for delete mutation
  const [deleteApplication, { isLoading }] = applicationAPI.useDeleteApplicationMutation({
    fixedCacheKey: "deleteApplication",
  });

  const handleDelete = async () => {
    try {
      if (!application) {
        toast.error("No application selected for deletion.");
        return;
      }

      await deleteApplication(application.applicationID).unwrap();
      toast.success("Application deleted successfully!");

      // Close the modal
      (
        document.getElementById("delete_application_modal") as HTMLDialogElement
      )?.close();
    } catch (error) {
      console.error("Error deleting application:", error);
      toast.error("Failed to delete application. Please try again.");
    }
  };

  return (
    <dialog id="delete_application_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Delete Application</h3>
        <p className="mb-6">
          Are you sure you want to delete the application for programme{" "}
          <span className="font-semibold">{application?.programme.name}</span>?
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
              (document.getElementById("delete_application_modal") as HTMLDialogElement)?.close()
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteApplication;
