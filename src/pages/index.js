import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import Collection from "@/components/Collection";
import Category from "@/components/Category";
import Movie from "@/components/Movie";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Navbar />
      <Movie />
      <Collection />
      <Category />
    </>
  );
}
