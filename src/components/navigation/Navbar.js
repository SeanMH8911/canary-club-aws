import { useState, useEffect } from "react";
import Link from "next/link";
import { Auth, Hub } from "aws-amplify";
import "../../../configureAmplify";
import { FaHouseUser } from "react-icons/fa";

function Navbar() {
  const [signedInUser, setSignedInUser] = useState(false);
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const [open, setOpen] = useState(true);
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
    <nav className="flex items-center justify-between flex-wrap bg-white-500 p-6 ">
      <div className="flex items-center flex-shrink-0  mr-6">
        <Link href="/" onClick={() => setMenuVisibility(!isMenuVisible)}>
          <span className="mr-6 cursor-pointer">Home</span>
        </Link>
      </div>

      <div className=" flex-grow ">
        <Link href="/rentals" onClick={() => setMenuVisibility(!isMenuVisible)}>
          <span className="cursor-pointer block lg:inline-block lg:mt-0 mr-4">
            Rentals
          </span>
        </Link>
        {/* <Link href="/tours">
          <span className="cursor-pointer block mt-4 lg:inline-block lg:mt-0 mr-4">
            Tours
          </span>
        </Link>
        <Link href="/activities">
          <span className="cursor-pointer block mt-4 lg:inline-block lg:mt-0 mr-4">
            Activities
          </span>
        </Link> */}
      </div>
      <div className="">
        <button
          onClick={() => setOpen(!open)}
          className="border-2 border-gray-500 rounded p-1 hover:bg-pink-600"
        >
          <FaHouseUser size="30" className="text-pink-600 hover:text-white" />
        </button>
        {!open && (
          <>
            <nav
              id="mobileNav"
              className="flex flex-row justify-between flex-wrap border-2 bg-white border-gray-500 rounded"
            >
              <div className="">
                {signedInUser && (
                  <Link href="/admin/profile">
                    <div
                      className=" cursor-pointer my-2 py-4 px-20  w-full rounded hover:bg-slate-400 hover:text-white"
                      onClick={() => setOpen(!open)}
                    >
                      <span className="  ">Profile</span>
                    </div>
                  </Link>
                )}

                {signedInUser && (
                  <Link href="/create-rental">
                    <div
                      className=" cursor-pointer my-2 py-4 px-20  w-full rounded hover:bg-slate-400 hover:text-white"
                      onClick={() => setOpen(!open)}
                    >
                      <span className="  ">Create Rental</span>
                    </div>
                  </Link>
                )}

                {signedInUser && (
                  <Link href="/my-listings">
                    <div
                      className=" cursor-pointer my-2 py-4 px-20  w-full rounded hover:bg-slate-400 hover:text-white"
                      onClick={() => setOpen(!open)}
                    >
                      <span className=" ">My Listings</span>
                    </div>
                  </Link>
                )}

                {!signedInUser && (
                  <Link href="/auth">
                    <div
                      className="cursor-pointer  my-2 py-4 px-20  w-full rounded hover:bg-slate-400 hover:text-white"
                      onClick={() => setOpen(!open)}
                    >
                      <span className="">Sign In</span>
                    </div>
                  </Link>
                )}

                {signedInUser && (
                  <Link href="/auth">
                    <div
                      className=" cursor-pointer  my-2 py-4 px-20  w-full rounded hover:bg-slate-400 hover:text-white"
                      onClick={() => setOpen(!open)}
                    >
                      <span className="">Sign Out</span>
                    </div>
                  </Link>
                )}
              </div>
            </nav>
          </>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
