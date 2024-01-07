// rfc
import React from "react";
import { useRouter } from "next/router";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { GetMovieDetails } from "../../../services/movie";
import { ROUTER } from "../../../constant/Router";

export default function MovieDetail({ movieDetail }) {
  const { push } = useRouter();
  return (
    <section className="bg-gray-900 py-20 ">
      {movieDetail ? (
        <div
          className="max-w-md border-cyan-400 border-2 rounded-xl  lg:max-w-3xl lg:flex font-poppins  shadow-xl shadow-cyan-950 bg-gray-900  mx-auto"
          key={movieDetail.imdbID}
        >
          <img
            className="w-full lg:w-1/2 lg:h-[550px]  object-cover"
            src={movieDetail.Poster}
          />
          <div className="py-3 w-full lg:w-1/2  text-gray-200 flex flex-col items-center text-lg lg:text-xl">
            <h3 className="text-red-100  dark:text-cyan-300 text-3xl mb-3 lg:mb-5">
              {movieDetail.Title.slice(0, 20)}
            </h3>
            <p>Year: {movieDetail.Year}</p>
            <p className="my-3 lg:my-6">Rated: {movieDetail.Rated}</p>
            <p>Released: {movieDetail.Released}</p>
            <p className="text-green-300  dark:text-indigo-300 text-bold my-3 lg:my-6">
              Imdb: {movieDetail.imdbRating}
            </p>
            <p>Runtime: {movieDetail.Runtime}</p>

            <p className="my-3 lg:my-6">Genre: {movieDetail.Genre}</p>
            <p>Director: {movieDetail.Director}</p>
            <p className="my-3 lg:my-6">
              Plot: {movieDetail.Plot.slice(0, 20)}...
            </p>
            <button
              onClick={() => push(ROUTER.Home)}
              className="flex items-center justify-center mt-2 mb-3 lg:-mb-3 "
            >
              <FaCircleChevronLeft
                size={40}
                className=" hover:text-sky-300 transition-all duration-500"
              />
              <span className="ml-3  text-lg text-sky-200 dark:text-cyan-400 hover:opacity-80 transition-all duration-500">
                Go Back
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-black h-[450px] w-full">
          <h1 className="text-gega-red text-4xl capitalize">not found</h1>
        </div>
      )}
    </section>
  );
}
export async function getServerSideProps({ query }) {
  const movieId = query.id;
  try {
    const response = await GetMovieDetails(movieId);
    console.log("response", response);
    return {
      props: {
        movieDetail: response || [],
      },
    };
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    return {
      redirect: "/404",
      props: {
        movieDetail: null,
        hasErrror: true,
      },
    };
  }
}
