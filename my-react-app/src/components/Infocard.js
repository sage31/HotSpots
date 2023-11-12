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

const Infocard = () => {

  const containerStyle = {
    // Add any additional styling if needed
  };


  return (
    <div style={containerStyle}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Suggested Location
          </Typography>
          <Typography variant="h5" component="div">
            address
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            neighborhood
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
          <Typography variant="body2">
            description
          </Typography>
          <Typography variant="body2">score</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Infocard;
