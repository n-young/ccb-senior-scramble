import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, providers, setupUser } from "../config/firebase";
import { Button, Container, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

interface Props {}

const LoginButton = (props: Props) => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);

  const signInWithGoogle = () => {
    setDisabled(true);
    signInWithPopup(auth, providers.google)
      .then(res => {
        setDisabled(false);
        if (res.user.email && res.user.displayName)
          setupUser(res.user.email, res.user.displayName)
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
