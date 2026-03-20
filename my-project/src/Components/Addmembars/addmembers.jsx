import React,{useState, useEffect} from 'react'
import axios from 'axios'

import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { ToastContainer, toast} from 'react-toastify';

const Addmembers = () => {
    
    const [inputField,setInputField] = useState({name:"", mobileNo:"", address:"", membership:"", profilePic:"https://tse3.mm.bing.net/th/id/OIP.YOhmtCguMabecDdAfym4IQHaEu?pid=Api&P=0&h=180", joiningDate:"" })
    const [loaderImage,setLoaderImage] = useState(false);
    const [membershipList, setMembershipList] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState("");
    const handleOnChange = (event,name)=>{
      setInputField({...inputField, [name]: event.target.value})
    }
    console.log(inputField)

      // upload file preview
  const uploadImage = async(event)=>{
    setLoaderImage(true);
    console.log("Image Uploading");
    const files = event.target.files;
    const data = new FormData();
    data.append("file",files[0]);
    // ddwuiogcx
    data.append("upload_preset","Gymgenie");
    try{
      const response = await axios.post("https://api.cloudinary.com/v1_1/ddwuiogcx/image/upload",data);
      console.log(response)
      const imageUrl = response.data.secure_url;
      setInputField({...inputField,['profilePic']:imageUrl})
      setLoaderImage(false);
    }catch(err){
      console.log(err);
      setLoaderImage(false);
    }
  }

  const fetchMembership = async()=>{
    await axios.get("http://localhost:4000/plans/get-membership",{withCredentials:true}).then((response)=>{
      setMembershipList(response.data.membership);
      if (response.data.memberships.length === 0) {
        return toast.error("No any Membership added yet",{
          className:"text-lg"
        })
      }else{
        let a = response.data.membership[0]._id;
        setSelectedOptions(a);
        setInputField({...inputField, membership:a})
      }
    }).catch((err)=>{
      console.log(err);
      toast.error("Something wrong Happedned");
    })

  }

  useEffect(()=>{
    console.log(inputField);
    fetchMembership();
  },[]);

  const handleOnChangeSelect = (event)=>{
    let value = event.target.value;
    setSelectedOptions(value);
    setInputField({...inputField, membership:value})
  }

  const handleRegisterButton = async()=>{
    await axios.post("http://localhost:4000/members/register-member", inputField,{withCredentials:true}).then((response)=>{
      toast.success("Added Successfully");
      setTimeout(()=>{
        window.location.reload();
      },2000)
    }).catch((err)=>{
      console.log(err);
      toast.error("Something wrong Happedned");
    })
  }
  return (
    <div className='text-black '>
        <div className='grid gap-5 grid-cols-2 text-lg'>
           
            <input value={inputField.name} onChange={(event)=> {handleOnChange(event,"name")}} placeholder='Name of The Joinee' type='text' className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' />
            <input value={inputField.mobileNo} onChange={(event)=> {handleOnChange(event,"mobileNo")}} placeholder='Mobile No' type='text' className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' />
            <input value={inputField.address} onChange={(event)=> {handleOnChange(event,"address")}} placeholder='Enter Address' type='text' className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' />
            <input value={inputField.joiningDate} onChange={(event)=> {handleOnChange(event,"joiningDate")}} type='date' className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' />
       
            <select value={selectedOptions} onChange={handleOnChangeSelect} className='border-2 w-[90%] h-12 pt-2 pb-2 border-slate-400 rounded-md placeholder:text-gray'>
                {
                  membershipList.map((item, index)=>{
                    return(
                      <option key={index} value={item._id}>{item.months} Months Membership</option>
                    );
                  })
                }
            </select>

            <input type='file' onChange={(event)=>{uploadImage(event)}} />

            <div className='w-1/4'>
                <img src={inputField.profilePic} alt='pic' className='w-full h-full rounded-full' />
                {
                    loaderImage && <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                        <LinearProgress color="secondary" />
                    </Stack>  
                } 
            </div>
            

            <div onClick={()=>handleRegisterButton()} className='p-3 border-2 w-28 text-lg h-14 text-center bg-slate-900 text-white rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>Register</div>
       
        </div>
        <ToastContainer />
    </div>
  )
}
export default Addmembers;