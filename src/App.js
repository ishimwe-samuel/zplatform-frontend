import "./App.css";
import Dashboard from "./views/Dashboard";
import { Route, Routes } from "react-router-dom";
import UsersList from "./views/UsersList";
import UserDetails from "./views/UserDetails";
import SignIn from "./views/SignIn";
import SecureLS from "secure-ls";
import SignUp from "./views/SignUp";
import OTP from "./views/OTP";
import ForgotPassword from "./views/ForgotPassword";
import ResetPassword from "./views/ResetPassword";
import MFAOTP from "./views/MFAOTP";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<SignIn />} exact path="/signin" />
        <Route element={<SignUp />} exact path="/signup" />
        <Route element={<ForgotPassword />} exact path="/forgot-password" />
        <Route
          element={<ResetPassword />}
          exact
          path="/reset-password/:token/:userId"
        />
        <Route element={<OTP />} path="/otp" />
        <Route element={<MFAOTP />} path="/signin/otp" />
        <Route element={<Dashboard />} path="/" />
        <Route element={<Dashboard />} path="/:token/:userId" />

        <Route element={<UsersList />} path="/users" />
        <Route element={<UserDetails />} path="/users/:userId/" />
      </Routes>
    </div>
  );
}

export default App;
