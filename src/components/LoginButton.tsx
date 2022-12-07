import { useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, providers, setUser } from "../config/firebase";
import { LookingFor, User } from "../config/types";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

// Button to log in using google.
const LoginButton = () => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);

  // Sign in with google.
  const signInWithGoogle = () => {
    setDisabled(true);
    signInWithPopup(auth, providers.google)
      .then(res => {
        setDisabled(false);
        // Check if the user has a Brown email.
        if (!res.user.email?.endsWith("@brown.edu")) {
          signOut(auth);
        } else if (res.user.metadata.creationTime === res.user.metadata.lastSignInTime) {
          const user: User = {
            email: res.user.email,
            display_name: res.user.displayName || "",
            bio: "",
            preferences: [],
            looking_for: LookingFor.Love,
            admin: false,
            matches: [],
          }
          setUser(user);
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
