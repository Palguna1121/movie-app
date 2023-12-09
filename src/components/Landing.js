import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const Landing = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }, []);

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper relative mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8"
        style={{ maxWidth: "100vw" }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={movie.id} className="relative mx-auto">
            <div
              className="h-screen w-screen bg-cover bg-center relative"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
                width: "100vw",
              }}
            >
              <div className="absolute inset-0 bg-black opacity-40"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-24">
                <h2 className="text-2xl font-bold text-white">{movie.title}</h2>
                <p className="text-lg font-semibold text-white mt-2">{movie.overview}</p>
                <Link href={`/movie/${movie.id}`}>
                  <p className="inline-block mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">More</p>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Landing;
