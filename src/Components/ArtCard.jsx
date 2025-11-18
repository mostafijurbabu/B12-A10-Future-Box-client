import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ArtCard = ({ art, userEmail }) => {
  const [likes, setLikes] = useState(art.like || 0);
  const [favorited, setFavorited] = useState(
    art.favorited_by?.includes(userEmail) || false
  );

  const handleLike = async () => {
    try {
      const res = await fetch(
        `https://b12-a10-future-box-server-snowy.vercel.app/artwork/${art._id}/like`,
        { method: "PATCH" }
      );
      const data = await res.json();
      if (data.success) {
        setLikes(likes + 1);
        toast.success("Liked!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to like artwork.");
    }
  };

  const handleFavorite = async () => {
    if (!userEmail) return toast.error("Login to favorite");
    try {
      const url = favorited
        ? `https://b12-a10-future-box-server-snowy.vercel.app/favorites/${art._id}/remove`
        : `https://b12-a10-future-box-server-snowy.vercel.app/artwork/${art._id}/favorite`;

      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail }),
      });

      const data = await res.json();
      if (data.success) {
        setFavorited(!favorited);
        toast.success(
          favorited ? "Removed from favorites" : "Added to favorites!"
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update favorites.");
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img
        src={art.image}
        alt={art.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold">{art.title}</h3>
        <p className="text-gray-600">{art.category}</p>
        <p className="font-bold">${art.price}</p>

        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={handleLike}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            {likes}
          </button>
          <button
            onClick={handleFavorite}
            className={`px-3 py-1 rounded ${
              favorited ? "bg-yellow-400 text-black" : "bg-gray-300 text-black"
            }`}
          >
            {favorited ? "Favorited" : "Favorite"}
          </button>
        </div>

        <Link
          to={`/artwork/${art._id}`}
          className="mt-3 inline-block px-4 py-2 bg-blue-500 text-white rounded w-full text-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ArtCard;
