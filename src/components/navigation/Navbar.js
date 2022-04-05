import { useState, useEffect } from "react";
import Link from "next/link";
import { Auth, Hub } from "aws-amplify";
import "../../../configureAmplify";

function Navbar() {
  const [signedInUser, setSignedInUser] = useState(false);
  const [isMenuVisible, setMenuVisibility] = useState(false);
  useEffect(() => {
    authListener();
  });
  async function authListener() {
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signIn":
          return setSignedInUser(true);
        case "signOut":
          return setSignedInUser(false);
      }
    });
    try {
      await Auth.currentAuthenticatedUser();
      setSignedInUser(true);
    } catch (err) {}
  }

  return (
    <nav className="flex items-center justify-between flex-wrap bg-white-500 p-6">
      <div className="flex items-center flex-shrink-0  mr-6">
        <Link href="/">
          <span className="mr-6 cursor-pointer">Home</span>
        </Link>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={() => setMenuVisibility(!isMenuVisible)}
          className="flex items-center px-3 py-2 border rounded text-black-600 border-black-400 hover:text-pink-600 hover:border-pink-600"
          data-cy="mmenu-btn"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`${
          isMenuVisible ? "max-h-full" : "h-0"
        } flex flex-row overflow-hidden w-full lg:h-full flex-grow lg:flex lg:items-center lg:w-auto`}
      >
        <div className=" lg:flex-grow ">
          <Link href="/rentals">
            <span className="cursor-pointer block mt-4 lg:inline-block lg:mt-0 mr-4">
              Rentals
            </span>
          </Link>
          <Link href="/tours">
            <span className="cursor-pointer block mt-4 lg:inline-block lg:mt-0 mr-4">
              Tours
            </span>
          </Link>
          <Link href="/activities">
            <span className="cursor-pointer block mt-4 lg:inline-block lg:mt-0 mr-4">
              Activities
            </span>
          </Link>

          <Link href="/create-rental">
            <span className=" cursor-pointer block mt-4 lg:inline-block lg:mt-0 mr-4">
              Create Rental
            </span>
          </Link>

          {signedInUser && (
            <Link href="/admin/profile">
              <span className=" cursor-pointer block mt-4 lg:inline-block lg:mt-0 mr-4">
                Profile
              </span>
            </Link>
          )}
          {signedInUser && (
            <Link href="/my-listings">
              <span className=" cursor-pointer block mt-4 lg:inline-block lg:mt-0 mr-4">
                My Listings
              </span>
            </Link>
          )}
        </div>
        <div className="flex-col-reverse flex lg:flex-row">
          <div className="lg:flex items-center">
            {!signedInUser && (
              <Link href="/auth">
                <span className="block lg:inline-block lg:mt-0 cursor-pointer text-white w-full mt-1 bg-pink-600 p-1 rounded">
                  Sign In
                </span>
              </Link>
            )}
            {signedInUser && (
              <Link href="/auth">
                <span className=" block lg:inline-block lg:mt-0 cursor-pointer text-white w-full mt-1 bg-pink-600 p-1 rounded">
                  Sign Out
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
