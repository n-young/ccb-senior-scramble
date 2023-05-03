import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Navbar from "../components/Navbar";
import { auth, getUser } from "../config/firebase";
import palette from "../config/colors"
import { User } from "../config/types";

const Matches = () => {
  const [done, setDone] = useState<boolean>(false);
  const [matches, setMatches] = useState<string[]>([])

  useEffect(() => {
    if (auth.currentUser && auth.currentUser.email)
      getUser(auth.currentUser.email).then(user => {
        setMatches(user.matches!)
        setDone(true);
      });
  }, [])

  return (
    <>
      <Navbar />
      <Container>
        <Box sx={{ display: "flex", flexDirection: "column", mt: "40px" }}>
          <Typography variant="h3">
            Matches
          </Typography>
          {done && <Typography variant="overline">
            {matches.length ? "Okay, popular!" : "Oh no! You have no matches :("}
          </Typography>}
        </Box>
      </Container>
      {done && <Box sx={{display: "flex", flexDirection: {md: "row", xs: "column"}, overflow: "auto", padding: {md: "100px 200px", xs: "10px"}, gap: "25px"}}>
        {matches.map((match, idx) => (
            <Match key={idx} match={match} />
        ))}
      </Box>}
    </>
  );
};

type MatchProps = {
  match: string;
}
const Match = ({ match }: MatchProps) => {
  const [realMatch, setRealMatch] = useState<User>();

  useEffect(() => {
    getUser(match).then(u => setRealMatch(u));
  }, [match]);

  return realMatch ? (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", borderRadius: "8px", p: "40px", boxShadow: "3px 3px 8px 2px rgba(0, 0, 0, 0.2)" }}>
      <img style={{ width: "150px", borderRadius: "1000px" }} src={realMatch.pic} referrerPolicy="no-referrer" />
      <Typography variant="h4" style={{padding: "10px 0"}}>
        {realMatch.display_name}
      </Typography>
      <Typography variant="caption" color="gray">
        {realMatch.pronouns}
      </Typography>
      <Typography variant="body1" style={{padding: "10px 0"}}>
        {realMatch.bio}
      </Typography>
      <Typography variant="body2">
        Email: {realMatch.email}
      </Typography>
      <Typography variant="body2">
        Social: {realMatch.handle}
      </Typography>
    </Box>) : <></>
}

export default Matches;
