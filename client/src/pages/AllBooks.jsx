import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import BookCard from "../components/BookCard/BookCard";
import axios from "axios";

const AllBooks = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-all-books"
        );

        if (response.data.status == "Success") {
          setData(response.data.data);
        }
      } catch (error) {
        console.log(error, " error");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-zinc-900 h-auto px-12 py-5">
      {" "}
      <h4 className="text-3xl text-yellow-100">All Books</h4>
      <div className="my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols:4 gap-8">
        {!data && (
          <div className=" flex items-center justify-center my-8">
            <Loader />
          </div>
        )}
        {data &&
          data.map((item, i) => (
            <div key={i}>
              <BookCard data={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllBooks;
