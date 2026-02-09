// src/dashboard/UniversityAdminDashboard/aside/UniversityDrawer.tsx

import { Link, useLocation } from "react-router-dom";
import { universityAdminDrawerData } from "./drawerData";

const UniversityDrawer = () => {
  const location = useLocation();

  return (
    <aside className="h-full w-64 bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-xl font-bold tracking-wide">
          Admin Dashboard
        </h2>
        <p className="text-sm text-gray-400">
          UniCluster Kenya
        </p>
      </div>

      {/* Navigation */}
      <ul className="flex-1 py-2">
        {universityAdminDrawerData.map((item) => {
          const isActive = location.pathname.startsWith(item.link);

          return (
            <li key={item.id}>
              <Link
                to={item.link}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all
                  ${
                    isActive
                      ? "bg-gray-800 border-l-4 border-blue-500 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white hover:border-l-4 hover:border-blue-500"
                  }
                `}
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800 text-xs text-gray-400 text-center">
        © 2026 UniCluster Kenya
      </div>
    </aside>
  );
};

export default UniversityDrawer;
