import React, { useState } from "react";
import { GOOGLE_ROADMAP, GoogleMap } from "@carto/react-basemaps";
import { WebMercatorViewport } from "viewport-mercator-project";
import { PolygonLayer, IconLayer } from "@deck.gl/layers";
import Autocomplete from "./Autocomplete";
import { Divide as Hamburger } from "hamburger-react";
import Infocard from "./Infocard";
import BouncingDotsLoader from "./BouncingLoader";

const defaultLat = 37.7749;
const defaultLong = -122.4194;
const googleApiKey = "AIzaSyDDh5-81gvbR0DtxHa5Q8ss2-qnq34PGmg";

function formatData(inputString) {
  inputString = inputString[0];
  console.log(inputString + "hi");
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
  const [showInfoCards, setShowInfoCards] = useState(false);
  const [cardInfos, setCardInfos] = useState(null); // State to control Infocard visibility
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [sidebarOpen, setSideBarOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleAnalyzeRegion = async () => {
    if (!selectedLocation) return;
    setLoading(true);
    // grab the potential locations
    const getLocationsUrl = "http://localhost:8000/get-locations";

    //if selected location has spaces, replace with a %20
    selectedLocation.replace(" ", "%20");
    let locations = [];
    // console.log(selectedLocation);
    // console.log(mapState.topLeftCorner[1] + ", " + mapState.topLeftCorner[0]);
    // console.log(
    //   mapState.bottomRightCorner[1] + ", " + mapState.bottomRightCorner[0]
    // );
    try {
      const requestOptions = {
        method: "GET",
      };
      const response = await fetch(
        `${getLocationsUrl}/${selectedLocation}/${mapState.topLeftCorner[1]}/${mapState.topLeftCorner[0]}/${mapState.bottomRightCorner[1]}/${mapState.bottomRightCorner[0]}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      locations = await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
    const newSuggestions = await fetch(
      `http://localhost:8000/get-suggestions/37.78729165372433/-122.47979708727777/37.7349752842654/-122.4017769914526`
    );

    let polygons = [];

    const apiUrl = "http://localhost:8000/generate-polygon";

    for (var i = 0; i < locations.length; i++) {
      if (
        locations[i].latitude > mapState.topLeftCorner[1] ||
        locations[i].latitude < mapState.bottomRightCorner[1] ||
        locations[i].longitude > mapState.bottomRightCorner[0] ||
        locations[i].longitude < mapState.topLeftCorner[0]
      ) {
        locations.splice(i, 1);
        i--;
        continue;
      }
      try {
        console.log(i);
        const response = await fetch(
          `${apiUrl}/${locations[i].latitude}/${locations[i].longitude}/5`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        polygons.push({
          contour: formatData(data),
          properties: {},
          name: "Region covered by location: " + i,
          address: "some more info",
        });
        console.log(locations[i].latitude + ", " + locations[i].longitude);
      } catch (error) {
        locations.splice(i, 1);
        i--;
        console.error("Error:", error);
      }
    }

    console.log(JSON.stringify(polygons));
    let newSuggestionsData = await newSuggestions.json();
    console.log("received new: " + JSON.stringify(newSuggestionsData));
    newSuggestionsData = newSuggestionsData.topThreeCoordinates;
    for (i = 0; i < newSuggestionsData.length; i++) {
      const response = await fetch(
        `${apiUrl}/${newSuggestionsData[i].latitude}/${newSuggestionsData[i].longitude}/5`
      );
      const newData = await response.json();
      console.log(newData);
      polygons.push({
        contour: formatData(newData),
        properties: {},
        isNew: true,
        name: "Prospective location" + (i + 1),
        address: newSuggestionsData[i].address,
      });
      locations.push({
        latitude: newSuggestionsData[i].latitude,
        longitude: newSuggestionsData[i].longitude,
        address: newSuggestionsData[i].address,
        score: newSuggestionsData[i].score,
        price: newSuggestionsData[i].price,
      });
    }

    const polyLayer = new PolygonLayer({
      id: "polygon-layer",
      data: polygons,
      pickable: true,
      stroked: true,
      filled: true,
      wireframe: true,
      lineWidthMinPixels: 1,
      getPolygon: (d) => d.contour,
      getFillColor: (d) => [255, d.isNew ? 192 : 0, d.isNew ? 203 : 0, 100],
      getLineColor: [80, 80, 80],
      getLineWidth: 1,
    });

    let newCardInfos = [];
    let locationsData = [];
    for (i = 0; i < locations.length; i++) {
      // if (
      //   locations[i].latitude > mapState.topLeftCorner[1] ||
      //   locations[i].latitude < mapState.bottomRightCorner[1] ||
      //   locations[i].longitude > mapState.bottomRightCorner[0] ||
      //   locations[i].longitude < mapState.topLeftCorner[0]
      // ) {
      //   locations.splice(i, 1);
      //   continue;
      // }
      console.log(locations[i]);
      //if (locations[i].address)
      newCardInfos.push({
        title: "Prospective location " + i,
        address: "Address: " + locations[i].address,
        neighborhood: "Our ranking: " + 10,
        description: "Price: " + locations[i].price,
        score: "Score " + locations[i].score,
        coordinates: [locations[i].longitude, locations[i].latitude],
      });
      //if (locations[i].address)
      locationsData.push({
        name: "Location" + i,
        address: "Address" + i,
        exits: "Exits" + i,
        coordinates: [locations[i].longitude, locations[i].longitude],
      });
    }
    console.log(JSON.stringify(locationsData));
    const ICON_MAPPING = {
      marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
    };
    const iconLayer = new IconLayer({
      id: "icon-layer",
      data: locationsData,
      pickable: true,
      iconAtlas:
        "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png",
      iconMapping: ICON_MAPPING,
      getIcon: (d) => "marker",
      sizeScale: 12,
      getPosition: (d) => d.coordinates,
      getSize: (d) => 5,
      getColor: (d) => [0, 0, 0],
    });
    console.log(JSON.stringify(iconLayer));
    deckLayers = [polyLayer, iconLayer];
    setMapState({
      viewstate: mapState.viewstate,
      layers: deckLayers,
      topLeftCorner: mapState.topLeftCorner,
      bottomRightCorner: mapState.bottomRightCorner,
    });
    setLoading(false);
    setShowInfoCards(true);
    setCardInfos(newCardInfos);
  };

  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  var sidebarClass = "sidebar rounded text-center";
  if (showInfoCards) {
    sidebarClass = "sidebar extended rounded text-center ";
  }
  if (sidebarOpen) {
    sidebarClass = "sidebar open rounded text-center";
    if (showInfoCards) {
      sidebarClass = "sidebar open extended rounded text-center ";
    }
  }

  const onResize = (updatedViewState) => {
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
    let newBottomRight = viewport.unproject([viewport.width, viewport.height]);
    setMapState({
      viewstate: updatedViewState.viewState,
      layers: deckLayers,
      topLeftCorner: newTopLeft,
      bottomRightCorner: newBottomRight,
    });
  };

  const handleListClick = (placeInfo) => {
    setMapState({
      viewstate: {
        longitude: placeInfo.coordinates[0],
        latitude: placeInfo.coordinates[1],
        zoom: 14,
      },
    });
    //do something here
  };

  return (
    <>
      <GoogleMap
        apiKey={googleApiKey}
        viewState={mapState.viewstate}
        basemap={basemap}
        layers={mapState.layers}
        onViewStateChange={onResize}
        getTooltip={({ object }) =>
          object && {
            html: `<h2>${object.name}<h2>\n${object.address}`,
            style: {
              width: "100px",
              backgroundColor: "#fff",
            },
          }
        }
      />
      {/* Sidebar stuff */}
      <div className={sidebarClass}>
        <span className="font-bold text-center text-3xl inline-block mt-3">
          HotSpots
        </span>
        <img
          width="80px"
          className="pb-3 mx-auto inline"
          src="https://i.pinimg.com/736x/54/ad/00/54ad00fc993edefe14bf71c24b01bf2f.jpg"
        />

        <Autocomplete
          onSelect={(location) => {
            setSelectedLocation(location);
          }}
        />
        <div onClick={handleViewSidebar} className="sidebar-toggle bg-gray-100">
          <Hamburger rounded toggled={sidebarOpen} toggle={setSideBarOpen} />
        </div>
        <button
          onClick={handleAnalyzeRegion}
          className={"p-4 flex flex-col items-center w-full"}
        >
          <p className="font-semibold">analyze</p>
          <img
            width="10px"
            className="mx-auto"
            src="https://cdn1.iconfinder.com/data/icons/arrows-vol-1-5/24/dropdown_arrow2-512.png"
            alt="Dropdown arrow"
          />
        </button>
        {loading && <BouncingDotsLoader />}

        {
          <div className="mt-3 h-[70%] overflow-y-auto">
            {showInfoCards && selectedLocation && cardInfos && (
              <>
                <h1 className="mx-auto text-xl w-[90%] bg-gray-100">
                  Current Locations
                </h1>
                <ul>
                  {cardInfos.map((placeInfo, index) => (
                    <li
                      className=""
                      key={index}
                      style={{
                        opacity: showInfoCards ? 1 : 0,
                        transition: "opacity 0.3s ease-in-out",
                      }}
                      onClick={() => handleListClick(placeInfo)}
                    >
                      <Infocard
                        title={placeInfo.title}
                        address={placeInfo.address}
                        neighborhood={placeInfo.neighborhood}
                        description={placeInfo.description}
                        score={placeInfo.score}
                      />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        }
      </div>
    </>
  );
};

export default Map;
