import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import palette from "../config/colors";


const items = [
  <Box sx={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", margin: "15px auto", width: "500px", height: "300px", backgroundColor: palette.WHITE, padding: "50px", boxShadow: "0 0 8px 8px rgba(1, 1, 1, 0.2)", borderRadius: "20px" }}>
    <Typography variant="h4">Create your profile!</Typography>
  </Box>,
  <Box sx={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", margin: "15px auto", width: "500px", height: "300px", backgroundColor: palette.WHITE, padding: "20px", boxShadow: "0 0 8px 8px rgba(1, 1, 1, 0.2)", borderRadius: "20px" }}>
    <Typography variant="h4">Search for people to match with!</Typography>
  </Box>,
  <Box sx={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", margin: "15px auto", width: "500px", height: "300px", backgroundColor: palette.WHITE, padding: "20px", boxShadow: "0 0 8px 8px rgba(1, 1, 1, 0.2)", borderRadius: "20px" }}>
    <Typography variant="h4">Choose to full send or not!</Typography>
  </Box>,
  <Box sx={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", margin: "15px auto", width: "500px", height: "300px", backgroundColor: palette.WHITE, padding: "20px", boxShadow: "0 0 8px 8px rgba(1, 1, 1, 0.2)", borderRadius: "20px" }}>
    <Typography variant="h4">Happy Scrambling!</Typography>
  </Box>
];


const Intro = () => {
  return (
    <Box sx={{ height: "100vh", width: "100vw", backgroundColor: "rgba(1, 1, 1, 0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <AliceCarousel mouseTracking items={items} />
    </Box>
  );
};

export default Intro;
