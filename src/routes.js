import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import UsersList from "./views/UsersList";

export const routes = [
  {
    path: "/",
    name: "Profile",
    component: <Dashboard />,
    isVisible: true,
    accessType: "ALL",
  },
  {
    path: "/:token/:userId",
    name: "Dashboard",
    component: <Dashboard />,
    isVisible: false,
    accessType: "ALL",
  },
  {
    path: "/login",
    name: "Login",
    component: <Login />,
    isVisible: false,
    accessType: "ALL",
  },
  {
    path: "/users",
    name: "User List",
    component: <UsersList />,
    isVisible: true,
    accessType: "ADMIN",
  },
];
