// src/components/Dashboard/AdminDashboard/Results/UpdateKcseResults.tsx
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useUpdateKcseResultsByUserIdMutation } from "../../../../Features/KcseResults/kcseResultsAPI";
import type { TKcseSubjectResult } from "../../../../Features/KcseResults/kcseResultsAPI";

type UpdateKcseResultsProps = {
  userID: number | null;
  existingResults?: TKcseSubjectResult[];
  refetch?: () => void;
};

const UpdateKcseResults = ({
  userID,
  existingResults = [],
  refetch,
}: UpdateKcseResultsProps) => {
  const [updateResults, { isLoading }] = useUpdateKcseResultsByUserIdMutation({
    fixedCacheKey: "updateKcseResults",
  });

  const [results, setResults] = useState<TKcseSubjectResult[]>([]);

  // Initialize form when userID or existing results change
  useEffect(() => {
    if (existingResults && existingResults.length) {
      setResults(existingResults);
    } else {
      setResults([]);
    }
  }, [existingResults]);

  // Handle field changes
  const handleChange = (
    index: number,
    field: keyof TKcseSubjectResult,
    value: string | number
  ) => {
    const updated = [...results];
    // @ts-ignore
    updated[index][field] = value;
    setResults(updated);
  };

  // Add / Remove subjects
  const addSubject = () => {
    setResults([
      ...results,
      { resultID: 0, userID: userID || 0, subjectCode: "", subjectName: "", grade: "", points: 0 },
    ]);
  };

  const removeSubject = (index: number) => {
    setResults(results.filter((_, i) => i !== index));
  };

  // Submit update
  const handleUpdate = async () => {
    if (!userID) {
      toast.error("No user selected.");
      return;
    }

    if (results.some(r => !r.subjectCode || !r.subjectName || !r.grade)) {
      toast.error("Please fill all subject fields.");
      return;
    }

    try {
      // Update each subject individually
      await Promise.all(
        results.map((r) =>
          updateResults({
            userID,
            updates: {
              subjectCode: r.subjectCode,
              subjectName: r.subjectName,
              grade: r.grade,
              points: r.points,
            },
          }).unwrap()
        )
      );

      toast.success("KCSE results updated successfully.");
      (document.getElementById("update_results_modal") as HTMLDialogElement)?.close();
      refetch?.();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update KCSE results.");
    }
  };

  return (
    <dialog id="update_results_modal" className="modal">
      <div className="modal-box w-full max-w-3xl mx-auto rounded-lg bg-gray-50 p-6">
        <h3 className="font-bold text-lg mb-4">Update KCSE Results</h3>

        <div className="space-y-4">
          {results.map((result, index) => (
            <div
              key={index}
              className="grid grid-cols-5 gap-2 items-end border p-2 rounded"
            >
              <input
                placeholder="Code"
                value={result.subjectCode}
                onChange={(e) =>
                  handleChange(index, "subjectCode", e.target.value)
                }
                className="border rounded px-2 py-1"
              />
              <input
                placeholder="Subject Name"
                value={result.subjectName}
                onChange={(e) =>
                  handleChange(index, "subjectName", e.target.value)
                }
                className="border rounded px-2 py-1"
              />
              <input
                placeholder="Grade"
                value={result.grade}
                onChange={(e) =>
                  handleChange(index, "grade", e.target.value)
                }
                className="border rounded px-2 py-1"
              />
              <input
                type="number"
                placeholder="Points"
                value={result.points}
                onChange={(e) =>
                  handleChange(index, "points", Number(e.target.value))
                }
                className="border rounded px-2 py-1"
              />
              <button
                type="button"
                className="text-red-500 text-sm"
                onClick={() => removeSubject(index)}
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            className="px-3 py-1 bg-blue-500 text-white rounded"
            onClick={addSubject}
          >
            + Add Subject
          </button>
        </div>

        <div className="modal-action flex gap-4 mt-4">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleUpdate}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner text-white" />
            ) : (
              "Save Changes"
            )}
          </button>
          <button
            type="button"
            className="btn"
            onClick={() =>
              (document.getElementById("update_results_modal") as HTMLDialogElement)?.close()
            }
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default UpdateKcseResults;
