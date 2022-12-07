import { auth, getUser, getFlag } from "./firebase";
import { Flag } from "./types";
import Home from "../screens/Home"
import Login from "../screens/Login"
import Admin from "../screens/Admin"

interface RouteType {
  path: string;
  component: any;
  guards: (() => Promise<boolean>)[];
}
export const routes: RouteType[] = [
  {
    path: "",
    component: Home,
    guards: [loginGuard],
  },
  {
    path: "/login",
    component: Login,
    guards: [],
  },
  {
    path: "/matches",
    component: Home,
    guards: [loginGuard, canSeeMatchesGuard],
  },
  {
    path: "/admin",
    component: Admin,
    guards: [loginGuard, adminGuard],
  },
];

export async function loginGuard(): Promise<boolean> {
  return !!auth.currentUser
}

export async function adminGuard(): Promise<boolean> {
  if (!auth.currentUser) {
    return false
  }
  const user = await getUser(auth.currentUser?.email!)
  return !!user.admin;
}

export async function canSignupFlagGuard(): Promise<boolean> {
  if (!auth.currentUser) {
    return false
  }
  const flag = await getFlag(Flag.CanSignup)
  return flag;
}

export async function canChangePreferencesGuard(): Promise<boolean> {
  if (!auth.currentUser) {
    return false
  }
  const flag = await getFlag(Flag.CanChangePreferences)
  return flag;
}

export async function canSeeMatchesGuard(): Promise<boolean> {
  if (!auth.currentUser) {
    return false
  }
  const flag = await getFlag(Flag.CanSeeMatches)
  return flag;
}
