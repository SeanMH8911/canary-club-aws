import { API, Storage } from "aws-amplify";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// import ReactMarkdown from "react-markdown";
import { listRentals, getRental } from "../../graphql/queries";
import { FaBed, FaShower, FaUsers } from "react-icons/fa";
import Image from "next/image";
import "../../configureAmplify";

export default function Post({ rental }) {
  const [FeaturedImage, setFeaturedImage] = useState(null);
  useEffect(() => {
    updateFeaturedImage();
  }, []);
  async function updateFeaturedImage() {
    if (rental.FeaturedImage) {
      const imageKey = await Storage.get(rental.FeaturedImage);
      setFeaturedImage(imageKey);
    }
  }
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {/* Left-side Container */}
      <div>
        <h1 className="text-5xl mt-4 font-semibold tracking-wide">
          {rental.title}
        </h1>
        <div className="h-400 w-400">
          <img src={FeaturedImage} className="mt-4 w-[600px]" />
        </div>
        <hr className="mt-4" />
        <div className="flex mt-6">
          <div className="border border-gray-250 rounded flex flex-col p-4">
            <FaUsers size="30" />
            <h3 className="text-lg">{rental.MaxNumberOfGuest} Guests</h3>
          </div>
          <div className="ml-2 border border-gray-250 rounded flex flex-col justify-center p-4">
            <FaBed size="30" />
            <h3 className="text-lg">{rental.NumberOfBedrooms} Beds</h3>
          </div>
          <div className="ml-2 border border-gray-250 rounded flex flex-col justify-center p-4">
            <FaShower size="30" />
            <h3 className="text-lg">{rental.NumberOfBaths} Bathrooms</h3>
          </div>
        </div>
        <div className="mt-8">{rental.description}</div>
      </div>
      {/* Container for Calender */}
      <div></div>
    </div>
  );
}

export async function getStaticPaths() {
  const postData = await API.graphql({
    query: listRentals,
  });
  const paths = postData.data.listRentals.items.map((rental) => ({
    params: { id: rental.id },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const postData = await API.graphql({
    query: getRental,
    variables: { id },
  });
  return {
    props: {
      rental: postData.data.getRental,
    },
    revalidate: 1,
  };
}
