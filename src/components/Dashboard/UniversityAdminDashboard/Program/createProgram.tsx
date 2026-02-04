// src/components/Dashboard/AdminDashboard/Programs/CreateProgram.tsx
import React, { useState } from "react";

//  Correct API hooks
import { useGetAllUniversitiesQuery, type TUniversity } from "../../../../Features/universities/UniversityAPI";
import { useGetProgrammeLevelsQuery, useCreateProgrammeMutation, type TSProgrammeCluster, type TCreateProgramme } from "../../../../Features/programmes/ProgrammesAPI";
import { useGetClustersByProgrammeQuery } from "../../../../Features/Cluster/clusterAPI";

const CreateProgram: React.FC = () => {
  // Form state
  const [name, setName] = useState("");
  const [universityID, setUniversityID] = useState<number | "">("");
  const [level, setLevel] = useState<string>("");
  const [durationYears, setDurationYears] = useState<number | "">("");
  const [minAGP, setMinAGP] = useState<number | "">("");
  const [helbEligible, setHelbEligible] = useState(false);
  const [scholarshipAvailable, setScholarshipAvailable] = useState(false);
  const [selectedClusters, setSelectedClusters] = useState<number[]>([]);

  //  API hooks
  const { data: universities } = useGetAllUniversitiesQuery();
  const { data: programmeLevels } = useGetProgrammeLevelsQuery();
  const { data: clusters } = useGetClustersByProgrammeQuery(0); // Replace 0 with actual programmeID if needed
  const [createProgramme, { isLoading, isError, isSuccess }] = useCreateProgrammeMutation();

  // Handle cluster selection
  const toggleCluster = (clusterID: number) => {
    setSelectedClusters((prev) =>
      prev.includes(clusterID) ? prev.filter((id) => id !== clusterID) : [...prev, clusterID]
    );
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !universityID) {
      alert("Please provide a programme name and select a university.");
      return;
    }

    const payload: TCreateProgramme = {
      name,
      universityID: Number(universityID),
      level: level || undefined,
      durationYears: durationYears ? Number(durationYears) : undefined,
      minAGP: minAGP ? Number(minAGP) : undefined,
      helbEligible,
      scholarshipAvailable,
      clusterIDs: selectedClusters.length ? selectedClusters : undefined,
    };

    try {
      await createProgramme(payload).unwrap();
      alert("Programme created successfully!");
      // Reset form
      setName("");
      setUniversityID("");
      setLevel("");
      setDurationYears("");
      setMinAGP("");
      setHelbEligible(false);
      setScholarshipAvailable(false);
      setSelectedClusters([]);
    } catch (err) {
      console.error(err);
      alert("Failed to create programme.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Create New Programme</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Programme Name */}
        <div>
          <label className="block font-medium mb-1">Programme Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* University */}
        <div>
          <label className="block font-medium mb-1">University</label>
          <select
            value={universityID}
            onChange={(e) => setUniversityID(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select University</option>
            {universities?.map((uni: TUniversity) => (
              <option key={uni.universityID} value={uni.universityID}>
                {uni.name}
              </option>
            ))}
          </select>
        </div>

        {/* Level */}
        <div>
          <label className="block font-medium mb-1">Level</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Level</option>
            {programmeLevels?.map((lvl) => (
              <option key={lvl.levelID} value={lvl.name}>
                {lvl.name}
              </option>
            ))}
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className="block font-medium mb-1">Duration (Years)</label>
          <input
            type="number"
            min={0}
            value={durationYears}
            onChange={(e) => setDurationYears(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Min AGP */}
        <div>
          <label className="block font-medium mb-1">Minimum AGP</label>
          <input
            type="number"
            min={0}
            value={minAGP}
            onChange={(e) => setMinAGP(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* HELB & Scholarship */}
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
              checked={scholarshipAvailable}
              onChange={(e) => setScholarshipAvailable(e.target.checked)}
            />
            Scholarship Available
          </label>
        </div>

        {/* Clusters */}
        <div>
          <label className="block font-medium mb-1">Clusters</label>
          <div className="flex flex-wrap gap-2">
            {clusters?.map((cluster: TSProgrammeCluster) => (
              <button
                type="button"
                key={cluster.clusterID}
                onClick={() => toggleCluster(cluster.clusterID)}
                className={`px-3 py-1 border rounded ${
                  selectedClusters.includes(cluster.clusterID) ? "bg-blue-500 text-white" : ""
                }`}
              >
                {cluster.name}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
          >
            {isLoading ? "Creating..." : "Create Programme"}
          </button>
        </div>
      </form>
      {isError && <p className="text-red-500 mt-2">Failed to create programme.</p>}
      {isSuccess && <p className="text-green-500 mt-2">Programme created successfully!</p>}
    </div>
  );
};

export default CreateProgram;
