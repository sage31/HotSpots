import logo from "./logo.svg";
import React, { useState } from "react";
import "./App.css";
import "./output.css";
import "./components/Sidebar.js";

function App() {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const handleViewSidebar = () => {
    setSideBarOpen(sidebarOpen);
  };
  return (
    <>
      <div className="text-xl text-right mr-3 mt-3">HotSpots</div>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
    </>
  );
}

export default App;
