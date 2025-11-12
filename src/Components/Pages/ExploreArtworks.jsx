import React from "react";
import { useLoaderData } from "react-router";
import { ArtCard } from "../ArtCard";

const ExploreArtworks = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-5xl font-bold text-red-500">
        Explore <span className="text-sky-500">Artworks</span>
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {data.map((artwork) => (
          <ArtCard key={artwork._id} artwork={artwork} />
        ))}
      </div>
    </div>
  );
};

export default ExploreArtworks;
