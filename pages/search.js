import { API, graphqlOperation } from "aws-amplify";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import SearchBar from "../src/components/navigation/SearchBar";
import { listRentals } from "../graphql/queries";
import RentalCard from "../src/components/rentals/RentalCard";
import Link from "next/link";

function Search() {
  const router = useRouter();
  const { location, startDate, endDate, noOfGuests } = router.query;
  const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
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

  return (
    <div>
      <SearchBar
        rentals={rentals}
        placeholder={`${location}  | ${range} | ${noOfGuests}`}
      />

      <main className="flex">
        <section className="flex-grow pt-14 px-6">
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
              <Link key={id} href={`/rentals/${rental.id}`}>
                <a>
                  <RentalCard rental={rental} />
                </a>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Search;
