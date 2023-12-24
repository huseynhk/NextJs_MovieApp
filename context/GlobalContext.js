import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const GlobalContext = createContext();
const GlobalContextProvider = ({ children }) => {
  const [wishList, setWishList] = useState([]);
  useEffect(() => {
    const storedWishList = localStorage.getItem("wishList");
    if (storedWishList) {
      setWishList(JSON.parse(storedWishList));
    }
  }, []);

  const wishLength = wishList.length;
  const [show, setShow] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const openModal = (movie) => {
    setShow(true);
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setShow(false);
    setSelectedMovie(null);
  };

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

  const contextValue = {
    isMovieInWishlist,
    wishList,
    setWishList,
    deleteFromWishList,
    selectedMovie,
    openModal,
    closeModal,
    show,
    wishLength
  };
  const Component = GlobalContext.Provider;
  return <Component value={contextValue}>{children}</Component>;
};

const useGlobalContext = () => useContext(GlobalContext);
export { GlobalContextProvider, useGlobalContext };
