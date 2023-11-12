import React, { useState } from "react";
import Autocomplete from "./Autocomplete";
import { Divide as Hamburger } from "hamburger-react";
import Infocard from "./Infocard";

const Sidebar = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [sidebarOpen, setSideBarOpen] = useState(true);
  const [showInfoCard, setShowInfoCard] = useState(false); // State to control Infocard visibility
  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  const handleAnalyzeClick = () => {
    setShowInfoCard(!showInfoCard); // Toggle the visibility of the Infocard
  };

  // var sidebarClass = "sidebar rounded text-center";
  // if (sidebarOpen) {
    // sidebarClass = "sidebar open rounded text-center";
  // }
  var sidebarClass = "sidebar rounded text-center";
  if (sidebarOpen) {
    sidebarClass += " open";
  }


  return (
    <div className={sidebarClass}>
      <span className="text-center text-3xl mr-2 mt-5">HotSpots</span>
      <img
        width="70px"
        className="mx-auto inline"
        src="https://i.pinimg.com/736x/54/ad/00/54ad00fc993edefe14bf71c24b01bf2f.jpg"
      />
      <Autocomplete
        onSelect={(location) => {
          setSelectedLocation(location);
          setShowInfoCard(true); // Show Infocard when a location is selected
          console.log("Selected Location:", location);
        }}
      />
      <div onClick={handleViewSidebar} className="sidebar-toggle">
        <Hamburger rounded toggled={sidebarOpen} toggle={setSideBarOpen} />
      </div>
      <button onClick={handleAnalyzeClick} className="p-4 flex flex-col items-center">
        <p>Analyze This Region</p>
        <img
          width="10px"
          className="mx-auto"
          src="https://cdn1.iconfinder.com/data/icons/arrows-vol-1-5/24/dropdown_arrow2-512.png"
          alt="Dropdown arrow"
        />
      </button>
      {showInfoCard && selectedLocation && (
        <Infocard
          title={selectedLocation.title}
          address={selectedLocation.address}
          neighborhood={selectedLocation.neighborhood}
          description={selectedLocation.description}
          score={selectedLocation.score}
        />
      )}
    </div>
  );
};
export default Sidebar;
