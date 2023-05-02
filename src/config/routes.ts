import { auth, getUser, getFlag } from "./firebase";
import { Flag } from "./types";
import Profile from "../screens/Profile"
import Error from "../screens/Error"
import Home from "../screens/Home"
import Admin from "../screens/Admin"
import Matches from "../screens/Matches"
import { participants } from "./participants";

interface RouteType {
  path: string;
  component: any;
  guards: (() => Promise<boolean>)[];
}
export const routes: RouteType[] = [
  {
    path: "",
    component: Home,
    guards: [],
  },
  {
    path: "/error",
    component: Error,
    guards: [],
  },
  {
    path: "/profile",
    component: Profile,
    guards: [loginGuard, registeredGuard],
  },
  {
    path: "/matches",
    component: Matches,
    guards: [loginGuard, registeredGuard, canSeeMatchesGuard],
  },
  {
    path: "/admin",
    component: Admin,
    guards: [loginGuard, adminGuard],
  },
];

export async function loginGuard(): Promise<boolean> {
  return !!auth.currentUser;
}

export async function registeredGuard(): Promise<boolean> {
  return !!auth.currentUser?.email && participants.map(p => p.email).includes(auth.currentUser?.email);
}

export async function adminGuard(): Promise<boolean> {
  if (!auth.currentUser || !auth.currentUser.email) {
    return false;
  }
  const user = await getUser(auth.currentUser.email!);
  return user.admin || false;
}

export async function canSignupFlagGuard(): Promise<boolean> {
  if (!auth.currentUser) {
    return false;
  }
  const flag = await getFlag(Flag.CanSignup);
  return flag;
}

export async function canChangePreferencesGuard(): Promise<boolean> {
  if (!auth.currentUser) {
    return false;
  }
  const flag = await getFlag(Flag.CanChangePreferences);
  return flag;
}

export async function canSeeMatchesGuard(): Promise<boolean> {
  if (!auth.currentUser) {
    return false;
  }
  const flag = await getFlag(Flag.CanSeeMatches);
  return flag;
}
