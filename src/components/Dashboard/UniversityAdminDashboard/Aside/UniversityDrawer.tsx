// src/dashboard/UniversityAdminDashboard/aside/UniversityDrawer.tsx
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "../../../../app/store";
import { universityAdminDrawerData } from "./drawerData";

const UniversityDrawer = () => {
  const location = useLocation();
  const authUser = useSelector((state: RootState) => state.user.user);

  return (
    <div className="h-full bg-gray-800 text-white flex flex-col">
      <h2 className="text-xl font-bold p-4 border-b border-gray-700">
        University Admin
      </h2>

      <ul className="flex-1">
        {universityAdminDrawerData.map((item) => {
          const isActive = location.pathname === item.link;

          return (
            <li key={item.id}>
              <Link
                to={item.link}
                className={`flex items-center gap-3 p-4 transition-all ${
                  isActive
                    ? "bg-gray-700 border-l-4 border-blue-400"
                    : "hover:bg-gray-700 hover:border-l-4 border-blue-400"
                }`}
              >
                {item.id === "profile" ? (
                  <img
                    src={
                      authUser?.imageUrl && authUser.imageUrl.trim() !== ""
                        ? authUser.imageUrl
                        : "/default-avatar.png"
                    }
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <item.icon size={22} />
                )}
                <span className="text-lg">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UniversityDrawer;
