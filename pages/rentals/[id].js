import { API, Storage } from "aws-amplify";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { format, differenceInDays } from "date-fns";
import { listRentals, getRental } from "../../graphql/queries";
import { FaBed, FaShower, FaUsers, FaRegHeart, FaStar } from "react-icons/fa";
import "../../configureAmplify";
import SearchBar from "../../src/components/navigation/SearchBar";
import { DateRangePicker } from "react-date-range";

export default function Post({ placeholder, rental }) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoading = () => {};

  useEffect(() => {
    window.addEventListener("load", handleLoading);
    return () => window.removeEventListener("load", handleLoading);
  }, []);
  const router = useRouter();
  const { NoNights, location, arrival, departure, noOfGuests } = router.query;

  const [FeaturedImage, setFeaturedImage] = useState(null);
  const [startDate, setStartDate] = useState(new Date(arrival));
  const [endDate, setEndDate] = useState(new Date(departure));

  useEffect(() => {
    updateFeaturedImage();
  }, []);
  async function updateFeaturedImage() {
    if (rental.FeaturedImage) {
      const imageKey = await Storage.get(rental.FeaturedImage);
      setFeaturedImage(imageKey);
    }
  }

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const total = NoNights * rental.PricePerNight;

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <SearchBar placeholder={placeholder} />
      <div className="flex">
        {/* Left-side Container */}
        <div className="flex flex-col flex-grow">
          <h1 className="text-3xl mt-4 font-semibold tracking-wide">
            {rental.title}
          </h1>
          <div className="flex justify-between mt-1">
            <div>
              <FaStar className=" text-pink-600" size={20} />
            </div>
            <div>
              <FaRegHeart className=" cursor-pointer" size={20} />
            </div>
          </div>
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

        {/* {isLoading ? ( */}
        <div className="mt-[90px] mx-[50px]">
          <div className="sticky top-0">
            <div className="mt-8">£{total}</div>

            <div>
              <DateRangePicker
                ranges={[selectionRange]}
                minDate={new Date()}
                rangeColors={["#db1d77"]}
                onChange={handleSelect}
              />
            </div>
          </div>
        </div>
        {/* ) : (
          <>...Loading</>
        )} */}
      </div>
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
