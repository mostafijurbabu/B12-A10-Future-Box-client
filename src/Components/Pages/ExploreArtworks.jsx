import React, { useState } from "react"; // <-- useState যোগ করা হয়েছে
import { useLoaderData } from "react-router-dom";
import ArtCard from "../ArtCard";
import { useAuth } from "../../Hooks/useAuth";

const ExploreArtworks = () => {
  const loaderData = useLoaderData();
  const { user } = useAuth();

  const [search, setSearch] = useState("");

  const artwork = Array.isArray(loaderData) ? loaderData : [];

  const filteredArtworks = artwork.filter(
    (art) =>
      art.title?.toLowerCase().includes(search.toLowerCase()) ||
      art.category?.toLowerCase().includes(search.toLowerCase()) ||
      art.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-5xl font-bold text-center mb-10">Explore Artworks</h2>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search artworks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredArtworks.length > 0 ? (
          filteredArtworks.map((art) => (
            <ArtCard key={art._id} art={art} userEmail={user?.email} />
          ))
        ) : (
          <p className="text-center text-gray-500">No artwork found.</p>
        )}
      </div>
    </div>
  );
};

export default ExploreArtworks;
