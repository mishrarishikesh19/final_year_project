
import React from "react";
import Login from "../../Components/Login/Login";
import Signup from "../../Components/Signup/Signup";

const Home = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">

      {/* Top Banner */}
      <div className="border-b-2 border-slate-800 bg-slate-800 text-white font-semibold md:text-2xl p-4">
        <h1>Welcome to Gym Management System</h1>
      </div>

      {/* Background Section */}
      <div className="flex-1 bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-6"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?cs=srgb&dl=action-athlete-barbell-841130.jpg&fm=jpg')",
        }}
      >

        {/* Responsive Layout Container */}
        <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-center gap-10">

          {/* Login Section */}
          <div className="w-full md:w-1/2 flex justify-center">
           <Login/>
          </div>

          {/* Signup Section */}
          <div className="w-full md:w-1/2 flex justify-center">
           <Signup/>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
