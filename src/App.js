import './App.css';
import Home from './Components/Home';
import UserLogin from './Components/UserLogin'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import HomePage from './Pages/HomePage';
import HomeProfilePage from './Pages/HomeProfilePage';
import EditProfilePage from './Pages/EditProfilePage';
import DashboardPage from './Pages/DashboardPage';
import TermsAndConditionsPage from './Pages/TermsAndConditionsPage';
import LikesPage from './Pages/LikesPage';
import ForgotPassword from './Pages/ForgotPassword';
import ChangePasswordPage from './Pages/ChangePasswordPage';
import NotFoundPage from './Pages/NotFoundPage';

function App() {
  let exptime = localStorage.getItem('exptime')
  const current = new Date().getTime();

    if (current > exptime) {
      localStorage.removeItem('token');
      localStorage.removeItem('exptime')
    }
    const user = localStorage.getItem('email')


  
  return (
    <Router>
      <Routes>
        <Route path='/' element={(!user)?<Navigate to ='/home'/> : <Navigate to='/home' />}/>
        <Route path='/login' element={(!user)?<LoginPage/>:<Navigate to='/home'/>}/>
        <Route path='/createaccount' element={(!user)?<SignupPage/> : <Navigate to = '/home'/>}/>

        <Route path='/home' element={<HomePage/>} />
        <Route path='/:email' element={<HomeProfilePage/> } />
        <Route path='/edit/profile' element={(user)?<EditProfilePage/>: <Navigate to='/login'/>}/>
        <Route path='/dashboard/enquires' element={(user)?<DashboardPage/>: <Navigate to='/login'/>}/>
        <Route path='/dashboard/likes' element={(user)?<LikesPage/>: <Navigate to='/login'/>}/>
        <Route path='/forgot-password' element={(!user)?<ForgotPassword/>:<Navigate to= '/home'/>}/>
        <Route path='/change-password' element={(user)?<ChangePasswordPage/>:<Navigate to='/login'/>}/>

        <Route path='/terms-and-conditions' element={(user)?<TermsAndConditionsPage/>:<Navigate to ='/login'/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
        
      </Routes>
      </Router>
  );
}

export default App;
