import {useState} from "react"
import { Link, useNavigate } from 'react-router-dom'
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth.jsx";


const SignIn = () => {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      dispatch(signInStart);
      const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
    if(data.success === false){
      dispatch(signInFailure(data.message));
      return;
    }
    dispatch(signInSuccess(data));
    navigate('/')
    } catch (error) {
     dispatch(signInFailure(error.message));
    } 
  };
  return (
    <div className='p-3 max-w-md mx-auto'>
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 px-3' >
         
         <input 
            type="email" 
            placeholder='Email' 
            className='border-none p-2 rounded-lg' 
            id='email' 
            onChange={handleChange}
          />
         <input 
            type="password" 
            placeholder='Password' 
            className='border-none p-2 rounded-lg' 
            id='password' 
            onChange={handleChange}
          />
          <button 
              disabled={loading} 
              className='bg-slate-700 text-white p-2 rounded-lg uppercase hover:opacity-95 disabled:opacity-86'
          >{loading? 'loading...' : 'Sign In'}
          </button>
          <OAuth/>
      </form>
      <div className='flex p-4 items-center justify-center'>
        <p className='text-black-900'>Not register yet? </p>
        <Link to={"/sign-up"}>
          <span className='text-blue-700  '> Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-400 mt-5'>{error}</p>}
    </div>
  )
}

export default SignIn