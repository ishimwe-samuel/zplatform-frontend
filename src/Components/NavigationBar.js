import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import SecureLS from "secure-ls";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { routes } from "../routes";
export default function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();

  let ls = new SecureLS({
    encodingType: "aes",
    encryptionSecret: process.env.REACT_APP_SECRET_KEY,
  });
  let user = ls.get("user");
  const onSignOut = (e) => {
    e.preventDefault();
    ls.removeAll();
    navigate("/signin", { replace: true });
  };
  const generateRoutes = () =>
    routes.map((e, idx) => {
      if (e.isVisible) {
        if (e.accessType === "ALL") {
          return (
            <Link
              key={idx}
              to={e.path}
              className={`${
                location.pathname === e.path && "bg-gray-900 text-white"
              } rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white`}
            >
              {e.name}
            </Link>
          );
        } else if (e.accessType === "ADMIN" && user.admin) {
          return (
            <Link
              key={idx}
              to={e.path}
              className={`${
                location.pathname === e.path && "bg-gray-900 text-white"
              }rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white`}
            >
              {e.name}
            </Link>
          );
        } else {
          return null;
        }
      } else {
        return null;
      }
    });

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="font-bold text-primary">zPlatform!</span>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {generateRoutes()}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      type="button"
                      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>

                      <></>
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          {user.profile && (
                            <img
                              className="h-8 w-8 rounded-full"
                              src={`${process.env.REACT_APP_BASE_API_URL}api/${user.profile.profilePicture}`}
                              alt=""
                            />
                          )}
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            <Link
                              className="block px-4 py-2 text-sm text-gray-700"
                              to={"/"}
                            >
                              Your Profile
                            </Link>
                          </Menu.Item>
                          <Menu.Item>
                            <Link
                              onClick={onSignOut}
                              className="block px-4 py-2 text-sm text-gray-700"
                              to={"/"}
                            >
                              Sign out
                            </Link>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? <></> : <></>}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                <Disclosure.Button onClick={onSignOut} as="a">
                  Sign out
                  <Link
                    onClick={onSignOut}
                    className="block px-4 py-2 text-sm text-gray-700"
                    to={"/"}
                  >
                    Sign out
                  </Link>
                </Disclosure.Button>
              </div>
              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={
                        user.profile &&
                        process.env.REACT_APP_BASE_API_URL +
                          user.profile.profilePicture
                      }
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {user.profile && user.profile.firstName}{" "}
                      {user.profile && user.profile.lastName}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      {user.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                    <></>
                  </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <Disclosure.Button
                    as="a"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Your Profile
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Settings
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Sign out
                  </Disclosure.Button>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
