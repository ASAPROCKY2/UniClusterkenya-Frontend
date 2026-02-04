// src/components/Dashboard/AdminDashboard/ManageUniversities/UpdateUniversity.tsx
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { universityAPI, type TUniversity } from "../../../../Features/universities/UniversityAPI";
import axios from "axios";

type UpdateUniversityProps = {
  university: TUniversity | null;
  refetch?: () => void;
};

const UpdateUniversity = ({ university, refetch }: UpdateUniversityProps) => {
  const [updateUniversity, { isLoading }] = universityAPI.useUpdateUniversityMutation({
    fixedCacheKey: "updateUniversity",
  });

  // Form state
  const [formData, setFormData] = useState<{
    name: string;
    type: string;
    county: string;
    governmentScholarship: boolean;
    helbEligible: boolean;
  }>({
    name: "",
    type: "",
    county: "",
    governmentScholarship: false,
    helbEligible: false,
  });

  // Logo state
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Initialize form when university changes
  useEffect(() => {
    if (university) {
      setFormData({
        name: university.name || "",
        type: university.type || "",
        county: university.county || "",
        governmentScholarship: university.governmentScholarship ?? false,
        helbEligible: university.helbEligible ?? false,
      });
      setLogoPreview(university.logoURL || null);
    } else {
      setFormData({
        name: "",
        type: "",
        county: "",
        governmentScholarship: false,
        helbEligible: false,
      });
      setLogoFile(null);
      setLogoPreview(null);
    }
  }, [university]);

  // -------------------------
  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;

    const name = target.name;

    // Fix TS error: only access 'checked' for checkbox inputs
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: target.value,
      }));
    }
  };

  // Handle logo file selection
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  // -------------------------
  // Update university
  const handleUpdate = async () => {
    if (!university?.universityID) {
      toast.error("No university selected.");
      return;
    }

    try {
      let logoURL = university.logoURL || undefined;

      if (logoFile) {
        setIsUploading(true);
        const formDataCloud = new FormData();
        formDataCloud.append("file", logoFile);
        formDataCloud.append("upload_preset", "Unicluster");

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dmxa7h4vt/image/upload",
          formDataCloud
        );

        setIsUploading(false);

        if (response.data?.secure_url) {
          logoURL = response.data.secure_url;
        } else {
          toast.error("Logo upload failed. Try again.");
          return;
        }
      }

      // ✅ Update university via API
      await updateUniversity({
        id: university.universityID,
        updates: {
          name: formData.name,
          type: formData.type,
          county: formData.county,
          governmentScholarship: formData.governmentScholarship,
          helbEligible: formData.helbEligible,
          logoURL,
        },
      }).unwrap();

      toast.success("University updated successfully.");
      (document.getElementById("update_university_modal") as HTMLDialogElement)?.close();
      refetch?.();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update university.");
      setIsUploading(false);
    }
  };

  return (
    <dialog id="update_university_modal" className="modal">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Update University</h3>

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
            placeholder="University Name"
            className="input input-bordered"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            name="type"
            type="text"
            placeholder="University Type"
            className="input input-bordered"
            value={formData.type}
            onChange={handleChange}
          />

          <input
            name="county"
            type="text"
            placeholder="County"
            className="input input-bordered"
            value={formData.county}
            onChange={handleChange}
          />

          <label className="flex items-center gap-2">
            <input
              name="governmentScholarship"
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={formData.governmentScholarship}
              onChange={handleChange}
            />
            Government Scholarship
          </label>

          <label className="flex items-center gap-2">
            <input
              name="helbEligible"
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={formData.helbEligible}
              onChange={handleChange}
            />
            HELB Eligible
          </label>

          {/* Logo Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">Upload University Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
            />
            {logoPreview && (
              <img
                src={logoPreview}
                alt="Logo Preview"
                className="w-32 h-32 object-cover mx-auto rounded mb-2"
              />
            )}
          </div>

          <div className="modal-action flex gap-4 mt-4">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading || isUploading}
            >
              {isLoading || isUploading ? (
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
                (document.getElementById("update_university_modal") as HTMLDialogElement)?.close()
              }
              disabled={isLoading || isUploading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateUniversity;
