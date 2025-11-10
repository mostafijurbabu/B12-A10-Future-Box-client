import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import colorImage from "../../assets/color5.jpg";
import natureImage from "../../assets/nature1.jpg";
import boatImage from "../../assets/boat.jpg";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <div>
        <h2 className="text-5xl text-red-500 font-bold text-center pt-10">
          We don’t create art…{" "}
          <span className="text-sky-600">art creates us</span>
        </h2>
        <p className="text-xs text-center text-slate-400 pt-3 pb-10">
          Art is the journey of a free soul.Feel the colors, not just see them.{" "}
          <br /> Where imagination becomes visible.Creativity is the purest form
          of freedom.Art speaks when words are silent.
        </p>
      </div>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 3000 }}
      >
        <SwiperSlide>
          <img
            className="w-full h-[450px] object-cover rounded-xl mb-10"
            src={colorImage}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full h-[450px] object-cover rounded-xl mb-10"
            src={natureImage}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full h-[450px] object-cover rounded-xl mb-10"
            src={boatImage}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
