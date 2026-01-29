// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

// ===== Public pages =====
import Landingpage from "./Pages/Landingpage";
import AboutPage from "./Pages/AboutPage";
import Register from "./Pages/Auth/Register";
import VerifyUser from "./Pages/Auth/VerifyUser"; 
import Login from "./Pages/Auth/Login"; 

// ===== Student Dashboard =====
import Dashboard from "./components/Dashboard/StudentDashboard/dashboard"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* ===== PUBLIC ROUTES ===== */}
          <Route path="/" element={<Landingpage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/login" element={<Login />} /> {/* Login route added */}
          
          {/* ===== VERIFY USER ROUTE ===== */}
          <Route path="/verify" element={<VerifyUser />} />

          {/* ===== STUDENT DASHBOARD ROUTE ===== */}
          <Route path="/dashboard" element={<Dashboard />} />
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
