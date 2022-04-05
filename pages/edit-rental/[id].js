import { Auth, API, Storage } from "aws-amplify";
import { useState, useEffect, useRef } from "react"; // new
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";
// import SimpleMDE from "react-simplemde-editor";
// import "easymde/dist/easymde.min.css";
import { updateRental } from "../../graphql/mutations";
import { getRental } from "../../graphql/queries";

function EditRental() {
  const [rental, setRental] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const [FeaturedImage, setFeaturedImage] = useState(null);
  const [localImage, setLocalImage] = useState(null);
  const fileInput = useRef(null);

  useEffect(() => {
    fetchPost();
    async function fetchPost() {
      if (!id) return;
      const postData = await API.graphql({
        query: getRental,
        variables: { id },
      });
      setRental(postData.data.getRental);
      if (postData.data.getRental.FeaturedImage) {
        updateFeaturedImage(postData.data.getRental.FeaturedImage);
      }
    }
  }, [id]);
  if (!rental) return null;
  async function updateFeaturedImage(FeaturedImage) {
    const imageKey = await Storage.get(FeaturedImage);
    setFeaturedImage(imageKey);
  }
  async function uploadImage() {
    fileInput.current.click();
  }
  function handleChange(e) {
    const fileUploaded = e.target.files[0];
    if (!fileUploaded) return;
    setFeaturedImage(fileUploaded);
    setLocalImage(URL.createObjectURL(fileUploaded));
  }
  function onChange(e) {
    setRental(() => ({ ...rental, [e.target.name]: e.target.value }));
  }
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

  async function updateCurrentRental() {
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
    const rentalUpdated = {
      id,
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
    };
    // check to see if there is a cover image and that it has been updated
    if (FeaturedImage && localImage) {
      const fileName = `${FeaturedImage.name}_${uuid()}`;
      rentalUpdated.FeaturedImage = fileName;
      await Storage.put(fileName, FeaturedImage);
    }
    await API.graphql({
      query: updateRental,
      variables: { input: rentalUpdated },
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

        {FeaturedImage && (
          <img
            src={localImage ? localImage : FeaturedImage}
            className="mt-4 w-[600px]"
          />
        )}
        <input
          onChange={onChange}
          name="title"
          placeholder="Title"
          value={rental.title}
          className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
        />
        <textarea
          onChange={onChange}
          name="description"
          placeholder="description"
          value={rental.description}
          className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
        />
        <div className="grid grid-cols-4">
          <div>
            <input
              onChange={onChange}
              name="MaxNumberOfGuest"
              placeholder="Maximum number of guests"
              value={rental.MaxNumberOfGuest}
              className="border-b pb-2 text-lg my-4 focus:outline-none font-light text-gray-500 placeholder-gray-500 y-2"
            />
          </div>
          <div>
            <input
              onChange={onChange}
              name="MaxNumberOfAdults"
              placeholder="Maximum number of adults"
              value={rental.MaxNumberOfAdults}
              className="border-b pb-2 text-lg my-4 focus:outline-none font-light text-gray-500 placeholder-gray-500 y-2"
            />
          </div>
          <div>
            <input
              onChange={onChange}
              name="MaxNumberOfChildren"
              placeholder="Maximum number of children"
              value={rental.MaxNumberOfChildren}
              className="border-b pb-2 text-lg my-4 focus:outline-none font-light text-gray-500 placeholder-gray-500 y-2"
            />
          </div>
          <div>
            <input
              onChange={onChange}
              name="NumberOfBedrooms"
              placeholder="Number of bedrooms"
              value={rental.NumberOfBedrooms}
              className="border-b pb-2 text-lg my-4 focus:outline-none font-light text-gray-500 placeholder-gray-500 y-2"
            />
          </div>
          <div>
            <input
              onChange={onChange}
              name="NumberOfBaths"
              placeholder="Number of baths"
              value={rental.NumberOfBaths}
              className="border-b pb-2 text-lg my-4 focus:outline-none font-light text-gray-500 placeholder-gray-500 y-2"
            />
          </div>
          <div>
            <input
              onChange={onChange}
              name="PricePerNight"
              placeholder="Price Per Night (£)"
              value={rental.PricePerNight}
              className="border-b pb-2 text-lg my-4 focus:outline-none font-light text-gray-500 placeholder-gray-500 y-2"
            />
          </div>
          <div>
            <input
              onChange={onChange}
              name="AdditionalCosts"
              placeholder="Additional Costs (£) "
              value={rental.AdditionalCosts}
              className="border-b pb-2 text-lg my-4 focus:outline-none font-light text-gray-500 placeholder-gray-500 y-2"
            />
          </div>
        </div>
        <h2 className="text-3xl font-semibold tracking-wide mt-6">Address</h2>
        <div className="grid grid-cols-4">
          <div>
            <input
              onChange={onChange}
              name="StreetName"
              placeholder="Street Name"
              value={rental.StreetName}
              className="border-b pb-2 text-lg my-4 focus:outline-none font-light text-gray-500 placeholder-gray-500 y-2"
            />
          </div>
          <div>
            <input
              onChange={onChange}
              name="Area"
              placeholder="Area"
              value={rental.Area}
              className="border-b pb-2 text-lg my-4 focus:outline-none font-light text-gray-500 placeholder-gray-500 y-2"
            />
          </div>
          <div>
            <input
              onChange={onChange}
              name="ZipCode"
              placeholder="Zip Code"
              value={rental.ZipCode}
              className="border-b pb-2 text-lg my-4 focus:outline-none font-light text-gray-500 placeholder-gray-500 y-2"
            />
          </div>
          <div>
            <input
              onChange={onChange}
              name="Island"
              placeholder="Island"
              value={rental.Island}
              className="border-b pb-2 text-lg my-4 focus:outline-none font-light text-gray-500 placeholder-gray-500 y-2"
            />
          </div>
          <div>
            <input
              onChange={onChange}
              name="lat"
              placeholder="Latitude"
              value={rental.lat}
              className="border-b pb-2 text-lg my-4 focus:outline-none font-light text-gray-500 placeholder-gray-500 y-2"
            />
          </div>
          <div>
            <input
              onChange={onChange}
              name="lon"
              placeholder="Longitude"
              value={rental.lon}
              className="border-b pb-2 text-lg my-4 focus:outline-none font-light text-gray-500 placeholder-gray-500 y-2"
            />
          </div>
        </div>

        <input
          type="file"
          ref={fileInput}
          className="hidden"
          onChange={handleChange}
        />
        <button
          className="bg-purple-600 text-white font-semibold px-8 py-2 rounded-lg mr-2"
          onClick={uploadImage}
        >
          Update Featured Image
        </button>
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
