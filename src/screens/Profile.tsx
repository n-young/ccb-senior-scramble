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
    <Box sx={{ display: "flex", width: { md: "400px", xs: "250px" }, flexDirection: "row", alignItems: "center", justifyContent: "space-between", margin: "5px 0", padding: "5px 5px 5px 20px", borderRadius: "8px", backgroundColor: "rgba(1, 1, 1, 0.1)" }}>
      <Typography>
        {participants.find(p => p.email == preference)?.display_name}
      </Typography>
      {canChangePreferences && <Button style={{ backgroundColor: palette.ACCENT, borderRadius: "8px", padding: "10px 20px", color: palette.WHITE, }} onClick={remove_func}>Remove</Button>}
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
  const [newHandleInstagram, setNewHandleInstagram] = useState<string>("");
  const [newHandleSnapchat, setNewHandleSnapchat] = useState<string>("");
  const [newHandleFacebook, setNewHandleFacebook] = useState<string>("");
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
      setNewHandleInstagram(user.handleInstagram!)
      setNewHandleSnapchat(user.handleSnapchat!)
      setNewHandleFacebook(user.handleFacebook!)
      setNewFullSending(user.full_sending!)
    });
  }

  // Update the user in the database
  const handleUpdateUser = (e: any) => {
    e.preventDefault();
    if (auth.currentUser && auth.currentUser.email) {
      const newUser: User = {
        email: auth.currentUser.email,
        display_name: newDisplayName,
        pronouns: newPronouns,
        bio: newBio,
        handleInstagram: newHandleInstagram,
        handleSnapchat: newHandleSnapchat,
        handleFacebook: newHandleFacebook,
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
  const updateProfileDisabled = (userVar && newPronouns === userVar.pronouns && newBio === userVar.bio && newHandleInstagram === userVar.handleInstagram && newHandleSnapchat === userVar.handleSnapchat && newHandleFacebook === userVar.handleFacebook && newFullSending === userVar.full_sending)
  const newPrefDisabled = (addingPreference.display_name === "" || preferences.length >= 10 || preferences.includes(addingPreference.email!));

  return (
    <>
      <Navbar />
      <Container>
        <Box sx={{ display: "flex", flexDirection: "column", mt: "40px" }}>
          <Typography variant="h3">
            Profile
          </Typography>
          <Typography variant="overline">
            Let's get you looking pretty!
          </Typography>
        </Box>
      </Container>

      <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: { md: "500px", xs: "300px" } }}>
          {userVar && <img style={{ width: "200px", borderRadius: "1000px", margin: "20px" }} src={userVar.pic} referrerPolicy="no-referrer" />}
          <Box sx={{width: "350px", textAlign: "center"}}>
            <Typography variant="overline">
              Change your profile picture by changing your Google Account picture
            </Typography>
          </Box>
          <br/>
          <form style={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "10px" }}>
            <FormControl>
              <FormLabel>Display Name:</FormLabel>
              <TextField sx={{ width: { md: "500px", xs: "300px" } }} type="text" value={newDisplayName} disabled />
            </FormControl>
            <FormControl>
              <FormLabel>Pronouns:</FormLabel>
              <TextField sx={{ width: { md: "500px", xs: "300px" } }} type="text" value={newPronouns} onChange={(e) => setNewPronouns(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Bio:</FormLabel>
              <TextField sx={{ width: { md: "500px", xs: "300px" } }} multiline minRows={5} value={newBio} onChange={(e) => setNewBio(e.target.value)} />
            </FormControl>
            <FormLabel>Social Media:</FormLabel>
            <FormControl sx={{flexDirection: { md: "row", xs: "column" }, gap: { md: "30px", xs: "0" }, alignItems: { md: "center", xs: "flex-start" }, justifyContent: "center"}}>
              <FormLabel>Instagram:</FormLabel>
              <TextField sx={{ width: "300px" }} placeholder="@" value={newHandleInstagram} onChange={(e) => setNewHandleInstagram(e.target.value)} />
            </FormControl>
            <FormControl sx={{flexDirection: { md: "row", xs: "column" }, gap: { md: "30px", xs: "0" }, alignItems: { md: "center", xs: "flex-start" }, justifyContent: "center"}}>
              <FormLabel>Snapchat:</FormLabel>
              <TextField sx={{ width: "300px" }} placeholder="@" value={newHandleSnapchat} onChange={(e) => setNewHandleSnapchat(e.target.value)} />
            </FormControl>
            <FormControl sx={{flexDirection: { md: "row", xs: "column" }, gap: { md: "30px", xs: "0" }, alignItems: { md: "center", xs: "flex-start" }, justifyContent: "center"}}>
              <FormLabel>Facebook:</FormLabel>
              <TextField sx={{ width: "300px" }} placeholder="Display Name" value={newHandleFacebook} onChange={(e) => setNewHandleFacebook(e.target.value)} />
            </FormControl>
          </form>
        </Box>
      </Container>

      <Container>
        <Box sx={{ display: "flex", flexDirection: "column", mt: "40px" }}>
          <Typography variant="h3">
            Preferences
          </Typography>
          <Typography variant="overline">
            Who's got you down bad?
          </Typography>
        </Box>
      </Container>

      <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Box sx={{ display: "flex", flexDirection: "column", mb: "200px", justifyContent: "center", alignItems: "center", width: "500px" }}>
          {canChangePreferences && <form onSubmit={handleAddPref} style={{ display: "flex", flexDirection: "column", margin: "10px" }}>
            <Autocomplete
              sx={{ width: { md: "500px", xs: "300px" } }}
              options={participants.filter(p => p.email !== userVar.email && preferences && !preferences.includes(p.email!))}
              getOptionLabel={option => option.display_name!}
              renderInput={(params) => <TextField {...params} label="Preference" />}
              value={addingPreference}
              onChange={(_, val) => val && setAddingPreference(val)}
            />
          </form>}
          {userVar && preferences && preferences.map((preference: string) => (
            <PreferenceRow key={preference} preference={preference} canChangePreferences={canChangePreferences} remove_func={() => handleRemovePref(preference)} />
          ))}
          <Box>
            <Typography variant="h5" sx={{ width: { md: "500px", xs: "300px" }, mt: "20px"}}>
              Full send:
            </Typography>
            <FormControlLabel
              sx={{ width: { md: "500px", xs: "300px" } }}
              control={<Checkbox checked={newFullSending} disabled={!canChangePreferences} onChange={() => setNewFullSending((prev) => !prev)} />}
              label="By checking this box, I am opting in for full send. This means that I will be displayed as a potential match to my preferences who have also opted in for full send. Likewise, I will be able to see people who have selected me as their preference and opted in for full send."
            />
          </Box>
          <form onSubmit={handleUpdateUser}>
            <Button style={{ backgroundColor: palette.ACCENT, textTransform: "capitalize" }} sx={{ width: { md: "500px", xs: "300px" }, mt: "20px" }} variant="contained" type="submit" disabled={updateProfileDisabled}>
              Save Profile
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Profile;
