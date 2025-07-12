import Navbar from "./navbar";
import Footer from "./footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => (
  <div className="min-h-screen flex flex-col bg-background-page">
    <Navbar />
    <main className="flex-1 pt-24">  <Outlet /></main>
    <Footer />
  </div>
);

export default MainLayout;
