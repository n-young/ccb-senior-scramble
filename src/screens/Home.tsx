import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
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

  const updateUser = () => {
    if (auth.currentUser?.email)
      getUser(auth.currentUser.email).then(res => setUser(res.data()))
  }
  useEffect(updateUser, [])

  const handleAddPref = (e: any) => {
    e.preventDefault()
    if (auth.currentUser?.email && pref) {
      addPreference(auth.currentUser?.email, pref)
        .catch(e => console.log(e))
      updateUser()
    }
  }

  const handleRemovePref = (pref_email: string) => {
    removePreference(auth.currentUser?.email!, pref_email)
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
        <form onSubmit={handleAddPref}>
          <Input type="text" onChange={(e) => setPref(e.target.value)} />
          <Button type="submit">
            Add Preference
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Home;
