import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Home/Home";
import ExploreArtworks from "../Pages/ExploreArtworks";
import AddArtwork from "../Pages/AddArtwork";
import Login from "../Auth/Login";
import Registration from "../Auth/Registration";
import AuthLayout from "../Layout/AuthLayout";
import ArtworkDetails from "../Pages/ArtworkDetails";
import Loading from "../../Components/Loading";
import PrivateRouter from "../Router/PrivateRouter";
import Gallery from "../Pages/Gallery";
import Favorites from "../Pages/Favorites";
import DashboardLayout from "../Layout/DashboardLayout";
import ArtGallery from "../Pages/Dashboard/ArtGallery/ArtGallery";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../Pages/Dashboard/Payment/PaymentCancelled";

const BASE_URL = "https://b12-a10-future-box-server-snowy.vercel.app";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: async () => {
          try {
            const res = await fetch(`${BASE_URL}/artwork`);
            if (!res.ok) throw new Error("Failed to fetch artwork");
            return res.json();
          } catch (error) {
            console.error(error);
            return [];
          }
        },
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "explore_artwork",
        element: <ExploreArtworks />,
        loader: async () => {
          try {
            const res = await fetch(`${BASE_URL}/artwork`);
            if (!res.ok) throw new Error("Failed to fetch artwork");
            return res.json();
          } catch (error) {
            console.error(error);
            return [];
          }
        },
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "artwork/:id",
        element: <ArtworkDetails />,
        loader: async ({ params }) => {
          try {
            const res = await fetch(`${BASE_URL}/artwork/${params.id}`);
            if (!res.ok) throw new Error("Failed to fetch artwork details");
            return res.json();
          } catch (error) {
            console.error(error);
            return { result: {} };
          }
        },
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "add_artwork",
        element: (
          <PrivateRouter>
            <AddArtwork />
          </PrivateRouter>
        ),
      },
      {
        path: "gallery",
        element: (
          <PrivateRouter>
            <Gallery />
          </PrivateRouter>
        ),
      },
      {
        path: "favorites",
        element: (
          <PrivateRouter>
            <Favorites />
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "registration", element: <Registration /> },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayout></DashboardLayout>
      </PrivateRouter>
    ),
    children: [
      {
        path: "art_gallery",
        element: <ArtGallery />,
      },
      {
        path: "payment/:artId",
        Component: Payment,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancelled,
      },
    ],
  },
]);
