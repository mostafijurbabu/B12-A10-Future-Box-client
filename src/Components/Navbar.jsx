import React from "react";
import logoImage from "../assets/artlogo.jpeg";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const links = (
    <div className="font-semibold flex">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/explore_artworks">Explore Artworks</NavLink>
      </li>
      <li>
        <NavLink to="/add_artworks">Add Artwork</NavLink>
      </li>
      <li>
        <NavLink to="/my_gallery">My Gallery</NavLink>
      </li>
      <li>
        <NavLink to="/my_favorites">My Favorites</NavLink>
      </li>
    </div>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm max-w-7xl mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2"
          >
            {links}
          </ul>
        </div>
        <img className="w-8 h-8 rounded-full" src={logoImage} alt="" />
        <a className="btn btn-ghost text-3xl text-red-500 font-bold">
          CANVAS<span className="text-blue-500">VAULT</span>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        <Link to="/auth/login" className="btn btn-primary px-10 text-md">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
