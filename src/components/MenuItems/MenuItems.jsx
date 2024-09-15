import { format } from "date-fns";
import { useRef, useState } from "react";
import { DateRange } from "react-date-range";
import { FaHome } from "react-icons/fa";
import { HiCalendar, HiSearch } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
import { PiMinus, PiPlus } from "react-icons/pi";
import {
  createSearchParams,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import useOutsideClick from "../../hooks/useOutsideClick";

function MenuItems({ onCloseHandler }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const navigate = useNavigate();

  const handleOptions = (type, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [type]: operation === "+" ? options[type] + 1 : options[type] - 1,
      };
    });
  };

  const handleSearch = () => {
    const encodedParams = createSearchParams({
      destination,
      options: JSON.stringify(options),
      date: JSON.stringify(date),
    });
    // !nokte : for update: setSearchParams(encodedParams)
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });

    onCloseHandler();
  };

  return (
    <div className="mx-4 md:px-4 py-2 md:py-5 md:border rounded-3xl flex flex-col-reverse items-center gap-y-6 md:flex-row md:gap-x-6 md:gap-y-0">
      {/* Search Input */}
      <div className="flex items-center gap-x-2">
        <MdLocationOn className="w-6 h-6 text-red-500" />
        <input
          type="text"
          name="destination"
          id="destination"
          value={destination}
          placeholder="Where to go?"
          className="outline-none border-none md:w-8/12 lg:w-auto"
          onChange={(e) => setDestination(e.target.value)}
        />
        <div className="w-[1px] h-[30px] bg-gray-400 ml-6 hidden md:inline-block"></div>
      </div>
      {/* Date Picker */}
      <div className="flex items-center justify-center md:justify-start w-full md:w-auto  gap-x-2 relative border-b pb-6 md:pb-0 md:border-none">
        <HiCalendar className="w-6 h-6 text-indigo-600" />
        <div onClick={() => setOpenDate((is) => !is)} className="text-sm">
          {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
            date[0].endDate,
            "MM/dd/yyyy"
          )}
      `}
        </div>
        {openDate && (
          <DateRange
            className="absolute top-8 md:top-[3rem] lg:top-12 md:-left-20 z-[1002]"
            onChange={(item) => setDate([item.selection])}
            minDate={new Date()}
            moveRangeOnFirstSelection={true}
            ranges={date}
            rangeColors={["#FD5B61"]}
          />
        )}
        <div className="w-[1px] h-[30px] bg-gray-400 ml-6 hidden md:inline-block"></div>
      </div>
      {/* Drop Down */}
      <div className="flex items-center justify-center md:justify-start gap-x-2 relative z-[1003] border-b pb-6 md:pb-0 w-full md:w-auto md:border-none">
        <div
          id="optionDropDown"
          onClick={() => setOpenOptions((is) => !is)}
          className=" text-[1.05rem]"
        >
          {options.adult} adult &bull; {options.children} children &bull;{" "}
          {options.room} room
        </div>
        {openOptions && (
          <GuestOptionList
            options={options}
            setOpenOptions={setOpenOptions}
            handleOptions={handleOptions}
          />
        )}
        <div className="w-[1px] h-[30px] bg-gray-400 ml-6 hidden md:inline-block"></div>
      </div>
      {/* Search Btn */}
      <div className="border-b pb-6 md:pb-0 w-full md:w-auto flex justify-center gap-x-4 md:gap-x-0 md:justify-start items-center md:border-none">
        <button
          onClick={handleSearch}
          className="bg-indigo-600 text-white p-2.5 rounded-xl"
        >
          <HiSearch className="w-6 h-6" />
        </button>
        <Link to="/">
          <button
            className="bg-indigo-600 text-white p-2.5 rounded-xl ml-2"
            onClick={onCloseHandler}
          >
            <FaHome className="w-6 h-6" />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default MenuItems;

function GuestOptionList({ options, setOpenOptions, handleOptions }) {
  const optionsRef = useRef();
  useOutsideClick(optionsRef, "optionDropDown", () => setOpenOptions(false));

  return (
    <div
      ref={optionsRef}
      className="absolute border border-gray-100 bg-white shadow-[0_0_10px_#efefef] top-9 w-[13.5rem] p-4 rounded-2xl space-y-4
      "
    >
      <OptionItem
        type="adult"
        options={options}
        handleOptions={handleOptions}
        minLimit={1}
      />
      <OptionItem
        type="children"
        options={options}
        handleOptions={handleOptions}
        minLimit={0}
      />
      <OptionItem
        type="room"
        options={options}
        handleOptions={handleOptions}
        minLimit={1}
      />
    </div>
  );
}

function OptionItem({ type, options, handleOptions, minLimit }) {
  return (
    <div className="flex items-center justify-between">
      <div>{type}</div>
      <div className="flex items-center gap-x-3">
        <button
          disabled={options[type] <= minLimit}
          onClick={() => handleOptions(type, "-")}
          className=" bg-slate-100 rounded-lg p-2"
        >
          <PiMinus />
        </button>
        <span>{options[type]}</span>
        <button
          onClick={() => handleOptions(type, "+")}
          className="bg-slate-100 rounded-lg p-2"
        >
          <PiPlus />
        </button>
      </div>
    </div>
  );
}
