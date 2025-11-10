import React from "react";
import Navbar from "../Navbar";
import { Outlet } from "react-router";
import Footer from "../Footer";

const AuthLayout = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default AuthLayout;
