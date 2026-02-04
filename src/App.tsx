// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

/* =============================
   PUBLIC PAGES
============================= */
import Landingpage from "./Pages/Landingpage";
import AboutPage from "./Pages/AboutPage";
import Register from "./Pages/Auth/Register";
import VerifyUser from "./Pages/Auth/VerifyUser";
import Login from "./Pages/Auth/Login";

/* =============================
   STUDENT DASHBOARD
============================= */
import Dashboard from "./components/Dashboard/StudentDashboard/dashboard";
import University from "./components/Dashboard/StudentDashboard/University";
import Programs from "./components/Dashboard/StudentDashboard/programs";
import Placement from "./components/Dashboard/StudentDashboard/PlacementStatus";

/* =============================
   PROGRAMME FLOW
============================= */
import ProgrammeUniversities from "./components/Dashboard/StudentDashboard/ProgrammeUniversities";
import UniversityProgramDetail from "./components/Dashboard/StudentDashboard/UniversityProgrammeDetail";

/* =============================
   APPLICATIONS
============================= */
import ApplicationPage from "./components/Dashboard/StudentDashboard/ApplicationPage";
import Applications from "./components/Dashboard/StudentDashboard/Application";

/* =============================
   UNIVERSITY ADMIN DASHBOARD
============================= */
import UniversityDashboard from "./components/Dashboard/UniversityAdminDashboard/Universitydashboard";
import ProgrammeComponent from "./components/Dashboard/UniversityAdminDashboard/Program/program";
import UniversityComponent from "./components/Dashboard/UniversityAdminDashboard/Universities/Universities"; // <-- NEW

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

          {/* ===== STUDENT DASHBOARD ===== */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/universities" element={<University />} />
          <Route path="/dashboard/programs" element={<Programs />} />
          <Route path="/dashboard/placement" element={<Placement />} />

          {/* ===== DASHBOARD APPLICATIONS ===== */}
          <Route path="/dashboard/applications" element={<Applications />} />
          <Route path="/dashboard/application/:userID" element={<Applications />} />

          {/* ===== PROGRAMME → UNIVERSITY FLOW ===== */}
          <Route
            path="/student/dashboard/programmes/:programmeID"
            element={<ProgrammeUniversities />}
          />
          <Route
            path="/student/dashboard/programmes/:programmeID/university/:universityID"
            element={<UniversityProgramDetail />}
          />

          {/* ===== APPLICATION ROUTES ===== */}
          <Route path="/applications/new" element={<ApplicationPage />} />
          <Route path="/applications" element={<Applications />} />

          {/* ===== SAFE ALIASES ===== */}
          <Route
            path="/programme/:programmeID/universities"
            element={<ProgrammeUniversities />}
          />
          <Route
            path="/university/:universityID/programme/:programmeID"
            element={<UniversityProgramDetail />}
          />

          {/* ===== UNIVERSITY ADMIN DASHBOARD ===== */}
          <Route path="/university" element={<UniversityDashboard />} />
          {/* MATCH SIDEBAR LINK EXACTLY */}
          <Route path="/university/programs" element={<ProgrammeComponent />} />
          <Route path="/university/manage" element={<UniversityComponent />} /> {/* <-- NEW */}
        </Routes>
      </BrowserRouter>

      {/* ===== TOAST NOTIFICATIONS ===== */}
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
