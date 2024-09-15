import { useParams } from "react-router-dom";
import { useHotels } from "../../context/HotelsProvider";
import Loader from "../Loader/Loader";
import { useEffect } from "react";

function SingleHotel() {
  const { id } = useParams();
  const { isLoading, getHotel, currentHotel } = useHotels();

  useEffect(() => {
    getHotel(id);
  }, [id]);

  if (isLoading) return <Loader />;
  return (
    <div className="flex-1 mt-6 mb-6 md:mb-10">
      <div>
        <h2 className="font-bold">{currentHotel.name}</h2>
        <div className="mb-4">
          {currentHotel.number_of_reviews} reviews &bull;{" "}
          {currentHotel.smart_location}
        </div>
        <img
          src={currentHotel.xl_picture_url}
          alt={currentHotel.name}
          className=" object-cover rounded-xl"
        />
      </div>
    </div>
  );
}

export default SingleHotel;
