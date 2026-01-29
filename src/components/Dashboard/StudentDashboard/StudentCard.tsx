// src/components/Dashboard/StudentDashboard/StudentCard.tsx
import React from "react";
import { useSelector } from "react-redux";
import { useGetUserByIdQuery } from "../../../Features/users/UsersApi";
import { skipToken } from "@reduxjs/toolkit/query/react"; 
import type { RootState } from "../../../app/store";
import defaultAvatar from "../../../assets/images/default-avatar.png"; 

const StudentCard: React.FC = () => {
  // 🔑 Get logged-in user ID from Redux (slice: 'user')
  const userID = useSelector((state: RootState) => state.user.user?.userID);

  // 🛑 Fetch student data, skip query if no userID
  const { data: student, isLoading, isError } = useGetUserByIdQuery(
    userID ?? skipToken
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center p-10">
        <p className="text-gray-500">Loading student info...</p>
      </div>
    );

  if (isError || !student)
    return (
      <div className="flex justify-center items-center p-10">
        <p className="text-red-500">Failed to load student info.</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* ===== Avatar ===== */}
        <img
          src={student.photoURL || defaultAvatar}
          alt={`${student.firstName} ${student.lastName}`}
          className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border-2 border-gray-300 shadow-sm"
        />

        {/* ===== Info ===== */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800">
            {student.firstName} {student.lastName}
          </h2>
          <p className="text-gray-500 mb-4">{student.email}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 font-semibold">Role</p>
              <p className="text-gray-800">{student.role}</p>
            </div>

            {student.kcseIndex && (
              <div>
                <p className="text-gray-600 font-semibold">KCSE Index</p>
                <p className="text-gray-800">{student.kcseIndex}</p>
              </div>
            )}

            {student.meanGrade && (
              <div>
                <p className="text-gray-600 font-semibold">Mean Grade</p>
                <p className="text-gray-800">{student.meanGrade}</p>
              </div>
            )}

            {student.agp !== null && student.agp !== undefined && (
              <div>
                <p className="text-gray-600 font-semibold">AGP</p>
                <p className="text-gray-800">{student.agp}</p>
              </div>
            )}
          </div>

          {student.createdAt && (
            <p className="text-gray-400 mt-4 text-sm">
              Account created on {new Date(student.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
