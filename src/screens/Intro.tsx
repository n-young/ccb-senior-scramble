import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Navbar from "../components/Navbar";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import palette from "../config/colors";


const items = [
  <Box sx={{ margin: "auto", width: "500px", height: "300px", backgroundColor: palette.WHITE, padding: "10px" }}>
    <Typography variant="h3">Hello!</Typography>
  </Box>
];


const Intro = () => {
  return (
    <Box sx={{ height: "100vh", width: "100vw", backgroundColor: "rgba(1, 1, 1, 0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <AliceCarousel mouseTracking items={items} />
    </Box>
  );
};

export default Intro;
