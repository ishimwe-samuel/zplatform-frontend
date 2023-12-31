import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";
import Spinner from "../Components/Spinner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const onResetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError()
    axios
      .post("/auth/forgot-password/", JSON.stringify({ email }))
      .then((res) => {
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
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
                Forgot password
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={onResetPassword}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <button
                  type="button"
                  onClick={onResetPassword}
                  className="text-primary text-sm flex font-medium text-primary-600 hover:underline dark:text-primary-500 mb-5"
                >
                  Resend email
                </button>
                {error && <p class="text-red-500 text-xs italic">{error}</p>}
                <button
                  type="submit"
                  className="flex border gap-2 justify-center border-primary hover:bg-primary hover:text-white w-full text-black dark:text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Reset password {isLoading && <Spinner />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
