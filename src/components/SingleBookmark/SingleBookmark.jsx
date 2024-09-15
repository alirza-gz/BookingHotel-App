import { HiArrowLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { useBookmark } from "../../context/BookmarkListContext";
import Loader from "../Loader/Loader";
import { useEffect } from "react";
import ReactCountryFlag from "react-country-flag";

function SingleBookmark() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentBookmark, getBookmark, isLoading } =
    useBookmark();

  useEffect(() => {
    getBookmark(id);
  }, [id]);

  if (isLoading) return <Loader />;
  return (
    <div>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="flex items-center gap-x-1 py-1 px-4 border border-gray-400 rounded-lg mb-4"
      >
        <HiArrowLeft className="w-3 h-3" />
        <p>Back</p>
      </button>
      <h2 className="text-2xl font-bold mb-4">{currentBookmark.cityName}</h2>
      <div
        className={
          "flex justify-between items-center p-3.5 border border-gray-400 rounded-2xl"
        }
      >
        <div className="flex items-center justify-between w-full text-[1.05rem]">
          <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
          <p>
            <strong>{currentBookmark.cityName}</strong>
          </p>
          <p>{currentBookmark.country}</p>
        </div>
      </div>
    </div>
  );
}

export default SingleBookmark;
