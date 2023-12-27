import { useEffect, useState } from "react";
import axios from "../utils/axios";
import profilePlaceholder from "../assets/images/icons8-camera-100.png";
import documentImagePlaceholder from "../assets/images/boarding-pass.png";
import SecureLS from "secure-ls";
import Spinner from "./Spinner";
export default function ProfileForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [nationality, setNationality] = useState("");
  const [profileImage, setProfileImage] = useState();
  const [tempProfileImage, setTempProfileImage] = useState();
  const [documentImage, setDocumentImage] = useState();
  const [documentTempImage, setDocumentTempImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  let ls = new SecureLS({
    encodingType: "aes",
    encryptionSecret: process.env.REACT_APP_SECRET_KEY,
  });
  let user = ls.get("user");

  const onDocumentImageHandler = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setDocumentImage(e.target.files[0]);
    }
  };
  const onChangeProfileImageHandler = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setProfileImage(e.target.files[0]);
      setTempProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };
  const onUpdateProfile = (e) => {
    e.preventDefault();
    setError();
    let formData = new FormData();

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("gender", gender);
    formData.append("dob", dob);
    formData.append("maritalStatus", maritalStatus);
    formData.append("nationality", nationality);
    formData.append("nationalId", nationalId);
    if (profileImage) {
      formData.append("profilePicture", profileImage);
    }
    if (documentImage) {
      formData.append("nationalIdDocument", documentImage);
    }
    setIsLoading(true);
    axios
      .post("/users/update-profile/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        let user = ls.get("user");
        user.profile = res.data;
        ls.set("user", user);
        console.log(ls.get("user"));
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response) {
          setError(err.response.data.error);
        } else {
          setError("Something went wrong");
        }
      });
  };
  useEffect(() => {
    if (user.profile) {
      setFirstName(user.profile.firstName);
      setLastName(user.profile.lastName);
      setDOB(user.profile.dob);
      setGender(user.profile.gender);
      setMaritalStatus(user.profile.maritalStatus);
      setNationalId(user.profile.nationalId);
      setNationality(user.profile.nationality);
      setDocumentTempImage(
        `${process.env.REACT_APP_BASE_API_URL}api/${user.profile.nationalIdDocument}`
      );
      setTempProfileImage(
        `${process.env.REACT_APP_BASE_API_URL}api/${user.profile.profilePicture}`
      );
      setDocumentImage(
        process.env.REACT_APP_BASE_API_URL + user.profile.profilePicture
      );
    }
  }, [isLoading]);

  return (
    <>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <form
          className="border max-w-lg p-6 rounded-lg shadow-lg w-full"
          onSubmit={onUpdateProfile}
        >
          <div className="flex justify-center">
            <div
              className=" border flex h-32 items-center mb-6 p-6 rounded-full w-32 cursor-pointer"
              style={{
                backgroundImage: `url(${
                  tempProfileImage ?? profilePlaceholder
                })`,
                backgroundSize: ` ${tempProfileImage ? "110%" : "30%"}`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              {/* upload design */}
              <input
                type="file"
                onChange={onChangeProfileImageHandler}
                className="h-36 opacity-0 w-36 cursor-pointer"
              />
            </div>
          </div>
          <span className="mt-96">Upload Profile</span>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                First Name
              </label>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Last Name
              </label>
              <input
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-gender"
              >
                Gender
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={""}>Choose a Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="maritalStatus"
              >
                Marital Status
              </label>
              <select
                id="maritalStatus"
                value={maritalStatus}
                onChange={(e) => setMaritalStatus(e.target.value)}
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={""}>Choose Marital Status</option>
                <option value="SINGLE">Single</option>
                <option value="MARRIED">Married</option>
                <option value="DIVORCED">Divorced</option>
                <option value="WIDOWED">Widowed</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Date of birth
              </label>
              <input
                onChange={(e) => setDOB(e.target.value)}
                className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="date"
                value={dob}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                nationality
              </label>
              <input
                onChange={(e) => setNationality(e.target.value)}
                value={nationality}
                className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                className="flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                National ID
              </label>
              <input
                onChange={(e) => setNationalId(e.target.value)}
                value={nationalId}
                className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
              />
            </div>
          </div>
          <div>
            <div
              className="flex mb-6 items-center"
              style={{
                backgroundImage: `url(${
                  documentImage && documentImagePlaceholder
                })`,
                backgroundSize: "20%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
              >
                Upload Document
              </label>
              <input
                className="h-36 opacity-0 block w-48 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                id="file_input"
                type="file"
                onChange={onDocumentImageHandler}
              />
              {!documentImage && (
                <p
                  className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                  id="file_input_help"
                >
                  PNG, JPG or GIF (MAX. 800x400px).
                </p>
              )}
              {documentTempImage && (
                <a
                  href={documentTempImage}
                  target="blank"
                  className="underline text-primary"
                >
                  View Document
                </a>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="bg-primary/80 flex justify-center items-center hover:bg-primary p-2.5 rounded-lg text-white w-full"
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
