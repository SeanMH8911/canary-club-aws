import { FaStar, FaRegHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Storage } from "aws-amplify";
import Image from "next/image";

function RentalCard({ rental }) {
  const [FeaturedImage, setFeaturedImage] = useState(null);
  useEffect(() => {
    updateFeaturedImage();
  }, []);
  async function updateFeaturedImage() {
    if (rental.FeaturedImage) {
      const imageKey = await Storage.get(rental.FeaturedImage);
      setFeaturedImage(imageKey);
    }
  }
  return (
    <>
      <div className=" flex flex-col md:flex-row  py-7 px-2 pr-4 border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t ">
        <div className="relative h-52 w-80 flex-shrink-0">
          <img src={FeaturedImage} className=" rounded" />
        </div>
        <div className="flex flex-col flex-grow pt-2 md:pt-0 md:pl-5 ">
          <div className="flex justify-between">
            {/* <p>{location}</p> */}
            <FaRegHeart className="h-7 cursor-pointer" />
          </div>
          <h4 className="text-xl">{rental.title}</h4>
          <div className="border-b w-10 pt-2" />

          <p className="pt-2 text-sm text-gray-500 flex-grow">
            {/* {rental.description} */}
          </p>
          <div className="flex justify-between items-end pt-5">
            <p className="flex items-center">
              <FaStar className="h-5 text-red-400" />
            </p>
            <div>
              <p className="text-lg font-semibold pb-2 lg:text-2xl">
                £{rental.PricePerNight}
              </p>
              <p className="text-right font-extralight">{}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RentalCard;
