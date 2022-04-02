import { useState, useEffect } from "react";
import "../configureAmplify";
import Link from "next/link";
import { API } from "aws-amplify";
import { listRentals } from "../graphql/queries";

export default function Home() {
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
    <div>
      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">Posts</h1>
      {rentals.map((post, id) => (
        <Link key={id} href={`/rentals/${post.id}`}>
          <div className="cursor-pointer border-b border-gray-300 mt-8 pb-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
}
