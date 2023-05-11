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
import InputAdornment from '@mui/material/InputAdornment';
import Typography from "@mui/material/Typography";
import Navbar from "../components/Navbar";
import { auth, addPreference, removePreference, getUser, updateUser, getFlag } from "../config/firebase";
import { User, Flag } from "../config/types"
import { participants } from "../config/participants";
import palette from "../config/colors";
import Modal from '@mui/material/Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

type PreferenceProps = {
  preference: string;
  canChangePreferences: boolean;
  remove_func: () => void;
}
const PreferenceRow = ({ preference, canChangePreferences, remove_func }: PreferenceProps) => {
  return (
    <Box sx={{ display: "flex", width: { md: "400px", xs: "250px" }, height: "45px", flexDirection: "row", alignItems: "center", justifyContent: "space-between", margin: "5px 0", padding: "10px 10px 10px 20px", borderRadius: "8px", backgroundColor: "rgba(1, 1, 1, 0.05)", m:1.5}}>
      <Typography>
        {participants.find(p => p.email === preference)?.display_name}
      </Typography>
      {canChangePreferences &&
        <a id='clickable' onClick={remove_func}>
        <FontAwesomeIcon icon={faTimesCircle} color={palette.ACCENT} size="2x"></FontAwesomeIcon>
        </a>}
      {/* {canChangePreferences && <Button style={{ backgroundColor: palette.ACCENT, borderRadius: "8px", padding: "4px", maxWidth: '5px !important', color: palette.WHITE, }} onClick={remove_func}>X</Button>} */}
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

  // Info modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs:"60vw"},
    bgcolor: 'background.paper',
    p: 5,
    maxHeight: "80vh", 
    overflow: "scroll"
  };

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
    if (auth.currentUser?.email && addingPreference && preferences.length < 10) {
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
          {userVar && <img alt="pic" style={{ width: "200px", borderRadius: "1000px", margin: "20px" }} src={userVar.pic} referrerPolicy="no-referrer" />}
          <Box sx={{width: "350px", textAlign: "center"}}>
            <Typography variant="overline">
              Change your profile picture by changing your Google Account picture
            </Typography>
          </Box>
          <br/>
          <form style={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "10px" }} onSubmit={handleUpdateUser}>
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
            <FormControl sx={{flexDirection: { md: "row", xs: "column" }, gap: { md: "30px", xs: "0" }, alignItems: { md: "center", xs: "flex-start" }, justifyContent: "center"}}>
              <FormLabel>Instagram:</FormLabel>
              <TextField sx={{ width: "300px" }} value={newHandleInstagram} onChange={(e) => setNewHandleInstagram(e.target.value)} InputProps={{startAdornment: <InputAdornment position="start">@</InputAdornment>}}/>
            </FormControl>
            <FormControl sx={{flexDirection: { md: "row", xs: "column" }, gap: { md: "30px", xs: "0" }, alignItems: { md: "center", xs: "flex-start" }, justifyContent: "center"}}>
              <FormLabel>Snapchat:</FormLabel>
              <TextField sx={{ width: "300px" }} value={newHandleSnapchat} onChange={(e) => setNewHandleSnapchat(e.target.value)} InputProps={{startAdornment: <InputAdornment position="start">@</InputAdornment>}}/>
            </FormControl>
            <FormControl sx={{flexDirection: { md: "row", xs: "column" }, gap: { md: "30px", xs: "0" }, alignItems: { md: "center", xs: "flex-start" }, justifyContent: "center"}}>
              <FormLabel>Facebook:</FormLabel>
              <TextField sx={{ width: "300px" }} placeholder="Display Name" value={newHandleFacebook} onChange={(e) => setNewHandleFacebook(e.target.value)} />
            </FormControl>
            <FormControlLabel
              sx={{ width: { md: "500px", xs: "300px" } }}
              control={<Checkbox checked={newFullSending} disabled={!canChangePreferences} onChange={() => setNewFullSending((prev) => !prev)} />}
              label="Full sending?"
            />
            <Typography>
              <a style={{textDecoration: "underline", cursor: "pointer"}} onClick={handleOpen}>What is full sending?</a>
            </Typography>
            <Button style={{ backgroundColor: palette.ACCENT, textTransform: "capitalize" }} sx={{ width: { md: "500px", xs: "300px" }, mt: "20px"}} variant="contained" type="submit" disabled={updateProfileDisabled}>
              Save Profile
            </Button>
          </form>
        </Box>
      </Container>
    
      <Container>
        <Box sx={{ display: "flex", flexDirection: "column", mt: "40px", gap: "5px"}}>
          <Typography variant="h3">
            Preferences
          </Typography>
          <Typography variant="overline">
            Who's got you down bad?
          </Typography>
          <Typography variant="body1">
            Scramble preferences close on May 19th at 11:59PM. Late submissions will NOT be accepted. Check your matches page on May 20th at 12PM to see who you matched with!
          </Typography>
          <Typography variant="body1">
            <a href="https://tinyurl.com/ScrambleList" target="_blank">Full Send Scramble Participants List</a>
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
          <Box sx={{textAlign: "start"}}>
            <FormControlLabel
              sx={{ width: { md: "500px", xs: "300px" } }}
              control={<Checkbox checked={newFullSending} disabled={!canChangePreferences} onChange={() => setNewFullSending((prev) => !prev)} />}
              label="Full sending?"
            />
            <Typography>
              <a style={{textDecoration: "underline", cursor: "pointer"}} onClick={handleOpen}>{"(What is full sending?)"}</a>
            </Typography>
          </Box>
        </Box>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}

      >
        <Box sx={style}>
          <Typography variant="h5">
            What is full sending?
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            In this special edition of Scramble, get ready to "full send" it! You can opt in for the “full send” option after picking your matches, which means that you will be able to see the names of people who put your name down, regardless of whether you match with them or not. The catch? The participants you put down will also see that you put their name down. It's a chance to show your interest without holding back.
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            For those who aren't ready to declare their undying admiration through our state-of-the-art algorithm, no worries! If you don't opt-in to "full send," your scramble submissions will be hidden from anyone you don't match with. After all, a wise person once told me, "some things are better left unsaid..." 
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Here is an example of how the full-send option works:
          </Typography>
          <img style={{width: "100%"}} alt="fullsend" src="fullsend.png"/>
          <ul>
            <li>A puts down B, A and B opt-in for full send → B sees A as a match</li>
            <li>A puts down B, A opts in for full send and B opt-out of full send → A and B do not see each other as a match</li>
            <li>A puts down B, A and B opt-out of full send → A and B do not see each other as a match</li>
            <li>A puts down B, and B puts down A, A and B opt-out of full send → A and B see each other as match</li>
          </ul>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Obviously your Senior Board wants you to participate on your own terms and enjoy the Scramble without any pressure, but if there is any time to have a chaos arc, now would be the optimal time. Desperate times call for desperate measures, amirite?
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            So seniors, get matching! It's never too late to earn an A in love (or friendship), even if you’re already graduating magna cum lonely xoxo
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default Profile;
