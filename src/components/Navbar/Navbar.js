import Link from "next/link";
import React, { useState, useEffect } from "react";
import InputSearch from "./InputSearch";
import Dropdown from "./Dropdown";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const movieLinks = {
    title: "Movie",
    link1: "/movie/popular",
    link2: "/movie/now-playing",
    link3: "/movie/upcoming",
    link4: "/movie/top-rated",
    label1: "Popular",
    label2: "Now Playing",
    label3: "Upcoming",
    label4: "Top Rated",
  };
  const TvLinks = {
    title: "Tv Show",
    link1: "/tv-show/popular",
    link2: "/tv-show/airing-today",
    link3: "/tv-show/on-tv",
    link4: "/tv-show/top-rated",
    label1: "Popular",
    label2: "Airing Today",
    label3: "On Tv",
    label4: "Top Rated",
  };

  return (
    <>
      <header className={`sm:px-8 px-4 z-10 w-full top-0 fixed transition-all duration-700 ${isScrolled ? "bg-black" : "bg-transparent"}`}>
        <nav className="flex justify-between items-center max-container pb-4">
          <div className="flex justify-between items-center mt-3">
            <Link href="/" className="text-3xl font-bold mr-16 text-red-600">
              N Station
            </Link>
            <ul className="flex justify-center items-center gap-16">
              <li>
                <Dropdown {...movieLinks} />
              </li>
              <li>
                <Dropdown {...TvLinks} />
              </li>
              <li>
                <InputSearch />
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
