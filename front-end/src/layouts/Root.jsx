import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/shared/ScrollToTop";

function RootLayout() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {" "}
      <ScrollToTop />
      <Outlet />
    </div>
  );
}

export default RootLayout;
