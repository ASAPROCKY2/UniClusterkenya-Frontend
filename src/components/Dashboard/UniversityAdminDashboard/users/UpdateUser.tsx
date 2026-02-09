// src/components/Dashboard/AdminDashboard/ManageUsers/UpdateUser.tsx

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { userAPI, type TUser } from "../../../../Features/users/UsersApi";

type UpdateUserProps = {
  user: TUser | null;
  refetch?: () => void;
};

const UpdateUser = ({ user, refetch }: UpdateUserProps) => {
  const [updateUser, { isLoading }] = userAPI.useUpdateUserMutation({
    fixedCacheKey: "updateUser",
  });

  // -------------------------
  // Form state
  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    role: string;
    gender: string;
    highSchool: string;
    meanGrade: string;
    agp: string;
  }>({
    firstName: "",
    lastName: "",
    role: "",
    gender: "",
    highSchool: "",
    meanGrade: "",
    agp: "",
  });

  // -------------------------
  // Initialize form when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        role: user.role || "",
        gender: user.gender || "",
        highSchool: user.highSchool || "",
        meanGrade: user.meanGrade || "",
        agp: user.agp !== null && user.agp !== undefined ? String(user.agp) : "",
      });
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        role: "",
        gender: "",
        highSchool: "",
        meanGrade: "",
        agp: "",
      });
    }
  }, [user]);

  // -------------------------
  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -------------------------
  // Update user
  const handleUpdate = async () => {
    if (!user?.userID) {
      toast.error("No user selected.");
      return;
    }

    try {
      await updateUser({
        id: user.userID,
        updates: {
          firstName: formData.firstName || null,
          lastName: formData.lastName || null,
          role: formData.role,
          gender: formData.gender || null,
          highSchool: formData.highSchool || null,
          meanGrade: formData.meanGrade || null,
          agp: formData.agp ? Number(formData.agp) : null,
        },
      }).unwrap();

      toast.success("User updated successfully.");
      (document.getElementById("update_user_modal") as HTMLDialogElement)?.close();
      refetch?.();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update user.");
    }
  };

  return (
    <dialog id="update_user_modal" className="modal">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Update User</h3>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
        >
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            className="input input-bordered"
            value={formData.firstName}
            onChange={handleChange}
          />

          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            className="input input-bordered"
            value={formData.lastName}
            onChange={handleChange}
          />

          <select
            name="role"
            className="select select-bordered"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="university_admin">University Admin</option>
            <option value="system_admin">System Admin</option>
          </select>

          <input
            name="gender"
            type="text"
            placeholder="Gender"
            className="input input-bordered"
            value={formData.gender}
            onChange={handleChange}
          />

          <input
            name="highSchool"
            type="text"
            placeholder="High School"
            className="input input-bordered"
            value={formData.highSchool}
            onChange={handleChange}
          />

          <input
            name="meanGrade"
            type="text"
            placeholder="Mean Grade"
            className="input input-bordered"
            value={formData.meanGrade}
            onChange={handleChange}
          />

          <input
            name="agp"
            type="number"
            step="0.01"
            placeholder="AGP"
            className="input input-bordered"
            value={formData.agp}
            onChange={handleChange}
          />

          <div className="modal-action flex gap-4 mt-4">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner text-primary" /> Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </button>

            <button
              type="button"
              className="btn"
              onClick={() =>
                (document.getElementById("update_user_modal") as HTMLDialogElement)?.close()
              }
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateUser;
