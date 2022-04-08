import { API, Storage } from "aws-amplify";
import { useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";
import { createRental } from "../graphql/mutations";

const initialState = {
  title: "",
  description: "",
  MaxNumberOfGuest: "",
  MaxNumberOfAdults: "",
  MaxNumberOfChildren: "",
  NumberOfBedrooms: "",
  NumberOfBaths: "",
  PricePerNight: "",
  AdditionalCosts: "",
  StreetName: "",
  Area: "",
  ZipCode: "",
  Island: "",
  lat: "",
  lon: "",
};
function CreateRental() {
  const [rental, setRental] = useState(initialState);
  const [image, setImage] = useState(null);
  const hiddenFileInput = useRef(null);
  const {
    title,
    description,
    MaxNumberOfGuest,
    MaxNumberOfAdults,
    MaxNumberOfChildren,
    NumberOfBedrooms,
    NumberOfBaths,
    PricePerNight,
    AdditionalCosts,
    StreetName,
    Area,
    ZipCode,
    Island,
    lat,
    lon,
  } = rental;
  const router = useRouter();

  function onChange(e) {
    setRental(() => ({ ...rental, [e.target.name]: e.target.value }));
    console.log(e);
  }

  async function createNewRental() {
    if (
      !title ||
      !description ||
      !MaxNumberOfGuest ||
      !MaxNumberOfAdults ||
      !MaxNumberOfChildren ||
      !NumberOfBedrooms ||
      !NumberOfBaths ||
      !PricePerNight ||
      !AdditionalCosts ||
      !StreetName ||
      !Area ||
      !ZipCode ||
      !Island ||
      !lat ||
      !lon
    )
      return;
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
          className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 "
        />
        <textarea
          onChange={onChange}
          name="description"
          placeholder="description"
          value={rental.description}
          className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 "
        />
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div>
            <input
              onChange={onChange}
              name="MaxNumberOfGuest"
              placeholder="Number of guests"
              value={rental.MaxNumberOfGuest}
              className="border-b pb-2 text-lg my-4 focus:outline-none font-light text-gray-500 placeholder-gray-500"
            />
          </div>
          <div>
            <input
              onChange={onChange}
              name="MaxNumberOfAdults"
              placeholder="Number of adults"
              value={rental.MaxNumberOfAdults}
              className="border-b pb-2 text-lg my-4 focus:outline-none font-light text-gray-500 placeholder-gray-500 "
            />
          </div>
          <div>
            <input
              onChange={onChange}
              name="MaxNumberOfChildren"
              placeholder="Number of children"
              value={rental.MaxNumberOfChildren}
              className="border-b pb-2 text-lg my-4 focus:outline-none font-light text-gray-500 placeholder-gray-500 "
            />
          </div>
          <div>
            <input
              onChange={onChange}
              name="NumberOfBedrooms"
              placeholder="Number of bedrooms"
              value={rental.NumberOfBedrooms}
              className="border-b pb-2 text-lg my-4 focus:outline-none font-light text-gray-500 placeholder-gray-500 "
            />
          </div>
          <div>
            <input
              onChange={onChange}
              name="NumberOfBaths"
              placeholder="Number of baths"
              value={rental.NumberOfBaths}
              className="border-b pb-2 text-lg my-4 focus:outline-none font-light text-gray-500 placeholder-gray-500 "
            />
          </div>
          <div>
            <input
              onChange={onChange}
              name="PricePerNight"
              placeholder="Price Per Night (£)"
              value={rental.PricePerNight}
              className="border-b pb-2 text-lg my-4 focus:outline-none font-light text-gray-500 placeholder-gray-500 "
            />
          </div>
          <div>
            <input
              onChange={onChange}
              name="AdditionalCosts"
              placeholder="Additional Costs (£) "
              value={rental.AdditionalCosts}
              className="border-b pb-2 text-lg my-4 focus:outline-none font-light text-gray-500 placeholder-gray-500 "
            />
          </div>
        </div>
        <h2 className="text-3xl font-semibold tracking-wide mt-6">Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div>
            <select
              name="Island"
              value={rental.island}
              onChange={onChange}
              placeholder={"Select Island"}
              className="border-b p-2 text-lg my-4 focus:outline-none font-light text-gray-500 placeholder-gray-500 "
            >
              <option value="" disabled selected hidden>
                Select Island
              </option>
              <option value="Tenerife">Tenerife</option>
              <option value="Lanzarote">Lanzarote</option>
              <option value="Fuerteventura">Fuerteventura</option>
              <option value="Gran Canaria">Gran Canaria</option>
            </select>
          </div>
          <div>
            <input
              onChange={onChange}
              name="Area"
              placeholder="Area"
              value={rental.Area}
              className="border-b pb-2 text-lg my-4 focus:outline-none font-light text-gray-500 placeholder-gray-500 "
            />
          </div>
          <div>
            <input
              onChange={onChange}
              name="StreetName"
              placeholder="Street Name"
              value={rental.StreetName}
              className="border-b pb-2 text-lg my-4 focus:outline-none font-light text-gray-500 placeholder-gray-500 "
            />
          </div>

          <div>
            <input
              onChange={onChange}
              name="ZipCode"
              placeholder="Zip Code"
              value={rental.ZipCode}
              className="border-b pb-2 text-lg my-4 focus:outline-none font-light text-gray-500 placeholder-gray-500 "
            />
          </div>

          <div>
            <input
              onChange={onChange}
              name="lat"
              placeholder="Latitude"
              value={rental.lat}
              className="border-b pb-2 text-lg my-4 focus:outline-none font-light text-gray-500 placeholder-gray-500 "
            />
          </div>
          <div>
            <input
              onChange={onChange}
              name="lon"
              placeholder="Longitude"
              value={rental.lon}
              className="border-b pb-2 text-lg my-4 focus:outline-none font-light text-gray-500 placeholder-gray-500 "
            />
          </div>
        </div>
        <div className="mt-6">
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
            className="mt-4 mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
            onClick={createNewRental}
          >
            Create Rental
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateRental;
