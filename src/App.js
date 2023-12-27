import "./App.css";
import Dashboard from "./views/Dashboard";
import { Route, Routes } from "react-router-dom";
import UsersList from "./views/UsersList";
import UserDetails from "./views/UserDetails";
import SignIn from "./views/SignIn";
import { routes as UrlRoutes } from "./routes";
import SecureLS from "secure-ls";
import SignUp from "./views/SignUp";

function App() {
  let ls = new SecureLS({
    encodingType: "aes",
    encryptionSecret: process.env.REACT_APP_SECRET_KEY,
  });
  let user = ls.get("user");
  const getRoutes = (routes) =>
    routes.map((e) => {
      if (e.accessType === "ALL") {
        return <Route element={<e.Component />} exact path={e.path} />;
      } else if (user && e.accessType === "ADMIN" && user.isAdmin) {
        return <Route element={<e.Component />} exact path={e.path} />;
      } else return null;
    });
  return (
    <div className="App">
      <Routes>
        <Route element={<SignIn />} exact path="/signin" />
        <Route element={<SignUp />} exact path="/signup" />
        <Route element={<Dashboard />} exact path="/" />
        <Route element={<Dashboard />} exact path="/:token/:userId" />
        <Route element={<UsersList />} exact path="/users" />
        <Route element={<UserDetails />} exact path="/users/:userId/" />
      </Routes>
    </div>
  );
}

export default App;
