import { Routes, Route } from 'react-router-dom'

//importing pages
import Home from './Pages/Home.jsx'
import SignIn from './Pages/SignIn.jsx'
import SignOut from './Pages/SignOut.jsx'
import Profile from './pages/Profile.jsx'
import About from './Pages/About.jsx'
import SignUp from './pages/SignUp.jsx'
import CreateListing from './pages/createListing.jsx'

//components
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import  {PrivateRoute}  from './components/PrivateRoute.jsx'




function App() {
 
  return (
    <>  
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/sign-in' element={<SignIn/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route element={<PrivateRoute/>}>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/create-listing' element={<CreateListing/>}/>
          </Route>
          <Route path='/about' element={<About/>}/>
          <Route path='/log-out' element={<SignOut/>}/>
        </Routes>
      <Footer/>
    </>
  )
}

export default App
