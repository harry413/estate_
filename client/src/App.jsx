import { Routes, Route } from 'react-router-dom'

//importing pages
import Home from './Pages/Home'
import SignIn from './Pages/SignIn'
import SignOut from './Pages/SignOut'
import Profile from './Pages/Profile'
import About from './Pages/About'
import SignUp from './pages/SignUp'


//components
import Header from './components/Header'
import Footer from './components/Footer'


function App() {
 
  return (
    <>  
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/sign-in' element={<SignIn/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/log-out' element={<SignOut/>}/>
        </Routes>
      <Footer/>
    </>
  )
}

export default App
