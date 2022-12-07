import { useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, providers, setUser } from "../config/firebase";
import { User } from "../config/types";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const LoginButton = () => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);

  const signInWithGoogle = () => {
    setDisabled(true);
    signInWithPopup(auth, providers.google)
      .then(res => {
        setDisabled(false);
        if (!res.user.email?.endsWith("@brown.edu")) {
          signOut(auth)
        } else if (res.user.email && res.user.displayName) {
          const user: User = {
            email: res.user.email,
            display_name: res.user.displayName,
          }
          setUser(user)
        }
        navigate("/");
      })
      .catch((error) => {
        setDisabled(false);
      });
  };

  return (
    <Button
      startIcon={<GoogleIcon />}
      disabled={disabled}
      variant="contained"
      onClick={signInWithGoogle}
    >
      Sign In
    </Button>
  );
};

export default LoginButton;
