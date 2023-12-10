import Navbar from "@/components/Navbar/Navbar";
import HeaderMenu from "@/components/Utilities/HeaderMenu";
import Link from "next/link";
import { useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const API_IMG = process.env.NEXT_PUBLIC_TMDB_API_IMG;

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [genres, setGenres] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [counts, setCounts] = useState({
    total_pages: 500,
    total_results: 10000,
  });

  const [showScrollButton, setShowScrollButton] = useState(false);
  const handleScrollTop = () => {
    const scrollY = window.scrollY;

    // Tandai apakah tombol scroll harus ditampilkan
    if (scrollY > 200) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollTop);
    return () => window.removeEventListener("scroll", handleScrollTop);
  }, []);

  const hasNext = counts.total_pages > currentPage;

  const loadMoreItems = () => {
    if (hasNext) {
      setCurrentPage((page) => page + 1);
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&page=${currentPage}`)
      .then((response) => response.json())
      .then((json) => {
        if (!json?.results) {
          throw new Error(json?.statusMessage ?? "Error");
        }
        setMovies((previous) => (currentPage === 1 ? json.results : [...previous, ...json.results]));
        setCounts({
          total_pages: json.total_pages,
          total_results: json.total_results,
        });
      })
      .catch((error) => console.error("Error:", error));
  }, [currentPage]);

  const handleScroll = () => {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight - 1) {
      loadMoreItems();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }, []);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setGenres(data.genres))
      .catch((error) => console.error("Error fetching genres:", error));
  }, []);

  const genresMap = genres.reduce((acc, genre) => {
    acc[genre.id] = genre.name;
    return acc;
  }, {});

  const openOverview = (movie) => {
    setSelectedMovie(movie);
  };

  const closeOverview = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <Navbar />
      <section>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <HeaderMenu title={"Airing Today"} subTitle={"Nikmati film yang ramai dibicarakan, serial populer, dan lainnya"} />
          <ul className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
            {movies.map((movie) => (
              <li key={movie.id} className="my-3 relative">
                <div className="block overflow-hidden group" onClick={() => openOverview(movie)}>
                  <img src={`${API_IMG}${movie.poster_path}`} alt={`poster for ${movie.poster_path}`} className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-110 sm:h-[450px]" />
                  <div className="absolute inset-0 flex flex-col items-start justify-end p-4">
                    <span className="mt-1.5 inline-block bg-black px-5 bg-opacity-70 py-3 text-xs rounded-md font-medium uppercase tracking-wide text-white">
                      <h5 className="text-md font-bold text-amber-100">{movie.name}</h5>
                      Rating : {movie.vote_average}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {selectedMovie && (
            <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-80 flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg max-w-md w-full">
                <div className="flex justify-between items-center">
                  <h3 className="mt-2 mx-2 text-xl font-bold text-black mb-2">{selectedMovie.title}</h3>
                  <button className=" text-gray-600 hover:text-red-700" onClick={closeOverview}>
                    Close (X)
                  </button>
                </div>
                <p className="text-black mx-2">Overview: {selectedMovie.overview}</p>
                <div>
                  <div className="flex align-end justify-center gap-10 mt-10">
                    <div>
                      <p className="text-black">Genre : {selectedMovie.genre_ids.map((genreId) => genresMap[genreId]).join(", ")}</p>
                      <p className="text-black">Rating : {selectedMovie.vote_average}</p>
                    </div>
                    <Link href={`/tv-show/${selectedMovie.id}`} className="flex align-end justify-end">
                      <p className="mt-4 bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700">More</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {showScrollButton && (
          <button className="fixed bottom-10 right-10 bg-red-600 text-white p-8 rounded-full shadow-md transition duration-300 ease-in-out hover:bg-red-700 focus:outline-none" onClick={scrollToTop}>
            <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 384 512">
              <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
            </svg>
          </button>
        )}
      </section>
    </>
  );
};

export default Popular;
