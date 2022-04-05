import { useState, useEffect } from "react";
import "../configureAmplify";
import Link from "next/link";
import { API } from "aws-amplify";
import { listRentals } from "../graphql/queries";
import RentalCard from "../src/components/rentals/RentalCard";
import { FaStar, FaRegHeart } from "react-icons/fa";
import { Storage } from "aws-amplify";

function ViewRentals() {
  const [rentals, setRentals] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);
  async function fetchPosts() {
    const postData = await API.graphql({
      query: listRentals,
    });
    setRentals(postData.data.listRentals.items);
    console.log(postData);
  }

  return (
    <>
      <div>
        <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">
          Rentals
        </h1>
        <div className="">
          {rentals.map((rental, id) => (
            <Link key={id} href={`/rentals/${rental.id}`}>
              <a>
                <RentalCard rental={rental} />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default ViewRentals;
