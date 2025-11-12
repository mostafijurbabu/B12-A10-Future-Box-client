import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const ArtworkDetails = () => {
  const data = useLoaderData();
  const artwork = data?.result;

  const [likes, setLikes] = useState(artwork?.like || 0);

  const handleLike = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/artwork/${artwork._id}/like`,
        {
          method: "PATCH",
        }
      );

      const result = await response.json();
      if (result.success) {
        setLikes(likes + 1);
      } else {
        alert("Failed to increase like count!");
      }
    } catch (error) {
      console.error("Error increasing like:", error);
    }
  };

  if (!artwork) return <p>Loading artwork...</p>;

  const artist = artwork["artist info"];

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-5xl font-bold text-red-500 text-center pb-10">
        Artwork <span className="text-sky-500">Details</span>{" "}
      </h2>
      <div className="flex justify-around gap-6">
        <div className="p-10">
          <img
            src={artwork.image}
            alt=""
            className="rounded-sm w-200 h-100 object-cover"
          />
        </div>
        <div className="grid grid-cols-1 mt-10">
          <h2 className="font-bold text-4xl">Title: {artwork.title}</h2>
          <h3 className="font-bold text-2xl">Category: {artwork.category}</h3>
          <h4>{artwork.dimensions}</h4>
          <h4>Price: ${artwork.price}</h4>
          <h3>{artwork.visibility}</h3>
          <h2>Like:{artwork.like}</h2>
          <h3 className="">Description: {artwork.description}</h3>

          {artist && (
            <div className="mt-6 border-t pt-4">
              <div className="flex items-center gap-4">
                {/* Optional: show photo if available */}
                {artist.photo && (
                  <img
                    src={artist.photo}
                    alt={artist.name}
                    className="w-8 h-8 rounded-full object-cover border-2 bg-sky-600"
                  />
                )}
                <div>
                  <h3 className="font-bold text-xl">{artist.name}</h3>
                  <p className="text-sm text-gray-600">
                    Total artworks: {artist["total artworks"]}
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="text-center p-10">
            <Link
              to={`/my_favorites/${artwork._id}}`}
              className="btn btn-primary rounded-full px-30 text-center bg-linear-to-r from-sky-500 to-red-600 text-white border-0 hover:from-sky-600 hover:to-red-700"
            >
              Favorites
            </Link>
            <button
              onClick={handleLike}
              className="btn btn-primary rounded-full ml-1"
            >
              Like
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetails;
