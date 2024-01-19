import { Routes, Route } from 'react-router-dom'

//importing pages
import Home from './pages/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import SignOut from './pages/SignOut.jsx'
import Profile from './pages/Profile.jsx'
import About from './pages/About.jsx'
import SignUp from './pages/SignUp.jsx'
import CreateListing from './pages/CreateListing.jsx'
import UpdateListing from './pages/UpdateListing.jsx'
import Listing from './pages/Listing.jsx'
import Search from './pages/Search.jsx'


//components
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import PrivateRoute from './components/Private.jsx'


function App() {
 
  return (
    <>  
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/sign-in' element={<SignIn/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/listing/:listingId' element={<Listing/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route element={<PrivateRoute/>}>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/create-listing' element={<CreateListing/>}/>
            <Route path='/update-listing/:listingId' element={<UpdateListing/>}/>
          </Route>
          <Route path='/about' element={<About/>}/>
          <Route path='/log-out' element={<SignOut/>}/>
        </Routes>
      <Footer/>
    </>
  )
}

export default App
