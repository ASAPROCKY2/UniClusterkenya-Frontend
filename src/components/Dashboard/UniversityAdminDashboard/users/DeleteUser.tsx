// src/components/Dashboard/AdminDashboard/ManageUsers/DeleteUser.tsx

import { toast } from "sonner";
import { userAPI, type TUser } from "../../../../Features/users/UsersApi";

type DeleteUserProps = {
  user: TUser | null;
};

const DeleteUser = ({ user }: DeleteUserProps) => {
  // Hook for delete mutation
  const [deleteUser, { isLoading }] = userAPI.useDeleteUserMutation({
    fixedCacheKey: "deleteUser",
  });

  const handleDelete = async () => {
    try {
      if (!user) {
        toast.error("No user selected for deletion.");
        return;
      }

      await deleteUser(user.userID).unwrap();
      toast.success("User deleted successfully!");

      // Close the modal
      (
        document.getElementById("delete_user_modal") as HTMLDialogElement
      )?.close();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user. Please try again.");
    }
  };

  return (
    <dialog id="delete_user_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Delete User</h3>

        <p className="mb-6">
          Are you sure you want to delete user{" "}
          <span className="font-semibold">
            {user?.firstName} {user?.lastName}
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
              (document.getElementById("delete_user_modal") as HTMLDialogElement)?.close()
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteUser;
