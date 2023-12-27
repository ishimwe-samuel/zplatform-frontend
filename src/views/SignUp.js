import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SecureLS from "secure-ls";
import axios from "../utils/axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const navigate = useNavigate();
  const onSignUp = (e) => {
    e.preventDefault();
    setError()
    axios
      .post("/auth/sign-up/", JSON.stringify({ email, password }))
      .then((res) => {
        let ls = new SecureLS({
          encodingType: "aes",
          encryptionSecret: process.env.REACT_APP_SECRET_KEY,
        });
        ls.set("userId", res.data.id);
        navigate("/otp", { replace: true });
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.error);
        }
      });
  };
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            to={"/signin"}
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            Welcome to zPlatform!
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create a new account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={onSignUp}>
                <div>
                  <label
                    htmlFor="email"
                    className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                {error && <p class="text-red-500 text-xs italic">{error}</p>}

                <button
                  type="submit"
                  className="bg-primary/80 hover:bg-primary text-white w-full dark:text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign up
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?
                  <Link
                    to={"/signin"}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
