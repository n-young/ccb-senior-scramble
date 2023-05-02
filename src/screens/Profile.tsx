import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Navbar from "../components/Navbar";
import { auth, addPreference, removePreference, getUser, updateUser, getFlag } from "../config/firebase";
import { User, Flag } from "../config/types"
import { participants } from "../config/participants";
import palette from "../config/colors";

type PreferenceProps = {
  preference: string;
  canChangePreferences: boolean;
  remove_func: () => void;
}
const PreferenceRow = ({ preference, canChangePreferences, remove_func }: PreferenceProps) => {
  return (
    <Box style={{ display: "flex", width: "400px", flexDirection: "row", alignItems: "center", justifyContent: "space-between", margin: "5px 0", padding: "5px 5px 5px 20px", border: `2px solid ${palette.ACCENT}`, borderRadius: "30px" }}>
      <Typography>
        {preference}
      </Typography>
      {canChangePreferences && <Button style={{ backgroundColor: palette.ACCENT, borderRadius: "100px", padding: "10px 20px", color: palette.WHITE, }} onClick={remove_func}>Remove</Button>}
    </Box>
  )
}

const Profile = () => {
  // Real variables
  const [userVar, setUserVar] = useState<any>(null);
  const [preferences, setPreferences] = useState<string[]>([]);

  const [canChangePreferences, setCanChangePreferences] = useState<boolean>(false);

  // Profile form
  const [newDisplayName, setNewDisplayName] = useState<string>("");
  const [newPronouns, setNewPronouns] = useState<string>("");
  const [newBio, setNewBio] = useState<string>("");
  const [newHandle, setNewHandle] = useState<string>("");
  const [newFullSending, setNewFullSending] = useState<boolean>(false);

  // New preference form
  const [addingPreference, setAddingPreference] = useState<User>({ display_name: "" });

  // Refresh the user if we are logged in
  useEffect(() => {
    if (auth.currentUser && auth.currentUser.email) {
      refreshUser();
    }
  }, []);

  // See if we can change prefs
  useEffect(() => {
    getFlag(Flag.CanChangePreferences).then(res => {
      setCanChangePreferences(res);
    })
  }, []);

  // Grab the user from the database
  const refreshUser = () => {
    getUser(auth.currentUser!.email!).then(user => {
      setUserVar(user);
      setPreferences(user.preferences!);
      setNewDisplayName(user.display_name!);
      setNewPronouns(user.pronouns!);
      setNewBio(user.bio!);
      setNewHandle(user.handle!)
      setNewFullSending(user.full_sending!)
    });
  }

  // Update the user in the database
  const handleUpdateUser = (e: any) => {
    e.preventDefault();
    if (auth.currentUser && auth.currentUser.email) {
      const newUser = {
        email: auth.currentUser.email,
        display_name: newDisplayName,
        pronouns: newPronouns,
        bio: newBio,
        handle: newHandle,
        full_sending: newFullSending,
      }
      updateUser(newUser);
      refreshUser();
    }
  }

  // Add a preference to the database
  const handleAddPref = (e: any) => {
    e.preventDefault();
    if (auth.currentUser?.email && addingPreference) {
      const preference = addingPreference.email;
      addPreference(auth.currentUser?.email, preference!)
        .catch(e => console.log(e));
      setPreferences([...preferences, preference!])
      setAddingPreference({ display_name: "" });
    }
  }

  // Remove a preference fro mthe database
  const handleRemovePref = (preference: string) => {
    removePreference(auth.currentUser?.email!, preference);
    setPreferences(preferences.filter(x => x !== preference))
  }

  // Helpers for what to render
  const updateProfileDisabled = (userVar && newPronouns === userVar.pronouns && newBio === userVar.bio && newHandle === userVar.handle && newFullSending === userVar.full_sending)
  const newPrefDisabled = (addingPreference.display_name === "" || preferences.length >= 10 || preferences.includes(addingPreference.email!));

  return (
    <>
      <Navbar />
      <Container sx={{ display: "flex", flexDirection: {md: "row", xs: "column"}, alignItems: "flex-start", gap: "50px" }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "50px 0" }}>
          <Typography variant="h3" style={{ color: palette.ACCENT }}>
            Profile
          </Typography>
          {userVar && <img style={{ width: "200px", borderRadius: "1000px", margin: "20px" }} src={userVar.pic} referrerPolicy="no-referrer" />}
          <form onSubmit={handleUpdateUser} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <FormControl>
              <FormLabel>Display Name:</FormLabel>
              <TextField sx={{ width: "500px" }} type="text" value={newDisplayName} disabled />
            </FormControl>
            <FormControl>
              <FormLabel>Pronouns:</FormLabel>
              <TextField sx={{ width: "500px" }} type="text" value={newPronouns} onChange={(e) => setNewPronouns(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Bio:</FormLabel>
              <TextField sx={{ width: "500px" }} multiline minRows={5} value={newBio} onChange={(e) => setNewBio(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Social Media Handle:</FormLabel>
              <TextField sx={{ width: "500px" }} value={newHandle} onChange={(e) => setNewHandle(e.target.value)} />
            </FormControl>
            <FormControlLabel
              control={<Checkbox checked={newFullSending} onChange={() => setNewFullSending((prev) => !prev)} />}
              label="Full Sending?"
            />
            <Button style={{ backgroundColor: palette.ACCENT }} sx={{ width: "500px", mt: "10px" }} variant="contained" type="submit" disabled={updateProfileDisabled}>
              Update Profile
            </Button>
          </form>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", margin: "50px 0", alignItems: "center", justifyContent: "center", }}>
          <Typography variant="h3" style={{ color: palette.ACCENT }}>
            Preferences
          </Typography>
          {canChangePreferences && <form onSubmit={handleAddPref} style={{ display: "flex", flexDirection: "column", margin: "50px" }}>
            <Autocomplete
              sx={{ width: "500px" }}
              options={participants.filter(p => p.email !== userVar.email && !preferences.includes(p.email!))}
              getOptionLabel={option => option.display_name!}
              renderInput={(params) => <TextField {...params} label="Preference" />}
              value={addingPreference}
              onChange={(_, val) => val && setAddingPreference(val)}
            />
            <Button sx={{ width: "500px", mt: "10px" }} variant="contained" type="submit" disabled={newPrefDisabled}>
              Add Preference
            </Button>
          </form>}
          {userVar && preferences && preferences.map((preference: string) => (
            <PreferenceRow key={preference} preference={preference} canChangePreferences={canChangePreferences} remove_func={() => handleRemovePref(preference)} />
          ))}
        </Box>
      </Container>
    </>
  );
};

export default Profile;
