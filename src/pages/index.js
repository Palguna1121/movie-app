import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import Landing from "@/components/Landing";
import Collection from "@/components/Collection";
import Category from "@/components/Category";
import Movie from "@/components/Movie";

const inter = Inter({ subsets: ["latin"] });
const API_URL = "https://api.themoviedb.org/3/movie/now_playing?api_key=c1ed05456719687e3d0fe7eb91100626";
const API_SEARCH = "https://api.themoviedb.org/3/search/movie?api_key=c1ed05456719687e3d0fe7eb91100626&query=";

export default function Home() {
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

  return (
    <>
      <header className="sm:px-8 px-4 py-2 z-10 w-full">
        <nav className="flex justify-between items-center max-container">
          <div className="flex justify-between items-center mt-3">
            <a href="/" className="text-3xl font-bold mr-16 text-red-600">
              N Station
            </a>
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
      <Landing />
      <Movie />
      <Collection />
      <Category />
    </>
  );
}
