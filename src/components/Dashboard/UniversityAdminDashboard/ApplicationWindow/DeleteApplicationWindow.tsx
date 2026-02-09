// src/components/Dashboard/AdminDashboard/ManageApplicationWindows/DeleteApplicationWindow.tsx
import { toast } from "sonner";
import { applicationWindowAPI, type TApplicationWindow } from "../../../../Features/ApplicationWindow/applicationWindowAPI";

type DeleteApplicationWindowProps = {
  window: TApplicationWindow | null;
};

const DeleteApplicationWindow = ({ window }: DeleteApplicationWindowProps) => {
  // Hook for delete mutation
  const [deleteApplicationWindow, { isLoading }] = applicationWindowAPI.useDeleteApplicationWindowMutation({
    fixedCacheKey: "deleteApplicationWindow",
  });

  const handleDelete = async () => {
    try {
      if (!window) {
        toast.error("No application window selected for deletion.");
        return;
      }

      await deleteApplicationWindow(window.windowID).unwrap();
      toast.success("Application window deleted successfully!");

      // Close the modal
      (
        document.getElementById("delete_window_modal") as HTMLDialogElement
      )?.close();
    } catch (error) {
      console.error("Error deleting application window:", error);
      toast.error("Failed to delete application window. Please try again.");
    }
  };

  return (
    <dialog id="delete_window_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Delete Application Window</h3>
        <p className="mb-6">
          Are you sure you want to delete application window{" "}
          <span className="font-semibold">{window?.name}</span>?
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
              (document.getElementById("delete_window_modal") as HTMLDialogElement)?.close()
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteApplicationWindow;
