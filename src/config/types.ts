export type User = {
  email?: string;
  display_name?: string;
  bio?: string;
  preferences?: Preference[];
  looking_for?: LookingFor;
  admin?: boolean;
}

export type Preference = {
  email?: string;
  full_send?: boolean;
}

export enum LookingFor {
  Love,
  Friendship,
  Both,
}

export enum Flag {
  CanSignup = "CAN_SIGNUP",
  CanChangePreferences = "CAN_CHANGE_PREFERENCES",
  CanSeeMatches = "CAN_SEE_MATCHES",
}