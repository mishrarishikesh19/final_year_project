import React,{useState,useEffect,useRef}from "react";
import MenuIcon from '@mui/icons-material/Menu';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import ErrorIcon from '@mui/icons-material/Error';
import ReportIcon from '@mui/icons-material/Report';
import Sidebar from "../../Components/Sidebar/sidebar";
import {Link} from 'react-router-dom';
const Dashboard = () => {
    const [accordianDashboard,setAccordianDashboard]= useState(false);
    const ref =useRef();

    useEffect(()=>{
        const checkIfClickedOutside = e =>{
            if(accordianDashboard && ref.current && !ref.current.contains(e.target)){
                setAccordianDashboard(false);
            }
        }
        document.addEventListener("mousedown",checkIfClickedOutside);
        return ()=>{
            document.removeEventListener("mousedown",checkIfClickedOutside);
        }
    },[accordianDashboard])

    const handleOnClickMenu = (value) =>{
        localStorage.setItem("func",value);
    }
    return (
        <div className=" text-black  relative flex flex-row w-full p-2 gap-2">
            
            <div className="w-full ">
            <div className="w-full bg-slate-900 text-white rounded-lg flex p-3 justify-between items-center ">
                <MenuIcon sx={{cursor:"pointer"}} onClick={()=>{setAccordianDashboard(prev=>!prev)}} />
                    <img className="w-8 h-8 rounded-3xl border-2"  src="https://static.vecteezy.com/system/resources/previews/002/265/650/large_2x/unknown-person-user-icon-for-web-vector.jpg" alt="profile " />
            </div>
           

           {
            accordianDashboard &&  <div ref={ref} className="absolute p-3 bg-slate-900 text-white rounded-xl text-xl font-extralight">
                <div>Hi Welcome to our Gym Management System.</div>
                <p>Feel free to ask any querries</p>
            </div>
           }
           
           

            <div className="mt-5 pt-10 bg-slate-100 bg-opacity-50 grid gap-5 grid-cols-3 w-full pb-5 overflow-x-auto h-[80%]">
                
                {/* This is a card block */}
                <Link to={'member'} className="w-full h-fit border-2 bg-white rounded-xl cursor-pointer">
                    <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                    <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
                        <PeopleAltIcon sx={{color:"green",fontSize:"50px"}}/>
                        <p className="text-xl my-3 font-semibold font-mono">Joined Members</p>
                    </div>
                </Link>

                    {/* This is a card block */}
                <Link to={"/specific/monthly"} onClick={()=>handleOnClickMenu("monthlyJoined")} className="w-full h-fit border-2 bg-white rounded-xl cursor-pointer">
                    <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                    <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
                        <SignalCellularAltIcon sx={{color:"purple",fontSize:"50px"}}/>
                        <p className="text-xl my-3 font-semibold font-mono">Monthely joined</p>
                    </div>
                </Link>

                    {/* This is a card block */}
                <Link to={'/specific/expire-with-in-3-days'} onClick={()=>handleOnClickMenu("threeDaysExpire")} className="w-full h-fit border-2 bg-white rounded-xl cursor-pointer">
                    <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                    <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
                        <AccessAlarmsIcon sx={{color:"red",fontSize:"50px"}}/>
                        <p className="text-xl my-3 font-semibold font-mono">Expiring within 3 days</p>
                    </div>
                </Link>

                    {/* This is a card block */}
                <Link to={'/specific/expire-with-in-4-7-days'} onClick={()=>handleOnClickMenu("fourToSevenDaysExpire")} className="w-full h-fit border-2 bg-white rounded-xl cursor-pointer">
                    <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                    <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
                        <AccessAlarmsIcon sx={{color:"red",fontSize:"50px"}}/>
                        <p className="text-xl my-3 font-semibold font-mono">Expiring within 4-7 days</p>
                    </div>
                </Link>

                    {/* This is a card block */}
                <Link to={'/specific/expired'} onClick={()=>handleOnClickMenu("Expired")} className="w-full h-fit border-2 bg-white rounded-xl cursor-pointer">
                    <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                    <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
                        <ErrorIcon sx={{color:"red",fontSize:"50px"}}/>
                        <p className="text-xl my-3 font-semibold font-mono">Expired</p>
                    </div>
                </Link>

                    {/* This is a card block */}
                <Link to={'/specific/InActive-Members'} onClick={()=>handleOnClickMenu("InActiveMembers")} className="w-full h-fit border-2 bg-white rounded-xl cursor-pointer">
                    <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                    <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
                        <ReportIcon sx={{color:"Brown",fontSize:"50px"}}/>
                        <p className="text-xl my-3 font-semibold font-mono">InActive Members</p>
                    </div>
                </Link>
            </div>
            <div className="md:bottom-4 p-4 md:mb-0 bg-black text-white rounded-xl text-xl">
                Contact Developer for any Technical Error at +917970658679;
            </div>

        </div>
        </div>
    )
}

export default Dashboard; 