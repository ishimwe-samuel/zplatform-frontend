import Dashboard from "./views/Dashboard";
import Login from "./views/SignIn";
import UserDetails from "./views/UserDetails";
import UsersList from "./views/UsersList";

export const routes = [
  {
    path: "/",
    name: "Profile",
    Component: <Dashboard />,
    isVisible: true,
    accessType: "ALL",
  },
  {
    path: "/:token/:userId",
    name: "Login",
    Component: <Dashboard />,
    isVisible: false,
    accessType: "ALL",
  },
  {
    path: "/signin",
    name: "Login",
    Component: <Login />,
    isVisible: false,
    accessType: "ALL",
  },
  {
    path: "/users",
    name: "User List",
    Component: <UsersList />,
    isVisible: true,
    accessType: "ADMIN",
  },
  {
    path: "/users/:userId/",
    name: "User List",
    component: <UserDetails />,
    isVisible: true,
    accessType: "ADMIN",
  },
];
