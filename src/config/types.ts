export type User = {
  email?: string;
  display_name?: string;
  google_name?: string;
  pronouns?: string;
  bio?: string;
  handleInstagram?: string;
  handleSnapchat?: string;
  handleFacebook?: string;
  pic?: string;
  preferences?: string[];
  full_sending?: boolean;
  admin?: boolean;
  matches?: string[];
}

export enum Flag {
  CanSignup = "CAN_SIGNUP",
  CanChangePreferences = "CAN_CHANGE_PREFERENCES",
  CanSeeMatches = "CAN_SEE_MATCHES",
}