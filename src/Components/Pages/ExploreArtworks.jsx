import React from "react";
import { useLoaderData } from "react-router-dom";
import ArtCard from "../ArtCard";
import { useAuth } from "../../Hooks/useAuth";

const ExploreArtworks = () => {
  const loaderData = useLoaderData();
  const { user } = useAuth();
  const artwork = Array.isArray(loaderData) ? loaderData : [];

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-5xl font-bold text-center mb-10">Explore Artworks</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {artwork.length > 0 ? (
          artwork.map((art) => (
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
