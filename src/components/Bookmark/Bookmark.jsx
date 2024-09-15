import { Link } from "react-router-dom";
import { useBookmark } from "../../context/BookmarkListContext";
import ReactCountryFlag from "react-country-flag";
import { HiTrash } from "react-icons/hi";
import Loader from "../Loader/Loader";

function Bookmark() {
  const { isLoading, bookmarks, currentBookmark, deleteBookmark } =
    useBookmark();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
  };

  if (isLoading) return <Loader />;
  if(!bookmarks.length) return <p>No Bookmarked Location found</p>;
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">BookmarkList</h2>
      <div className="flex flex-col gap-y-4">
        {bookmarks.map((bookmark) => {
          return (
            <Link
              key={bookmark.id}
              to={`/bookmark/${bookmark.id}?lat=${bookmark.latitude}&lng=${bookmark.longitude}`}
            >
              <div
                className={`flex justify-between items-center p-3.5 border rounded-2xl ${
                  currentBookmark?.id == bookmark.id
                    ? "border-2 border-indigo-600 bg-indigo-50"
                    : "border-gray-400"
                }`}
              >
                <div className="flex items-center gap-x-2 text-[1.05rem]">
                  <ReactCountryFlag svg countryCode={bookmark.countryCode} />
                  <p>
                    <strong>{bookmark.cityName}</strong>
                  </p>
                  <p>{bookmark.country}</p>
                </div>
                <button onClick={(e) => handleDelete(e, bookmark.id)}>
                  <HiTrash className="w-5 h-5 text-red-500" />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Bookmark;
