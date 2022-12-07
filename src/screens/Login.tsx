import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Navbar from "../components/Navbar";

const Login = () => {
  return (
    <>
      <Navbar/>
      <Container>
        <Box sx={{display: "flex", flexDirection: "column", mt: "20px"}}>
          <Typography variant="h4">
            Ready to scramble?
          </Typography>
          <Typography>
            Welcome to the CCB Senior Scramble website!
          </Typography>
          <Typography>
            Be sure to sign up to participate in this year's senior scramble!
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Login;
