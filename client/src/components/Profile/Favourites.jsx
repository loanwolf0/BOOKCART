import axios from "axios";
import React, { useEffect, useState } from "react";

import BookCard from "../BookCard/BookCard";

const Favourites = () => {
  const [favouriteBooks, setFavouriteBooks] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-book-from-favourite",
        { headers }
      );
      setFavouriteBooks(response.data.data);
    };

    fetchData();
  }, [favouriteBooks]);
  return (
    <>
      {favouriteBooks?.length === 0 && (
        <div className="w-full  h-[100%] text-5xl font-semibold text-zinc-500 flex flex-col items-center justify-center">
          No Favourite books
          <img src="./empty-box.png" alt="img" className="h-[20vh] my-8" />
        </div>
      )}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favouriteBooks &&
          favouriteBooks.map((book, i) => (
            <div key={i}>
              <BookCard data={book} favourite={true} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Favourites;
