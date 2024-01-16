import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SecureLS from "secure-ls";
import axios from "../utils/axios";
import Spinner from "../Components/Spinner";

const MFAOTP = () => {
  const [OTP, setOTP] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();
  let ls = new SecureLS({
    encodingType: "aes",
    encryptionSecret: process.env.REACT_APP_SECRET_KEY,
  });
  let userId = ls.get("userId");
  const onVerify = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post("/auth/verify-otp/", JSON.stringify({ otp: OTP, userId }))
      .then((res) => {
        setIsLoading(false);
        ls.set("token", res.data.token);
        ls.set("user", res.data.user);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response) {
          setError(err.response.data.error);
        }
      });
  };
  const onResendOTP = (e) => {
    setIsLoading(true);

    axios
      .post(`/auth/resend-otp/${userId}/`, JSON.stringify({ OTP, userId }))
      .then((_) => {
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
                Enter OTP to login
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={onVerify}>
                <div>
                  <label
                    htmlFor="otp"
                    className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    OTP
                  </label>
                  <input
                    type="text"
                    name="otp"
                    id="otp"
                    placeholder="OTP Code"
                    onChange={(e) => setOTP(e.target.value)}
                    value={OTP}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <button
                  type="button"
                  onClick={onResendOTP}
                  className="text-primary text-sm flex font-medium text-primary-600 hover:underline dark:text-primary-500 mb-5"
                >
                  Resend code
                </button>
                {error && <p class="text-red-500 text-xs italic">{error}</p>}
                <button
                  type="submit"
                  className="flex border gap-2 justify-center border-primary hover:bg-primary hover:text-white w-full text-black dark:text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Verify {isLoading && <Spinner />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MFAOTP;
