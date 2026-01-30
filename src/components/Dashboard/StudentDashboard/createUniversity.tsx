// src/components/Universities/CreateUniversity.tsx
import React, { useState } from "react";
import { useCreateUniversityMutation } from "../../../Features/universities/UniversityAPI";
import { uploadToCloudinary } from "../../../utilis/uploadToCloudinary";

const CreateUniversity: React.FC = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [county, setCounty] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [createUniversity] = useCreateUniversityMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !type) {
      alert("Name and type are required");
      return;
    }

    try {
      let logoURL = null;

      if (logoFile) {
        setIsUploading(true);
        logoURL = await uploadToCloudinary(logoFile);
        setIsUploading(false);
      }

      await createUniversity({ name, type, county, logoURL }).unwrap();

      alert("University created successfully!");
      setName("");
      setType("");
      setCounty("");
      setLogoFile(null);
    } catch (err) {
      console.error(err);
      setIsUploading(false);
      alert("Failed to create university");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto p-4 border rounded">
      <input
        type="text"
        placeholder="University Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input input-bordered w-full"
        required
      />
      <input
        type="text"
        placeholder="Type (Public / Private)"
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="input input-bordered w-full"
        required
      />
      <input
        type="text"
        placeholder="County"
        value={county}
        onChange={(e) => setCounty(e.target.value)}
        className="input input-bordered w-full"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files && setLogoFile(e.target.files[0])}
        className="file-input file-input-bordered w-full"
      />
      {logoFile && (
        <img
          src={URL.createObjectURL(logoFile)}
          alt="preview"
          className="w-32 h-32 object-cover rounded mx-auto"
        />
      )}
      <button
        type="submit"
        className="btn btn-primary mt-2"
        disabled={isUploading}
      >
        {isUploading ? "Uploading..." : "Create University"}
      </button>
    </form>
  );
};

export default CreateUniversity;
