import { API, graphqlOperation } from "aws-amplify";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { format, differenceInDays } from "date-fns";
import SearchBar from "../src/components/navigation/SearchBar";
import { listRentals } from "../graphql/queries";
import RentalCard from "../src/components/rentals/RentalCard";
import Link from "next/link";
import Map from "../src/components/Map/Map";
import { useLoadScript } from "@react-google-maps/api";

function Search({}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  const router = useRouter();
  const { location, arrival, departure, noOfGuests } = router.query;
  const formattedStartDate = format(new Date(arrival), "dd MMMM yy");
  const formattedEndDate = format(new Date(departure), "dd MMMM yy");
  const range = `${formattedStartDate} - ${formattedEndDate}`;
  const [rentals, setRentals] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);
  async function fetchPosts() {
    const postData = await API.graphql(
      graphqlOperation(listRentals, {
        filter: { Island: { eq: location } },
      })
    );
    setRentals(postData.data.listRentals.items);
  }

  const startDateN = format(new Date(formattedStartDate), "yyyy M dd");
  const endDateN = format(new Date(formattedEndDate), "yyyy M dd");
  const NoNights = differenceInDays(new Date(endDateN), new Date(startDateN));

  return (
    <div>
      <SearchBar
        rentals={rentals}
        startDate={arrival}
        endDate={departure}
        placeholder={`${location}  | ${range} | ${noOfGuests}`}
      />

      <div className="md:flex">
        <main className="flex  w-3/4">
          <section className="flex-grow pt-14">
            <p className="text-xs">
              300+ Stays - {range} - for {noOfGuests} guests
            </p>
            <h1 className="text-3xl font-semibold mt-2 mb-6">
              Stays In {location}
            </h1>
            <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
              <p className="button">Cancellation Flexibility</p>
              <p className="button">Type of Palce</p>
              <p className="button">Price</p>
              <p className="button">Rooms and Beds</p>
              <p className="button">More filters</p>
            </div>

            <div className="flex flex-col">
              {rentals.map((rental, id) => (
                <a
                  key={id}
                  onClick={() =>
                    router.push({
                      pathname: `/rentals/${rental.id}`,
                      query: {
                        arrival,
                        departure,
                        noOfGuests,
                        NoNights,
                      },
                    })
                  }
                >
                  <RentalCard key={id} rental={rental} NoNights={NoNights} />
                </a>
              ))}
            </div>
          </section>
        </main>
        <div className=" hidden md:inline sticky top-0 mt-[184px] h-screen w-[600px] ">
          {isLoaded && <Map rentals={rentals} />}
        </div>
      </div>
    </div>
  );
}

export default Search;
