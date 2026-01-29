import React from "react";
import StudentHeader from "./ Header";
import StudentFooter from "./Footer";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ===== HEADER ===== */}
      <StudentHeader />

      {/* ===== BODY ===== */}
      <main className="flex-1 p-6 bg-gray-50">
        {/* Placeholder content for testing */}
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Welcome to Your Student Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder Cards */}
            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">Student Info</h2>
              <p>Name: Ian Kamunya</p>
              <p>KCSE Index: 202208237004154</p>
              <p>Mean Grade: C+</p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">Ongoing Applications</h2>
              <p>No applications yet</p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">Current Placement</h2>
              <p>Not placed yet</p>
            </div>
          </div>
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <StudentFooter />
    </div>
  );
};

export default Dashboard;
