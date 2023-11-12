import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// const Infocard = () => {
//   const [data, setData] = useState([]);

//   const containerStyle = {
//     // Add any additional styling if needed
//   };

//   useEffect(() => {
//     // Fetch data from your backend API
//     fetch("https://your-backend-api.com/data")
//       .then((response) => response.json())
//       .then((data) => setData(data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []); // The empty dependency array ensures the effect runs only once, similar to componentDidMount

//   // Assuming 'item' is a specific data structure you expect in your fetched data
//   const item = data[0]; // You might want to adjust this based on your data structure

//   return (
//     <div style={containerStyle}>
//       <Card sx={{ minWidth: 275 }}>
//         <CardContent>
//           <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//             Suggested Location
//           </Typography>
//           <Typography variant="h5" component="div">
//             address={item.address}
//           </Typography>
//           <Typography sx={{ mb: 1.5 }} color="text.secondary">
//             neighborhood={item.neighborhood}
//           </Typography>
//           <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
//           <Typography variant="body2">
//             description={item.description}
//           </Typography>
//           <Typography variant="body2">score={item.score}</Typography>
//         </CardContent>
//         <CardActions>
//           <Button size="small">Learn More</Button>
//         </CardActions>
//       </Card>
//     </div>
//   );
// };

const Infocard = ({ title, address, neighborhood, description, score }) => {
  const containerStyle = {
    // Add any additional styling if needed
    borderRadius: "5px",
    // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    padding: "20px",
    textAlign: "center",
    width: "25vw",
  };

  return (
    <div style={containerStyle}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Suggested Location
          </Typography>
          <Typography variant="h5" component="div">
            {address}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {neighborhood}
          </Typography>
          {/* <Typography variant="body2">{description}</Typography> */}
          <Typography variant="h5" component="div">
            {score}
          </Typography>
        </CardContent>

        {/* <div className="mx-auto flex items-center justify-center">
          <CardActions sx={{ textAlign: "center" }}>
            <Button size="small">Learn More</Button>
          </CardActions>
        </div> */}
      </Card>
    </div>
  );
};


export default Infocard;

// class App extends React.Component {
//   state = {
//     open: false,
//   };
//   handleClick = () => {
//     if (this.state.open) {
//       this.setState({
//         open: false,
//       });
//     } else {
//       this.setState({
//         open: true,
//       });
//     }
//   };
//   render() {
//     return (
//       <div
//         className={"container " + (this.state.open ? "expand" : "")}
//         onClick={this.handleClick}
//       >
//         <div className="upper">
//           <p>June 10</p>
//           <h3>
//             A family saga with a supernatural twist, set in a German town, where
//             the disappearance of two young children exposes
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//               <polygon points="16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9" />
//             </svg>
//           </h3>
//         </div>
//         <div className="lower">
//           <p>June 10</p>
//           <h3>
//             A family saga with a supernatural twist, set in a German town, where
//             the disappearance of two young children exposes...
//           </h3>

//           <p>June 10</p>
//           <h3>
//             A family saga with a supernatural twist, set in a German town, where
//             the disappearance of two young children exposes...
//           </h3>

//           <p>June 10</p>
//           <h3>
//             A family saga with a supernatural twist, set in a German town, where
//             the disappearance of two young children exposes...
//           </h3>

//           <h4>All News</h4>
//         </div>
//       </div>
//     );
//   }
// }

//ReactDOM.render(<App />, document.getElementById("root"));