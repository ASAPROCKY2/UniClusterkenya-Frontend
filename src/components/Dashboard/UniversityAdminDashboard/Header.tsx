// src/components/Dashboard/UniversityDashboard/UniversityHeader.tsx
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../../../assets/images/logo.png";
import { ArrowLeft } from "lucide-react";
import { logout } from "../../../Features/Login/UserSlice";

const UniversityHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isHomePage = location.pathname === "/university";

  // Function to check if a menu link is active
  const isActive = (path: string): boolean => location.pathname === path;

  const handleLogout = (): void => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="navbar bg-base-100 shadow-md px-4 lg:px-10">
      {/* ===== LEFT SIDE ===== */}
      <div className="navbar-start flex items-center">
        {!isHomePage && (
          <button
            onClick={() => navigate(-1)}
            className="btn btn-ghost btn-circle btn-sm lg:btn-md mr-2 lg:mr-3 hover:bg-base-200 transition"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5 lg:h-6 lg:w-6 text-gray-600" />
          </button>
        )}

        <Link
          to="/university"
          className="flex items-center gap-3 hover:opacity-90 transition"
        >
          <img src={logo} alt="UniCluster Logo" className="h-12 lg:h-14 w-auto" />
          <span className="font-bold text-xl lg:text-2xl text-gray-900">
            UniCluster
          </span>
        </Link>
      </div>

      {/* ===== CENTER MENU (Desktop) ===== */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link
              to="/university"
              className={isActive("/university") ? "text-primary" : ""}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/university/programs"
              className={isActive("/university/programs") ? "text-primary" : ""}
            >
              Programs
            </Link>
          </li>
          <li>
            <Link
              to="/university/manage"
              className={isActive("/university/manage") ? "text-primary" : ""}
            >
              Universities
            </Link>
          </li>
          <li>
            <Link
              to="/university/applications"
              className={isActive("/university/applications") ? "text-primary" : ""}
            >
              Applications
            </Link>
          </li>
          <li>
            <Link
              to="/university/students"
              className={isActive("/university/students") ? "text-primary" : ""}
            >
              Students
            </Link>
          </li>
        </ul>
      </div>

      {/* ===== RIGHT SIDE ===== */}
      <div className="navbar-end">
        <button
          onClick={handleLogout}
          className="btn btn-error btn-sm lg:btn-md rounded-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UniversityHeader;
