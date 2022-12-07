import * as React from 'react';
import { Link } from "react-router-dom";
import Box from "@mui/material/Box"
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import LogoutButton from './LogoutButton';
import LoginButton from "./LoginButton";
import { auth } from "../config/firebase";

export default function Navbar() {
  return (
    <Box style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
      <Typography>
        CCB Senior Scramble
      </Typography>
      <Link to="/">Home</Link>
      <Link to="/matches">Matches</Link>
      <Link to="/admin">Admin</Link>
      <Toolbar>
        {auth.currentUser ? <LogoutButton/> : <LoginButton/>}
      </Toolbar>
    </Box>
  );
}