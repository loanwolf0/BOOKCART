import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaRegEdit, FaRegHeart } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Loader from "../Loader";
import { useSelector } from "react-redux";

const ViewBookDetails = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/api/v1/get-book-by-id/${id}`
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

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleFavourite = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/add-book-to-favourite",
      {},
      {
        headers,
      }
    );

    alert(response.data.message);
  };

  const handleCart = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/add-book-to-cart",
      {},
      {
        headers,
      }
    );
    alert(response.data.message);
  };

  return (
    <>
      {data && (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex gap-8 lg:flex-row flex-col ">
          <div className="   w-full lg:w-3/6 ">
            <div className="bg-zinc-800 rounded py-12 flex md:flex-row flex-col md:justify-around justify-center items-center md:items-start  md:p-5">
              <img
                src={data.url}
                alt="img"
                className="h-[50vh] lg:h-[70vh]  rounded object-contain"
              />
              {isLoggedIn === true && role === "user" && (
                <div className=" flex flex-row md:flex-col mt-4 lg:mt-0 gap-8 items-center justify-center ">
                  <button className="bg-white lg:rounded-full rounded text-3xl p-2 text-red-500 lg:justify-start">
                    <FaRegHeart onClick={handleFavourite} />
                  </button>
                  <button className="bg-white lg:rounded-full rounded text-3xl p-2 mt-4 text-blue-500  lg:justify-start">
                    <AiOutlineShoppingCart onClick={handleCart} />
                  </button>
                </div>
              )}
              {isLoggedIn === true && role === "admin" && (
                <div className=" flex flex-row md:flex-col mt-4 lg:mt-0 gap-8 items-center justify-center ">
                  <button className="bg-white lg:rounded-full rounded text-3xl p-2 text-red-500 lg:justify-start">
                    <FaRegEdit />
                  </button>
                  <button className="bg-white lg:rounded-full rounded text-3xl p-2 mt-4 text-blue-500  lg:justify-start">
                    <MdOutlineDeleteOutline />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-4xl text-zinc-300 font-semibold">
              {data.title}
            </h1>
            <p className="text-zinc-400 mt-1">by {data.author}</p>
            <p className="text-zinc-500 mt-4 text-xl">{data.desc}</p>
            <p className="flex mt-4 items-center justify-start text-zinc-400">
              <GrLanguage className="me-3" />
              {data.language}
            </p>
            <p className="mt-4 text-zinc-100 text-3xl font-semibold">
              Price: ₹ {data.price}
            </p>
          </div>
        </div>
      )}
      {!data && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
