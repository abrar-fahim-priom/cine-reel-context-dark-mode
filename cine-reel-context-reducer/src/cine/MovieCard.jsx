/* eslint-disable react/prop-types */

import { useContext, useState } from "react";
import { MovieContext } from "../context/contexts";
import { getImageURL } from "../utils/getImageURL";
import MovieDetailsModal from "./MovieDetailsModal";
import Ratings from "./Ratings";

export default function MovieCard({ movie }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, SetSelectedMovie] = useState(null);
  const { cartData, setCartData } = useContext(MovieContext);

  function handleAddToCart(event, movie) {
    event.stopPropagation();
    const found = cartData.find((item) => {
      return item.id === movie.id;
    });

    if (!found) {
      setCartData([...cartData, movie]);
    } else {
      console.error("Movie added to cart already");
    }
  }

  function handleOnClose() {
    SetSelectedMovie(null);
    setShowModal(false);
  }

  function handleMovieSelection(movie) {
    SetSelectedMovie(movie);
    setShowModal(true);
  }

  return (
    <>
      {showModal && (
        <MovieDetailsModal movie={selectedMovie} onClose={handleOnClose} />
      )}
      <figure className="p-4 border border-black/10 shadow-sm dark:border-white/10 rounded-xl">
        <a href="#" onClick={() => handleMovieSelection(movie)}>
          <img
            className="w-full object-cover"
            src={getImageURL(movie.cover)}
            alt=""
          />
          <figcaption className="pt-4">
            <h3 className="text-xl mb-1">{movie.title}</h3>
            <p className="text-[#575A6E] text-sm mb-2">{movie.genre}</p>
            <div className="flex items-center space-x-1 mb-5">
              <Ratings value={movie.rating} />
            </div>
            <a
              className="bg-primary rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#171923] font-semibold text-sm"
              href="#"
              onClick={(e) => handleAddToCart(e, movie)}
            >
              <img src="./assets/tag.svg" alt="" />
              <span>${movie.price} | Add to Cart</span>
            </a>
          </figcaption>
        </a>
      </figure>
    </>
  );
}
