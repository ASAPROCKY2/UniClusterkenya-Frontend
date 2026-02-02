// src/components/Dashboard/AdminDashboard/ManageUniversities/UpdateUniversity.tsx
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { TUniversity } from "../../../Features/universities/UniversityAPI"; // type-only import
import { universityAPI } from "../../../Features/universities/UniversityAPI"; // runtime import
import { toast } from "sonner";
import { useEffect, useState } from "react";
import axios from "axios";

// ========================
// Form inputs
type UpdateUniversityInputs = {
  name: string;
  type: string;
  county: string;
  governmentScholarship: boolean;
  helbEligible: boolean;
};

// Yup schema
const schema = yup.object({
  name: yup.string().required("University name is required").max(100),
  type: yup.string().required("University type is required").max(50),
  county: yup.string().required("County is required").max(50),
  governmentScholarship: yup.boolean().required(),
  helbEligible: yup.boolean().required(),
});

// ========================
// Props
interface UniversityProps {
  university: Partial<TUniversity>;
  refetch?: () => void;
}

// ========================
// Component
const UpdateUniversity = ({ university, refetch }: UniversityProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [updateUniversity, { isLoading }] = universityAPI.useUpdateUniversityMutation({
    fixedCacheKey: "updateUniversity",
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UpdateUniversityInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: university.name || "",
      type: university.type || "",
      county: university.county || "",
      governmentScholarship: university.governmentScholarship ?? false,
      helbEligible: university.helbEligible ?? false,
    },
  });

  // Sync form when university changes
  useEffect(() => {
    if (university) {
      setValue("name", university.name || "");
      setValue("type", university.type || "");
      setValue("county", university.county || "");
      setValue("governmentScholarship", university.governmentScholarship ?? false);
      setValue("helbEligible", university.helbEligible ?? false);
    } else {
      reset();
    }
  }, [university, setValue, reset]);

  // File upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setImage(file);
  };

  // Submit
  const onSubmit: SubmitHandler<UpdateUniversityInputs> = async (data) => {
    if (!university.universityID) {
      toast.error("University ID is missing. Cannot update.");
      return;
    }

    try {
      let logoURL =
        university.logoURL && university.logoURL.trim() !== "" ? university.logoURL : undefined;

      if (image) {
        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "Unicluster");

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dmxa7h4vt/image/upload",
          formData
        );
        setIsUploading(false);

        if (response.data?.secure_url) {
          logoURL = response.data.secure_url;
        } else {
          toast.error("Logo upload failed. Please try again.");
          return;
        }
      }

      // ✅ Ensure type safety
      const payload = {
        id: university.universityID,
        updates: {
          ...data,
          logoURL,
        } as Partial<TUniversity>,
      };

      await updateUniversity(payload).unwrap();
      toast.success("University updated successfully!");

      if (refetch) refetch();
      reset();
      (document.getElementById("update_university_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      setIsUploading(false);
      console.error("Error updating university:", error);
      toast.error("Failed to update university. Please try again.");
    }
  };

  // ========================
  // Render
  return (
    <dialog id="update_university_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Update University</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="text"
            {...register("name")}
            placeholder="University Name"
            className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
          />
          {errors.name && <span className="text-sm text-red-700">{errors.name.message}</span>}

          <input
            type="text"
            {...register("type")}
            placeholder="University Type"
            className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
          />
          {errors.type && <span className="text-sm text-red-700">{errors.type.message}</span>}

          <input
            type="text"
            {...register("county")}
            placeholder="County"
            className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
          />
          {errors.county && <span className="text-sm text-red-700">{errors.county.message}</span>}

          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("governmentScholarship")} className="checkbox checkbox-primary" />
            Government Scholarship
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("helbEligible")} className="checkbox checkbox-primary" />
            HELB Eligible
          </label>

          {/* Logo */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">Upload University Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
            />
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="Logo Preview"
                className="w-32 h-32 object-cover mx-auto rounded mb-2"
              />
            )}
            {!image && university.logoURL && (
              <img
                src={university.logoURL}
                alt="Current Logo"
                className="w-32 h-32 object-cover mx-auto rounded mb-2"
              />
            )}
          </div>

          <div className="modal-action flex flex-col sm:flex-row gap-2">
            <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={isLoading || isUploading}>
              {isLoading || isUploading ? "Updating..." : "Update"}
            </button>
            <button
              type="button"
              className="btn w-full sm:w-auto"
              onClick={() => {
                (document.getElementById("update_university_modal") as HTMLDialogElement)?.close();
                reset();
              }}
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
