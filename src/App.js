import "./App.css";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import { Route, Routes } from "react-router-dom";
import UsersList from "./views/UsersList";
import UserDetails from "./views/UserDetails";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Login />} exact path="/login" />
        <Route element={<Dashboard />} exact path="/" />
        <Route element={<Dashboard />} exact path="/:token/:userId" />
        <Route element={<UsersList />} exact path="/users" />
        <Route element={<UserDetails />} exact path="/users/:userId/" />
      </Routes>
    </div>
  );
}

export default App;
