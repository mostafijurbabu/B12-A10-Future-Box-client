import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Home/Home";
import ExploreArtworks from "../Pages/ExploreArtworks";
import AddArtwork from "../Pages/AddArtwork";
import MyGallery from "../Pages/MyGallery";
import MyFavorites from "../Pages/MyFavorites";
import ErrorPage from "../Pages/ErrorPage";

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
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);
