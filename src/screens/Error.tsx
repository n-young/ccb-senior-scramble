import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Navbar from "../components/Navbar";

const Error = () => {
  return (
    <>
      <Navbar/>
      <Container>
        <Box sx={{display: "flex", flexDirection: "column", mt: "40px"}}>
          <Typography variant="h3">
            Error!
          </Typography>
          <Typography variant="body1">
            Uh oh, something went wrong! You're here either because you didn't sign up for the Scramble in time, or because of an internal error. If this isn't what you expected, please let us know!
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Error;
