// src/components/Dashboard/AdminDashboard/programmes/UpdateProgram.tsx
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  programmesAPI,
  type TProgramme,
  type TUpdateProgramme,
  type TSProgrammeCluster,
} from "../../../../Features/programmes/ProgrammesAPI";

type UpdateProgramProps = {
  programme: TProgramme | null;
};

const UpdateProgram = ({ programme }: UpdateProgramProps) => {
  const [updateProgramme, { isLoading }] =
    programmesAPI.useUpdateProgrammeByIdMutation({
      fixedCacheKey: "updateProgramme",
    });

  const [formData, setFormData] = useState<{
    name: string;
    level: string;
    durationYears: string;
    minAGP: string;
    helbEligible: boolean;
    scholarshipAvailable: boolean;
    clusterIDs: number[];
  }>({
    name: "",
    level: "",
    durationYears: "",
    minAGP: "",
    helbEligible: false,
    scholarshipAvailable: false,
    clusterIDs: [],
  });

  // Populate form when programme changes
  useEffect(() => {
    if (programme) {
      setFormData({
        name: programme.name,
        level: programme.level || "",
        durationYears: programme.durationYears?.toString() || "",
        minAGP: programme.minAGP?.toString() || "",
        helbEligible: programme.helbEligible || false,
        scholarshipAvailable: programme.scholarshipAvailable || false,
        clusterIDs: programme.clusters?.map((c) => c.clusterID) || [],
      });
    }
  }, [programme]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    const checked = (target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "clusterIDs"
          ? Array.from(
              (target as HTMLSelectElement).selectedOptions,
              (option) => Number(option.value)
            )
          : value,
    }));
  };

  const handleUpdate = async () => {
    if (!programme) {
      toast.error("No programme selected for update.");
      return;
    }

    try {
      const updates: TUpdateProgramme = {
        name: formData.name,
        level: formData.level,
        durationYears: formData.durationYears
          ? Number(formData.durationYears)
          : undefined,
        minAGP: formData.minAGP ? Number(formData.minAGP) : undefined,
        helbEligible: formData.helbEligible,
        scholarshipAvailable: formData.scholarshipAvailable,
        clusterIDs: formData.clusterIDs,
      };

      await updateProgramme({
        programmeID: programme.programmeID,
        updates,
      }).unwrap();

      toast.success("Programme updated successfully!");
      (document.getElementById("update_program_modal") as HTMLDialogElement)
        ?.close();
    } catch (error) {
      console.error("Error updating programme:", error);
      toast.error("Failed to update programme. Please try again.");
    }
  };

  return (
    <dialog id="update_program_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Update Programme</h3>

        <form className="flex flex-col gap-4">
          <input
            name="name"
            type="text"
            placeholder="Programme Name"
            className="input input-bordered"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            name="level"
            type="text"
            placeholder="Level (e.g., Diploma, Degree)"
            className="input input-bordered"
            value={formData.level}
            onChange={handleChange}
          />

          <input
            name="durationYears"
            type="number"
            step="0.5"
            placeholder="Duration (Years)"
            className="input input-bordered"
            value={formData.durationYears}
            onChange={handleChange}
          />

          <input
            name="minAGP"
            type="number"
            placeholder="Minimum AGP"
            className="input input-bordered"
            value={formData.minAGP}
            onChange={handleChange}
          />

          <label className="flex items-center gap-2">
            <input
              name="helbEligible"
              type="checkbox"
              className="checkbox"
              checked={formData.helbEligible}
              onChange={handleChange}
            />
            HELB Eligible
          </label>

          <label className="flex items-center gap-2">
            <input
              name="scholarshipAvailable"
              type="checkbox"
              className="checkbox"
              checked={formData.scholarshipAvailable}
              onChange={handleChange}
            />
            Scholarship Available
          </label>

          <select
            name="clusterIDs"
            className="select select-bordered"
            multiple
            value={formData.clusterIDs.map(String)}
            onChange={handleChange}
          >
            {(programme?.clusters ?? []).map((cluster: TSProgrammeCluster) => (
              <option key={cluster.clusterID} value={cluster.clusterID}>
                {cluster.name} ({cluster.clusterCode})
              </option>
            ))}
          </select>
        </form>

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
              "Save Changes"
            )}
          </button>
          <button
            className="btn"
            type="button"
            onClick={() =>
              (document.getElementById("update_program_modal") as HTMLDialogElement)
                ?.close()
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default UpdateProgram;
