import { useEffect, useState } from "react";
import Link from "next/link";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const API_IMG = process.env.NEXT_PUBLIC_TMDB_API_IMG;
const NULL_IMG1 = process.env.NEXT_PUBLIC_NULL_IMG1;
const NULL_IMG2 = process.env.NEXT_PUBLIC_NULL_IMG2;
const NULL_IMG3 = process.env.NEXT_PUBLIC_NULL_IMG3;

const Nowplaying = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }, []);

  const getRandomNullImage = () => {
    const nullImages = [NULL_IMG1, NULL_IMG2, NULL_IMG3];
    const randomIndex = Math.floor(Math.random() * nullImages.length);
    return nullImages[randomIndex];
  };

  console.log(movies);

  return (
    <section id="movies">
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        <header className="text-center">
          <h2 className="text-xl font-bold text-light-900 sm:text-7xl">Now Playing</h2>
          <p className="max-w-md mx-auto mt-4 text-md text-light-500">Nikmati film yang ramai dibicarakan, serial populer, dan lainnya </p>
        </header>
        <ul className="grid gap-4 mt-8 grid-cols-4">
          {movies.map((movie) => (
            <li key={movie.id} className="my-3 relative">
              <Link href={`/search/${movie.id}/`}>
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

export default Nowplaying;
