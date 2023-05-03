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
  const [mutualMatches, setMutualMatches] = useState<string[]>([])
  const [otherMatches, setOtherMatches] = useState<string[]>([])

  useEffect(() => {
    if (auth.currentUser && auth.currentUser.email)
      getUser(auth.currentUser.email).then(user => {
        setMutualMatches(user.matches!.filter(m => user.preferences?.includes(m)));
        setOtherMatches(user.matches!.filter(m => !user.preferences?.includes(m)));
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
            {(mutualMatches.length || otherMatches.length) ? "Okay, popular!" : "Oh no! You have no matches :("}
          </Typography>}
        </Box>

        {done && !!mutualMatches.length && 
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
          <Typography variant="h5">
            Mutual Matches
          </Typography>
          <Box sx={{display: "flex", flexDirection: {md: "row", xs: "column"}, overflow: "auto", padding: "25px", gap: "25px"}}>
            {mutualMatches.map((match, idx) => (
                <Match other={false} key={idx} match={match} />
            ))}
          </Box>
        </Box>}

        {done && !!otherMatches.length && 
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
          <Typography variant="h5">
            Other Matches
          </Typography>
          <Box sx={{display: "flex", flexDirection: {md: "row", xs: "column"}, overflow: "auto", padding: "25px", gap: "25px"}}>
            {otherMatches.map((match, idx) => (
                <Match other={true} key={idx} match={match} />
            ))}
          </Box>
        </Box>}
      </Container>
    </>
  );
};

type MatchProps = {
  match: string;
  other: boolean;
}
const Match = ({ match, other }: MatchProps) => {
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
        Instagram: {realMatch.handleInstagram}
      </Typography>
      <Typography variant="body2">
        Snapchat: {realMatch.handleSnapchat}
      </Typography>
      <Typography variant="body2">
        Facebook: {realMatch.handleFacebook}
      </Typography>
    </Box>) : <></>
}

export default Matches;
