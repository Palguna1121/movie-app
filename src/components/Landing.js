import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_TMDB_API_URL;
const API_IMG = process.env.NEXT_PUBLIC_TMDB_API_IMG;

const Landing = () => {
  const [movies, setMovies] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }, []);

  if (!movies) {
    return (
      <div className="flex space-x-2 justify-center items-center bg-black h-screen">
        <span className="sr-only">Loading...</span>
        <div className="h-8 w-8 bg-red-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 bg-red-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 bg-red-600 rounded-full animate-bounce"></div>
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    pauseOnHover: true,
    afterChange: (index) => setCurrentSlide(index),
  };

  return (
    <div>
      <section className="m-5 pt-36 relative">
        <Slider {...settings} className="z-0">
          {movies.map((movie, index) => (
            <div key={movie.id} className="relative">
              <div
                className="w-full h-full object-cover absolute top-0 left-0 z-0"
                style={{
                  backgroundImage: `url('${API_IMG}${movie.backdrop_path}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="relative z-10 text-white text-start p-8">
                <h2 className="text-2xl font-bold">{movie.title}</h2>
                <p className="text-lg font-semibold">{movie.overview}</p>
                <Link href={`/movie/${movie.id}`}>
                  <p className="inline-block mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">More</p>
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </section>
    </div>
  );
};

export default Landing;
