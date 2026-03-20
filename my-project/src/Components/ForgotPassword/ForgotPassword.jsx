import React, { useState } from "react";
import Loader from "../Loader/loader";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";
const ForgotPassword = () => {
    const [emailSubmit, setEmailSubmit] = useState(false);
    const [otpvalidate, setotpvalidate] = useState(false);
    const [loader, setLoader] = useState(false);
    const [contentval, setcontentvalue] = useState("Submit Your Email");

    const [inputField,setInputField] = useState({email:"", otp:"", newPassword:""});

    const handleSubmit = () => {
        if (!emailSubmit) {
            sendOtp();
        } else if (emailSubmit && !otpvalidate) {
            verifyOtp();
        }else{
            changePassword();
        }
    };


    const changePassword = async()=>{
        setLoader(true);
        await axios.post("http://localhost:4000/auth/reset-password",{email:inputField.email,newPassword:inputField.newPassword}).then((response)=>{
            toast.success(response.data.message);
            setLoader(false);
        }).catch(err =>{
            toast.error("Some technical issue while sending mail")
            console.log(err);
            setLoader(false);
        })
    }


    const verifyOtp = async() =>{
        setLoader(true);
        await axios.post("http://localhost:4000/auth/reset-password/checkOtp",{email:inputField.email, otp:inputField.otp}).then((response)=>{
            setotpvalidate(true);
            setcontentvalue("Submit Your New Password");
            toast.success(response.data.message);
            setLoader(false);
        }).catch(err =>{
            toast.error("Invalid OTP")
            console.log(err);
            setLoader(false);
        })
    }


    const sendOtp = async()=>{
        setLoader(true);
        await axios.post("http://localhost:4000/auth/reset-password/sendOtp",{email:inputField.email}).then((response)=>{
            setEmailSubmit(true);
            setcontentvalue("Submit Your OTP");
            toast.success(response.data.message);
            setLoader(false);
        }).catch(err =>{
            toast.error("Some technical issue while sending mail")
            console.log(err);
            setLoader(false);
        })

    }
    
    
    const handleOnChange =(event,name)=>{
        setInputField({...inputField,[name]:event.target.value})
    }

    return (
        <div className="w-full">
             {/* Email */}
            <div className="w-full mb-5">
                <div>Enter Your Email</div>
                <input type="text" value={inputField.email} onChange={(event)=>{handleOnChange(event,"email")}} className="w-1/2 p-2 rounded-lg border-2 border-slate-400" placeholder="Enter Email"/>
            </div>

           {/* OTP */}
           {emailSubmit &&  (
                <div className="w-full mb-5">
                    <div>Enter Your OTP</div>
                    <input type="text" value={inputField.otp}  onChange={(event)=>{handleOnChange(event,"otp")}} className="w-1/2 p-2 rounded-lg border-2 border-slate-400" placeholder="Enter OTP"/>
                </div>
           )}

          
            {/* New Password */}
            {otpvalidate && (
                <div className="w-full mb-5">
                    <div>Enter Your New Password</div>
                    <input type="password" value={inputField.newPassword}  onChange={(event)=>{handleOnChange(event,"newPassword")}} className="w-1/2 p-2 rounded-lg border-2 border-slate-400" placeholder="Enter New Password"/>
                </div>
            )}

            {/* Submit Button */}
            <div className="bg-slate-800 text-white mx-auto w-2/3 p-3 rounded-lg text-center font-semibold cursor-pointer border-2 hover:bg-white hover:text-black" 
                onClick={ handleSubmit}>{contentval}
            </div>
            {loader && <Loader /> }
            <ToastContainer />
        </div>
    );
};

export default ForgotPassword;
