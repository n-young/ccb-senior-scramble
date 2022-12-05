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
          Welcome to CCB Senior Scramble! Please log in.
        </Typography>
      </Container>
    </>
  );
};

export default Login;
