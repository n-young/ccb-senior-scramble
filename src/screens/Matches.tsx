import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Navbar from "../components/Navbar";
import { auth, getUser } from "../config/firebase";
import { Match } from "../config/types";
import palette from "../config/colors"

const Matches = () => {
  const [matches, setMatches] = useState<Match[]>([])

  useEffect(() => {
    if (auth.currentUser && auth.currentUser.email)
      getUser(auth.currentUser.email).then(user => setMatches(user.matches || []));
  }, [])

  return (
    <>
      <Navbar/>
      <Container>
        <Box sx={{display: "flex", flexDirection: "column", mt: "20px"}}>
          <Typography variant="h4">
            Matches
          </Typography>
          {matches.map(match => (
            <Box sx={{border: `2px solid ${palette.ACCENT}`, borderRadius: "20px", p: "10px 20px"}}>
              <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
                <Typography variant="button" sx={{fontWeight: 800}}>
                  {match.display_name}
                </Typography>
                <Typography variant="overline">
                  {match.email}
                </Typography>
              </Box>
              <Typography>
                A little about them: {match.bio}
              </Typography>
              <Typography>
                Looking for: {match.looking_for}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default Matches;
