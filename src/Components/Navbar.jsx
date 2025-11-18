import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "./Context/AuthProvider";
import userIcon from "../assets/user.png";
import logoImage from "../assets/artlogo.jpeg";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut().then(() => alert("Logged out successfully"));
  };

  const links = (
    <div className="flex gap-4 font-semibold">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/explore_artwork">Explore Artworks</NavLink>
      <NavLink to="/add_artwork">Add Artwork</NavLink>
      <NavLink to="/my_gallery">My Gallery</NavLink>
      <NavLink to="/my_favorites">My Favorites</NavLink>
    </div>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="navbar-start">
        <img src={logoImage} alt="Logo" className="w-8 h-8 rounded-full" />
        <span className="font-bold text-2xl ml-2">
          CANVAS<span className="text-blue-500">VAULT</span>
        </span>
      </div>

      <div className="navbar-center hidden lg:flex">{links}</div>

      <div className="navbar-end flex items-center gap-3">
        <img
          src={user ? user.photoURL : userIcon}
          className="w-10 h-10 rounded-full"
          alt=""
        />
        {user ? (
          <button onClick={handleLogOut} className="btn btn-primary">
            Logout
          </button>
        ) : (
          <Link to="/auth/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
