import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from '@firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { signInSuccess } from '../redux/user/userSlice.js';


const OAuth = () => {
    const dispatch = useDispatch();
    const  navigate = useNavigate();
    const handleGoogle = async() => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            console.log(result)
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photo: result.user.photoURL,})
            })
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
            console.log('could not sign in with google', error);
        }
    };
  return (
    <button onClick={handleGoogle} type='button' className='bg-red-600 p-2 text-white uppercase rounded-md hover:opacity-95'>Continue with google</button>
  )
}

export default OAuth