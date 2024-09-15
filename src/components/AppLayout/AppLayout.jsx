import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useHotels } from "../../context/HotelsProvider";

function AppLayout() {
  const { hotels } = useHotels();
  return (
    <div className="px-4 my-4 flex flex-col md:flex-row justify-between items-stretch h-screen">
      <div className="md:overflow-y-scroll md:pr-4 md:w-[35%] lg:w-1/2">
        <Outlet />
      </div>
      <div className="flex-1 h-64 md:h-auto">
        <Map markerLocations={hotels} />
      </div>
    </div>
  );
}

export default AppLayout;
