import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "./layouts/Root";
import MainLayout from "./layouts/mainLayout";
import LoginPage from "./pages/shared/auth/LoginPage";
import DashboardLayout from "./layouts/DashboardLayout";
import RegisterPage from "./pages/shared/auth/RegisterPage";
import AdminServicesPage from "./pages/admin/Services";
import AdminStaffPage from "./pages/admin/Staff";
import ProtectedRoute from "./pages/shared/auth/ProtectedRoute";
import UnauthorizedPage from "./pages/Unauthorized";
import Appointment from "./pages/staff/Appointment";
import MyServices from "./pages/staff/MyServices";
import HomePage from "./pages/user/HomePage";
import StaffPage from "./pages/user/StaffPage";
import StaffDetails from "./pages/user/staffDetails";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth/login" />,
  },
  {
    path: "/auth",
    element: <RootLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <DashboardLayout role="admin" />,
        children: [
          {
            path: "services",
            element: <AdminServicesPage />,
          },
          {
            path: "staff",
            element: <AdminStaffPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/staff",
    element: (
      <ProtectedRoute allowedRoles={["staff"]}>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <DashboardLayout role="staff" />,
        children: [
          {
            path: "appointments",
            element: <Appointment />,
          },
          {
            path: "my-services",
            element: <MyServices />,
          },
        ],
      },
    ],
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute allowedRoles={["user"]}>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <MainLayout role="user" />,
        children: [
          {
            path: "home",
            element: <HomePage />,
          },
          {
            path: "staff/:centerId",
            element: <StaffPage />,
          },
          {
            path: "staff/details/:staffId",
            element: <StaffDetails />,
          },
        ],
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
]);
export default router;
