import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const GlobalContext = createContext();
const GlobalContextProvider = ({ children }) => {
  const [wishList, setWishList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const wishLength = wishList.length;

  const filteredWishList = wishList.filter((movie) => {
    return movie.Title.toLowerCase().includes(searchInput.toLowerCase());
  });

  const isMovieInWishlist = (imdbID) => {
    return wishList.find((movie) => movie.imdbID === imdbID);
  };

  const deleteFromWishList = (imdbID) => {
    const deletedMovie = wishList.filter((movie) => movie.imdbID !== imdbID);
    setWishList(deletedMovie);
    localStorage.setItem("wishList", JSON.stringify(deletedMovie));
    toast.success("Movie deleted successfully!", {
      autoClose: 1000,
    });
  };

  useEffect(() => {
    const storedWishList = localStorage.getItem("wishList");
    if (storedWishList) {
      setWishList(JSON.parse(storedWishList));
    }
  }, []);
  const contextValue = {
    searchInput,
    setSearchInput,
    wishLength,
    isMovieInWishlist,
    deleteFromWishList,
    filteredWishList,
    wishList,
    setWishList,
  };
  const Component = GlobalContext.Provider;
  return <Component value={contextValue}>{children}</Component>;
};

const useGlobalContext = () => useContext(GlobalContext);
export { GlobalContextProvider, useGlobalContext };
