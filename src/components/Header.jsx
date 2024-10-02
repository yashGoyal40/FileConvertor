import { Button } from "./ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "@aws-amplify/auth";
import { logout } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { sliceUsername, isLoggedIn } from "../store/authSlice";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const username = useSelector(sliceUsername);
  const loggedIn = useSelector(isLoggedIn);

  const handleLogOut = async () => {
    await signOut({ username: username });
    dispatch(logout());
  };

  // Extract the part before "@" from the email
  const displayName = username ? username.split("@")[0] : '';

  return (
    <>
      <header>
        <nav className="bg-black border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to="/" className="flex items-center">
              <img src={"/logo.ico"} className="mr-3 h-6 sm:h-9" alt="My Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
                File Converter
              </span>
            </Link>

            <div className="flex items-center lg:order-2">
              {/* Desktop View */}
              {loggedIn ? (
                <div className="text-white mr-4 hidden lg:block">{displayName}</div>
              ) : (
                <div className="space-x-4 hidden lg:flex">
                  <Link to="/auth/login">
                    <Button variant="outline">Login</Button>
                  </Link>
                  <Link to="/auth/signup">
                    <Button variant="outline">Sign Up</Button>
                  </Link>
                </div>
              )}

              {loggedIn && (
                <Link to="/auth/login">
                  <Button variant="outline" className="hidden lg:block" onClick={handleLogOut}>Log Out</Button>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-2"
                aria-expanded={menuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${menuOpen ? "hidden" : "block"} w-6 h-6`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  className={`${menuOpen ? "block" : "hidden"} w-6 h-6`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Menu */}
            <div
              className={`${
                menuOpen ? "block" : "hidden"
              } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <a
                    href="#content-section"
                    className="block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-gray-500 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Convert
                  </a>
                </li>
                <li>
                  <a
                    href="#footer-section"
                    className="block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-gray-500 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Contact
                  </a>
                </li>
                
                {/* Mobile conditional rendering */}
                {loggedIn ? (
                  <li className="block lg:hidden">
                    <div className="flex justify-center space-x-4 mt-6 mb-4">
                      <div className="text-white mr-4">{displayName}</div>
                      <Link to="/auth/login">
                        <Button variant="outline" className="w-full" onClick={handleLogOut}>
                          Log Out
                        </Button>
                      </Link>
                    </div>
                  </li>
                ) : (
                  <li className="block lg:hidden">
                    <div className="flex justify-center space-x-4 mt-6 mb-4">
                      <Link to="/auth/login">
                        <Button variant="outline" className="w-full">
                          Login
                        </Button>
                      </Link>
                      <Link to="/auth/signup">
                        <Button variant="outline" className="w-full">
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
