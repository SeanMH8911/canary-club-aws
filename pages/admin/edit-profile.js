import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { API } from "aws-amplify";
import { useRouter } from "next/router";
import { listUsers } from "../../graphql/queries";
import { updateUser } from "../../graphql/mutations";

function ProfileUpdate({ onChange }) {
  const [user, setUser] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);
  async function fetchPosts() {
    const postData = await API.graphql({
      query: listUsers,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    setUser(postData.data.listUsers.items[0]);
  }
  function onChange(e) {
    setUser(() => ({ ...user, [e.target.name]: e.target.value }));
  }
  const {
    id,
    email,
    FirstName,
    Surname,
    dateOfBirth,
    phoneNumber,
    country,
    streetAddress,
    city,
    county,
    postCode,
  } = user;

  const router = useRouter();

  async function updateUserDetails() {
    if (
      !email ||
      !FirstName ||
      !Surname ||
      !dateOfBirth ||
      !phoneNumber ||
      !country ||
      !streetAddress ||
      !city ||
      !county ||
      !postCode
    )
      return;
    const userUpdated = {
      id,
      email,
      FirstName,
      Surname,
      dateOfBirth,
      phoneNumber,
      country,
      streetAddress,
      city,
      county,
      postCode,
    };

    await API.graphql({
      query: updateUser,
      variables: { input: userUpdated },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    router.push("/admin/profile");
  }

  if (!user) return null;
  return (
    <>
      <div className="grid grid-cols-2">
        <div className="flex items-center">
          <p className="text-xl font-black ">Welcome, {user.FirstName}</p>
        </div>
        <div className="justify-self-end"></div>
        <div className="flex flex-col">
          <input
            name="email"
            placeholder="E-Mail"
            value={user.email}
            className="border-b pb-2 text-lg my-5 focus:outline-none font-light text-gray-500 placeholder-gray-500 y-2"
          />
          <input
            onChange={onChange}
            name="FirstName"
            placeholder="Firstname"
            value={user.FirstName}
            className="border-b pb-2 text-lg my-5 focus:outline-none font-light text-gray-500 placeholder-gray-500 y-2"
          />
          <input
            onChange={onChange}
            name="Surname"
            placeholder="Surname"
            value={user.Surname}
            className="border-b pb-2 text-lg my-5 focus:outline-none font-light text-gray-500 placeholder-gray-500 y-2"
          />
          <input
            onChange={onChange}
            type="dateOfBirth"
            name="birthdate"
            placeholder="DOB"
            value={user.dateOfBirth}
            className="border-b pb-2 text-lg my-5 focus:outline-none font-light text-gray-500 placeholder-gray-500 y-2"
          />

          <input
            onChange={onChange}
            name="phoneNumber"
            placeholder="Phone Number"
            value={user.phoneNumber}
            className="border-b pb-2 text-lg my-5 focus:outline-none font-light text-gray-500 placeholder-gray-500 y-2"
          />
          <input
            onChange={onChange}
            name="country"
            placeholder="Country"
            value={user.country}
            className="border-b pb-2 text-lg my-5 focus:outline-none font-light text-gray-500 placeholder-gray-500 y-2"
          />
          <input
            onChange={onChange}
            name="streetAddress"
            placeholder="Street Address and Number"
            value={user.streetAddress}
            className="border-b pb-2 text-lg my-5 focus:outline-none font-light text-gray-500 placeholder-gray-500 y-2"
          />
          <input
            onChange={onChange}
            name="city"
            placeholder="City"
            value={user.city}
            className="border-b pb-2 text-lg my-5 focus:outline-none font-light text-gray-500 placeholder-gray-500 y-2"
          />
          <input
            onChange={onChange}
            name="county"
            placeholder="County"
            value={user.county}
            className="border-b pb-2 text-lg my-5 focus:outline-none font-light text-gray-500 placeholder-gray-500 y-2"
          />
          <input
            onChange={onChange}
            name="postCode"
            placeholder="Post Code"
            value={user.postCode}
            className="border-b pb-2 text-lg my-5 focus:outline-none font-light text-gray-500 placeholder-gray-500 y-2"
          />

          <div>
            <button
              type="button"
              className="mb-4 mt-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
              onClick={updateUserDetails}
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
