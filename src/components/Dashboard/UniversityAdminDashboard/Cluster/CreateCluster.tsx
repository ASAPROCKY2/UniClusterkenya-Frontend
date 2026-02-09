
import React, { useState } from "react";


const CreateCluster: React.FC = () => {
  // Form state
  const [clusterCode, setClusterCode] = useState("");
  const [name, setName] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]); // Optional subject codes/names

  // Local API state + helper (replaces missing useCreateClusterMutation hook)
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const createCluster = async (payload: { clusterCode: string; name: string; subjects: string[] }) => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);
    try {
      const res = await fetch("/api/clusters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      setIsSuccess(true);
      return data;
    } catch (err) {
      setIsError(true);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle subject input
  const addSubject = () => {
    if (subjects.length < 5) { // Optional: limit subjects
      setSubjects([...subjects, ""]);
    }
  };

  const updateSubject = (index: number, value: string) => {
    const updated = [...subjects];
    updated[index] = value;
    setSubjects(updated);
  };

  const removeSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clusterCode || !name) {
      alert("Please provide both Cluster Code and Cluster Name.");
      return;
    }

    const payload = {
      clusterCode,
      name,
      subjects: subjects.filter((s) => s.trim() !== ""),
    };

    try {
      await createCluster(payload);
      alert("Cluster created successfully!");

      // Reset form
      setClusterCode("");
      setName("");
      setSubjects([]);
    } catch (err) {
      console.error(err);
      alert("Failed to create cluster.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Create New Cluster</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Cluster Code */}
        <div>
          <label className="block font-medium mb-1">Cluster Code</label>
          <input
            type="text"
            value={clusterCode}
            onChange={(e) => setClusterCode(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Cluster Name */}
        <div>
          <label className="block font-medium mb-1">Cluster Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Optional Subjects */}
        <div>
          <label className="block font-medium mb-1">Subjects (Optional)</label>
          <div className="flex flex-col gap-2">
            {subjects.map((subject, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => updateSubject(index, e.target.value)}
                  placeholder="Subject Name or Code"
                  className="flex-1 border rounded px-3 py-2"
                />
                <button
                  type="button"
                  onClick={() => removeSubject(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSubject}
              className="px-3 py-1 bg-blue-500 text-white rounded w-max"
            >
              Add Subject
            </button>
          </div>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
          >
            {isLoading ? "Creating..." : "Create Cluster"}
          </button>
        </div>
      </form>

      {isError && <p className="text-red-500 mt-2">Failed to create cluster.</p>}
      {isSuccess && <p className="text-green-500 mt-2">Cluster created successfully!</p>}
    </div>
  );
};

export default CreateCluster;
