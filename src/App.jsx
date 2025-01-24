import {} from "react";
import "./App.css";
import Navbar from "./Component/Navbar";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="px-6">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
