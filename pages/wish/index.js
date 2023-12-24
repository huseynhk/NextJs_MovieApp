import React, { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import { FaSearch, FaHeartbeat } from "react-icons/fa";
import { TbSquareChevronLeftFilled } from "react-icons/tb";
import { ROUTER } from "../../constant/Router";
import { useRouter } from "next/navigation";

export default function WishList() {
  const { wishList, deleteFromWishList, wishLength } = useGlobalContext();
  const [searchInput, setSearchInput] = useState("");

  const filteredWishList = wishList.filter((movie) => {
    return movie.Title.toLowerCase().includes(searchInput.toLowerCase());
  });
  const { push } = useRouter();


  return (
    <>
      <section className="py-6 bg-black flex flex-col justify-center items-center">
        <div className="mb-12 ">
          <div className="flex justify-center items-center cursor-pointer mb-5">
            <p className="text-sky-300 hover:opacity-75 transition-all duration-500">
              <FaHeartbeat size={50} />
            </p>
            <p className="text-red-200 mb-10 ml-2 mr-8 text-xl">{wishLength}</p>
            <p
              className="text-sky-300 hover:opacity-75 transition-all duration-500"
              onClick={() => push(ROUTER.Home)}
            >
              <TbSquareChevronLeftFilled size={50} />
            </p>
          </div>
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
                <span className=" text-black group-hover:text-sky-400 transition duration-400 text-xl">
                  <FaSearch />
                </span>
              </button>
            </div>
          </form>
        </div>

        <div className="bg-black container grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
          {filteredWishList && filteredWishList.length > 0 ? (
            filteredWishList.map((movie) => {
              return (
                <div className="mx-auto">
                  <div className="group relative overflow-hidden cursor-pointer">
                    <img
                      src={movie.Poster}
                      className="group-hover:scale-110 group-hover:opacity-50 duration-500 rounded-sm"
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
                          className="px-3 py-2 bg-gega-red rounded-md hover:opacity-75 duration-500 "
                          onClick={() => deleteFromWishList(movie.imdbID)}
                        >
                          Delete From WishList
                        </button>
                      </p>
                      <div className="absolute flex space-x-8 text-gega-grey opacity-0 -bottom-3 group-hover:bottom-2 group-hover:opacity-100 duration-500"></div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="h-[450px] w-full">
              <h1 className="text-gega-red text-3xl capitalize">
                your wishList is empty
              </h1>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
