import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { useCreateApplicationMutation } from "../../../Features/application/applicationAPI";
import { useGetUserByIdQuery } from "../../../Features/users/UsersApi";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { 
  ChevronLeft, 
  User, 
  Mail, 
  FileText, 
  Award, 
  CheckCircle, 
  Calendar,
  Shield,
  Loader
} from "lucide-react";

const ApplicationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get programmeID from URL
  const queryParams = new URLSearchParams(location.search);
  const programmeID = queryParams.get("programmeID");
  const programmeName = queryParams.get("programmeName") || "Selected Programme";

  // Logged in user
  const userID = useSelector((state: RootState) => state.user.user?.userID);
  const { data: user, isLoading: isLoadingUser } = useGetUserByIdQuery(userID ?? skipToken);

  const [choiceOrder, setChoiceOrder] = useState<number>(1);
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
  const [createApplication, { isLoading: isSubmitting }] = useCreateApplicationMutation();

  if (isLoadingUser || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your information...</p>
        </div>
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

  // Submit application
  const handleSubmit = async () => {
    if (!programmeID) {
      toast.error("Invalid programme selected");
      return;
    }

    if (!agreeTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    try {
      await createApplication({
        userID: user.userID,
        programmeID: Number(programmeID),
        choiceOrder,
      }).unwrap();

      toast.success(
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Application submitted successfully!
        </div>,
        { duration: 4000 }
      );
      setTimeout(() => navigate("/dashboard/applications"), 1500);
    } catch (error: any) {
      toast.error(
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          {error?.data?.message || "Failed to submit application"}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Back Button Header */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-4 py-2.5 rounded-lg transition"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Programme
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Application Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Application Form
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete your application for{" "}
            <span className="font-semibold text-blue-700">{programmeName}</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - User Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Details Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-500">Full Name</label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="text-lg font-semibold text-gray-900">
                      {firstName} {lastName}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-500">Email Address</label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-lg font-semibold text-gray-900">{email}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-500">KCSE Index Number</label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <span className="text-lg font-semibold text-gray-900">{kcseIndex}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-500">Mean Grade</label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <Award className="w-5 h-5 text-gray-400" />
                    <span className="text-lg font-semibold text-gray-900">{meanGrade}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Details Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Application Details</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select your preference order for this programme:
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[1, 2, 3, 4].map((order) => (
                      <button
                        key={order}
                        onClick={() => setChoiceOrder(order)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          choiceOrder === order
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl font-bold mb-1">{order}</div>
                          <div className="text-sm">
                            {order === 1 && "First Choice"}
                            {order === 2 && "Second Choice"}
                            {order === 3 && "Third Choice"}
                            {order === 4 && "Fourth Choice"}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="terms" className="text-gray-700">
                      <span className="font-medium">I agree to the terms and conditions</span>
                      <p className="text-sm text-gray-500 mt-1">
                        I confirm that all information provided is accurate and complete. 
                        I understand that providing false information may lead to disqualification.
                      </p>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Summary & Actions */}
          <div className="space-y-8">
            {/* Summary Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Application Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Programme:</span>
                  <span className="font-semibold text-gray-900 truncate ml-2">{programmeName}</span>
                </div>
                
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Preference:</span>
                  <span className="font-semibold text-gray-900">
                    {choiceOrder === 1 && "First Choice"}
                    {choiceOrder === 2 && "Second Choice"}
                    {choiceOrder === 3 && "Third Choice"}
                    {choiceOrder === 4 && "Fourth Choice"}
                  </span>
                </div>
                
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Applicant:</span>
                  <span className="font-semibold text-gray-900">{firstName} {lastName}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">KCSE Grade:</span>
                  <span className="font-semibold text-gray-900">{meanGrade}</span>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Important Notes</h4>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Applications cannot be edited after submission</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>You can track your application status in the dashboard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Selection is based on merit and subject requirements</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <div className="space-y-4">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !agreeTerms}
                  className={`w-full py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    isSubmitting || !agreeTerms
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Submit Application
                    </>
                  )}
                </button>

                <button
                  onClick={() => navigate(-1)}
                  className="w-full py-3.5 rounded-xl font-medium border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition"
                >
                  Cancel Application
                </button>
              </div>
              
              <div className="text-center mt-4">
                <p className="text-xs text-gray-500">
                  You can review this application in your dashboard
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-5 py-2.5 rounded-lg transition"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Programme Details
            </button>
            
            <div className="text-sm text-gray-500">
              <span className="font-medium">Step 2 of 2</span> • Final Review
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPage;