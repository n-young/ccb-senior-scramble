import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from '@mui/material/Modal';

import Navbar from "../components/Navbar";
import palette from "../config/colors";
import RegisterSVG from "../components/RegisterSVG";
import MatchSVG from "../components/MatchSVG";
import ResultsSVG from "../components/ResultsSVG";

const boxStyle = {
  placeSelf: "stretch",
  display: "flex",
  flexDirection: "column",
  alignItems: { md: "flex-start", xs: "center" }
}

const Home = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: "40px",
    p: 5,
  };

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
              It's the final scramble. With a catch. This is CCB Senior Scramble: Full Send Edition. 
            </Typography>
            <Typography variant="body1">
                <a style={{textDecoration: "underline", cursor: "pointer"}} onClick={handleOpen}>Read more!</a>
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}>
          <Box sx={{ display: "flex", justifyContent: {xs: "center", md: "flex-end"}, mt: { xs: "30px", md: "0px" } }}>
            <Navbar />
          </Box>
          <Box sx={{ height: "100%", padding: "40px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "40px" }}>
            <Typography variant="h4">
              Timeline
            </Typography>
            <Box sx={{ display: { md: "grid", xs: "flex" }, flexDirection: "column", gridTemplateColumns: "1fr 3fr", gridTemplateRows: "repeat(3, 1fr)", gap: "20px", placeItems: "center" }}>
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
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Typography variant="h5">
            What is the CCB Senior Scramble?
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Senior Scramble is CCB's asynchronous matchmaking event to give seniors a last chance to find friendship and/or love before they graduate. Seniors who sign up for Scramble will have their names on the list of eligible participants. Participants can then log into our website and submit up to 10 names of people who they would want to match with. Participants who put each other's name down will be considered as a “match” and will be informed of their matches by logging onto the website on May 20th. 
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            In this special edition of Scramble, get ready to "full send" it! You can opt in for the “full send” option after picking your matches, which means that you will be able to see the names of people who put your name down, regardless of whether you match with them or not. The catch? The participants you put down will also see that you put their name down. It's a chance to show your interest without holding back. 
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Please contact classboard@brown.edu for any questions or concerns
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default Home;
