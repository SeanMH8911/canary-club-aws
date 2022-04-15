import { useMemo } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { getCenter } from "geolib";
import { useState } from "react";
import Link from "next/link";
import MapCard from "./MapCard";

function Map({ rental }) {
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  const coordinates = {
    lng: rental.lng,
    lat: rental.lat,
  };
  const center = getCenter(coordinates);

  const lat = coordinates.lat;
  const lng = coordinates.lng;

  const googleCenter = { lat: lat, lng: lng };

  return (
    <>
      <div className="h-full w-full">
        <GoogleMap
          zoom={14}
          center={googleCenter}
          mapContainerClassName="w-full h-full"
          options={options}
        >
          <Marker
            onLoad={false}
            key={rental.id}
            position={{ lat: lat, lng: lng }}
          />
        </GoogleMap>
      </div>
    </>
  );
}

export default Map;
