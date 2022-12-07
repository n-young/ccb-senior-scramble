export type User = {
  email?: string;
  display_name?: string;
  bio?: string;
  preferences?: Preference[];
  looking_for?: LookingFor;
  full_sending?: boolean;
  admin?: boolean;
  matches?: Match[];
}

export type Preference = {
  email?: string;
  full_send?: boolean;
}

export type Match = {
  email?: string;
  display_name?: string;
  bio?: string;
  looking_for?: LookingFor;
}

export enum LookingFor {
  Love = "Love",
  Friendship = "Friendship",
  Both = "Both Love and Friendship",
}

export enum Flag {
  CanSignup = "CAN_SIGNUP",
  CanChangePreferences = "CAN_CHANGE_PREFERENCES",
  CanSeeMatches = "CAN_SEE_MATCHES",
}