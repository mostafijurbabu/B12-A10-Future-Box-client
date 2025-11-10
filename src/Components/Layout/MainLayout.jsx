import Navbar from "../Navbar";
import { Outlet } from "react-router";
import Footer from "../Footer";

const MainLayout = () => {
  return (
    <div>
      <div className="">
        <Navbar />
        <div className="mt-4">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
