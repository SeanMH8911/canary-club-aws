import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useState } from "react";
import { useRouter } from "next/router";
import { FaSearch, FaUsers } from "react-icons/fa";

function SearchBar({ placeholder }) {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);
  const router = useRouter();

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };
  const resetInput = () => {
    setSearchInput("");
  };

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: (searchInput =
          searchInput.charAt(0).toUpperCase() + searchInput.slice(1)),
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGuests,
      },
    });
  };
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };
  return (
    <>
      <div className="">
        <div className="flex items-center border-2 rounded-full py-2 shadow-sm max-w-[400px] m-auto">
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-5 bg-transparent outline-none flex-grow text-sm placeholder-gray-400 text-gray-600"
            type="text"
            placeholder={placeholder || "Start your search"}
          />
          <FaSearch
            className="hidden md:inline-flex w-8 h-8 bg-red-400 text-white rounded-full 
        p-1 cursor-pointer md:mx-2"
          />
        </div>
        {searchInput && (
          <div className="w-[340px] m-auto">
            <div className=" flex flex-col col-span-3 mx-auto">
              <DateRangePicker
                ranges={[selectionRange]}
                minDate={new Date()}
                rangeColors={["#db1d77"]}
                onChange={handleSelect}
              />
              <div className="flex items-center border-b mb-4">
                <h2 className="text-2xl flex-grow font-semibold">
                  Number of Guests
                </h2>
                <FaUsers className="h-5" />
                <input
                  value={noOfGuests}
                  onChange={(e) => setNoOfGuests(e.target.value)}
                  min={1}
                  type="number"
                  className="w-12 pl-2 text-lg outline-none text-pink-600"
                />
              </div>
              <div className="flex">
                <button
                  onClick={resetInput}
                  className="flex-grow text-gray-500"
                >
                  Cancel
                </button>
                <button onClick={search} className="flex-grow text-pink-600">
                  Search
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SearchBar;
