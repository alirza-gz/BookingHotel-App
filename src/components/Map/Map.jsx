import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";
import useUrlLocation from "../../hooks/useUrlLocation";

function Map({ markerLocations }) {
  const [mapCenter, setMapCenter] = useState([20, 4]);
  const [lat, lng] = useUrlLocation();
  const {
    isLoading: isLoadingPosition,
    getPosition,
    position: getLocationPosition,
  } = useGeoLocation();

  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (getLocationPosition?.lat && getLocationPosition?.lng)
      setMapCenter([getLocationPosition.lat, getLocationPosition.lng]);
  }, [getLocationPosition]);

  return (
    <div className="relative h-64 md:h-full bg-gray-100">
      <MapContainer
        className="h-full"
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
      >
        <button
          onClick={getPosition}
          className="absolute bg-indigo-600 rounded-lg z-[1002] bottom-5 left-5 py-0.5 px-2 text-white font-bold shadow-[0_0_10px_rgb(79_70_229)]"
        >
          {isLoadingPosition ? "Loading..." : "Use Your Location"}
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <ChangeCenter position={mapCenter} />
        <DetectClick />
        {markerLocations.map((item) => (
          <Marker key={item.id} position={[item.latitude, item.longitude]}>
            <Popup>{item.host_location}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
export default Map;

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) =>
      navigate(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}
