import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
const Login = () => {
  const [loginField,setloginField] = useState({"username":"","password":""});
  const navigate = useNavigate();


  const handleLogin = async()=>{
    //   sessionStorage.setItem("isLogin", "true")
   //   navigate('/dashboard');

    await axios.post("http://localhost:4000/auth/login",loginField,{withCredentials:true}).then((response)=>{
      console.log(response.data.gym);
      localStorage.setItem('gymName',response.data.gym.gymName);
      localStorage.setItem('gymPic',response.data.gym.profilePic);
      localStorage.setItem('isLogin',true);
      localStorage.setItem('token',response.data.token);

      navigate('/dashboard');
    }).catch(err =>{
      const errorMessage = err.response.data.error
      // console.log(errorMessage);
      toast.error(errorMessage);
    })
  }


  const handleOnChange = (event,name) => {
    setloginField({...loginField,[name]:event.target.value});
  }
  return (
    <div className="w-full md:w-1/2 max-w-sm ">
      <div className="bg-black/70 p-6 md:p-8 rounded-2xl shadow-lg w-full">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-6">Login</h2>

        <form className="space-y-4 md:space-y-5">
          {/* Email */}
          <div><label className="block text-md font-medium text-gray-200 mb-2">Enter Username</label>
            <input value={loginField.username} onChange={(event)=>{handleOnChange(event,"username")}} type="text" placeholder="Enter your Email" className="w-full p-3 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" required /></div>

          {/* Password */}
          <div><label className="block text-md font-medium text-gray-200 mb-2">Enter Password</label>
            <input value={loginField.password} onChange={(event)=>{handleOnChange(event,"password")}} type="Password" placeholder="Enter your Password" className="w-full p-3 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" required /></div>

          {/* Button */}
          <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-300" onClick={() => { handleLogin() }}>Login</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
