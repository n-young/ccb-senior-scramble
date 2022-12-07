import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Navbar from "../components/Navbar";
import { auth, getUser, addPreference, removePreference } from "../config/firebase";

type PreferenceProps = {
  email: string;
  remove_func: () => void;
}
const Preference = ({ email, remove_func }: PreferenceProps) => {
  return (
    <Box style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
      <Typography>
        {email}
      </Typography> 
      <Button onClick={remove_func}>X</Button>
    </Box>
  )
}

const Home = () => {
  const [user, setUser] = useState<any>(null);
  const [pref, setPref] = useState<string>("");
  const [fullSend, setFullSend] = useState<boolean>(false);

  const updateUser = () => {
    if (auth.currentUser?.email)
      getUser(auth.currentUser.email).then(res => setUser(res))
  }
  useEffect(updateUser, [])

  const handleAddPref = (e: any) => {
    e.preventDefault()
    if (auth.currentUser?.email && pref) {
      const preference = {
        email: pref,
        full_send: fullSend,
      }
      addPreference(auth.currentUser?.email, preference)
        .catch(e => console.log(e))
      updateUser()
      setPref("")
      setFullSend(false)
    }
  }

  const handleRemovePref = (pref_email: string) => {
    const preference = {
      email: pref,
      full_send: fullSend,
    }
    removePreference(auth.currentUser?.email!, preference)
    updateUser()
  }

  return (
    <>
      <Navbar/>
      <Container>
        <Typography>
          Welcome to CCB Senior Scramble! See your preferences below.
        </Typography>
        {user && user.preferences && user.preferences.map((pref_email: string) => (
          <Preference email={pref_email} remove_func={() => handleRemovePref(pref_email)} />
        ))}
        <form onSubmit={handleUpdateUser} >
          {/* TODO: User details form */}
        </form>
        <form onSubmit={handleAddPref} >
          <TextField type="text" label="Preference Email:" onChange={(e) => setPref(e.target.value)} />
            <FormControlLabel
              control={<Checkbox value={fullSend} onChange={() => setFullSend(!fullSend)} />}
              label="Full Send?"
            />
          <Button type="submit">
            Add Preference
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Home;
