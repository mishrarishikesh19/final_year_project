import './App.css';
import {Routes,Route,useNavigate, useLocation} from 'react-router-dom'
import Home from './pages/Home/Home.jsx';
import Dashboard from './pages/Dashboard/dashboard.jsx';
import Sidebar from './Components/Sidebar/sidebar.jsx';
import { useEffect} from 'react';
import Member from './pages/Member/member.jsx';
import GeneralUser from './pages/GeneralUser/generalUser.jsx';
import MemberDetail from './pages/MemberDetail/memberDetail.jsx';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Re-read from localStorage on every route change (reactive to navigation)
  const isLogin = !!localStorage.getItem("isLogin");

  useEffect(()=> {
    if(!isLogin){
      navigate('/');
    }
  },[location.pathname])

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

