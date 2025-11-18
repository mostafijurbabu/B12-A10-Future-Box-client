import React from "react";
import { useLoaderData } from "react-router-dom";
import ArtCard from "../ArtCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import colorImage from "../../assets/color5.jpg";
import natureImage from "../../assets/nature1.jpg";
import boatImage from "../../assets/boat.jpg";
import { useAuth } from "../../Hooks/useAuth";

export default function Home() {
  const loaderData = useLoaderData();
  const { user } = useAuth();
  const artwork = Array.isArray(loaderData) ? loaderData : [];

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-5xl text-red-500 font-bold text-center pt-10">
        We don’t create art…{" "}
        <span className="text-sky-600">art creates us</span>
      </h2>
      <p className="text-xs text-center text-slate-400 pt-3 pb-10">
        Art is the journey of a free soul. Feel the colors, not just see them.
      </p>

      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 3000 }}
      >
        {[colorImage, natureImage, boatImage].map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              className="w-full h-[450px] object-cover rounded-xl mb-10"
              src={img}
              alt={`slide-${idx}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div>
        <h2 className="text-5xl text-center font-bold text-red-500 pb-10">
          Latest <span className="text-sky-600">Artworks</span>
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {artwork.length > 0 ? (
            artwork.map((art) => (
              <ArtCard key={art._id} art={art} userEmail={user?.email} />
            ))
          ) : (
            <p className="text-center text-gray-500">No artworks found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
