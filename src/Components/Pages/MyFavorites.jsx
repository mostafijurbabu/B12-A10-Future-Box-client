import React, { useEffect, useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const MyFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:3000/favorites?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setFavorites(data));
  }, [user]);

  const removeFavorite = (id) => {
    fetch(`http://localhost:3000/favorites/${id}/remove`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userEmail: user.email }),
    })
      .then(() => setFavorites(favorites.filter((f) => f._id !== id)))
      .then(() => toast.success("Removed from favorites"));
  };

  if (!favorites.length)
    return <p className="text-center py-10">No favorites yet.</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">My Favorites</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {favorites.map((art) => (
          <div key={art._id} className="border rounded-xl p-4 shadow bg-white">
            <img
              src={art.image}
              alt={art.title}
              className="h-48 w-full object-cover rounded-lg mb-3"
            />
            <h3 className="font-semibold text-lg">{art.title}</h3>
            <p className="text-gray-600 text-sm">{art.category}</p>
            <p className="font-bold mt-1">${art.price}</p>
            <button
              onClick={() => removeFavorite(art._id)}
              className="btn btn-primary  text-white px-10 py-1 rounded mt-2"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFavorites;
