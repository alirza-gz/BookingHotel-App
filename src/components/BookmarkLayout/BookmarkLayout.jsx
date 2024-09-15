import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useBookmark } from "../../context/BookmarkListContext";

function BookmarkLayout() {
  const { bookmarks } = useBookmark();
  return (
    <div className="px-4 my-4 flex flex-col gap-y-8 md:gap-y-0 md:flex-row md:justify-between items-stretch h-screen">
      <div className="md:overflow-y-scroll md:pr-4 md:w-[35%] lg:w-1/2">
        <Outlet />
      </div>
      <div className="flex-1 h-64 md:h-auto">
        <Map markerLocations={bookmarks} />
      </div>
    </div>
  );
}

export default BookmarkLayout;
