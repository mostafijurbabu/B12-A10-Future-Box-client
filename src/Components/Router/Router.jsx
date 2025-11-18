import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Home/Home";
import ExploreArtworks from "../Pages/ExploreArtworks";
import AddArtwork from "../Pages/AddArtwork";
import MyGallery from "../Pages/MyGallery";
import MyFavorites from "../Pages/MyFavorites";
import Login from "../Auth/Login";
import Registration from "../Auth/Registration";
import AuthLayout from "../Layout/AuthLayout";
import ArtworkDetails from "../Pages/ArtworkDetails";
import Loading from "../../Components/Loading";
import PrivateRouter from "../Router/PrivateRouter";

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
        path: "my_gallery",
        element: (
          <PrivateRouter>
            <MyGallery />
          </PrivateRouter>
        ),
      },
      {
        path: "my_favorites",
        element: (
          <PrivateRouter>
            <MyFavorites />
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
]);
