import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";
import SecureLS from "secure-ls";
import NavigationBar from "../Components/NavigationBar";
import ProfileForm from "../Components/ProfileForm";
import MFAForm from "../Components/MFAForm";

export default function Dashboard() {
  const navigate = useNavigate();
  const { token, userId } = useParams();
  let ls = new SecureLS({
    encodingType: "aes",
    encryptionSecret: process.env.REACT_APP_SECRET_KEY,
  });
  let user = ls.get("user");
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin", { replace: true });
    }
    if (token && userId) {
      onLinkLogin();
    }
  }, [navigate, token, userId]);
  const onLinkLogin = () => {
    let data = JSON.stringify({
      userId,
      token,
    });
    axios
      .post("/auth/sign-in/link/", data)
      .then((res) => {
        ls.set("token", res.data.token);
        ls.set("user", res.data.user);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        ls.removeAll();
        navigate("/signin", { replace: true });
      });
  };
useEffect(()=>{
  return ()=>{
    if (!ls.get('token')) {
      ls.clear()
      navigate('/signin',{replace:true})
    }
  }
},[])
  return (
    <>
      <div className="min-h-full">
        {/* check if we are trying to log in  */}
        {token && userId && (
          <div className="fixed">
            <div className="bg-gray h-full w-full bg-gray backdrop-blur-sm fixed bg-black/10 z-50">
              <div className="flex justify-items-center">
                <span className="animate-ping absolute h-80 w-80 rounded-full bg-sky-400 opacity-75"></span>
                <svg
                  className="animate-spin h-80 w-80 mr-3 ..."
                  viewBox="0 0 24 24"
                ></svg>
              </div>
              <span className="text-md font-black text-black text-center">
                We are trying to log you in please be patient
              </span>
            </div>
          </div>
        )}

        <NavigationBar />
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome {user.profile && user.profile.firstName}{" "}
              {user.profile && user.profile.lastName}
            </h1>
          </div>
        </header>
        <main className="flex flex-wrap justify-center">
          <div>
            <ProfileForm />
          </div>
          <div>
            <MFAForm />
          </div>
        </main>
      </div>
    </>
  );
}
