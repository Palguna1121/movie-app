import Link from "next/link";
import React, { useEffect, useState } from "react";
import Landing from "./Landing";

const API_URL = "https://api.themoviedb.org/3/movie/now_playing?api_key=c1ed05456719687e3d0fe7eb91100626";
const API_IMG = "https://image.tmdb.org/t/p/w500";
const NULL_IMG = "https://i.pinimg.com/236x/ef/20/6f/ef206fbf6e7b9357eace54ff1f10a0ab.jpg";
const NULL_IMG2 = "https://i.pinimg.com/236x/e1/fa/6e/e1fa6e8a8d0b5545db092d84583aeb0e.jpg";
const NULL_IMG3 = "https://i.pinimg.com/564x/13/5e/49/135e49ff85a3c8b49d721ba1b2d45ea3.jpg";
const API_SEARCH = "https://api.themoviedb.org/3/search/movie?api_key=c1ed05456719687e3d0fe7eb91100626&query=";

const Navbar = () => {
  const [movies, setMovies] = useState([]);
  const [term, setTerm] = useState("");

  useEffect(() => {
    fetch(API_URL)
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { href: "#movies", label: "Movies" },
    { href: "#popular", label: "Popular" },
    { href: "#tv-shows", label: "TV Shows" },
  ];

  if (!movies) {
    return (
      <div className="flex justify-center items-center content-center w-full h-full">
        <p className="m-1 p-72 text-2xl text-red-400">Loading...</p>
      </div>
    );
  }

  return (
    <>
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
          <div className="mt-3 flex gap-2 text-lg leading-normal font-medium font-montserrat max-lg:hidden wide:mr-24">
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
          <div
            className="hidden max-lg:block cursor-pointer"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          ></div>
        </nav>

        {/* halaman landing */}

        <Landing />

        {/* akhir landing */}

        <ul className="grid gap-4 mt-8 grid-cols-4">
          {movies.map((movie) => (
            <li key={movie.id} className="my-3 relative">
              <Link href={`/movie/${movie.id}`}>
                <div className="block overflow-hidden group">
                  <img src={movie.poster_path ? API_IMG + movie.poster_path : NULL_IMG3} alt={`poster for ${movie.poster_path}`} className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-110 sm:h-[450px]" />
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
      </header>
      {isMenuOpen && (
        <div>
          <nav className="fixed top-0 right-0 left-0 bottom-0 lg:bottom-auto bg-slate-100  ">
            <div
              className="hidden max-lg:block fixed right-0  px-8 py-4 cursor-pointer"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              <AiOutlineClose className="text-4xl" />
            </div>
            <ul className=" lg:hidden flex flex-col items-center justify-center h-full ">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="font-montserrat leading-normal text-lg text-slate-gray">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
