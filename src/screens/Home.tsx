import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Textarea from "@mui/joy/Textarea";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Navbar from "../components/Navbar";
import { auth, addPreference, removePreference, getUser, updateUser, getUsers } from "../config/firebase";
import { User, Preference, LookingFor } from "../config/types"

type PreferenceProps = {
  preference: Preference;
  remove_func: () => void;
}
const PreferenceRow = ({ preference, remove_func }: PreferenceProps) => {
  return (
    <Box style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
      <Typography>
        {preference.email}
      </Typography>
      {preference.full_send && <Typography>(Full Send!)</Typography>}
      <Button onClick={remove_func}>X</Button>
    </Box>
  )
}

const Home = () => {
  // Real variables
  const [userVar, setUserVar] = useState<any>(null);
  const [preferences, setPreferences] = useState<Preference[]>([]);

  // Profile form
  const [newDisplayName, setNewDisplayName] = useState<string>("");
  const [newBio, setNewBio] = useState<string>("");
  const [newLookingFor, setNewLookingFor] = useState<LookingFor>(LookingFor.Love);

  // New preference form
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [addingPreference, setAddingPreference] = useState<User>({display_name: ""});
  const [fullSend, setFullSend] = useState<boolean>(false);

  useEffect(() => {
    if (auth.currentUser && auth.currentUser.email) {
      refreshUser();
      getUsers().then(users => setAllUsers(users));
    }
  }, []);

  const refreshUser = () => {
    getUser(auth.currentUser!.email!).then(user => {
      setUserVar(user);
      setPreferences(user.preferences!);
      setNewDisplayName(user.display_name!);
      setNewBio(user.bio!);
      setNewLookingFor(user.looking_for!);
    });
  }

  const handleUpdateUser = (e: any) => {
    e.preventDefault();
    if (auth.currentUser && auth.currentUser.email) {
      const newUser = {
        email: auth.currentUser.email,
        display_name: newDisplayName,
        bio: newBio,
        looking_for: newLookingFor,
      }
      updateUser(newUser);
      refreshUser();
    }
  }

  const handleAddPref = (e: any) => {
    e.preventDefault();
    if (auth.currentUser?.email && addingPreference) {
      const preference = {
        email: addingPreference,
        full_send: fullSend,
      };
      addPreference(auth.currentUser?.email, preference.email)
        .catch(e => console.log(e));
      setPreferences([...preferences, preference.email])
      setAddingPreference({display_name: ""});
      setFullSend(false);
    }
  }

  const handleRemovePref = (preference: Preference) => {
    removePreference(auth.currentUser?.email!, preference);
    setPreferences(preferences.filter(x => x !== preference))
  }

  const updateProfileDisabled = (userVar && newDisplayName === userVar.display_name && newBio === userVar.bio && newLookingFor === userVar.looking_for)
  const newPrefDisabled = (addingPreference.display_name === "" || preferences.length >= 10 || preferences.map(p => p.email).includes(addingPreference.email));

  return (
    <>
      <Navbar/>
      <Container>
        <Box sx={{display: "flex", flexDirection: "column", mt: "20px"}}>
          <Typography variant="h4">
            Profile
          </Typography>
          <form onSubmit={handleUpdateUser} style={{display: "flex", flexDirection: "column"}}>
            <FormControl>
              <FormLabel>Display Name:</FormLabel>
              <TextField sx={{width: "500px"}} type="text" value={newDisplayName} onChange={(e) => setNewDisplayName(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Bio:</FormLabel>
              <TextField sx={{width: "500px"}} multiline minRows={5} value={newBio} onChange={(e) => setNewBio(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Looking for:</FormLabel>
              <Select sx={{width: "500px"}} value={newLookingFor} onChange={e => setNewLookingFor(e.target.value as LookingFor)}>
                <MenuItem value={LookingFor.Love}>{LookingFor.Love}</MenuItem>
                <MenuItem value={LookingFor.Friendship}>{LookingFor.Friendship}</MenuItem>
                <MenuItem value={LookingFor.Both}>{LookingFor.Both}</MenuItem>
              </Select>
            </FormControl>
            <Button sx={{width: "500px", mt: "10px"}} variant="contained" type="submit" disabled={updateProfileDisabled}>
              Update Profile
            </Button>
          </form>
        </Box>

        <Box sx={{mt: "50px"}}>
          <Typography variant="h4">
            Preferences
          </Typography>
          {userVar && preferences && preferences.map((preference: Preference) => (
            <PreferenceRow key={preference.email} preference={preference} remove_func={() => handleRemovePref(preference)} />
          ))}
          <form onSubmit={handleAddPref} style={{display: "flex", flexDirection: "column"}}>
            <Autocomplete 
              sx={{width: "500px"}}
              options={allUsers}
              getOptionLabel={option => option.display_name!}
              renderInput={(params) => <TextField {...params} label="Preference" />}
              value={addingPreference}
              onChange={(_, val) => val && setAddingPreference(val)}
            />
            <FormControlLabel
              control={<Checkbox value={fullSend} onChange={() => setFullSend(!fullSend)} />}
              label="Full Send?"
            />
            <Button sx={{width: "500px", mt: "10px"}} variant="contained" type="submit" disabled={newPrefDisabled}>
              Add Preference
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Home;
