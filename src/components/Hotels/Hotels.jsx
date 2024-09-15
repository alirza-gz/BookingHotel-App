import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useHotels } from "../../context/HotelsProvider";

function Hotels() {
  const { isLoading, hotels , currentHotel } = useHotels();

  if (isLoading) return <Loader />;
  return (
    <div className="mb-6 md:mb-0">
      <h1 className="text-2xl font-bold mb-4">
        Search Results ({hotels.length})
      </h1>
      <div className="flex flex-col gap-y-3">
        {hotels.map((hotel) => {
          return (
            <Link
              key={hotel.id}
              to={`/hotels/${hotel.id}?lat=${hotel.latitude}&lng=${hotel.longitude}`}
            >
              <div className={`flex items-center gap-x-4 p-1 border rounded-2xl  ${currentHotel?.id == hotel.id ? "border-[3px] border-indigo-600 bg-indigo-50" : "border-gray-400"}`}>
                <img
                  src={hotel.xl_picture_url}
                  alt={hotel.name}
                  className="w-24 h-24 rounded-xl object-cover"
                />
                <div className=" space-y-1">
                  <p>{hotel.smart_location}</p>
                  <p className="text-gray-400">{hotel.name}</p>{" "}
                  <div className="flex items-center gap-x-1">
                    <span className="font-bold">€ {hotel.price}</span>
                    <p>night</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Hotels;
