import { API, Storage } from "aws-amplify";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { format, differenceInDays } from "date-fns";
import { listRentals, getRental } from "../../graphql/queries";
import { FaBed, FaShower, FaUsers, FaRegHeart, FaStar } from "react-icons/fa";
import "../../configureAmplify";
import SearchBar from "../../src/components/navigation/SearchBar";
import { DateRangePicker } from "react-date-range";
import moment from "moment";
import { useLoadScript } from "@react-google-maps/api";
import SingleMap from "../../src/components/Map/SingleMap";
import { isEmpty } from "@aws-amplify/core";

export default function Post({ placeholder, rental }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  const router = useRouter();
  const { NoNights, location, arrival, departure, noOfGuests } = router.query;
  const arrivalNew = moment(arrival).format("d MMM yyyy");
  const departureNew = moment(departure).format("d MMM yyyy");
  const [isVisible, setIsVisible] = useState(false);
  const [FeaturedImage, setFeaturedImage] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dateInput, setDateInput] = useState(false);

  function setInititalDates() {
    setStartDate(new Date(arrival));
    setEndDate(new Date(departure));
    setIsVisible(true);
  }

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
    setDateInput(true);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };
  const startDateN = format(new Date(startDate), "yyyy M dd");
  const endDateN = format(new Date(endDate), "yyyy M dd");
  const NoNights2 = differenceInDays(new Date(endDateN), new Date(startDateN));
  const total1 = NoNights2 * rental.PricePerNight;
  const total = NoNights * rental.PricePerNight;

  return (
    <div>
      <SearchBar placeholder={placeholder} />
      <div className="md:flex">
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
          <div>Amenities Here</div>
          <div>Reviews Here</div>
          <div className="h-[300px] w-full my-3">
            {isLoaded && <SingleMap rental={rental} />}
          </div>
        </div>
        {/* Container for Calender */}
        <div className="mt-[90px] mx-[50px]">
          {/* {arrivalNew}
          {departureNew} */}
          <div className="sticky top-0">
            {!dateInput && (
              <div
                className="border-2 border-gray-400 rounded flex justify-center min-w-[332px] cursor-pointer"
                onClick={setInititalDates}
              >
                <div className="p-3 w-full">
                  <p className="text-[12px] text-gray-400 leading-none">
                    Check-in
                  </p>
                  {arrivalNew}
                </div>
                <div className="p-3 border-l-2 w-full">
                  <p className="text-[12px] text-gray-400 leading-none">
                    Check-out
                  </p>
                  {departureNew}
                </div>
              </div>
            )}
            {dateInput && (
              <div
                className="border-2 border-gray-400 rounded flex justify-center cursor-pointer"
                onClick={setInititalDates}
              >
                <div className="p-3 w-full">
                  <p className="text-[12px] text-gray-400 leading-none">
                    Check-in
                  </p>
                  {format(new Date(startDate), "dd MMM yyyy")}
                </div>
                <div className="p-3 border-l-2 w-full">
                  <p className="text-[12px] text-gray-400 leading-none">
                    Check-out
                  </p>
                  {format(new Date(endDate), "dd MMM yyyy")}
                </div>
              </div>
            )}

            {isVisible && (
              <div>
                <DateRangePicker
                  ranges={[selectionRange]}
                  minDate={new Date()}
                  rangeColors={["#db1d77"]}
                  onChange={handleSelect}
                />
              </div>
            )}
            <div>
              {!isVisible && (
                <div className="mt-8 text-lg">
                  £{total}{" "}
                  <span className="text-gray-500 font-bold">total</span>
                  <span className="float-right text-gray-400">
                    {NoNights} Night stay
                  </span>
                </div>
              )}
              {isVisible && (
                <div className="mt-8 text-lg">
                  £{total1}{" "}
                  <span className="text-gray-500 font-bold">total</span>
                  <span className="float-right text-gray-400">
                    {NoNights2} Night stay
                  </span>
                </div>
              )}
            </div>
            <div className="flex space-x-2 justify-center mt-2">
              <button
                className="inline-block px-6 py-3 w-3/4 bg-pink-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md 
              hover:bg-pink-900 hover:shadow-lg  focus:shadow-lg focus:outline-none 
              focus:ring-0 active:bg-pink-600 active:shadow-lg transition duration-150 ease-in-out"
              >
                Enquire
              </button>
            </div>
            <div className="flex space-x-2 justify-center mt-2">
              <button
                className="inline-block px-6 py-3 w-3/4 bg-pink-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md 
              hover:bg-pink-900 hover:shadow-lg  focus:shadow-lg focus:outline-none 
              focus:ring-0 active:bg-pink-600 active:shadow-lg transition duration-150 ease-in-out"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
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
