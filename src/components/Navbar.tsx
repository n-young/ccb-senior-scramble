import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Box from "@mui/material/Box"
import { useLocation } from 'react-router-dom'

import LogoutButton from './LogoutButton';
import LoginButton from "./LoginButton";
import { auth, getFlag, getUser } from "../config/firebase";
import { Flag } from '../config/types';
import palette from "../config/colors"

// Navbar.
export default function Navbar() {
  const location = useLocation();
  
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isAdminDone, setIsAdminDone] = useState<boolean>(false);

  const [canSeeMatches, setCanSeeMatches] = useState<boolean>(false);
  const [canSeeMatchesDone, setCanSeeMatchesDone] = useState<boolean>(false);

  const isProfilePath = location.pathname === "/profile";
  const isMatchesPath = location.pathname === "/matches";
  const isAdminPath = location.pathname === "/admin";

  useEffect(() => {
    if (auth.currentUser && auth.currentUser.email) {
      getUser(auth.currentUser.email).then(res => {
        setIsAdmin(res.admin!);
        setIsAdminDone(true);
      });
      getFlag(Flag.CanSeeMatches).then(res => {
        setCanSeeMatches(res);
        setCanSeeMatchesDone(true);
      });
    }
  }, []);

  return (
    <Box sx={{display: "flex", flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between", p: "10px 20px"}}>
      <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", gap: "40px"}}>
        {(isAdminDone && canSeeMatchesDone) && 
          (<>
            {auth.currentUser && <Link to="/profile" style={{color: isProfilePath ? palette.ACCENT : palette.BLACK, textDecoration: "none"}}>Profile</Link>}
            {auth.currentUser && canSeeMatches && <Link to="/matches" style={{color: isMatchesPath ? palette.ACCENT : palette.BLACK, textDecoration: "none"}}>Matches</Link>}
            {auth.currentUser && isAdmin && <Link to="/admin" style={{color: isAdminPath ? palette.ACCENT : palette.BLACK, textDecoration: "none"}}>Admin</Link>}
          </>)
        }
        {auth.currentUser ? <LogoutButton/> : <LoginButton/>}
      </Box>
    </Box>
  );
}
