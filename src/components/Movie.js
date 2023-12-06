import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const API_IMG = process.env.NEXT_PUBLIC_TMDB_API_IMG;
const NULL_IMG = process.env.NEXT_PUBLIC_NULL_IMG1;
const NULL_IMG2 = process.env.NEXT_PUBLIC_NULL_IMG2;
const NULL_IMG3 = process.env.NEXT_PUBLIC_NULL_IMG3;
const API_SEARCH = process.env.NEXT_PUBLIC_TMDB_API_SEARCH;

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const router = useRouter();
  const [term, setTerm] = useState("");

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    fetch(`${API_SEARCH}${term}`)
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch((error) => console.log(error));
  };

  const getRandomNullImage = () => {
    const nullImages = [NULL_IMG, NULL_IMG2, NULL_IMG3];
    const randomIndex = Math.floor(Math.random() * nullImages.length);
    return nullImages[randomIndex];
  };

  const openOverview = (movie) => {
    router.push(`/movie/${movie.id}`);
  };

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

  // onClick={() => openOverview(movie)}

  return (
    <section id="movies">
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        <header className="text-center">
          <h2 className="text-xl font-bold text-light-900 sm:text-7xl">Now Playing</h2>
          <p className="max-w-md mx-auto mt-4 text-md text-light-500">Nikmati film yang ramai dibicarakan, serial populer, dan lainnya </p>
          <div className="mt-3 flex gap-2 text-lg justify-end leading-normal font-medium font-montserrat wide:mr-24">
            <form className="max-w-sm px-4" onSubmit={handleSearch}>
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  onChange={(e) => {
                    setTerm(e.target.value);
                  }}
                  type="text"
                  placeholder="Search..."
                  className="block w-full p-4 ps-10 px-28 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <button
                  className="text-white absolute end-2.5 bottom-2.5 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700"
                  type="submit"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </header>
        <ul className="grid gap-4 mt-8 grid-cols-4">
          {movies.map((movie) => (
            <li key={movie.id} className="my-3 relative">
              <Link href={`/movie/${movie.id}`}>
                <div className="block overflow-hidden group">
                  <img
                    src={movie.poster_path ? API_IMG + movie.poster_path : getRandomNullImage()}
                    alt={`poster for ${movie.poster_path}`}
                    className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-110 sm:h-[450px]"
                  />
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
