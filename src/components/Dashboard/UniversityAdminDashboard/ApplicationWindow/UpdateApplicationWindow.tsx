// src/components/Dashboard/AdminDashboard/ManageApplicationWindows/UpdateApplicationWindow.tsx
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { applicationWindowAPI, type TApplicationWindow } from "../../../../Features/ApplicationWindow/applicationWindowAPI";

type UpdateApplicationWindowProps = {
  window: TApplicationWindow | null;
  refetch?: () => void;
};

const UpdateApplicationWindow = ({ window, refetch }: UpdateApplicationWindowProps) => {
  const [updateApplicationWindow, { isLoading }] = applicationWindowAPI.useUpdateApplicationWindowMutation({
    fixedCacheKey: "updateApplicationWindow",
  });

  // Form state
  const [formData, setFormData] = useState<{
    name: string;
    startDate: string;
    endDate: string;
    programmeID: number | undefined;
    totalSlots: number | undefined;
    availableSlots: number | undefined;
    isActive: boolean;
  }>({
    name: "",
    startDate: "",
    endDate: "",
    programmeID: undefined,
    totalSlots: undefined,
    availableSlots: undefined,
    isActive: false,
  });

  // Initialize form when window changes
  useEffect(() => {
    if (window) {
      setFormData({
        name: window.name || "",
        startDate: window.startDate || "",
        endDate: window.endDate || "",
        programmeID: window.programmeID,
        totalSlots: window.totalSlots,
        availableSlots: window.availableSlots,
        isActive: window.isActive ?? false,
      });
    } else {
      setFormData({
        name: "",
        startDate: "",
        endDate: "",
        programmeID: undefined,
        totalSlots: undefined,
        availableSlots: undefined,
        isActive: false,
      });
    }
  }, [window]);

  // -------------------------
  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else if (type === "number") {
      setFormData((prev) => ({
        ...prev,
        [name]: value ? Number(value) : undefined,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // -------------------------
  // Update application window
  const handleUpdate = async () => {
    if (!window?.windowID) {
      toast.error("No application window selected.");
      return;
    }

    try {
      await updateApplicationWindow({
        id: window.windowID,
        updates: {
          name: formData.name,
          startDate: formData.startDate,
          endDate: formData.endDate,
          programmeID: formData.programmeID,
          totalSlots: formData.totalSlots,
          availableSlots: formData.availableSlots,
          isActive: formData.isActive,
        },
      }).unwrap();

      toast.success("Application window updated successfully.");
      (document.getElementById("update_window_modal") as HTMLDialogElement)?.close();
      refetch?.();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update application window.");
    }
  };

  return (
    <dialog id="update_window_modal" className="modal">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Update Application Window</h3>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
        >
          <input
            name="name"
            type="text"
            placeholder="Window Name"
            className="input input-bordered"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            name="startDate"
            type="date"
            placeholder="Start Date"
            className="input input-bordered"
            value={formData.startDate}
            onChange={handleChange}
            required
          />

          <input
            name="endDate"
            type="date"
            placeholder="End Date"
            className="input input-bordered"
            value={formData.endDate}
            onChange={handleChange}
            required
          />

          <input
            name="programmeID"
            type="number"
            placeholder="Programme ID"
            className="input input-bordered"
            value={formData.programmeID || ""}
            onChange={handleChange}
            required
          />

          <input
            name="totalSlots"
            type="number"
            placeholder="Total Slots"
            className="input input-bordered"
            value={formData.totalSlots || ""}
            onChange={handleChange}
            required
          />

          <input
            name="availableSlots"
            type="number"
            placeholder="Available Slots"
            className="input input-bordered"
            value={formData.availableSlots || ""}
            onChange={handleChange}
            required
          />

          <label className="flex items-center gap-2">
            <input
              name="isActive"
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={formData.isActive}
              onChange={handleChange}
            />
            Active
          </label>

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
                (document.getElementById("update_window_modal") as HTMLDialogElement)?.close()
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

export default UpdateApplicationWindow;
