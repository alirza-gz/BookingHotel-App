import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const HotelContext = createContext();
const BASE_URL = "http://localhost:5000/hotels";

export default function HotelsProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentHotel, setCurrentHotel] = useState({});
  const [isLoadingCurrentHotel, setIsLoadingCurrentHotel] = useState(false);
  const room = JSON.parse(searchParams.get("options"))?.room;
  const destionation = searchParams.get("destination");

  const { isLoading, data: hotels } = useFetch(
    BASE_URL,
    `host_location_like=${destionation || ""}&accommodates_gte=${room || 1}`
    //! name_like , host_location_like => _like
    //! q=${destionation || ""} => dar in surat dakhele kolle data ha search mikone
  );

  async function getHotel(id) {
    setIsLoadingCurrentHotel(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrentHotel(data);
      setIsLoadingCurrentHotel(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadingCurrentHotel(false);
    }
  }

  return (
    <HotelContext.Provider
      value={{
        isLoading,
        hotels,
        getHotel,
        currentHotel,
        isLoadingCurrentHotel,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export const useHotels = () => {
  const context = useContext(HotelContext);
  if (context === undefined) {
    throw new Error("HotelContext was used outside of a HotelProvider");
  }
  return context;
};
