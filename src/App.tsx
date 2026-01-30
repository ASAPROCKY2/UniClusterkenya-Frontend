import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

// ===== Public pages =====
import Landingpage from "./Pages/Landingpage";
import AboutPage from "./Pages/AboutPage";
import Register from "./Pages/Auth/Register";
import VerifyUser from "./Pages/Auth/VerifyUser";
import Login from "./Pages/Auth/Login";

// ===== Student Dashboard =====
import Dashboard from "./components/Dashboard/StudentDashboard/dashboard";
import University from "./components/Dashboard/StudentDashboard/University";
import Programs from "./components/Dashboard/StudentDashboard/programs";
import Placement from "./components/Dashboard/StudentDashboard/PlacementStatus";

// ===== New Components =====
import ProgrammeUniversities from "./components/Dashboard/StudentDashboard/ProgrammeUniversities";
import UniversityProgramDetail from "./components/Dashboard/StudentDashboard/UniversityProgrammeDetail";
import ApplicationPage from "./components/Dashboard/StudentDashboard/ApplicationPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* ===== PUBLIC ROUTES ===== */}
          <Route path="/" element={<Landingpage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<VerifyUser />} />

          {/* ===== EXISTING DASHBOARD ROUTES ===== */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/universities" element={<University />} />
          <Route path="/dashboard/programs" element={<Programs />} />
          <Route path="/dashboard/placement" element={<Placement />} />

          {/* ===== NEW STUDENT DASHBOARD ROUTES ===== */}
          <Route
            path="/student/dashboard/programmes/:programmeID"
            element={<ProgrammeUniversities />}
          />
          <Route
            path="/student/dashboard/programmes/:programmeID/university/:universityID"
            element={<UniversityProgramDetail />}
          />

          {/* ===== APPLICATION ROUTE (fixed for query params) ===== */}
          <Route
            path="/applications/new"
            element={<ApplicationPage />}
          />

          {/* ===== Optional aliases / safe fallback ===== */}
          <Route
            path="/programme/:programmeID/universities"
            element={<ProgrammeUniversities />}
          />
          <Route
            path="/university/:universityID/programme/:programmeID"
            element={<UniversityProgramDetail />}
          />
        </Routes>
      </BrowserRouter>

      {/* Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            error: "bg-red-500 text-white",
            success: "bg-green-500 text-white",
            info: "bg-blue-500 text-white",
          },
        }}
      />
    </>
  );
}

export default App;
