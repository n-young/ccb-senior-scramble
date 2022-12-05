import Home from "../screens/Home";
import Login from "../screens/Login";
import Admin from "../screens/Admin";

interface RouteType {
  path: string;
  component: any;
  name: string;
  protected: boolean;
  admin: boolean;
}

const routes: RouteType[] = [
  {
    path: "",
    component: Home,
    name: "Home Screen",
    protected: true,
    admin: false,
  },
  {
    path: "/login",
    component: Login,
    name: "Login Screen",
    protected: false,
    admin: false,
  },
  {
    path: "/admin",
    component: Admin,
    name: "Admin Screen",
    protected: false,
    admin: true,
  },
];

export default routes;
