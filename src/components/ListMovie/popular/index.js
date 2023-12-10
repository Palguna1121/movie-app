import { useRouter } from "next/router";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";

import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import HeaderMenu from "@/components/Utilities/HeaderMenu";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const Popular = () => {
  const [genres, setGenres] = useState([]);
  const [nowplayingMovies, setNowplayingMovies] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setGenres(data.genres))
      .catch((error) => console.error("Error fetching genres:", error));
  }, []);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        const nowplayingMoviesData = data.results || [];
        setNowplayingMovies(nowplayingMoviesData);
      })
      .catch((error) => console.error("Error fetching nowplaying movies:", error));
  }, []);

  return (
    <>
      <HeaderMenu title={"Popular Movie"} subTitle={"Nikmati film yang ramai dibicarakan, serial populer, dan lainnya"} />
      <div className="mx-8">
        <Swiper
          slidesPerView={5}
          spaceBetween={25}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          freeMode={true}
          navigation={true}
          modules={[FreeMode, Navigation, Pagination]}
          loop={true}
          className="mySwiper my-8 bg-red"
        >
          <section>
            {nowplayingMovies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <div>
                  <div className="group relative block p-3">
                    <img
                      alt={movie.title}
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      className="absolute inset-0 object-cover opacity-100 transition-opacity group-hover:opacity-60 h-[300px] w-full duration-500 sm:h-[400px]"
                    />

                    <Link href={`/movie/${movie.id}`} className="text-sm text-white">
                      <div className="relative p-3 sm:p-4 lg:p-6 text-left">
                        <div className="mt-32 sm:mt-40 lg:mt-56">
                          <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 mb-8">
                            <p className="text-sm font-bold text-white lg:text-xl md:text-md">{movie.title}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </section>
        </Swiper>
      </div>
    </>
  );
};

export default Popular;
