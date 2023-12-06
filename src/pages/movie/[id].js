import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const API_IMG = process.env.NEXT_PUBLIC_TMDB_API_IMG;
const NULL_IMG = process.env.NEXT_PUBLIC_NULL_IMG1;
const NULL_IMG2 = process.env.NEXT_PUBLIC_NULL_IMG2;
const NULL_IMG3 = process.env.NEXT_PUBLIC_NULL_IMG3;

const MovieDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    const fetchCast = async () => {
      try {
        const castResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`);
        if (!castResponse.ok) {
          throw new Error("Failed to fetch cast");
        }
        const castData = await castResponse.json();
        setCast(castData);
      } catch (error) {
        console.error("Error fetching cast:", error);
      }
    };

    if (id) {
      fetchData();
      fetchCast();
    }
  }, [id]);

  if (!movie) {
    return (
      <div className="flex space-x-2 justify-center items-center bg-black h-screen">
        <span className="sr-only">Loading...</span>
        <div className="h-8 w-8 bg-red-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 bg-red-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 bg-red-600 rounded-full animate-bounce"></div>
      </div>
    );
  }
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "";

  console.log(movie);
  console.log(cast);

  return (
    <>
      <Navbar />
      <div className="detail h-screen bg-cover bg-center" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})` }}>
        <div className="relative h-full bg-black bg-opacity-70 flex flex-col md:flex-row gap-8 md:gap-16 px-24 py-10">
          <div className="detail-card overflow-hidden self-center rounded-2xl w-72">
            <img src={movie.poster_path ? API_IMG + movie.poster_path : NULL_IMG3} loading="..." alt={`poster for ${movie.title}`} />
          </div>
          <div className="mt-24 detail-content text-white md:flex-1">
            <div className="name text-white text-4xl tracking-widest font-extrabold">{movie.title}</div>
            <div className="info flex items-center gap-2 md:gap-4 text-sm mt-4">
              <span className="tracking-widest">
                {movie.spoken_languages.map((lang, index) => (
                  <span key={index} className="text-xm">
                    {lang.english_name}
                  </span>
                ))}
              </span>
              <span className="flex items-center gap-2">
                <p className="text-xm">{releaseYear}</p>
              </span>
              <span className="flex items-center text-sm">
                <span className="text-xl mr-1">
                  {" "}
                  <i>
                    <svg className="w-4 h-4 ms-1 text-yellow-500 dark:text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  </i>{" "}
                </span>
                {movie.vote_average.toFixed(2)} <span className="text-xm font-sans italic opacity-70">/10</span>
              </span>
              <Link href={`https://www.imdb.com/title/${movie.imdb_id}`}>
                <p className="text-xm text-gray-50 hover:text-gray-300 px-4">
                  <i>imdb</i>
                </p>
              </Link>
            </div>
            <div className="flex items-center gap-6 flex-wrap mt-6">
              {movie.genres.map((genre, index) => {
                return (
                  <span key={genre.id.toString()} className="genre-items text-sm border border-white rounded-3xl py-1 px-2">
                    {genre.name}
                  </span>
                );
              })}
            </div>
            <div className="flex items-center mt-6 gap-x-8 gap-y-4 flex-wrap">
              {cast &&
                cast.cast.slice(0, 4).map((actor, index) => {
                  if (!actor.profile_path) return null;
                  return (
                    <div key={actor.id.toString()} className="flex items-center gap-4">
                      <img className="w-10 h-10 rounded-full object-cover" src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`} alt={actor.name} />
                      <span className="text-sm opacity-70 text-white">{actor.name}</span>
                    </div>
                  );
                })}
            </div>
            <div className="mt-5 text-white text-xm lg:w-[90%]">{movie.overview}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
