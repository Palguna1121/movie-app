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

    if (id) {
      fetchData();
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

  return (
    <div>
      <Navbar />
      <div className="px-5 mt-16">
        <p className="text-2xl font-bold">{movie.title}</p>
        <p className="text-lg font-semibold">{movie.overview}</p>
        <div className="flex">
          <img src={movie.poster_path ? API_IMG + movie.poster_path : NULL_IMG3} alt={`poster for ${movie.title}`} className="w-[350px] h-full" />
          <img src={movie.backdrop_path ? API_IMG + movie.backdrop_path : NULL_IMG2} alt={`poster for ${movie.title}`} className="h-full w-full" />
        </div>
        <span className="mt-1.5 inline-block bg-black px-5 bg-opacity-70 py-3 text-xs rounded-md font-medium uppercase tracking-wide text-white">
          <h5 className="text-md font-bold text-amber-100">Title : {movie.title}</h5>
          <p className="text-md font-bold text-amber-100">Genre : {movie.genres.map((genre) => genre.name).join(", ")}</p>
          <p className="text-md font-bold text-amber-100">Rating : {movie.vote_average}/10</p>
          <p className="text-md font-bold text-amber-100">Release Date : {movie.release_date}</p>
          <p className="text-md font-bold text-amber-100">Budget : {movie.budget}</p>
          <p className="text-md font-bold text-amber-100">Country : {movie.production_countries.map((production) => production.name).join(", ")}</p>
          <p className="text-md font-bold text-amber-100">Studio : {movie.production_companies.map((comp) => comp.name).join(", ")}</p>
          <Link href={`https://www.imdb.com/title/${movie.imdb_id}`}>
            <p className="inline-block my-1 bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600">imdb</p>
          </Link>
        </span>
        {console.log(movie)}
      </div>
    </div>
  );
};

export default MovieDetail;
