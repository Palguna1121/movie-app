import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_TMDB_API_URL;
const API_IMG = process.env.NEXT_PUBLIC_TMDB_API_IMG;

const Collection = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

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

  const openOverview = (movie) => {
    setSelectedMovie(movie);
  };

  const closeOverview = () => {
    setSelectedMovie(null);
  };

  return (
    <section id="popular">
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        <header className="text-center">
          <h2 className="text-xl font-bold text-light-900 sm:text-7xl">Popular</h2>
          <p className="max-w-md mx-auto mt-4 text-md text-light-500">Nikmati film yang ramai dibicarakan, serial populer, dan lainnya </p>
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
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg max-w-md w-full">
              <div className="flex justify-between items-center">
                <h3 className="mt-2 mx-2 text-xl font-bold text-black mb-2">{selectedMovie.title}</h3>
                <button className="text-gray-500" onClick={closeOverview}>
                  Close (X)
                </button>
              </div>
              <p className="text-black mx-2">Overview: {selectedMovie.overview}</p>
              <div className="flex justify-end">
                <p className="text-black">Rating: {selectedMovie.vote_average}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Collection;
