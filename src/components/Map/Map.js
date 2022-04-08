import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
function Map() {
  // if (!isLoaded) return <div>Loading...</div>;
  const center = { lat: 28.344085, lng: -16.427962 };
  return (
    <>
      <div className="h-full w-full">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="w-full h-full"
        ></GoogleMap>
      </div>
    </>
  );
}

export default Map;
