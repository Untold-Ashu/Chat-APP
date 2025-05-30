import { Toaster } from "react-hot-toast";
import { Route, Routes,Navigate } from 'react-router-dom';
import "./App.css";
import { useAuthContext } from "./context/AuthContext.jsx";
import Home from "./pages/home/home.jsx";
import Login from './pages/Login/Login.jsx';
import SignUp from "./pages/SignUp/SignUp.jsx";
function App() {
  const {authUser}=useAuthContext();
  return (
  <div className='p-4 h-screen flex items-center justify-center'>
   <Routes>
    <Route path='/' element={authUser? <Home/>:<Navigate to='/login'/>}/>
    <Route path='/login' element={authUser? <Navigate to='/'/>:<Login/>}/>
    <Route path='/signup' element={authUser? <Navigate to='/'/>:<SignUp/>}/>
   </Routes>
   <Toaster />
  </div>
  );
  
    
}

export default App;
