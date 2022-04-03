import { Auth, API, Storage } from "aws-amplify";
import { useState, useEffect, useRef } from "react"; // new
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";
// import SimpleMDE from "react-simplemde-editor";
// import "easymde/dist/easymde.min.css";
import { updateRental } from "../../graphql/mutations";
import { getRental } from "../../graphql/queries";

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

function EditRental() {
  const [rental, setRental] = useState(initialState);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    fetchRental();
    async function fetchRental() {
      if (!id) return;
      const postData = await API.graphql({
        query: getRental,
        variables: { id },
      });
      setRental(postData.data.getRental);
      //   if (postData.data.getRental.coverImage) {
      //     updateCoverImage(postData.data.getPost.coverImage);
      //   }
    }
  }, [id]);
  if (!rental) return null;

  function onChange(e) {
    setRental(() => ({ ...rental, [e.target.name]: e.target.value }));
  }

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
  async function updateCurrentRental() {
    if (!title) return;
    await API.graphql({
      query: updateRental,
      variables: { input: { title, id } },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    router.push("/my-listings");
  }

  return (
    <>
      <div>
        <h1 className="text-3xl font-semibold tracking-wide mt-6">
          Edit rental
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
          onClick={updateCurrentRental}
        >
          Update Rental
        </button>
      </div>
    </>
  );
}

export default EditRental;
