import React, { useState, useEffect } from "react";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, Link, useLocation, } from 'react-router-dom';
const Sidebar = () => {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("");
  const location = useLocation(); // get the current location 

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreeting("Good Morning 🌅");
    } else if (currentHour < 17) {
      setGreeting("Good Afternoon ☀️");
    } else if (currentHour < 21) {
      setGreeting("Good Evening 🌇");
    } else {
      setGreeting("Good Night 🌙");
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    console.log("Logged out successfully");
    window.location.href = "/";
  };

  return (
    <div className="w-1/4 min-h-screen bg-black text-white p-5">

      {/* Logo */}
      <div className="text-center font-semibold text-3xl">
        {localStorage.getItem("gymName")}
      </div>

      {/* Profile */}
      <div className="flex gap-5 my-5 items-center">
        <div className="w-[100px] h-[100px]">
          <img alt="Gym" className="w-full h-full rounded-full object-cover" src={localStorage.getItem("gymPic")} />
        </div>
        <div>
          <div className="text-2xl">{greeting}</div>
          <div className="text-xl mt-1">Admin</div>
        </div>
      </div>

      {/* Menu */}
      <div className="mt-10 pt-10 border-t border-gray-700 space-y-5">

        {/* Dashboard */}
        <div onClick={() => navigate("/dashboard")} className={`flex gap-5 items-center font-semibold text-xl p-3 rounded-xl cursor-pointer ${location.pathname === "/dashboard" ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-black" : "bg-slate-800 hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:text-black"}`}>
          <HomeIcon />
          <span>Dashboard</span>
        </div>


        {/* Members */}
        <div onClick={() => navigate("/member")} className={`flex gap-5 items-center font-semibold text-xl p-3 rounded-xl cursor-pointer ${location.pathname === "/member" ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-black" : "bg-slate-800 hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:text-black"}`}>
          <GroupIcon />
          <span>Members</span>
        </div>


        {/* Logout */}
        <div onClick={handleLogout} className="flex gap-5 items-center font-semibold text-xl bg-slate-800 p-3 rounded-xl cursor-pointer hover:bg-red-500 hover:text-black">
          <LogoutIcon />
          <span>Logout</span>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;
