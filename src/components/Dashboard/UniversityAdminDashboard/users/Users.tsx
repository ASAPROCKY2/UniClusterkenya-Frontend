import React, { useState } from "react";
import { FaUsers, FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { RiCloseCircleFill } from "react-icons/ri";
import {
  Mail,
  ShieldCheck,
  School,
  User,
  GraduationCap,
} from "lucide-react";
import { Skeleton } from "../../../../components/ui/skeleton";
import {
  userAPI,
  type TUser,
} from "../../../../Features/users/UsersApi";

import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";

const UsersComponent: React.FC = () => {
  const {
    data: usersData,
    isLoading,
    error,
  } = userAPI.useGetUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [userToDelete, setUserToDelete] = useState<TUser | null>(null);

  const handleEdit = (user: TUser) => {
    setSelectedUser(user);
    (
      document.getElementById("update_user_modal") as HTMLDialogElement
    )?.showModal();
  };

  const handleDelete = (user: TUser) => {
    setUserToDelete(user);
    (
      document.getElementById("delete_user_modal") as HTMLDialogElement
    )?.showModal();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-6 rounded-2xl">

      {/* Modals */}
      <UpdateUser user={selectedUser} />
      <DeleteUser user={userToDelete} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FaUsers className="text-indigo-600" />
            Users
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage all registered users in the system
          </p>
        </div>

        <div className="px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-sm">
          <span className="font-semibold text-indigo-600">
            {usersData?.length || 0}
          </span>{" "}
          <span className="text-gray-500">users</span>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-gray-200"
            >
              <Skeleton className="h-12 w-12 rounded-xl mb-4" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 flex items-center gap-3">
          <RiCloseCircleFill className="text-xl" />
          <div>
            <p className="font-medium">Error loading users</p>
            <p className="text-sm">Please refresh or try again later</p>
          </div>
        </div>
      )}

      {/* Users Grid */}
      {usersData?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {usersData.map((user) => (
            <div
              key={user.userID}
              className="group bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-xl transition-all p-6"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-800 truncate group-hover:text-indigo-700">
                    {user.firstName || "Unnamed"} {user.lastName || "User"}
                  </h3>

                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === "system_admin"
                        ? "bg-red-100 text-red-700"
                        : user.role === "university_admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-indigo-100 text-indigo-700"
                    }`}
                  >
                    {user.role.replace("_", " ").toUpperCase()}
                  </span>
                </div>

                {/* Avatar */}
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User avatar"
                    className="w-14 h-14 rounded-2xl object-cover border border-gray-200"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-lg font-bold text-indigo-700">
                    {user.firstName?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="space-y-3 mb-6 text-sm text-gray-700">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="truncate">{user.email}</span>
                </div>

                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-4 w-4 text-gray-500" />
                  <span>
                    {user.isVerified ? "Verified Account" : "Not Verified"}
                  </span>
                </div>

                {user.gender && (
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>{user.gender}</span>
                  </div>
                )}

                {user.highSchool && (
                  <div className="flex items-center gap-3">
                    <School className="h-4 w-4 text-gray-500" />
                    <span>{user.highSchool}</span>
                  </div>
                )}

                {/* Student-only academic info */}
                {user.role === "student" && (
                  <>
                    {user.kcseIndex && (
                      <div className="flex items-center gap-3">
                        <GraduationCap className="h-4 w-4 text-gray-500" />
                        <span>KCSE Index: {user.kcseIndex}</span>
                      </div>
                    )}

                    {user.meanGrade && (
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-gray-500">
                          Mean Grade:
                        </span>
                        <span>{user.meanGrade}</span>
                      </div>
                    )}

                    {typeof user.agp === "number" && (
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-gray-500">AGP:</span>
                        <span>{user.agp}</span>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(user)}
                  className="flex-1 py-2 text-sm font-semibold text-indigo-700 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition flex items-center justify-center gap-2"
                >
                  <FaEdit />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(user)}
                  className="flex-1 py-2 text-sm font-semibold text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition flex items-center justify-center gap-2"
                >
                  <MdDeleteForever />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !isLoading && (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 shadow-sm">
            <FaUsers size={72} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">
              No users found
            </h3>
            <p className="text-gray-500 mt-2">
              Users will appear here once registered
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default UsersComponent;
