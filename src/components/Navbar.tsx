import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Box from "@mui/material/Box"

import LogoutButton from './LogoutButton';
import LoginButton from "./LoginButton";
import { auth, getFlag, getUser } from "../config/firebase";
import { Flag } from '../config/types';
import palette from "../config/colors"

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
    <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", p: "10px 20px", borderBottom: `2px solid ${palette.ACCENT}`}}>
      <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", ml: "20px"}}>
        <Link to="/login" style={{color: palette.BLACK, textDecoration: "none"}}>
          🐻 CCB Senior Scramble
        </Link>
      </Box>
      <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", gap: "20px"}}>
        <Link to="/" style={{color: palette.BLACK, textDecoration: "none"}}>Home</Link>
        {canSeeMatches && <Link to="/matches" style={{color: palette.BLACK, textDecoration: "none"}}>Matches</Link>}
        {isAdmin && <Link to="/admin" style={{color: palette.BLACK, textDecoration: "none"}}>Admin</Link>}
          {auth.currentUser ? <LogoutButton/> : <LoginButton/>}
      </Box>
    </Box>
  );
}