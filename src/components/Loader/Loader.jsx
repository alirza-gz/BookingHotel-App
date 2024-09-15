import { LoaderIcon } from "react-hot-toast";

function Loader() {
  return (
    <div className="container mx-auto 2xl:max-w-screen-2xl text-gray-600 flex items-center gap-4 my-4">
      <p className="text-[1.05rem]"> Loading Data...</p>
      <LoaderIcon style={{ width: "1.3rem", height: "1.3rem" }} />
    </div>
  );
}

export default Loader;
