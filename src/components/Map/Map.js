import { useMemo } from "react";
import {
  GoogleMap,
  Marker,
  MarkerClusterer,
  InfoWindow,
} from "@react-google-maps/api";
import { getCenter } from "geolib";
import { useState } from "react";
import Link from "next/link";
import MapCard from "./MapCard";

function Map({ rentals }) {
  const [selectedLocation, setSelectedLocation] = useState({});
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  const coordinates = rentals.map((rental) => ({
    lng: rental.lng,
    lat: rental.lat,
  }));

  const center = getCenter(coordinates);

  const lat = center.latitude;
  const lng = center.longitude;

  const googleCenter = { lat: lat, lng: lng };

  return (
    <>
      <div className="h-full w-full">
        <GoogleMap
          zoom={12}
          center={googleCenter}
          mapContainerClassName="w-full h-full"
          options={options}
          onClick={() => setSelectedLocation(!selectedLocation)}
        >
          <MarkerClusterer>
            {(clusterer) =>
              rentals.map((rental) => (
                <div key={rental.id} className="bounce">
                  <Marker
                    onLoad={false}
                    key={rental.id}
                    position={{ lat: rental.lat, lng: rental.lng }}
                    clusterer={clusterer}
                    onClick={() => setSelectedLocation(rental)}
                  />
                  {selectedLocation.lng === rental.lng && (
                    <InfoWindow
                      onClose={() => setSelectedLocation({})}
                      onLoad={false}
                      position={{ lat: rental.lat, lng: rental.lng }}
                    >
                      <Link key={rental.id} href={`/rentals/${rental.id}`}>
                        <div className=" cursor-pointer">
                          <MapCard rental={rental} />
                        </div>
                      </Link>
                    </InfoWindow>
                  )}
                </div>
              ))
            }
          </MarkerClusterer>
        </GoogleMap>
      </div>
    </>
  );
}

export default Map;
