import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const API_IMG = process.env.NEXT_PUBLIC_TMDB_API_IMG;
const NULL_IMG1 = process.env.NEXT_PUBLIC_NULL_IMG1;
const NULL_IMG2 = process.env.NEXT_PUBLIC_NULL_IMG2;
const NULL_IMG3 = process.env.NEXT_PUBLIC_NULL_IMG3;
const API_SEARCH = process.env.NEXT_PUBLIC_TMDB_API_SEARCH;

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [searchedTerm, setSearchedTerm] = useState(""); // Untuk menyimpan kata kunci pencarian
  const [searchResultsAvailable, setSearchResultsAvailable] = useState(true); // Menandai apakah ada hasil pencarian
  const router = useRouter();
  const [term, setTerm] = useState("");

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
    fetch(`${API_SEARCH}${term}&page=${currentPage}`)
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
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    fetch(`${API_SEARCH}${term}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setSearchedTerm(term); // Simpan kata kunci pencarian
        setSearchResultsAvailable(data.results.length > 0); // Tandai apakah ada hasil pencarian
      })
      .catch((error) => {
        console.log(error);
        setSearchResultsAvailable(false); // Atur bahwa tidak ada hasil pencarian jika ada kesalahan
      });
  };

  const getRandomNullImage = () => {
    const nullImages = [NULL_IMG1, NULL_IMG2, NULL_IMG3];
    const randomIndex = Math.floor(Math.random() * nullImages.length);
    return nullImages[randomIndex];
  };

  const openOverview = (movie) => {
    router.push(`/movie/${movie.id}`);
  };

  // onClick={() => openOverview(movie)}

  return (
    <>
      <Navbar />
      <section className="py-10">
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <div className="flex justify-start leading-normal font-medium font-montserrat">
            <form className="px-4 w-screen" onSubmit={handleSearch}>
              <div className="relative w-full ">
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
          {searchedTerm && (
            <div className="mt-8">
              {searchResultsAvailable ? (
                <h2 className="flex justify-start mx-5 font-bold text-2xl">
                  Hasil pencarian untuk {'"'}
                  {searchedTerm}
                  {'"'}
                </h2>
              ) : (
                <h2 className="flex justify-start mx-5 font-bold text-2xl">
                  Tidak ada hasil untuk {'"'}
                  {searchedTerm}
                  {'"'}
                </h2>
              )}
            </div>
          )}
          {searchedTerm && (
            <ul className="grid gap-4 mt-8 grid-cols-4">
              {movies.map((movie) => (
                <li key={movie.id} className="my-3 relative">
                  <Link href={`/movie/${movie.id}`}>
                    <div className="block overflow-hidden group">
                      <img
                        src={movie.poster_path ? API_IMG + movie.poster_path : getRandomNullImage()}
                        alt={`poster for ${movie.poster_path}`}
                        className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-110 sm:h-[450px]"
                      />
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

export default Search;
