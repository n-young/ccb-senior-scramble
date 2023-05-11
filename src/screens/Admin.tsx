import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import Navbar from "../components/Navbar";
import { makeMatches, getFlag, setFlag } from "../config/firebase";
import { Flag } from "../config/types";

const Admin = () => {
  const [canSignup, setCanSignup] = useState<boolean>(false);
  const [canChangePreferences, setCanChangePreferences] = useState<boolean>(false);
  const [canSeeMatches, setCanSeeMatches] = useState<boolean>(false);

  useEffect(() => {
    getFlag(Flag.CanSignup).then(res => setCanSignup(res));
    getFlag(Flag.CanChangePreferences).then(res => setCanChangePreferences(res));
    getFlag(Flag.CanSeeMatches).then(res => setCanSeeMatches(res));
  }, []);

  const handleToggleCanSignup = (checked: boolean) => {
    setFlag(Flag.CanSignup, checked);
    setCanSignup(checked);
  };

  const handleToggleCanChangePreferences = (checked: boolean) => {
    setFlag(Flag.CanChangePreferences, checked);
    setCanChangePreferences(checked);
  };

  const handleToggleCanSeeMatches = (checked: boolean) => {
    setFlag(Flag.CanSeeMatches, checked);
    setCanSeeMatches(checked);
  };

  return (
    <>
      <Navbar/>
      <Container>
        <Box sx={{display: "flex", flexDirection: "column", mt: "20px"}}>
          <Typography variant="h3">
            Admin Panel
          </Typography>
          <Typography variant="overline">
            You better know what you're doing!
          </Typography>
          <FormControlLabel
            control={<Checkbox checked={canSignup} onChange={e => handleToggleCanSignup(e.target.checked)} />}
            label="Can sign up (does nothing)"
          />
          <FormControlLabel
            control={<Checkbox checked={canChangePreferences} onChange={e => handleToggleCanChangePreferences(e.target.checked)} />}
            label="Can change preferences"
          />
          <FormControlLabel
            control={<Checkbox checked={canSeeMatches} onChange={e => handleToggleCanSeeMatches(e.target.checked)} />}
            label="Can see matches"
          />
          <Button variant="outlined" onClick={makeMatches}>
            Make Matches
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Admin;
