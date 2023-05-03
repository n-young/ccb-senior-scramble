import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Navbar from "../components/Navbar";
import palette from "../config/colors";
import RegisterSVG from "../components/RegisterSVG";
import MatchSVG from "../components/MatchSVG";
import ResultsSVG from "../components/ResultsSVG";

const boxStyle = {
  placeSelf: "stretch",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start"
}

const Home = () => {
  return (
    <>
      <Box sx={{ display: "flex", height: "100%", flexDirection: { md: "row", xs: "column" }, alignItems: "stretch" }}>
        <Box sx={{ display: "flex", justifyContent: "center",  backgroundImage: `linear-gradient(to bottom right, ${palette.ACCENTBRIGHT}, ${palette.ACCENTDARK});`, color: palette.WHITE }}>
          <Box sx={{ padding: "40px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "20px", background: "url(confetti.png)", backgroundSize: "cover" }}>
            <Typography variant="h2" fontWeight={600}>
              Seni<span style={{ fontSize: "66.6%" }}>♥</span>r Scramble
            </Typography>
            <Typography variant="h4" sx={{ fontStyle: "italic" }}>
              Full Send Edition {"------>"}
            </Typography>
            <Typography variant="body1">
                Senior Scramble is CCB's asynchronous matchmaking event to give seniors a last chance to find friendship and/or love before they graduate.
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}>
          <Navbar />
          <Box sx={{ height: "100%", padding: "40px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "40px" }}>
            <Typography variant="h4">
              Timeline
            </Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 3fr", gridTemplateRows: "repeat(3, 1fr)", gap: "20px", placeItems: "center" }}>
              <RegisterSVG />
              <Box sx={boxStyle}>
                <Typography variant="h5">Register</Typography>
                <Typography variant="body2">May 1 - May 10</Typography>
                <br/>
                <Typography variant="body2">Preliminary sign-up form is released</Typography>
              </Box>
              <MatchSVG />
              <Box sx={boxStyle}>
                <Typography variant="h5">Match</Typography>
                <Typography variant="body2">May 12 - May 19</Typography>
                <br/>
                <Typography variant="body2">Choose 10 participants that you'd like to match with!</Typography>
              </Box>
              <ResultsSVG />
              <Box sx={boxStyle}>
                <Typography variant="h5">Results</Typography>
                <Typography variant="body2">May 20</Typography>
                <br/>
                <Typography variant="body2">Matches are released!</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;