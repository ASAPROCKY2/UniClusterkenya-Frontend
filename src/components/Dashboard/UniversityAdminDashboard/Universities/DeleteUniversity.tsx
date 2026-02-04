// src/components/Dashboard/AdminDashboard/ManageUniversities/DeleteUniversity.tsx
import { toast } from "sonner";
import { universityAPI, type TUniversity } from "../../../../Features/universities/UniversityAPI";

type DeleteUniversityProps = {
  university: TUniversity | null;
};

const DeleteUniversity = ({ university }: DeleteUniversityProps) => {
  // Hook for delete mutation
  const [deleteUniversity, { isLoading }] = universityAPI.useDeleteUniversityMutation({
    fixedCacheKey: "deleteUniversity",
  });

  const handleDelete = async () => {
    try {
      if (!university) {
        toast.error("No university selected for deletion.");
        return;
      }

      await deleteUniversity(university.universityID).unwrap();
      toast.success("University deleted successfully!");

      // Close the modal
      (
        document.getElementById("delete_university_modal") as HTMLDialogElement
      )?.close();
    } catch (error) {
      console.error("Error deleting university:", error);
      toast.error("Failed to delete university. Please try again.");
    }
  };

  return (
    <dialog id="delete_university_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Delete University</h3>
        <p className="mb-6">
          Are you sure you want to delete university{" "}
          <span className="font-semibold">{university?.name}</span>?
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
              (document.getElementById("delete_university_modal") as HTMLDialogElement)?.close()
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteUniversity;
