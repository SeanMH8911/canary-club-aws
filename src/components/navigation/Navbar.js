import { useState, useEffect } from "react";
import Link from "next/link";
import { Auth, Hub } from "aws-amplify";
import "../../../configureAmplify";

function Navbar() {
  const [signedInUser, setSignedInUser] = useState(false);
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
    <nav className="p-6 border-b border-gray-300">
      <Link href="/">
        <span className="mr-6 cursor-pointer">Home</span>
      </Link>
      <Link href="/rentals">
        <span className="mr-6 cursor-pointer">Rentals</span>
      </Link>
      <Link href="/tours">
        <span className="mr-6 cursor-pointer">Tours</span>
      </Link>
      <Link href="/activities">
        <span className="mr-6 cursor-pointer">Activities</span>
      </Link>
      <Link href="/auth">
        <span className="mr-6 cursor-pointer">Profile</span>
      </Link>
      <Link href="/create-rental">
        <span className="mr-6 cursor-pointer">Create Rental</span>
      </Link>
      {signedInUser && (
        <Link href="/my-listings">
          <span className="mr-6 cursor-pointer">My Listings</span>
        </Link>
      )}
    </nav>
  );
}
export default Navbar;
