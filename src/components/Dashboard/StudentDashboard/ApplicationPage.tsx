// src/dashboard/StudentDashboard/applications/ApplicationPage.tsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { useCreateApplicationMutation } from "../../../Features/application/applicationAPI";
import { useGetUserByIdQuery } from "../../../Features/users/UsersApi";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";

const ApplicationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const programmeID = queryParams.get("programmeID");

  const userID = useSelector((state: RootState) => state.user.user?.userID);
  const { data: user, isLoading } = useGetUserByIdQuery(userID ?? skipToken);

  const [choiceOrder, setChoiceOrder] = useState(1);
  const [createApplication, { isLoading: isSubmitting }] = useCreateApplicationMutation();

  if (!user || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading user data...</p>
      </div>
    );
  }

  const {
    firstName = "—",
    lastName = "—",
    email = "—",
    kcseIndex = "—",
    meanGrade = "—",
  } = user;

  // ✅ Handle the create mutation
  const handleSubmit = async () => {
    if (!programmeID) {
      toast.error("Invalid programme selected");
      return;
    }

    try {
      await createApplication({
        userID: user.userID,
        programmeID: Number(programmeID),
        choiceOrder,
      }).unwrap(); // unwrap to catch errors properly

      toast.success("Application submitted successfully 🎉");
      navigate("/dashboard/applications"); // redirect to applications page
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to submit application");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Apply for Programme
        </h1>

        {/* User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-sm text-gray-500">Full Name</label>
            <div className="font-medium">
              {firstName} {lastName}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500">Email</label>
            <div className="font-medium">{email}</div>
          </div>

          <div>
            <label className="text-sm text-gray-500">KCSE Index</label>
            <div className="font-medium">{kcseIndex}</div>
          </div>

          <div>
            <label className="text-sm text-gray-500">Mean Grade</label>
            <div className="font-medium">{meanGrade}</div>
          </div>
        </div>

        {/* Choice Order */}
        <select
          value={choiceOrder}
          onChange={(e) => setChoiceOrder(Number(e.target.value))}
          className="w-full mb-6 rounded-lg border-gray-300 p-2"
        >
          <option value={1}>First Choice</option>
          <option value={2}>Second Choice</option>
          <option value={3}>Third Choice</option>
          <option value={4}>Fourth Choice</option>
        </select>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Back
          </button>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPage;
