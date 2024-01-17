import {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'

//react-icons
import { MdSearch } from 'react-icons/md'
import { GiHouse } from "react-icons/gi";


const Header = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('search', search);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

    useEffect (() => {
        const urlParams = new URLSearchParams(location.search);
        const searchFromUrl = urlParams.get('search');
        if(searchFromUrl) {
            setSearch(searchFromUrl)
        }
    }, [location.search])
  return (
    <header className='bg-slate-200 shadow-lg rounded-bottom'>
            <div className='flex items-center justify-between max-w-6xl mx-auto p-3'>
                <Link to='/'>
                    <h1 className='font-bold text-md flex flex-wrap cursor-pointer'>
                        <span className='text-slate-600 text-xl gap-1'>Patidar</span>
                        <span className='text-slate-900 underline border pt-1.5'>Estate</span>
                        <GiHouse className='text-xl text-slate-600 mt-2'/>
                    </h1>
                </Link>
                <form onSubmit={handleSubmit} className='bg-slate-50 p-2 rounded-lg flex items-center justify-between'>
                    <input  type='text' placeholder='Search....'  className=' bg-transparent focus:outline-none w-24 sm:w-64' value={search} onChange={(e) => setSearch(e.target.value)}/>
                   <button>
                        <MdSearch className='text-xl text-slate-700'/>
                   </button>
                    
                </form>
                <ul className='flex gap-2 text-bold '>
                    <Link to='/'>
                        <li 
                            className='hidden sm:inline text-slate-700 hover:text-gray-900 cursor-pointer  px-2 mx-1 rounded-md'
                        >
                            Home
                        </li>
                    </Link>
                    <Link to='/about'>
                        <li 
                            className='hidden sm:inline text-slate-700  px-2 mx-1 hover:text-gray-900 cursor-pointer rounded-md'
                        >
                            About
                        </li>
                    </Link>
                    
                    <Link to='/profile'>
                        { currentUser? (
                            <img src={currentUser.avatar} alt='profile' className='rounded-full h-8 w-8 object-cover'/>
                        ): (
                            <li className='hidden sm:inline text-slate-700  px-2 mx-1 hover:text-gray-900 cursor-pointer rounded-md'>
                                Sign In
                            </li>
                        )}
                    </Link>
                </ul>
            </div>
    </header>
  )
}

export default Header