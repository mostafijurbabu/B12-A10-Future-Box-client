import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const ArtworkDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [art, setArt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    const fetchArt = async () => {
      try {
        const res = await fetch(
          `https://b12-a10-future-box-server-snowy.vercel.app/artwork/${id}`
        );
        const data = await res.json();
        const artData = data?.result || {};
        setArt(artData);
        setFavorited(artData.favorited_by?.includes(user?.email) || false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load artwork details.");
      } finally {
        setLoading(false);
      }
    };
    fetchArt();
  }, [id, user?.email]);

  if (loading)
    return <p className="text-center py-10">Loading artwork details...</p>;
  if (!art?._id) return <p className="text-center py-10">Artwork not found.</p>;

  const handleLike = async () => {
    try {
      const res = await fetch(
        `https://b12-a10-future-box-server-snowy.vercel.app/artwork/${id}/like`,
        { method: "PATCH" }
      );
      const data = await res.json();
      if (data.success) setArt({ ...art, like: (art.like || 0) + 1 });
      toast.success("Liked!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to like artwork.");
    }
  };

  const handleFavorite = async () => {
    if (!user?.email) return toast.error("Login to add favorites");
    try {
      const url = favorited
        ? `https://b12-a10-future-box-server-snowy.vercel.app/favorites/${id}/remove`
        : `https://b12-a10-future-box-server-snowy.vercel.app/artwork/${id}/favorite`;

      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: user.email }),
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
    <div className="max-w-4xl mx-auto py-10 px-4">
      <img
        src={art.image || "https://via.placeholder.com/400"}
        alt={art.title || "Artwork"}
        className="w-full h-96 object-cover rounded-lg mb-6"
      />
      <h2 className="text-3xl font-bold mb-2">{art.title || "Untitled"}</h2>
      <p className="text-gray-600 mb-1">By: {art.created_by || "Unknown"}</p>
      <p className="text-gray-600 mb-1">
        Category: {art.category || "Uncategorized"}
      </p>
      <p className="font-bold mb-2">${art.price || 0}</p>
      <p className="mb-4">{art.description || "No description available."}</p>

      <div className="flex flex-wrap gap-4 mt-4">
        <button
          onClick={handleLike}
          className="px-6 py-2 btn btn-primary text-white rounded hover:bg-blue-600 transition"
        >
          Like ({art.like || 0})
        </button>
        <button
          onClick={handleFavorite}
          className={`px-6 py-2 rounded-full ${
            favorited ? "bg-yellow-400 text-black" : "bg-gray-300 text-black"
          } hover:opacity-90 transition`}
        >
          {favorited ? "Favorited" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

export default ArtworkDetails;
