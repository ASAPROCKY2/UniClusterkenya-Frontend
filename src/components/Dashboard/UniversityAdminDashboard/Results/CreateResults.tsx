// src/components/Dashboard/AdminDashboard/Results/CreateKcseResults.tsx
import React, { useState } from "react";
import { useCreateKcseResultMutation } from "../../../../Features/KcseResults/kcseResultsAPI";

type SubjectResult = {
  subjectCode: string;
  subjectName: string;
  grade: string;
  points: number;
};

const CreateKcseResults: React.FC = () => {
  // Student
  const [userID, setUserID] = useState<number | "">("");

  // Subjects list
  const [results, setResults] = useState<SubjectResult[]>([
    { subjectCode: "", subjectName: "", grade: "", points: 0 },
  ]);

  // API hook
  const [createKcseResult, { isLoading, isError, isSuccess }] =
    useCreateKcseResultMutation();

  /* =============================
     HANDLERS
  ============================= */

  const handleResultChange = (
    index: number,
    field: keyof SubjectResult,
    value: string | number
  ) => {
    const updated = [...results];
    // @ts-ignore
    updated[index][field] = value;
    setResults(updated);
  };

  const addSubject = () => {
    setResults([
      ...results,
      { subjectCode: "", subjectName: "", grade: "", points: 0 },
    ]);
  };

  const removeSubject = (index: number) => {
    if (results.length === 1) return;
    setResults(results.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userID) {
      alert("Please provide a valid User ID");
      return;
    }

    if (results.some(r => !r.subjectCode || !r.subjectName || !r.grade)) {
      alert("Please fill in all subject fields");
      return;
    }

    const payload = {
      userID: Number(userID),
      results,
    };

    try {
      await createKcseResult(payload).unwrap();
      alert("KCSE results created successfully!");

      // Reset form
      setUserID("");
      setResults([{ subjectCode: "", subjectName: "", grade: "", points: 0 }]);
    } catch (err) {
      console.error(err);
      alert("Failed to create KCSE results");
    }
  };

  /* =============================
     UI
  ============================= */

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Create KCSE Results</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* User ID */}
        <div>
          <label className="block font-medium mb-1">Student User ID</label>
          <input
            type="number"
            value={userID}
            onChange={(e) => setUserID(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Subjects */}
        <div className="space-y-4">
          <h3 className="font-semibold">Subject Results</h3>

          {results.map((result, index) => (
            <div
              key={index}
              className="grid grid-cols-5 gap-2 items-end border p-3 rounded"
            >
              <input
                placeholder="Code"
                value={result.subjectCode}
                onChange={(e) =>
                  handleResultChange(index, "subjectCode", e.target.value)
                }
                className="border rounded px-2 py-1"
              />

              <input
                placeholder="Subject Name"
                value={result.subjectName}
                onChange={(e) =>
                  handleResultChange(index, "subjectName", e.target.value)
                }
                className="border rounded px-2 py-1"
              />

              <input
                placeholder="Grade"
                value={result.grade}
                onChange={(e) =>
                  handleResultChange(index, "grade", e.target.value)
                }
                className="border rounded px-2 py-1"
              />

              <input
                type="number"
                placeholder="Points"
                value={result.points}
                onChange={(e) =>
                  handleResultChange(index, "points", Number(e.target.value))
                }
                className="border rounded px-2 py-1"
              />

              <button
                type="button"
                onClick={() => removeSubject(index)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Add Subject */}
        <button
          type="button"
          onClick={addSubject}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          + Add Subject
        </button>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Create Results"}
          </button>
        </div>
      </form>

      {isError && (
        <p className="text-red-500 mt-2">Failed to create KCSE results.</p>
      )}
      {isSuccess && (
        <p className="text-green-500 mt-2">
          KCSE results created successfully!
        </p>
      )}
    </div>
  );
};

export default CreateKcseResults;
