import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-book-from-cart",
        { headers }
      );
      setCart(response.data.data);
    };

    fetchData();
  }, [cart]);

  useEffect(() => {
    if (cart?.length > 0) {
      let total = 0;
      cart.map((item) => {
        total += item.price;
      });
      setTotal(total);
      total = 0;
    }
  }, [cart]);

  const deleteItem = async (bookid) => {
    const response = await axios.put(
      `http://localhost:1000/api/v1/remove-book-from-cart/${bookid}`,
      {},
      { headers }
    );

    alert(response.data.message);
  };

  const placeOrder = async () => {
    try {
      console.log("heelo ");
      const response = await axios.post(
        "http://localhost:1000/api/v1/place-order",
        { order: cart },
        { headers }
      );

      alert(response.data.message);
      console.log(response.data.message, "message order book");
      navigate("/profile/orderHistory");
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div className="bg-zinc-900 px-12 h-screen ">
      {!cart && <Loader />}
      {cart?.length == 0 && (
        <div className="h-screen">
          <div className="h-[100%] flex items-center justify-center flex-col">
            <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-500">
              Empty Cart
            </h1>
            <img src="./empty-box.png" alt="img" className="h-[20vh] my-8" />
          </div>
        </div>
      )}

      {cart && cart.length > 0 && (
        <>
          <h1 className="text-5xl font-semibold text-zinc-500 pt-10">
            Your Cart
          </h1>

          {cart.map((item, i) => (
            <div
              key={i}
              className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
            >
              <img
                src={item.url}
                alt={item.title}
                className="h-[20vh] md:h-[10vh] object-cover"
              />
              <div className="w-full md:w-auto">
                <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                  {item.title}
                </h1>
                <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                  {item.desc.slice(0, 100)}...
                </p>
                <p className="text-normal text-zinc-300 mt-2 hidden md:block">
                  {item.desc.slice(0, 65)}...
                </p>
                <p className="text-normal text-zinc-300 mt-2 block md:hidden">
                  {item.desc.slice(0, 100)}...
                </p>
              </div>
              <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                <h2 className="text-zinc-100 text-3xl font-semibold flex">
                  ₹{item.price}
                </h2>
                <button
                  className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12"
                  onClick={() => deleteItem(item._id)}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {cart && cart.length > 0 && (
        <div className="  mt-6 w-full flex items-center justify-end">
          <div className="p-4 bg-zinc-800 font-semibold">
            <h1 className="text-3xl font-semibold text-zinc-200">
              Total Amount
            </h1>
            <div className="mt-3 flex items-center justify-between text-xl text-zinc-200 ">
              <h2>{cart.length} books </h2> <h2>{total}</h2>
            </div>
            <div className="w-[100%] mt-3">
              <button
                className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold"
                onClick={placeOrder}
              >
                Place Your Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
