import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import Landing from "@/components/Landing";
import Trendweek from "@/components/ListMovie/trendweek";
import Popular from "@/components/ListMovie/popular";
import Poptv from "@/components/ListMovie/popular-tv";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Navbar />
      <Landing />
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        <Trendweek />
        <Popular />
        <Poptv />
      </div>
      <Footer />
    </>
  );
}
