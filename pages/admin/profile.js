import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import Link from "next/link";
import { useRouter } from "next/router";

function ProfileUpdate({ onChange }) {
  const [user, setUser] = useState();

  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);
  async function checkUser() {
    const user = await Auth.currentAuthenticatedUser();
    setUser(user.attributes);
    console.log(user.attributes);
  }

  function onChange(e) {
    setUser(() => ({ ...user, [e.target.name]: e.target.value }));
  }
  async function updateUser() {
    const user = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user, {
      given_name: given_name,
    });
    router.push("/admin/profile");
  }

  if (!user) return null;
  return (
    <>
      <div className="grid grid-cols-2">
        <div className="flex items-center">
          <p className="text-xl font-black ">Welcome, {user.given_name}</p>
        </div>
        <div className="justify-self-end"></div>
        <div className="flex flex-col">
          <input
            onChange={onChange}
            name="given_name"
            placeholder="Firstname"
            value={user.given_name}
            className="border-b pb-2 text-lg my-5 focus:outline-none font-light text-gray-500 placeholder-gray-500 y-2"
          />
          <input
            onChange={onChange}
            name="family_name"
            placeholder="Surname"
            value={user.family_name}
            className="border-b pb-2 text-lg my-5 focus:outline-none font-light text-gray-500 placeholder-gray-500 y-2"
          />
          <input
            onChange={onChange}
            type="date"
            name="birthdate"
            placeholder="DOB"
            value={user.birthdate}
            className="border-b pb-2 text-lg my-5 focus:outline-none font-light text-gray-500 placeholder-gray-500 y-2"
          />

          <input
            onChange={onChange}
            name="country"
            placeholder="Country"
            value={user.country}
            className="border-b pb-2 text-lg my-5 focus:outline-none font-light text-gray-500 placeholder-gray-500 y-2"
          />
          <div>
            <button
              type="button"
              className="mb-4 mt-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
              onClick={updateUser}
            >
              Update profile
            </button>
            <button
              onClick={() => {
                Auth.signOut();
                router.push("/");
              }}
              className=" mb-4 mt-4 bg-pink-600 text-white font-semibold px-8 py-2 rounded-lg float-right"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileUpdate;
