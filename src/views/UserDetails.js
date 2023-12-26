import { useEffect, useState } from "react";
import NavigationBar from "../Components/NavigationBar";
import axios from "../utils/axios";
import { useParams } from "react-router-dom";
import badge from "../assets/images/icons8-twitter-verified-48.png";
import Spinner from "../Components/Spinner";
const genderDisplay = {
  M: "Male",
  F: "Female",
};
const accountStatus = {
  UNVERIFIED: "Unverified",
  PENDING: "Pending",
  VERIFIED: "Verified",
};
const maritalStatusDisplay = {
  SINGLE: "Single",
  MARRIED: "Maried",
  DIVORCED: "Divorced",
  WIDOWED: "Widowed",
};
export default function UserDetails() {
  const [user, setUser] = useState();
  let { userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    axios
      .get(`/users/${userId}`)
      .then((resp) => {
        setUser(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId, isLoading]);
  const onVerify = (e) => {
    setIsLoading(true);
    axios
      .patch(`/users/${userId}/?status=VERIFIED`)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  return (
    <>
      <NavigationBar />
      <div className="flex justify-center justify-items-center">
        <div className="w-1/2 border rounded-md shadow-lg m-5 p-5 flex flex-col">
          {user && (
            <div>
              <div className="flex justify-center">
                {user.profile && (
                  <div
                    className="relative border flex h-32 items-center mb-6 p-6 rounded-full w-32 cursor-pointer"
                    style={{
                      backgroundImage: `url(${
                        process.env.REACT_APP_BASE_API_URL +
                        user.profile?.profilePicture
                      })`,
                      backgroundSize: "100%",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  >
                    {user.status === "VERIFIED" && (
                      <img
                        src={badge}
                        alt="verified-badge"
                        className="absolute h-14 w-14 left-20 -top-4"
                      />
                    )}
                  </div>
                )}
              </div>
              <div>
                <span className="font-bold">First Name: </span>
                {user.profile ? <span>{user.profile?.firstName} </span> : "N/A"}
              </div>
              <div>
                <span className="font-bold">Last Name: </span>
                {user.profile ? <span>{user.profile?.lastName} </span> : "N/A"}
              </div>
              <div>
                <span className="font-bold">Age: </span>
                {user.profile ? <span>{user.profile?.age} </span> : "N/A"}
              </div>
              <div>
                <span className="font-bold">Date of Birth: </span>
                {user.profile ? <span>{user.profile?.dob} </span> : "N/A"}
              </div>
              <div>
                <span className="font-bold">Gender : </span>
                {user.profile ? (
                  <span>{genderDisplay[user.profile?.gender]} </span>
                ) : (
                  "N/A"
                )}
              </div>
              <div>
                <span className="font-bold">Marital Status : </span>
                {user.profile ? (
                  <span>
                    {maritalStatusDisplay[user.profile?.maritalStatus]}{" "}
                  </span>
                ) : (
                  "N/A"
                )}
              </div>
              <div>
                <span className="font-bold">Nationality : </span>
                {user.profile ? (
                  <span>{user.profile?.nationality} </span>
                ) : (
                  "N/A"
                )}
              </div>
              <div>
                <span className="font-bold">National ID : </span>
                {user.profile ? (
                  <span>{user.profile?.nationalId} </span>
                ) : (
                  "N/A"
                )}
              </div>
              <div>
                <span className="font-bold">National ID : </span>
                {user.profile ? (
                  <span>{user.profile?.nationalId} </span>
                ) : (
                  "N/A"
                )}
              </div>
              <div>
                <span className="font-bold">National ID Document : </span>
                {user.profile ? (
                  <a
                    href={
                      process.env.REACT_APP_BASE_API_URL +
                      user.profile?.nationalIdDocument
                    }
                    target="blank"
                    className="text-primary underline"
                  >
                    View Document{" "}
                  </a>
                ) : (
                  "N/A"
                )}
              </div>
              <div>
                <span className="font-bold">Status : </span>
                {user.profile ? (
                  <span>{accountStatus[user.status]} </span>
                ) : (
                  "N/A"
                )}
              </div>
              {user.status !== "VERIFIED" && (
                <div className="flex gap-10 justify-center mt-10 mb-10">
                  <button
                    disabled={isLoading}
                    className="flex py-3 px-20 hover:bg-primary hover:text-white rounded-md border border-primary"
                    onClick={onVerify}
                  >
                    Mark as Verified {isLoading && <Spinner />}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
