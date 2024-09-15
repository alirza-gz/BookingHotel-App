import { useEffect, useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
import Loader from "../Loader/Loader";
import { useBookmark } from "../../context/BookmarkListContext";

const BASE_GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

function AddNewBookmark() {
  const [lat, lng] = useUrlLocation();
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState(null);
  const { createBookmark } = useBookmark();

  useEffect(() => {
    if (!lat || !lng) return;

    async function fetchLocationData() {
      setIsLoadingGeoCoding(true);
      setGeoCodingError(null);
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );
        if (!data.countryCode)
          throw new Error(
            "this location is not a city! please click somewhere else."
          );

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        setGeoCodingError(error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
    fetchLocationData();
  }, [lat, lng]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName && !country) return;

    const newBookmark = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + " " + country,
    };
    await createBookmark(newBookmark);
    navigate("/bookmark");
  };

  if (isLoadingGeoCoding) return <Loader />;
  if (geoCodingError) return <storng>{geoCodingError}</storng>;
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Bookmark New Location</h2>
      <form className="flex flex-col gap-y-2" onSubmit={handleSubmit}>
        <label htmlFor="city">
          City Name
          <input
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            type="text"
            name="city"
            id="city"
            className="border border-gray-400 p-2 block w-full rounded-lg mt-1 focus:outline-none text-sm"
          />
        </label>
        <label>
          Country
          <div className="border border-gray-400 p-2 rounded-lg mt-1 flex justify-between pr-3">
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              type="text"
              name="country"
              id="country"
              className="w-full focus:outline-none text-sm"
            />
            <ReactCountryFlag className="flag" svg countryCode={countryCode} />
          </div>
        </label>
        <div className="flex items-center justify-between mt-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className="flex items-center gap-x-1 py-1 px-4 border border-gray-400 rounded-lg"
          >
            <HiArrowLeft className="w-3 h-3" />
            <p>Back</p>
          </button>
          <button className="py-1 px-4 bg-indigo-600 text-white rounded-lg">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;
