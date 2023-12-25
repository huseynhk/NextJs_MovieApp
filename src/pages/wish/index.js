import React from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import { FaSearch } from "react-icons/fa";
import Layout from "../layout/Layout";

export default function WishList() {
  const { filteredWishList, deleteFromWishList, searchInput, setSearchInput } =
    useGlobalContext();

  return (
    <>
      <Layout>
        <section className="py-10 bg-gray-900 flex flex-col justify-center items-center">
          <div className="mb-12">
            <form>
              <div className="group px-6 mx-4 py-2text-sky-400 ">
                <input
                  type="text"
                  placeholder="Search Your WishList"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="text-sky-50 bg-transparent border-b border-sky-400  focus:outline-none w-24 lg:w-48 transition duration-500 "
                />
                <button className="group-hover:ml-0 transition duration-500 ">
                  <span className=" text-gray-900 group-hover:text-sky-400 transition duration-400 text-xl">
                    <FaSearch />
                  </span>
                </button>
              </div>
            </form>
          </div>

          <div className="bg-gray-900 container grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 ">
            {filteredWishList && filteredWishList.length > 0 ? (
              filteredWishList.map((movie) => {
                return (
                  <div className="mx-auto">
                    <div className="group relative overflow-hidden cursor-pointer">
                      <img
                        src={movie.Poster}
                        className="group-hover:scale-110 group-hover:opacity-50 duration-500 rounded-sm h-96 w-96 object-cover"
                        alt={movie.Title}
                      />
                      <div className="absolute px-6 bottom-8">
                        <h2 className="text-gega-grey group-hover:text-gega-melon group-hover:mb-6 font-poppins font-bold duration-500 text-xl">
                          {movie.Title.slice(0, 13)}
                          <span className="group-hover:text-green-500 ml-2">
                            {movie.Year}
                          </span>
                        </h2>

                        <p className="text-md opacity-0 group-hover:opacity-100 group-hover:mb-1 duration-500 text-gega-grey">
                          <button
                            className="px-5 py-1 text-xl bg-gega-red rounded-md hover:opacity-75 duration-500 "
                            onClick={() => deleteFromWishList(movie.imdbID)}
                          >
                            Remove
                          </button>
                        </p>
                        <div className="absolute flex space-x-8 text-gega-grey opacity-0 -bottom-3 group-hover:bottom-2 group-hover:opacity-100 duration-500"></div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="h-[450px] w-full bg-gray-900">
                <h1 className="text-gega-red text-3xl capitalize">
                  your wishList is empty
                </h1>
              </div>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
}
