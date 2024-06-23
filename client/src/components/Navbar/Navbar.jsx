import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    // {
    //   title: "About Us",
    //   link: "/about-us",
    // },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
  ];

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn === false) {
    links.splice(2, 2);
  }
  const [mobileNav, setMobileNav] = useState("hidden");
  return (
    <>
      <nav className="relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between z-50">
        <div className="flex items-center  gap-5">
          <img
            className="h-10 w-10"
            src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
            alt="logo"
          />
          <h1 className="text-2xl font-semibold">BookHeaven</h1>
        </div>
        <div className="nav-links-bookheaven block md:flex gap-4 items-center">
          <div className="hidden  md:flex gap-4 items-center">
            {links.map((item, i) =>
              item.title === "Profile" ? (
                <Link
                  to={item.link}
                  className="px-2 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-30"
                  key={i}
                >
                  {item.title}
                </Link>
              ) : (
                <Link
                  to={item.link}
                  className="hover:text-blue-500 transition-all duration-30 "
                  key={i}
                >
                  {item.title}
                </Link>
              )
            )}
          </div>

          {isLoggedIn === false && (
            <div className="hidden md:flex gap-4">
              <Link
                to="/LogIn"
                className="px-2 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-30"
              >
                SignIn
              </Link>
              <Link
                to="/SignUp"
                className="px-2 py-1 bg-blue-500 rounded text-zinc-800  hover:bg-white hover:text-zinc-800 transition-all duration-30"
              >
                SignUp
              </Link>
            </div>
          )}
          <button
            className="md:hidden text-2xl text-white hover:text-zinc-200"
            onClick={() =>
              mobileNav == "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            <GiHamburgerMenu />
          </button>
        </div>
      </nav>
      <div
        className={`${mobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center md:hidden`}
      >
        {links.map((item, i) => (
          <Link
            to={item.link}
            className={`${mobileNav} hover:text-blue-500 transition-all duration-30 text-white text-4xl font-semibold mb-8`}
            key={i}
            onClick={() =>
              mobileNav == "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            {item.title}
          </Link>
        ))}

        {isLoggedIn && (
          <>
            <Link
              to="/LogIn"
              className={`${mobileNav} px-4 py-2 mb-8 text-3xl font-semibold border border-blue-500 rounded bg-zinc-800 hover:bg-white hover:text-zinc-800 text-white transition-all duration-30"`}
              onClick={() =>
                mobileNav == "hidden"
                  ? setMobileNav("block")
                  : setMobileNav("hidden")
              }
            >
              SignIn
            </Link>
            <Link
              to="/SignUp"
              className={`${mobileNav} px-4 py-2 mb-8 text-3xl font-semibold bg-blue-500 rounded text-zinc-800  hover:bg-white hover:text-zinc-800 transition-all duration-30`}
              onClick={() =>
                mobileNav == "hidden"
                  ? setMobileNav("block")
                  : setMobileNav("hidden")
              }
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
