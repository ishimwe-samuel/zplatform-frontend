import axios from "../utils/axios";
import { useState } from "react";
import Spinner from "./Spinner";

export default function MFAForm() {
  const [selectedLoginMethod, setSelectedLoginMethod] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const onUpdate = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError();
    axios
      .patch(
        "/users/me/mfa/",
        JSON.stringify({ authType: selectedLoginMethod })
      )
      .then((res) => {
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.error);
        }
        setIsLoading(false);
      });
  };
  return (
    <>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <form
          className="border max-w-7xl p-6 rounded-lg shadow-lg w-full"
          onSubmit={onUpdate}
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <label
              className="flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="maritalStatus"
            >
              MULTI FACTOR SETUP
            </label>
            <select
              id="maritalStatus"
              value={selectedLoginMethod}
              onChange={(e) => setSelectedLoginMethod(e.target.value)}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Choose Auth Type</option>
              <option value="OTP">One Time Password</option>
              <option value="LINK">Login Link</option>
              <option value="PASSWORD">Normal Password</option>
            </select>
          </div>
          {error && <p className="text-red-500 text-xs italic">{error}.</p>}
          <div>
            <button
              type="submit"
              className="bg-primary/80 flex justify-center hover:bg-primary p-2.5 rounded-lg text-white w-full  items-center"
            >
              {isLoading && <Spinner />}
              SAVE
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
