import { Auth, API, Storage } from "aws-amplify";
import { useState, useRef } from "react"; // new
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";
// import SimpleMDE from "react-simplemde-editor";
// import "easymde/dist/easymde.min.css";
import { createRental } from "../graphql/mutations";

const initialState = {
  title: "",
  //   description: "",
  //   MaxNumberOfGuest: "",
  //   MaxNumberOfAdults: "",
  //   MaxNumberOfChildren: "",
  //   NumberOfBedrooms: "",
  //   NumberOfBaths: "",
  //   RoomSize: "",
  //   PricePerNight: "",
  //   AdditionalCosts: "",
  //   StreetName: "",
  //   Area: "",
  //   ZipCode: "",
  //   Island: "",
  //   lat: "",
  //   lon: "",
};

function CreateRental() {
  const [rental, setRental] = useState(initialState);
  const {
    title,
    // description,
    // MaxNumberOfGuest,
    // MaxNumberOfAdults,
    // MaxNumberOfChildren,
    // NumberOfBedrooms,
    // NumberOfBaths,
    // RoomSize,
    // PricePerNight,
    // AdditionalCosts,
    // StreetName,
    // Area,
    // ZipCode,
    // Island,
    // lat,
    // lon,
  } = rental;
  const router = useRouter();

  function onChange(e) {
    setRental(() => ({ ...rental, [e.target.name]: e.target.value }));
  }
  async function createNewRental() {
    if (!title) return;
    const id = uuid();
    rental.id = id;

    await API.graphql({
      query: createRental,
      variables: { input: rental },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    router.push(`/rentals/${id}`);
  }
  return (
    <>
      <div>
        <h1 className="text-3xl font-semibold tracking-wide mt-6">
          Create new rental
        </h1>
        <input
          onChange={onChange}
          name="title"
          placeholder="Title"
          value={rental.title}
          className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
        />
        <button
          type="button"
          className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
          onClick={createNewRental}
        >
          Create Rental
        </button>
      </div>
    </>
  );
}

export default CreateRental;
