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
  const [image, setImage] = useState(null);
  const hiddenFileInput = useRef(null);
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
    // If there is an image uploaded, store it in S3 and add it to the post metadata
    if (image) {
      const fileName = `${image.name}_${uuid()}`;
      rental.FeaturedImage = fileName;
      await Storage.put(fileName, image);
    }

    await API.graphql({
      query: createRental,
      variables: { input: rental },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    router.push(`/rentals/${id}`);
  }

  async function uploadImage() {
    hiddenFileInput.current.click();
  }
  function handleChange(e) {
    const fileUploaded = e.target.files[0];
    if (!fileUploaded) return;
    setImage(fileUploaded);
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
        {image && <img src={URL.createObjectURL(image)} className="my-4" />}
        <input
          type="file"
          ref={hiddenFileInput}
          className="hidden"
          onChange={handleChange}
        />
        <button
          className="bg-purple-600 text-white font-semibold px-8 py-2 rounded-lg mr-2"
          onClick={uploadImage}
        >
          Upload Featured Image
        </button>
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