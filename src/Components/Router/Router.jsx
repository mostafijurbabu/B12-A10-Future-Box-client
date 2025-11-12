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
import PrivateRouter from "./PrivateRouter";
import ArtworkDetails from "../Pages/ArtworkDetails";
import Loading from "../Loading";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
        loader: () => fetch("http://localhost:3000/featured-artwork-section"),
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "explore_artworks",
        element: <ExploreArtworks></ExploreArtworks>,
        loader: () => fetch("http://localhost:3000/artwork"),
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "/artwork/:id",
        element: <ArtworkDetails />,

        loader: ({ params }) =>
          fetch(`http://localhost:3000/artwork/${params.id}`),
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "add_artworks",
        element: (
          <PrivateRouter>
            <AddArtwork />
          </PrivateRouter>
        ),
      },
      {
        path: "add_artworks/:id",
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
      {
        path: "my_favorites/:id",
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
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/registration",
        element: <Registration></Registration>,
      },
    ],
  },
]);
