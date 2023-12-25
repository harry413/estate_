import React from 'react'
import {Link} from 'react-router-dom'

const SignIn = () => {
  return (
    <div className='p-3 max-w-md mx-auto'>
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className='flex flex-col gap-4 px-3'>
         <input type="email" placeholder='Email' className='border-none p-2 rounded-lg'/>
         <input type="password" placeholder='Password' className='border-none p-2 rounded-lg'/>
          <button className='bg-slate-700 text-white p-2 rounded-lg uppercase hover:opacity-95 disabled:opacity-86'>sign in</button>
      </form>
      <div className='flex p-4 items-center justify-center'>
        <p className='text-black-900'>Don't have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
    </div>
  )
}

export default SignIn