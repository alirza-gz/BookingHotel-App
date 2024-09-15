import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";
function LocationList() {
  const { data, isLoading } = useFetch("http://localhost:5000/hotels", "");

  if (isLoading) return <Loader />;
  return (
    <div className="container mx-auto 2xl:max-w-screen-2xl my-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Nearby Locations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
        {data.map((item) => {
          return <LocationItem key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
}

export default LocationList;

function LocationItem({ item }) {
  return (
    <div>
      <img
        className="w-full h-80 rounded-xl object-cover object-center"
        src={item.xl_picture_url}
        alt={item.name}
      />
      <div className="bg-white space-y-1.5 w-11/12 mx-auto p-4 shadow-lg rounded-2xl transform -translate-y-10">
        <div>{item.smart_location}</div>
        <div className=" text-gray-400">{item.name}</div>
        <div className="flex items-center gap-x-1">
          <span className="font-bold">€ {item.price}</span>
          <p className="text-gray-400">night</p>
        </div>
      </div>
    </div>
  );
}
