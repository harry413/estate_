import { useState, useRef,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from  'firebase/storage'
import { app } from '../firebase.js'
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../redux/user/userSlice.js';


const Profile = () => {
  const fileRef = useRef(null);
  const {currentUser, loading, error} = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [imagePerc, setImagePerc] = useState(0);
  const [fileError, setFileError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if(file){
      handleFile(file);
    }
  }, [file]);

  const handleFile = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const upload = uploadBytesResumable(storageRef, file);

    upload.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImagePerc(Math.round(progress));
        },
        (error) => {
          setFileError(true);
        },
        () => {
          getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
            setFormData({...formData, avatar: downloadURL });
           });
        }
    );
  };
 
   const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value });
   }
   const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
   }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex  flex-col gap-4' onSubmit={handleSubmit}>
        <input onChange={(e) => setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*' />
        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt='photo' className='rounded-full object-cover cursor-pointer self-center mt-2 h-24 w-24'/>
        <p className=' flex self-align items-center justify-center'>
          {
          fileError  
                    ? (<span className='text-red-700'>Enable to upload image(image should be less then 2MB)</span>) 
                    : (imagePerc > 0 && imagePerc < 100 ? (
                      <span className='text-slate-700'>{`uploading ${imagePerc}%`}</span>) : 
                        (imagePerc === 100 ? (
                          <span className='text-green-700'>image uploaded successfully</span>
                        ): ''
                        ))
          }
        </p>
        <input 
            type="text" 
            placeholder='Username' 
            className='border-none p-2 rounded-lg' 
            id='username' 
            defaultValue={currentUser.username}
            onChange={handleChange}
          />
         <input 
            type="email" 
            placeholder='Email' 
            className='border-none p-2 rounded-lg' 
            id='email' 
            defaultValue={currentUser.email}
            onChange={handleChange}
          />
         <input 
            type="password" 
            placeholder='Password' 
            className='border-none p-2 rounded-lg' 
            id='password' 
            onChange={handleChange}
          />
          <button  disabled={loading}
              className='bg-slate-700 text-white p-2 rounded-lg uppercase hover:opacity-95 disabled:opacity-86'
          >{loading ? 'Loading...' : 'Update'}
          </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
      <p className='text-red-700 mt-4'>{error ? error : ''}</p>
      <p className='text-green-700 mt-4'>{updateSuccess ? 'update successfully!' : ''}</p>
    </div>
  )
}

export default Profile