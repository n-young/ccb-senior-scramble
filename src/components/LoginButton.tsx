import { useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, providers, setUser } from "../config/firebase";
import { User } from "../config/types";
import { Button } from "@mui/material";
import { participants } from "../config/participants";
import palette from "../config/colors";

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
        // Check if the user has a Brown email and is a registered participant
        if (!res.user.email?.endsWith("@brown.edu") || !participants.map(p => p.email).includes(res.user.email)) {
          signOut(auth);
        } else if (res.user.metadata.creationTime === res.user.metadata.lastSignInTime) {
          const user: User = {
            email: res.user.email!,
            display_name: participants.find(p => p.email == res.user.email)?.display_name || res.user.displayName || "",
            pronouns: "",
            bio: "",
            handle: "",
            pic: res.user.photoURL || "",
            preferences: [],
            full_sending: false,
            admin: false,
            matches: [],
          }
          setUser(user);
        }
        navigate("/profile");
      })
      .catch((error) => {
        setDisabled(false);
        navigate("/error");
      });
  };

  return (
    <Button style={{backgroundColor: palette.ACCENT, textTransform: "capitalize", borderRadius: "10000px"}} variant="contained" disabled={disabled} onClick={signInWithGoogle}>
      Sign In
    </Button>
  );
};

export default LoginButton;
