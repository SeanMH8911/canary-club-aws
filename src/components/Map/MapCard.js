import { useState, useEffect } from "react";
import { Storage } from "aws-amplify";

function MapCard({ rental }) {
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
      <div>
        <div>
          <img src={FeaturedImage} className="w-full h-40 " />
        </div>
        <div className="p-1">
          <p className="text-lg">£{rental.PricePerNight}</p>
        </div>
      </div>
    </>
  );
}

export default MapCard;
