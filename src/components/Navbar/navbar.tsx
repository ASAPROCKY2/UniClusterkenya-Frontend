import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png"; // ✅ import logo

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm px-4 lg:px-10">
      {/* ===== LEFT SIDE ===== */}
      <div className="navbar-start">
        <div className="dropdown">
          {/* Hamburger (Mobile) */}
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6" // slightly bigger hamburger icon
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

          {/* Mobile Dropdown Menu */}
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-56 p-2 shadow" // wider menu
          >
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </div>

        {/* LOGO */}
        <Link to="/" className="btn btn-ghost normal-case text-2xl flex items-center">
          <img
            src={logo} // ✅ imported logo
            alt="UniCluster Logo"
            className="h-22 w-auto" // ✅ bigger logo (16 = 64px)
          />
          <span className="ml-3 font-bold tracking-tight text-xl lg:text-2xl">
            UniCluster
          </span>
        </Link>
      </div>

      {/* ===== CENTER MENU (Desktop) ===== */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/about" className="text-base lg:text-lg font-medium">
              About
            </Link>
          </li>
          <li>
            <Link to="/features" className="text-base lg:text-lg font-medium">
              Features
            </Link>
          </li>
          <li>
            <Link to="/universities" className="text-base lg:text-lg font-medium">
              Universities
            </Link>
          </li>
        </ul>
      </div>

      {/* ===== RIGHT SIDE ===== */}
      <div className="navbar-end">
        <Link
          to="/login"
          className="btn btn-ghost btn-sm lg:btn-md rounded-full mr-2 hover:bg-base-200"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="btn btn-primary btn-sm lg:btn-md rounded-full"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
