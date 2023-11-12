// import React, { useState } from "react";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";

// const SearchBar = ({ locations }) => {
//   const [query, setQuery] = useState("");
//   const [filteredLocations, setFilteredLocations] = useState(locations);

//   const handleSearch = (event) => {
//     const searchTerm = event.target.value;
//     setQuery(searchTerm);

//     const filteredResults = locations.filter((location) =>
//       location.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     setFilteredLocations(filteredResults);
//   };

//   const PlacesAutocomplete = ({ setSelected }) => {
//     const {
//       ready,
//       value,
//       suggestions : { status, data },
//       setValue,
//       clearSuggestions,
//     } = usePlacesAutocomplete();

//     const handleSelect = async (address) => {
//       setValue(address, false);
//       clearSuggestions();

//       const results = await getGeocode({ address });
//       const { lat, lng } = await getLatLng(results[0]);
//       setSelected({ lat, lng });
//     };

//     return (
//       <div>
//         <input
//           type="text"
//           placeholder="Search business locations..."
//           value={query}
//           onChange={handleSearch}
//         />
//         <ul>
//           {filteredLocations.map((location, index) => (
//             <li key={index}>{location}</li>
//           ))}
//         </ul>

//         {ready && status === "OK" && (
//           <ul>
//             {data.map(({ place_id, description }) => (
//               <li key={place_id} onClick={() => handleSelect(description)}>
//                 {description}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     );
//   };
// };

// export default SearchBar;

// import React, { useState } from "react";
// import { useLoadScript } from "@react-google-maps/api";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";

// const PlacesAutocomplete = ({ setSelected }) => {
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: "AIzaSyDDh5-81gvbR0DtxHa5Q8ss2-qnq34PGmg",
//   });

//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestions,
//   } = usePlacesAutocomplete();

//   const handleSelect = async (address) => {
//     setValue(address, false);
//     clearSuggestions();

//     const results = await getGeocode({ address });
//     const { lat, lng } = await getLatLng(results[0]);
//     setSelected({ lat, lng });
//   };

//   if (loadError) return "Error loading maps";
//   if (!isLoaded) return "Loading maps";

//   return (
//     <div>
//       <input
//         type="text"
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         placeholder="Search location"
//         disabled={ready}
//       />
//       {status === "OK" && (
//         <ul>
//           {data.map(({ place_id, description }) => (
//             <li key={place_id} onClick={() => handleSelect(description)}>
//               {description}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default PlacesAutocomplete;

// import React, { useState, useEffect } from "react";

// const PlacesAutocomplete = ({ setSelected }) => {
//   const [searchBox, setSearchBox] = useState(null);

//   useEffect(() => {

//     const { isLoaded, loadError } = useLoadScript({
//       googleMapsApiKey: "AIzaSyDDh5-81gvbR0DtxHa5Q8ss2-qnq34PGmg",
//     });

//     if (loadError) return "Error loading maps";
//     if (!isLoaded) return "Loading maps";

//     // Load the Google Maps JavaScript API script
//     const script = document.createElement("script");
//     script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDDh5-81gvbR0DtxHa5Q8ss2-qnq34PGmg&libraries=places`;
//     script.async = true;
//     script.onload = initializeSearchBox;
//     document.head.appendChild(script);

//     // Cleanup function
//     return () => {
//       document.head.removeChild(script);
//     };
//   }, []);

//   const initializeSearchBox = () => {
//     const input = document.getElementById("search-input");
//     const options = {
//       types: ["geocode"], // Adjust as needed
//     };

//     const searchBoxInstance = new window.google.maps.places.SearchBox(
//       input,
//       options
//     );
//     setSearchBox(searchBoxInstance);

//     // Add event listener for when a place is selected
//     searchBoxInstance.addListener("places_changed", handlePlacesChanged);
//   };

//   const handlePlacesChanged = () => {
//     const places = searchBox.getPlaces();
//     if (places.length > 0) {
//       const selectedPlace = places[0];
//       const { lat, lng } = selectedPlace.geometry.location.toJSON();
//       setSelected({ lat, lng });
//     }
//   };

//   return (
//     <div>
//       <input id="search-input" type="text" placeholder="Search location" />
//     </div>
//   );
// };

// export default PlacesAutocomplete;
