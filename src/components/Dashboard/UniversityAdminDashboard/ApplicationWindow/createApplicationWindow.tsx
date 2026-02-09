// src/components/Dashboard/AdminDashboard/ApplicationWindows/CreateApplicationWindow.tsx
import React, { useState } from "react";
import { useCreateApplicationWindowMutation } from "../../../../Features/ApplicationWindow/applicationWindowAPI";
const CreateApplicationWindow: React.FC = () => {
  // Form state
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [programmeID, setProgrammeID] = useState<number | undefined>(undefined);
  const [totalSlots, setTotalSlots] = useState<number | undefined>(undefined);
  const [isActive, setIsActive] = useState(false);

  // API hook
  const [createApplicationWindow, { isLoading, isError, isSuccess }] =
    useCreateApplicationWindowMutation();

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !startDate || !endDate || !programmeID || !totalSlots) {
      alert("Please provide all required fields.");
      return;
    }

    const payload = {
      name,
      startDate,
      endDate,
      programmeID,
      totalSlots,
      isActive,
    };

    try {
      await createApplicationWindow(payload).unwrap();
      alert("Application window created successfully!");

      // Reset form
      setName("");
      setStartDate("");
      setEndDate("");
      setProgrammeID(undefined);
      setTotalSlots(undefined);
      setIsActive(false);
    } catch (err) {
      console.error(err);
      alert("Failed to create application window.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Create New Application Window</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Window Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block font-medium mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block font-medium mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Programme ID */}
        <div>
          <label className="block font-medium mb-1">Programme ID</label>
          <input
            type="number"
            value={programmeID || ""}
            onChange={(e) => setProgrammeID(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
            required
            min={1}
          />
        </div>

        {/* Total Slots */}
        <div>
          <label className="block font-medium mb-1">Total Slots</label>
          <input
            type="number"
            value={totalSlots || ""}
            onChange={(e) => setTotalSlots(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
            required
            min={1}
          />
        </div>

        {/* Active Checkbox */}
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            Active
          </label>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
          >
            {isLoading ? "Creating..." : "Create Window"}
          </button>
        </div>
      </form>

      {isError && <p className="text-red-500 mt-2">Failed to create application window.</p>}
      {isSuccess && <p className="text-green-500 mt-2">Application window created successfully!</p>}
    </div>
  );
};

export default CreateApplicationWindow;
