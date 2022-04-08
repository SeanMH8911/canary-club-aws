import Link from "next/link";
import { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { listUsers } from "../../graphql/queries";

function Profile() {
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
  return (
    <>
      <div className="">
        <div>
          <p className="text-xl font-black ">Welcome, {user.FirstName}</p>
        </div>
        <hr className="w-[100px] h-2 text-black mt-2"></hr>
        <div className="">
          <div className="border border-gray-300 rounded m-auto p-2 max-w-[300px]">
            <p className="border-b font-bold">Personal Info</p>
            <div className="flex">
              <p>{user.FirstName}</p>
              <p className="ml-1">{user.Surname}</p>
            </div>
            <div className="">
              <p>{user.phoneNumber}</p>
            </div>
            <div className="">
              <p>{user.email}</p>
            </div>
            <div className="">
              <p>{user.dateOfBirth}</p>
            </div>
            <div>
              <p className="border-b font-bold">Address</p>
              <p>{user.country}</p>
              <p>{user.streetAddress}</p>
              <p>{user.city}</p>
              <p>{user.county}</p>
              <p>{user.postCode}</p>
            </div>
            <div>
              <Link href="/admin/edit-profile">
                <span className="text-center w-full block  cursor-pointer text-white mt-3 bg-pink-600 p-1 rounded">
                  Edit Profile
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
