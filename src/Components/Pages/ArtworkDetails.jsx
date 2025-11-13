import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const ArtworkDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [art, setArt] = useState(null);

  // Fetch artwork details
  useEffect(() => {
    fetch(`http://localhost:3000/artwork/${id}`)
      .then((res) => res.json())
      .then((data) => setArt(data.result));
  }, [id]);

  if (!art) return <p>Loading artwork details...</p>;

  // Like button function
  const handleLike = () => {
    fetch(`http://localhost:3000/artwork/${id}/like`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then(() => {
        setArt({ ...art, like: art.like + 1 }); // locally update like count
        toast.success("Liked!");
      });
  };

  // Add to favorites
  const handleAddToFavorites = () => {
    if (!user?.email) {
      toast.error("You must login to add favorites");
      return;
    }

    fetch(`http://localhost:3000/artwork/${id}/favorite`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userEmail: user.email }),
    })
      .then((res) => res.json())
      .then(() => toast.success("Added to favorites!"));
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {/* Artwork Image */}
      <img
        src={art.image}
        alt={art.title}
        className="w-full h-96 object-cover rounded-lg mb-4"
      />

      {/* Artwork Details */}
      <h2 className="text-3xl font-bold mb-2">{art.title}</h2>
      <p className="text-gray-600 mb-2">By: {art.created_by}</p>
      <p className="text-gray-600 mb-2">Category: {art.category}</p>
      <p className="font-bold mb-2">${art.price}</p>
      <p className="mb-4">{art.description}</p>

      {/* Like & Add to Favorites Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleLike}
          className="px-20 py-2 btn btn-primary text-white rounded-full"
        >
          Like ({art.like})
        </button>

        <button
          onClick={handleAddToFavorites}
          className="px-12 py-2 bg-red-500 text-white rounded-full"
        >
          Add to Favorites
        </button>
      </div>
    </div>
  );
};

export default ArtworkDetails;
