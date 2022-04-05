import { useState, useEffect } from "react";
import Link from "next/link";
import { API, Auth } from "aws-amplify";
import { postsByUsername } from "../graphql/queries";
import { deleteRental as deleteRentalMutation } from "../graphql/mutations";
import "../configureAmplify";

export default function Mylistings() {
  const [rentals, setRentals] = useState([]);
  useEffect(() => {
    fetchRentals();
  }, []);

  async function fetchRentals() {
    const { username } = await Auth.currentAuthenticatedUser();
    // console.log(username);
    const postData = await API.graphql({
      query: postsByUsername,
      variables: { username },
    });

    setRentals(postData.data.postsByUsername.items);
    console.log(setRentals);
  }

  async function deletePost(id) {
    await API.graphql({
      query: deleteRentalMutation,
      variables: { input: { id } },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    fetchRentals();
  }
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">
        My Listings
      </h1>
      {rentals.map((rental, id) => (
        <div key={id} className="border-b border-gray-300	mt-8 pb-4">
          <h2 className="text-xl font-semibold">{rental.title}</h2>
          {/* <p className="text-gray-500 mt-2 mb-2">Author: {rental.username}</p> */}
          <Link href={`/edit-rental/${rental.id}`}>
            <a className="text-sm mr-4 text-blue-500">Edit Rental</a>
          </Link>
          <Link href={`/rentals/${rental.id}`}>
            <a className="text-sm mr-4 text-blue-500">View Rental</a>
          </Link>
          <button
            className="text-sm mr-4 text-red-500"
            onClick={() => deletePost(rental.id)}
          >
            Delete Listing
          </button>
        </div>
      ))}
    </div>
  );
}
