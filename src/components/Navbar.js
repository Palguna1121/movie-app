import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const navLinks = [
    { href: "#movies", label: "Movies" },
    { href: "#popular", label: "Popular" },
    { href: "#tv-shows", label: "TV Shows" },
  ];

  return (
    <>
      <header className="sm:px-8 px-4 z-10 w-full top-0 fixed bg-black">
        <nav className="flex justify-between items-center max-container pb-4">
          <div className="flex justify-between items-center mt-3">
            <Link href="/" className="text-3xl font-bold mr-16 text-red-600">
              N Station
            </Link>
            <ul className="flex justify-center items-center gap-16">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="font-montserrat leading-normal text-lg text-slate-gray">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
