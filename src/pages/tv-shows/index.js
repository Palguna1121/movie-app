import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import Link from "next/link";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const API_IMG = process.env.NEXT_PUBLIC_TMDB_API_IMG;

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }, []);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setGenres(data.genres))
      .catch((error) => console.error("Error fetching genres:", error));
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

  const genresMap = genres.reduce((acc, genre) => {
    acc[genre.id] = genre.name;
    return acc;
  }, {});

  const openOverview = (movie) => {
    setSelectedMovie(movie);
  };

  const closeOverview = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <Navbar />
      <section>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <header className="text-center">
            <h2 className="text-xl font-bold text-light-900 sm:text-7xl">Top Rated Films</h2>
            <p className="max-w-md mx-auto mt-4 text-md text-light-500">.... </p>
          </header>
          <ul className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
            {movies.map((movie) => (
              <li key={movie.id} className="my-3 relative">
                <div className="block overflow-hidden group" onClick={() => openOverview(movie)}>
                  <img src={`${API_IMG}${movie.poster_path}`} alt={`poster for ${movie.poster_path}`} className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-110 sm:h-[450px]" />
                  <div className="absolute inset-0 flex flex-col items-start justify-end p-4">
                    <span className="mt-1.5 inline-block bg-black px-5 bg-opacity-70 py-3 text-xs rounded-md font-medium uppercase tracking-wide text-white">
                      <h5 className="text-md font-bold text-amber-100">{movie.title}</h5>
                      Rating : {movie.vote_average}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {selectedMovie && (
            <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-80 flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg max-w-md w-full">
                <div className="flex justify-between items-center">
                  <h3 className="mt-2 mx-2 text-xl font-bold text-black mb-2">{selectedMovie.title}</h3>
                  <button className=" text-gray-600 hover:text-red-700" onClick={closeOverview}>
                    Close (X)
                  </button>
                </div>
                <p className="text-black mx-2">Overview: {selectedMovie.overview}</p>
                <div>
                  <div className="flex align-end justify-center gap-10 mt-10">
                    <div>
                      <p className="text-black">Genre : {selectedMovie.genre_ids.map((genreId) => genresMap[genreId]).join(", ")}</p>
                      <p className="text-black">Rating : {selectedMovie.vote_average}</p>
                    </div>
                    <Link href={`/movie/${selectedMovie.id}`} className="flex align-end justify-end">
                      <p className="mt-4 bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700">More</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Popular;