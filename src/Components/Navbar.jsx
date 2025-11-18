import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "./Context/AuthProvider";
import logoImage from "../assets/artlogo.jpeg";
import { IoLogOut } from "react-icons/io5";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const handleTheme = (checked) => setTheme(checked ? "dark" : "light");

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogout = async () => {
    try {
      await logOut();
      alert("Logged out successfully");
    } catch (err) {
      alert("Logout failed");
      console.error(err);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="navbar-start">
        <img src={logoImage} alt="Logo" className="w-8 h-8 rounded-full" />
        <span className="font-bold text-2xl ml-2">
          CANVAS<span className="text-blue-500">VAULT</span>
        </span>
      </div>

      <div className="navbar-center hidden lg:flex gap-4 font-semibold">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/explore_artwork">Explore Artworks</NavLink>
        <NavLink to="/add_artwork">Add Artwork</NavLink>
        <NavLink to="/my_gallery">My Gallery</NavLink>
        <NavLink to="/my_favorites">My Favorites</NavLink>
      </div>

      <div className="navbar-end flex items-center gap-3">
        {user ? (
          <div className="dropdown dropdown-end z-50">
            <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-9 border-2 border-gray-300 rounded-full">
                <img
                  src={
                    user.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  alt="User"
                />
              </div>
            </div>
            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
              <div className="pb-3 border-b border-b-gray-200">
                <li className="text-sm font-bold">{user.displayName}</li>
                <li className="text-xs">{user.email}</li>
              </div>
              <input
                type="checkbox"
                onChange={(e) => handleTheme(e.target.checked)}
                className="toggle"
                defaultChecked={theme === "dark"}
              />
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-xs mt-2 py-3 text-left bg-linear-to-r from-sky-600 to-red-500 text-white"
                >
                  <IoLogOut /> LogOut
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/auth/login" className="btn btn-primary px-10">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
