import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Box from "@mui/material/Box"
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import LogoutButton from './LogoutButton';
import LoginButton from "./LoginButton";
import { auth, getFlag, getUser } from "../config/firebase";
import { Flag } from '../config/types';

// Navbar.
export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [canSeeMatches, setCanSeeMatches] = useState<boolean>(false);

  useEffect(() => {
    if (auth.currentUser && auth.currentUser.email) {
      getUser(auth.currentUser.email).then(res => setIsAdmin(res.admin!));
      getFlag(Flag.CanSeeMatches).then(res => setCanSeeMatches(res));
    }
  }, []);

  return (
    <Box style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
      <Typography>
        CCB Senior Scramble
      </Typography>
      <Link to="/">Home</Link>
      {canSeeMatches && <Link to="/matches">Matches</Link>}
      {isAdmin && <Link to="/admin">Admin</Link>}
      <Toolbar>
        {auth.currentUser ? <LogoutButton/> : <LoginButton/>}
      </Toolbar>
    </Box>
  );
}