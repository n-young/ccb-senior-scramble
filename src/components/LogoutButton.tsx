import { useState } from "react";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import palette from "../config/colors";

// Button to log out.
const LogoutButton = () => {
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
    setDisabled(true);
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        setDisabled(false);
      });
  };

  return (
    <div>
      <Button style={{backgroundColor: palette.ACCENT, textTransform: "capitalize", borderRadius: "8px", boxShadow: "none"}} variant="contained" disabled={disabled} onClick={logout}>
        Logout
      </Button>
    </div>
  );
};

export default LogoutButton;
