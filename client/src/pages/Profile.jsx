import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { authActions } from "../store/auth";
import Loader from "../components/Loader";

const Profile = () => {
  const [profile, setProfile] = useState();
  // const isLoggedIn = useSelector();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    console.log(headers, " headers");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-user-information",
          { headers }
        );
        setProfile(response.data);
        console.log(response.data, "response");
      } catch (error) {
        console.log(error, "error");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-zinc-900 px-2 md:px-8 lg:px-12 flex flex-col md:flex-row h-screen text-white ">
      {!profile && (
        <div className="w-full h-[100%] flex items-center justify-center ">
          <Loader />
        </div>
      )}
      {profile && (
        <>
          <div className="w-full mt-5 md:w-1/6 h-screen mr-2">
            {" "}
            <Sidebar data={profile} />{" "}
          </div>
          <div className=" w-full mt-5 md:w-5/6 h-auto ml-2 mr-2">
            {" "}
            <Outlet />{" "}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
