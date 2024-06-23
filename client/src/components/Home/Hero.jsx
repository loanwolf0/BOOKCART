import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="h-screen md:h-[75vh] flex md:flex-row flex-col">
      <div className="w-full lg:w-3/6 flex flex-col lg:items-start items-center justify-center">
        <h1 className="text-4xl lg:text-6xl font-semibold text-yellow-100 ">
          {" "}
          Discover what yous needs ?
        </h1>
        <p className="mt-4 text-xl lg:text-left text-center text-zinc-300">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
          tempora!
        </p>
        <div className="mt-8">
          <Link
            to="/all-books"
            className="text-yellow-300 font-semibold text-xl lg:text-2xl border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full"
          >
            Discover Books
          </Link>
        </div>
      </div>
      <div className="w-3/6"> place you image aand style them</div>
    </div>
  );
};

export default Hero;
