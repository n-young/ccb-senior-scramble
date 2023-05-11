import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Navbar from "../components/Navbar";
import { auth, getUser } from "../config/firebase";
import { User } from "../config/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faInstagramSquare, faSnapchatSquare, faFacebookSquare } from '@fortawesome/free-brands-svg-icons'

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

        {done && !(mutualMatches.length || otherMatches.length) && <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
          <img style={{borderRadius: "100px", margin: "50px"}} src="https://cdn.dribbble.com/users/2422127/screenshots/6609950/ezgif.com-resize__5_.gif"></img>
          <Typography variant="body1">
            Aw, no matches? Don't take it too personally. Either your secret admirers haven't been brave enough to full-send it, or perhaps the universe's mysterious forces are at play, and craft the perfect meet-cute situation for you. Who knows, maybe you'll find your bette half at Senior Formal on May 21st from 9pm-1am at the BankNewport City Center? There's only one way to find out. We'll see you there!
          </Typography>
        </Box>}

        {done && (mutualMatches.length || otherMatches.length) && <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
          <Typography variant="body1">
            Congratulations! You're a winner, and you've just been matched with someone who's witty, charming, and devastatingly attractive. We encourage you to reach out to each other on social media to begin your new friendship or potential romance.
          </Typography>
          <Typography variant="body1">
            But wait, isn't Senior Formal tomorrow 5/21 from 9pm-1am at the BankNewport City Center? It seems like the perfect opportunity to take your platonic or romantic date and dance the night away. Don't forget to immortalise the start of your beautiful connection at our photo booth!
          </Typography>
        </Box>}

        {done && !!mutualMatches.length && 
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
          <Typography variant="h5">
            Mutual Matches
          </Typography>
          <Box sx={{display: "flex", flexDirection: {md: "row", xs: "column"}, overflow: "auto", maxWidth: "80vw", padding: "25px", gap: "25px"}}>
            {mutualMatches.map((match, idx) => (
              <>
                <Match other={false} key={idx} match={match} />
              </>
            ))}
          </Box>
        </Box>}

        {done && !!otherMatches.length && 
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", mt: "20px", mb: "100px"}}>
          <Typography variant="h5">
            Other Matches
          </Typography>
          <Box sx={{display: "flex", flexDirection: {md: "row", xs: "column"}, overflow: "auto", maxWidth: "80vw", padding: "25px", gap: "25px"}}>
            {otherMatches.map((match, idx) => (
              <>
                <Match other={true} key={idx} match={match} />
              </>
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
        <FontAwesomeIcon icon={faEnvelope} /> {realMatch.email}
      </Typography>
      <Typography variant="body2">
        {realMatch.handleInstagram && <><FontAwesomeIcon icon={faInstagramSquare} /> {realMatch.handleInstagram}</>}
      </Typography>
      <Typography variant="body2">
        {realMatch.handleSnapchat && <><FontAwesomeIcon icon={faSnapchatSquare} /> {realMatch.handleSnapchat}</>}
      </Typography>
      <Typography variant="body2">
        {realMatch.handleFacebook && <><FontAwesomeIcon icon={faFacebookSquare} /> {realMatch.handleFacebook}</>}
      </Typography>
    </Box>) : <></>
}

export default Matches;
