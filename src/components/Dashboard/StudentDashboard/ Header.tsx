import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { ArrowLeft } from "lucide-react";

const StudentHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/dashboard";

  return (
    <div className="navbar bg-base-100 shadow-md px-4 lg:px-10">
      {/* ===== LEFT SIDE ===== */}
      <div className="navbar-start flex items-center">
        {/* Back Button - Only show when not on dashboard */}
        {!isHomePage && (
          <button
            onClick={() => navigate(-1)}
            className="btn btn-ghost btn-circle btn-sm lg:btn-md mr-2 lg:mr-3 hover:bg-base-200 transition-all duration-300 group"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5 lg:h-6 lg:w-6 text-gray-600 group-hover:text-primary group-hover:-translate-x-1 transition-all duration-300" />
            <span className="sr-only">Go back</span>
          </button>
        )}

        {/* Mobile Dropdown Menu */}
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-56 p-2 shadow"
          >
            <li>
              <Link to="/dashboard/placement" className="hover:text-primary font-medium">
                Placement
              </Link>
            </li>
            <li>
              <Link to="/dashboard/programs" className="hover:text-primary font-medium">
                Programs
              </Link>
            </li>
            <li>
              <Link to="/dashboard/application" className="hover:text-primary font-semibold">
                Applications
              </Link>
            </li>
            <li>
              <Link to="/dashboard/universities" className="hover:text-primary font-medium">
                Universities
              </Link>
            </li>
            <li>
              <Link to="/dashboard/downloads" className="hover:text-primary font-medium">
                Downloads
              </Link>
            </li>
            <li className="mt-2">
              <button className="btn btn-error w-full">Logout</button>
            </li>
          </ul>
        </div>

        {/* LOGO */}
        <Link
          to="/dashboard"
          className="flex items-center gap-3 hover:opacity-90 transition"
        >
          <img
            src={logo}
            alt="UniCluster Logo"
            className="h-12 lg:h-14 w-auto"
          />
          <span className="font-bold tracking-tight text-xl lg:text-2xl text-gray-900">
            UniCluster
          </span>
        </Link>
      </div>

      {/* ===== CENTER MENU (Desktop) ===== */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/dashboard/placement" className="text-base lg:text-lg font-medium hover:text-primary">
              Placement
            </Link>
          </li>
          <li>
            <Link to="/dashboard/programs" className="text-base lg:text-lg font-medium hover:text-primary">
              Programs
            </Link>
          </li>
          <li>
            <Link to="/dashboard/application" className="text-base lg:text-lg font-semibold text-primary">
              Applications
            </Link>
          </li>
          <li>
            <Link to="/dashboard/universities" className="text-base lg:text-lg font-medium hover:text-primary">
              Universities
            </Link>
          </li>
          <li>
            <Link to="/dashboard/downloads" className="text-base lg:text-lg font-medium hover:text-primary">
              Downloads
            </Link>
          </li>
        </ul>
      </div>

      {/* ===== RIGHT SIDE ===== */}
      <div className="navbar-end">
        <button
          onClick={() => { /* handle logout logic */ }}
          className="btn btn-error btn-sm lg:btn-md rounded-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default StudentHeader;
