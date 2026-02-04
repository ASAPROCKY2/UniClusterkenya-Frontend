// src/components/Dashboard/AdminDashboard/Universities/CreateUniversity.tsx
import React, { useState } from "react";
import { useCreateUniversityMutation } from "../../../../Features/universities/UniversityAPI";

const CreateUniversity: React.FC = () => {
  // Form state
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [county, setCounty] = useState("");
  const [logoURL, setLogoURL] = useState("");
  const [helbEligible, setHelbEligible] = useState(false);
  const [governmentScholarship, setGovernmentScholarship] = useState(false);

  // API hook
  const [createUniversity, { isLoading, isError, isSuccess }] = useCreateUniversityMutation();

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !type) {
      alert("Please provide university name and type.");
      return;
    }

    const payload = {
      name,
      type,
      county: county || undefined,
      logoURL: logoURL || undefined,
      helbEligible,
      governmentScholarship,
    };

    try {
      await createUniversity(payload).unwrap();
      alert("University created successfully!");

      // Reset form
      setName("");
      setType("");
      setCounty("");
      setLogoURL("");
      setHelbEligible(false);
      setGovernmentScholarship(false);
    } catch (err) {
      console.error(err);
      alert("Failed to create university.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Create New University</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-medium mb-1">University Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Type */}
        <div>
          <label className="block font-medium mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select Type</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>

        {/* County */}
        <div>
          <label className="block font-medium mb-1">County</label>
          <input
            type="text"
            value={county}
            onChange={(e) => setCounty(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Logo URL */}
        <div>
          <label className="block font-medium mb-1">Logo URL</label>
          <input
            type="text"
            value={logoURL}
            onChange={(e) => setLogoURL(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* HELB & Government Scholarship */}
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={helbEligible}
              onChange={(e) => setHelbEligible(e.target.checked)}
            />
            HELB Eligible
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={governmentScholarship}
              onChange={(e) => setGovernmentScholarship(e.target.checked)}
            />
            Government Scholarship
          </label>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
          >
            {isLoading ? "Creating..." : "Create University"}
          </button>
        </div>
      </form>

      {isError && <p className="text-red-500 mt-2">Failed to create university.</p>}
      {isSuccess && <p className="text-green-500 mt-2">University created successfully!</p>}
    </div>
  );
};

export default CreateUniversity;
