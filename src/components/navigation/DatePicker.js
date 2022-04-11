import React from "react";
import { DateRangePicker } from "react-date-range";
import { useState } from "react";
import { useRouter } from "next/router";
import { FaSearch, FaUsers } from "react-icons/fa";

function DatePicker({ searchInput }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };
  const resetInput = () => {
    setSearchInput("");
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };
  const router = useRouter();

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: (searchInput =
          searchInput.charAt(0).toUpperCase() + searchInput.slice(1)),
        arrival: startDate.toISOString(),
        departure: endDate.toISOString(),
        noOfGuests,
      },
    });
  };
  return (
    <div>
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
            {/* <FaUsers className="" size={10} /> */}
            <input
              value={noOfGuests}
              onChange={(e) => setNoOfGuests(e.target.value)}
              min={1}
              type="number"
              className="w-12 pl-2 text-lg outline-none text-pink-600"
            />
          </div>
          <div className="flex">
            <button onClick={resetInput} className="flex-grow text-gray-500">
              Cancel
            </button>
            <button onClick={search} className="flex-grow text-pink-600">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DatePicker;
