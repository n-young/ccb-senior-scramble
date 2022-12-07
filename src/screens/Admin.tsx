import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
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
          <Typography variant="h4">
            Admin Panel
          </Typography>
          <FormControl>
            <FormLabel>
              Click the button below to make matches!
            </FormLabel>
            <Button sx={{width: "500px"}} variant="contained" onClick={makeMatches}>
              Make Matches
            </Button>
          </FormControl>
          <FormControlLabel
            control={<Checkbox checked={canSignup} onChange={e => handleToggleCanSignup(e.target.checked)} />}
            label="Can sign up"
          />
          <FormControlLabel
            control={<Checkbox checked={canChangePreferences} onChange={e => handleToggleCanChangePreferences(e.target.checked)} />}
            label="Can change preferences"
          />
          <FormControlLabel
            control={<Checkbox checked={canSeeMatches} onChange={e => handleToggleCanSeeMatches(e.target.checked)} />}
            label="Can see matches"
          />
        </Box>
      </Container>
    </>
  );
};

export default Admin;
