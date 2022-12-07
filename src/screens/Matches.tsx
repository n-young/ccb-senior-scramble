import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Container";
import Navbar from "../components/Navbar";
import { auth, getUser } from "../config/firebase";
import { Match } from "../config/types";

const Matches = () => {
  const [matches, setMatches] = useState<Match[]>([])

  useEffect(() => {
    if (auth.currentUser && auth.currentUser.email)
      getUser(auth.currentUser.email).then(user => setMatches(user.matches || []));
  }, [])

  return (
    <>
      <Navbar/>
      <Container style={{display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
        {matches.map(match => (
          <Typography>
            {match.display_name}
          </Typography>
        ))}
      </Container>
    </>
  );
};

export default Matches;
