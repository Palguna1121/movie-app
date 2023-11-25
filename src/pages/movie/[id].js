import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const API_KEY = "c1ed05456719687e3d0fe7eb91100626";
const API_IMG = "https://image.tmdb.org/t/p/w500";
const NULL_IMG = "https://i.pinimg.com/236x/ef/20/6f/ef206fbf6e7b9357eace54ff1f10a0ab.jpg";
const NULL_IMG2 = "https://i.pinimg.com/236x/e1/fa/6e/e1fa6e8a8d0b5545db092d84583aeb0e.jpg";
const NULL_IMG3 = "https://i.pinimg.com/564x/13/5e/49/135e49ff85a3c8b49d721ba1b2d45ea3.jpg";

const MovieDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { href: "#movies", label: "Movies" },
    { href: "#popular", label: "Popular" },
    { href: "#tv-shows", label: "TV Shows" },
  ];

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
      <div className="flex justify-center items-center content-center w-full h-full">
        <p className="m-1 p-72 text-2xl text-red-400">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <header className="sm:px-8 px-4 py-2 z-10 w-full">
        <nav className="flex justify-between items-center max-container">
          <div className="flex justify-between items-center mt-3">
            <Link href="/" className="text-3xl font-bold mr-16 text-red-600">
              N Station
            </Link>
            <ul className="flex justify-center items-center gap-16 max-lg:hidden">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="font-montserrat leading-normal text-lg text-slate-gray">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-3 flex gap-2 text-lg leading-normal font-medium font-montserrat max-lg:hidden wide:mr-24"></div>
          <div
            className="hidden max-lg:block cursor-pointer"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          ></div>
        </nav>
      </header>
      <div className="px-5">
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <div className="flex">
          <img src={movie.poster_path ? API_IMG + movie.poster_path : NULL_IMG3} alt={`poster for ${movie.title}`} className="w-[350px] h-full" />
          <img src={movie.backdrop_path ? API_IMG + movie.backdrop_path : NULL_IMG2} alt={`poster for ${movie.title}`} className="h-full w-full" />
        </div>
        {console.log(movie)}
      </div>
    </div>
  );
};

export default MovieDetail;
