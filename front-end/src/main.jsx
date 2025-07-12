import { StrictMode } from "react";
import api from "@/services/api.js";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";

api.init();

createRoot(document.getElementById("root")).render(
  <>
    <App />
    <ToastContainer />
  </>
);
