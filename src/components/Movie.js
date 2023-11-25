import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

const API_URL = "https://api.themoviedb.org/3/movie/now_playing?api_key=c1ed05456719687e3d0fe7eb91100626";
const API_IMG = "https://image.tmdb.org/t/p/w500";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }, []);

  const openOverview = (movie) => {
    router.push(`/movie/${movie.id}`);
  };

  // onClick={() => openOverview(movie)}

  return (
    <section id="movies">
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        <header className="text-center">
          <h2 className="text-xl font-bold text-light-900 sm:text-7xl">Now Playing</h2>
          <p className="max-w-md mx-auto mt-4 text-md text-light-500">Nikmati film yang ramai dibicarakan, serial populer, dan lainnya </p>
        </header>
        <ul className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
          {movies.map((movie) => (
            <li key={movie.id} className="my-3 relative">
              <Link href={`/movie/${movie.id}`}>
                <div className="block overflow-hidden group">
                  <img src={`${API_IMG}${movie.poster_path}`} alt={`poster for ${movie.poster_path}`} className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-110 sm:h-[450px]" />
                  <div className="absolute inset-0 flex flex-col items-start justify-end p-4">
                    <span className="mt-1.5 inline-block bg-black px-5 bg-opacity-70 py-3 text-xs rounded-md font-medium uppercase tracking-wide text-white">
                      <h5 className="text-md font-bold text-amber-100">{movie.title}</h5>
                      Rating : {movie.vote_average}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Movie;
