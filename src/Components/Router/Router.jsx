import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Home/Home";
import ExploreArtworks from "../Pages/ExploreArtworks";
import AddArtwork from "../Pages/AddArtwork";
import MyGallery from "../Pages/MyGallery";
import MyFavorites from "../Pages/MyFavorites";
import Login from "../Auth/Login";
import Registration from "../Auth/Registration";
import AuthLayout from "../Layout/AuthLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        index: "explore_artworks",
        element: <ExploreArtworks></ExploreArtworks>,
      },
      {
        index: "add_artworks",
        element: <AddArtwork></AddArtwork>,
      },
      {
        index: "my_gallery",
        element: <MyGallery></MyGallery>,
      },
      {
        index: "my_favorites",
        element: <MyFavorites></MyFavorites>,
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
