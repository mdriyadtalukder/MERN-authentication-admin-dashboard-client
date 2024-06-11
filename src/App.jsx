import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import List from './pages/list/List'
import Single from './pages/single/Single'
import New from './pages/new/New'
import './style/dark.scss'
import { useSelector } from 'react-redux'
import Verification from './pages/signup/Verification'
import SignUp from './pages/signup/SignUp'
import ForgetPass from './pages/forget/ForgetPass'
import Verify from './pages/forget/Verify'
import ChnagePass from './pages/forget/ChnagePass'
import Profile from './pages/profile/Profile'

function App() {
  const { mode } = useSelector(state => state.mode);
  const { user } = useSelector(state => state.user);

  const RequireAuth = ({ children }) => {
    return user ? children : <Navigate to='/login'></Navigate>;
  }
  //console.log(user)
  return (
    <div className={(mode === 'dark') && 'dark'}>
      <Routes>
        <Route path='/'>
          <Route index element={<RequireAuth><Home></Home></RequireAuth>}></Route>
          <Route path='login' element={<Login></Login>}></Route>
          <Route path='signup' element={<SignUp></SignUp>}></Route>
          <Route path='verification' element={<Verification></Verification>}></Route>
          <Route path='forget' element={<ForgetPass></ForgetPass>}></Route>
          <Route path='verify' element={<Verify></Verify>}></Route>
          <Route path='changepass' element={<ChnagePass></ChnagePass>}></Route>
          <Route path='profile' element={<RequireAuth><Profile></Profile></RequireAuth>}></Route>
          <Route path='users'>
            <Route index element={<RequireAuth><List></List></RequireAuth>}></Route>
            <Route path=':userId' element={<RequireAuth><Single></Single></RequireAuth>}></Route>
            <Route path='new' element={<RequireAuth><New title="Add New User"></New></RequireAuth>}></Route>
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
