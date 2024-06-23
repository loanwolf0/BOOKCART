import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader";

const RecentlyAdded = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-recents-books"
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
    <div className="mx-8 px-4">
      <h4 className="text-3xl text-yellow-100">Recently Added</h4>
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

export default RecentlyAdded;
