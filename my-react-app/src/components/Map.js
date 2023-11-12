import React, { useState } from "react";
import { GOOGLE_ROADMAP, GoogleMap } from "@carto/react-basemaps";
import { WebMercatorViewport } from "viewport-mercator-project";
import { PolygonLayer } from "@deck.gl/layers";
import Autocomplete from "./Autocomplete";
import { Divide as Hamburger } from "hamburger-react";
import Infocard from "./Infocard";

const defaultLat = 37.7749;
const defaultLong = -122.4194;
const googleApiKey = "AIzaSyDDh5-81gvbR0DtxHa5Q8ss2-qnq34PGmg";

const rawCoords =
  "37.8079676628113 -122.44247674942 37.806658744812 -122.435846328735 37.8071093559265 -122.427778244019 37.8076028823853 -122.420418262482 37.8083109855652 -122.410826683044 37.80592918396 -122.404260635376 37.803955078125 -122.401685714722 37.8139543533325 -122.361130714417 37.8081178665161 -122.367224693298 37.7872395515442 -122.384626865387 37.7835702896118 -122.388296127319 37.7736568450928 -122.381880283356 37.7697730064392 -122.383511066437 37.7599239349365 -122.382202148438 37.7516198158264 -122.38050699234 37.7458047866821 -122.381730079651 37.7367496490479 -122.379434108734 37.7335953712463 -122.382287979126 37.7156352996826 -122.383575439453 37.7111506462097 -122.386450767517 37.6781058311462 -122.388253211975 37.6592659950256 -122.396900653839 37.6379156112671 -122.404561042786 37.63014793396 -122.434430122375 37.6320147514343 -122.436769008636 37.6430869102478 -122.45726108551 37.6264786720276 -122.488095760345 37.6753377914429 -122.490391731262 37.6960873603821 -122.494511604309 37.7078461647034 -122.498159408569 37.7217292785645 -122.501270771027 37.7302050590515 -122.506506443024 37.737865447998 -122.506463527679 37.7452898025513 -122.507450580597 37.7527141571045 -122.508437633514 37.7640223503113 -122.510454654694 37.7712750434875 -122.511162757874 37.7764248847961 -122.511677742004 37.7827119827271 -122.511312961578 37.7840852737427 -122.504403591156 37.7864027023315 -122.492172718048 37.7894282341003 -122.486035823822 37.7942776679993 -122.480413913727 37.8018522262573 -122.477130889893 37.8095126152039 -122.47740983963 37.9036688804626 -122.519595623016 37.9055786132813 -122.515454292297 37.8033328056335 -122.454042434692 37.8070449829102 -122.447519302368 37.8079676628113 -122.44247674942";

  function formatData(inputString) {
  const pairs = inputString.trim().split(/\s+/); // Assuming pairs are separated by whitespace
  const formattedData = [];

  for (let i = 0; i < pairs.length; i += 2) {
    const firstNumber = parseFloat(pairs[i], 10);
    const secondNumber = parseFloat(pairs[i + 1], 10);

    if (!isNaN(firstNumber) && !isNaN(secondNumber)) {
      formattedData.push([secondNumber, firstNumber]);
    }
  }

  return formattedData;
}
//const data = formatData(rawCoords);
const example = [
  {
    contour: formatData(rawCoords), // Use the formatted coordinates
    properties: {}, // You can add properties if needed
  },
];

// options allows passing extra MapOptions (see: https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions)
const basemap = {
  options: { mapTypeId: GOOGLE_ROADMAP, streetViewControl: true },
};

var deckLayers = []; // array of deck.gl layers

const Map = (params) => {
  const [mapState, setMapState] = useState({
    viewstate: { longitude: defaultLong, latitude: defaultLat, zoom: 10 },
    layers: [],
    topLeftCorner: { longitude: 0, latitude: 0 },
    bottomRightCorner: { longitude: 0, latitude: 0 },
  });
  const [showInfoCards, setShowInfoCards] = useState(false); // State to control Infocard visibility
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [sidebarOpen, setSideBarOpen] = useState(true);
  const handleAnalyzeRegion = () => {
    console.log("hello");
    const layer = new PolygonLayer({
      id: "polygon-layer",
      data: example,
      pickable: true,
      stroked: true,
      filled: true,
      wireframe: true,
      lineWidthMinPixels: 1,
      getPolygon: (d) => d.contour,
      getFillColor: [255, 140, 0],
      getLineColor: [80, 80, 80],
      getLineWidth: 1,
    });
    console.log(example);
    setMapState({
      viewstate: mapState.viewstate,
      layers: [layer],
      topLeftCorner: mapState.topLeftCorner,
      bottomRightCorner: mapState.bottomRightCorner,
    });
    deckLayers = [layer];
  };
  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  var sidebarClass = "sidebar rounded text-center";
  if (sidebarOpen) {
    sidebarClass = "sidebar open rounded text-center";
  }

  const onResize = (updatedViewState) => {
    console.log(deckLayers);

    const newLong = updatedViewState.viewState.longitude;
    const newLat = updatedViewState.viewState.latitude;
    const newZoom = updatedViewState.viewState.zoom;
    const newPitch = updatedViewState.viewState.pitch;

    const getWindowDimensions = () => {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    };
    const { width, height } = getWindowDimensions();

    const viewport = new WebMercatorViewport({
      width: width,
      height: height,
      longitude: newLong,
      latitude: newLat,
      zoom: newZoom,
      pitch: newPitch,
    });

    let newTopLeft = viewport.unproject([0, 0]);
    let newBottomRight = viewport.unproject([viewport.width, 0]);
    setMapState({
      viewstate: updatedViewState.viewState,
      layers: deckLayers,
      topLeftCorner: newTopLeft,
      bottomRightCorner: newBottomRight,
    });
  };

  return (
    <>
      <GoogleMap
        apiKey={googleApiKey}
        viewState={mapState.viewstate}
        basemap={basemap}
        layers={mapState.layers}
        onViewStateChange={onResize}
      />
      {/* Sidebar stuff */}
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
          }}
        />
        <div onClick={handleViewSidebar} className="sidebar-toggle">
          <Hamburger rounded toggled={sidebarOpen} toggle={setSideBarOpen} />
        </div>
        <button
          onClick={handleAnalyzeRegion}
          className="p-4 flex flex-col items-center"
        >
          <p className>Analyze This Region</p>
          <img
            width="10px"
            className="mx-auto"
            src="https://cdn1.iconfinder.com/data/icons/arrows-vol-1-5/24/dropdown_arrow2-512.png"
            alt="Dropdown arrow"
          />
        </button>
        {showInfoCards && selectedLocation && (
          <Infocard
            title={selectedLocation.title}
            address={selectedLocation.address}
            neighborhood={selectedLocation.neighborhood}
            description={selectedLocation.description}
            score={selectedLocation.score}
          />
        )}
      </div>
    </>
  );
};

export default Map;
