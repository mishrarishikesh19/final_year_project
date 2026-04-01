import React, { useState } from "react";
import "./signUp.css";
import Modal from "../Modal/modal";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import axios from 'axios'
import BASE_URL from '../../config';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { ToastContainer, toast } from 'react-toastify';
const Signup = () => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [inputField, setInputField] = useState({ gymName: "", userName: "", email: "", password: "", profilePic: "https://t4.ftcdn.net/jpg/00/99/82/15/360_F_99821575_nVEHTBXzUnTcLIKN6yOymAWAnFwEybGb.jpg" });
  const [loaderImage, setLoaderImage] = useState(false);
  const handleClose = () => {
    setForgotPassword((prev) => !prev);
  };


  const handleOnchange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  }


  // // upload file preview
  // const uploadImage = async(event)=>{
  //   setLoaderImage(true);
  //   console.log("Image Uploading");
  //   const files = event.target.files;
  //   const data = new FormData();
  //   data.append("file",files[0]);
  //   // ddwuiogcx
  //   data.append("upload_preset","Gymgenie");
  //   try{
  //     const response = await axios.post("https://api.cloudinary.com/v1_1/ddwuiogcx/image/upload",data);
  //     console.log(response)
  //     const imageUrl = response.data.secure_url;
  //     setLoaderImage(false);
  //     setInputField({...inputField,['profilePic']:imageUrl})
  //   }catch(err){
  //     console.log(err);
  //     setLoaderImage(false);
  //   }
  // }



  const uploadImage = async (event) => {

  }

  const handleRegister = async () => {
    if (!inputField.userName || !inputField.password || !inputField.email || !inputField.gymName) {
      return toast.error("Please fill all required fields");
    }
    setLoaderImage(true);
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, inputField);
      if (res.status === 201) {
        toast.success(res.data.message);
        setInputField({ gymName: "", email: "", userName: "", password: "", profilePic: "https://th.bing.com/th/id/OIP.h4NU8Jb9tA2gJLi3veRj-wHaEl?rs=1&pid=ImgDetMain" });
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration Failed");
    } finally {
      setLoaderImage(false);
    }
  }


  return (
    <div className="w-full min-h-screen flex justify-center items-center px-4">
      <div className="customsignup w-full max-w-md h-[80vh] overflow-y-auto bg-black/70 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">Register Your Gym</h2>

        <form className="space-y-2 md:space-y-3">
          {/* Email */}
          <div><label className="block text-lg font-medium text-gray-200 mb-2">
            Enter Email
          </label>
            <input type="Text" value={inputField.email} onChange={(event) => { handleOnchange(event, "email") }} placeholder="Enter your Email" className="w-full p-3 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" required /></div>

          {/* Gym Name */}
          <div><label className="block text-lg font-medium text-gray-200 mb-2">Enter Gym Name</label>
            <input type="text" value={inputField.gymName} onChange={(event) => { handleOnchange(event, "gymName") }} placeholder="Enter your Gym Name" className="w-full p-3 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" required /></div>

          {/* Username */}
          <div><label className="block text-lg font-medium text-gray-200 mb-2">Enter Username</label>
            <input type="text" value={inputField.userName} onChange={(event) => { handleOnchange(event, "userName") }} placeholder="Enter your Username" className="w-full p-3 rounded-lg border border-gray-600 bg-gray-800 text-whit placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" required /></div>

          {/* Password */}
          <div><label className="block text-lg font-medium text-gray-200 mb-2">Enter Password</label>
            <input type="password" value={inputField.password} onChange={(event) => { handleOnchange(event, "password") }} placeholder="Enter your password" className="w-full p-3 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
          </div>

          {/* Image Upload with Preview on Next Line */}
          <div className="flex flex-col gap-4">
            <div><label className="block text-lg font-medium text-gray-200 mb-2">Upload Profile</label>
              <input type="file" onChange={(event) => { uploadImage(event) }} className="w-full text-gray-300 bg-gray-800 border border-gray-600 rounded-lg p-2 cursor-pointer" />
              {/* onChange={handleUploadImage} */}

              {
                loaderImage && <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                  <LinearProgress color="secondary" />
                </Stack>
              }
            </div>

            {/* Profile image preview in next line */}
            <div><img src={inputField.profilePic} alt="gym preview" className="h-24 w-24 rounded-full object-cover border-2 border-gray-500 shadow" /></div>
          </div>

          {/* Register Button */}
          <button type="button" onClick={handleRegister} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-300 shadow-md hover:shadow-indigo-500/40">Register</button>

          {/* Forgot Password Button */}
          <button type="button" className="w-full py-3 mt-2 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-lg transition duration-300" onClick={() => handleClose()}>Forgot Password?</button>

          {/* Modal */}
        </form>
      </div>
      {forgotPassword && <Modal header="Forgot Password" handleClose={handleClose} content={<ForgotPassword />} />}
      <ToastContainer />
    </div>
  );
};

export default Signup;
