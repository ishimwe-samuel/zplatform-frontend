import { useEffect, useState } from "react";
import NavigationBar from "../Components/NavigationBar";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
const accountStatus = {
  UNVERIFIED: "Unverified",
  PENDING: "Pending",
  VERIFIED: "Verified",
};
export default function UsersList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pages, setPages] = useState([]);
  const [searchQ, setSearchQ] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    setPages([]);
    axios
      .get(`/users?page=${currentPage}&query=${searchQ}&status=${status ?? ""}`)
      .then((res) => {
        let tmpArr = [];
        setCount(res.data.count);
        setCurrentPage(res.data.currentPage);
        setTotalPages(res.data.totalPages);
        setUsers(res.data.results);
        for (let index = 0; index < res.data.totalPages; index++) {
          tmpArr.push(index + 1);
        }
        setPages(tmpArr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage, searchQ, status]);

  return (
    <>
      <NavigationBar />
      <>
        <div className="flex flex-col w-4/5 justify-center border rounded-md p-5 m-5 shadow-lg">
          <div className="flex">
            <div className="flex -mx-3 mb-2">
              <div className="w-full px-3 mb-6 md:mb-0">
                <input
                  onChange={(e) => setSearchQ(e.target.value)}
                  value={searchQ}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="Search Name"
                />
              </div>
              <select
                id="userStatus"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={""}>filter by User status</option>
                {Object.keys(accountStatus).map((e) => (
                  <option value={e}>{accountStatus[e]}</option>
                ))}
              </select>
            </div>
          </div>
          <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="px-6 py-4">
                  #
                </th>
                <th scope="col" className="px-6 py-4">
                  First
                </th>
                <th scope="col" className="px-6 py-4">
                  Last
                </th>
                <th scope="col" className="px-6 py-4">
                  Email
                </th>
                <th scope="col" className="px-6 py-4">
                  Profile
                </th>
                <th scope="col" className="px-6 py-4">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => {
                return (
                  <tr
                    className="border-b dark:border-neutral-500 hover:bg-gray-200 cursor-pointer"
                    onClick={(_) => {
                      navigate(`/users/${user.id}`);
                    }}
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {idx + 1}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {user.profile?.firstName}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {user.profile?.lastName}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {user.profile !== null ? (
                        <img
                          className="h-10 rounded-full w-10"
                          src={
                            process.env.REACT_APP_BASE_API_URL +
                            user.profile?.profilePicture
                          }
                          alt="user-profile"
                        />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {accountStatus[user.status]}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div>
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 w-4/5">
              <div className="flex flex-1 justify-between sm:hidden">
                <span className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Previous
                </span>
                <span className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Next
                </span>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span>
                    to
                    <span className="font-medium">{totalPages}</span>
                    of
                    <span className="font-medium">{count}</span>
                    results
                  </p>
                </div>
                <div>
                  <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <a
                      href="#"
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Previous</span>
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>

                    {pages.map((e) => (
                      <span
                        onClick={() => setCurrentPage(e)}
                        aria-current="page"
                        className={`cursor-pointer hover:bg-indigo-600 hover:text-white relative z-10 inline-flex items-center border ${
                          e === currentPage && "text-white bg-indigo-600"
                        }  px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                      >
                        {e}
                      </span>
                    ))}
                    <span className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                      <span className="sr-only">Next</span>
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
