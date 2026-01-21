import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

// ===== Public pages =====
import Landingpage from "./Pages/Landingpage";
import AboutPage from "./Pages/AboutPage"; // ✅ add this import

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* ===== PUBLIC ROUTES ===== */}
          <Route path="/" element={<Landingpage />} />
          <Route path="/about" element={<AboutPage />} /> {/* ✅ new about route */}
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
