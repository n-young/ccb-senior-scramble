import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Navbar from "../components/Navbar";

const Login = () => {
  return (
    <>
      <Navbar/>
      <Container>
        <Typography>
          Welcome to the CCB Senior Scramble website!
        </Typography>
        <Typography>
          Be sure to sign up to participate in this year's senior scramble!
        </Typography>
      </Container>
    </>
  );
};

export default Login;
