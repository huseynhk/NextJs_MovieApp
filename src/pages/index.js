import { GetMovies, GetSearchMovies } from "../services/movie";
import React from "react";
import { useGlobalContext } from "../context/GlobalContext";
import {
  FaSearchengin,
  FaHeart,
  FaRegHeart,
  FaCircleChevronRight,
} from "react-icons/fa6";
import { useRouter } from "next/router";
import { ROUTER } from "../constant/Router";
import { toast } from "react-toastify";
import Layout from "./layout/Layout";

export default function Home({ movies }) {
  const { wishList, setWishList, isMovieInWishlist } = useGlobalContext();
  const { push } = useRouter();

  const addToWishList = (imdbID) => {
    const selectedMovie = movies.find((movie) => movie.imdbID === imdbID);
    const existedMovie = wishList.find((movie) => movie.imdbID === imdbID);

    const wishedMovies = existedMovie
      ? [...wishList]
      : [...wishList, selectedMovie];
    setWishList(wishedMovies);
    localStorage.setItem("wishList", JSON.stringify(wishedMovies));

    if (!existedMovie) {
      toast.success("Movie added successfully!", {
        autoClose: 1000,
      });
    } else {
      toast.info("Movie already added!", { autoClose: 1000 });
    }
  };

  return (
    <>
      <Layout>
        <section className="flex flex-col justify-center items-center py-10 bg-gray-900 font-poppins">
          <div className="pb-8 flex flex-col items-center md:flex-row">
            <form>
              <div className="group px-4 mx-4 py-2 text-sky-400 ">
                <input
                  type="text"
                  placeholder="Search Movies"
                  name="search"
                  className="text-sky-50 bg-transparent border-b border-sky-400  focus:outline-none w-24 lg:w-48 transition duration-500 "
                />
                <button className="transition-all duration-500 ">
                  <p className="bg-sky-300 px-4 py-1 mt-2 ml-4 rounded text-black group-hover:opacity-75 transition duration-500 text-2xl">
                    <FaSearchengin />
                  </p>
                </button>
              </div>
            </form>
            <button
              type="button"
              onClick={() => {
                push(`${ROUTER.Home}?reset=true`);
              }}
              className="group-hover:bg-blue-100 transition duration-500 text-md text-center rounded mt-3 md:mt-0 w-[75%] md:w-[17%]
            text-black  font-semibold  bg-sky-300 px-3 py-1 hover:opacity-75 "
            >
              Reset
            </button>
          </div>
          <div className=" bg-gray-900 container grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 ">
            {movies && movies.length > 0 ? (
              movies.map((movie) => {
                const inWishlist = isMovieInWishlist(movie.imdbID);
                return (
                  <div className="mx-auto " key={movie.imdbID}>
                    <div className="group relative overflow-hidden cursor-pointer rounded-lg">
                      <img
                        src={movie.Poster}
                        className="group-hover:scale-110 group-hover:opacity-50 duration-500 rounded-lg h-96 w-96 object-cover"
                        alt={movie.Title}
                      />
                      <div className="absolute px-8 bottom-8 ">
                        <h2 className="text-gega-grey group-hover:text-gega-melon group-hover:mb-5 font-poppins font-bold duration-500 text-xl">
                          {movie.Title.slice(0, 13)}
                          <span className="group-hover:text-green-500 ml-3">
                            {movie.Year}
                          </span>
                        </h2>

                        <p className="text-md opacity-0 group-hover:opacity-100 group-hover:mb-16 duration-500 text-gega-grey"></p>
                        <div className="absolute flex space-x-8 text-gega-grey opacity-0  -bottom-4 group-hover:bottom-1 group-hover:opacity-100 duration-500">
                          <button
                            className="hover:text-gega-red hover:opacity-60 duration-500"
                            onClick={() => addToWishList(movie.imdbID)}
                          >
                            {inWishlist ? (
                              <FaHeart size={50} className="text-gega-red" />
                            ) : (
                              <FaRegHeart size={50} className="text-gega-red" />
                            )}
                          </button>

                          <button
                            className="text-cyan-300   hover:opacity-60 duration-500"
                            onClick={() =>
                              push(`${ROUTER.Detail}/${movie.imdbID}`)
                            }
                          >
                            <FaCircleChevronRight size={50} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gega-red text-4xl font-bold">Not Found...</p>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;

  try {
    let movies;

    if (query.search) {
      movies = await GetSearchMovies(query.search);
    } else if (query.reset) {
      const response = await GetMovies();
      movies = response.Search;
    } else {
      const response = await GetMovies();
      movies = response.Search;
    }

    return {
      props: {
        movies: movies || [],
      },
    };
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    return {
      redirect: "/404",
      props: {
        movies: null,
        hasError: true,
      },
    };
  }
}
// export async function getServerSideProps() {
//   try {
//     const response = await GetMovies();
//     console.log(response);

//     return {
//       props: {
//         movies: response.Search,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching movies:", error.message);
//     return {
//       redirect: "/404",
//       props: {
//         movies: null,
//         hasErrror: true,
//       },
//     };
//   }
// }
