import React, { useState } from "react";
import {
  Calendar,
  Users,
  Settings,
  User,
  Scissors,
  UserCheck,
  Menu,
  X,
  Bell,
  Search,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

const DashboardLayout = ({ role }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [currentUser, setCurrentUser] = useState({
  //   name: "Ahmed Mohammed",
  //   role: role || "admin",
  //   avatar:
  //     "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
  //   email: "ahmed@beautybook.com",
  // });

  const location = useLocation();

  const menuItems = {
    admin: [
      { name: "Services", icon: Scissors, href: "/admin/services" },
      { name: "Staff", icon: Users, href: "/admin/staff" },
      // { name: "Appointments", icon: Calendar, href: "/appointments" },
      // { name: "Clients", icon: UserCheck, href: "/clients" },
      { name: "Settings", icon: Settings, href: "/admin/settings" },
    ],
    staff: [
      { name: "Appointments", icon: Calendar, href: "/staff/appointments" },
      { name: "My Services", icon: Scissors, href: "/staff/my-services" },
      { name: "My Users", icon: UserCheck, href: "/staff/my-users" },
      { name: "Profile", icon: User, href: "/staff/profile" },
    ],
  };

  const currentMenuItems = menuItems[role] || [];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/auth/login";
  };
  return (
    <div className="min-h-screen bg-background-page flex">
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-blue-600 text-white">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Scissors className="w-5 h-5 text-black" />
            </div>
            <span className="ml-2 text-xl font-bold text-white">
              BeautyBook
            </span>
          </div>
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-white hover:bg-white/10 p-1 rounded"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-purple-200"
            />
            <div className="ml-3">
              <p className="text-sm font-semibold text-gray-900">
                {currentUser.name}
              </p>
              <p className="text-xs text-gray-500">
                {currentUser.role === "admin"
                  ? "Administrator"
                  : "Staff Member"}
              </p>
            </div>
          </div>
        </div> */}

        <nav className="flex-1 px-4 py-6 space-y-2">
          {currentMenuItems.map((item, index) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={index}
                to={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 shadow-lg"
                    : "text-gray-700 hover:bg-blue-100 hover:text-black"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 mr-3 ${
                    isActive ? "text-white" : "text-gray-400"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
          >
            {" "}
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 ml-4">
              {role === "admin" ? "Admin Dashboard" : "Staff Dashboard"}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* <div className="relative">
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
            </div> */}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-background-page p-6">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
