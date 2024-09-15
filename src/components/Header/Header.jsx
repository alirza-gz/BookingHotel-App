import { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Fade as Hamburger } from "hamburger-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { IoBookmark } from "react-icons/io5";
import MenuItems from "../MenuItems/MenuItems";
import MobileMenu from "../MobileMenu/MobileMenu";

function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className=" container mx-auto 2xl:max-w-screen-2xl">
      <div className="flex justify-between lg:justify-center px-4">
        <div className=" flex flex-row-reverse gap-x-4 lg:flex-row lg:gap-x-0 items-center justify-center">
          <NavLink
            to="/bookmark"
            className={({ isActive }) =>
              isActive ? "text-indigo-600 font-medium" : "text-slate-600"
            }
          >
            <p className="flex gap-x-1 items-center">
              <IoBookmark className="w-4 h-4" />
              <span className="text-[1.05rem]">Bookmarks</span>
            </p>
          </NavLink>
          <div className="hidden lg:block">
            <MenuItems />
          </div>
          <User />
        </div>
        <button
          className="lg:hidden"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <Hamburger
            toggled={showMobileMenu}
            toggle={setShowMobileMenu}
            size={20}
          />
        </button>
      </div>
      <div className="lg:hidden relative">
        <div
          className={`${
            showMobileMenu
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          } transform transition-all duration-300 ease-in-out absolute inset-0 z-[1005]`}
        >
          <MobileMenu
            onCloseHandler={() => setShowMobileMenu((prev) => !prev)}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;

function User() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div>
      {isAuthenticated ? (
        <div className="flex items-center gap-x-2">
          <strong className="text-[1.1rem]">{user.name}</strong>
          <button onClick={handleLogout}>
            <FiLogOut className="w-5 h-5 text-red-500" />
          </button>
        </div>
      ) : (
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "text-indigo-600 font-medium" : "text-slate-600"
          }
        >
          <p className="flex gap-x-1 items-center">
            <FiLogIn className="w-4 h-4" />
            <span className="text-[1.05rem]">Login</span>
          </p>
        </NavLink>
      )}
    </div>
  );
}
