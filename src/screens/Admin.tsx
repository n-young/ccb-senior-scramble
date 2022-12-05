import React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Navbar from "../components/Navbar";
import { makeMatches } from "../config/firebase";

const Admin = () => {
  return (
    <>
      <Navbar/>
      <Container>
        <Typography>
          Click the button below to make matches!
        </Typography>
        <Button onClick={makeMatches}>
          Make Matches
        </Button>
      </Container>
    </>
  );
};

export default Admin;
