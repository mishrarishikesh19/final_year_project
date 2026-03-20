
import './App.css';
import {Routes,Route,useNavigate} from 'react-router-dom'
import Home from './pages/Home/Home.jsx';
import Dashboard from './pages/Dashboard/dashboard.jsx';
import Sidebar from './Components/Sidebar/sidebar.jsx';
import { useState,useEffect} from 'react';
import Member from './pages/Member/member.jsx';
import GeneralUser from './pages/GeneralUser/generalUser.jsx';
import MemberDetail from './pages/MemberDetail/memberDetail.jsx';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(()=> {
    let isLogin = localStorage.getItem("isLogin");
    if(isLogin){
      setIsLogin(true);
      navigate('/dashboard')
    }else{
  setIsLogin(false);
      navigate('/');
    }
  },[localStorage.getItem("isLogin")])

  return (
      <div className='flex'>
        {
          isLogin && <Sidebar />
        }
        
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/member' element={<Member />} />
          <Route path='/specific/:page' element={<GeneralUser />}/>
          <Route path='/member/:id' element={<MemberDetail />}/>
        </Routes>
      </div>
  );
}

export default App;

