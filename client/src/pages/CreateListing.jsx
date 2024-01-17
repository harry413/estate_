import {useState} from 'react'
import { app } from '../firebase.js'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'

const CreateListing = () => {
    const {currentUser} = useSelector((state) => state.user);
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 10,
        offer: false,
        parking: false,
        furnished: false,
    });
    console.log(formData);
    const [imageError, setImageError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();


    const handleImageSubmit = (e) => {
        
        if(files.length > 0 && files.length + formData.imageUrls.length < 7){
            setUploading(true);
            const promises = [];

            for(let i = 0; i < files.length; i++){
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls) => {
                setFormData({...formData, imageUrls: formData.imageUrls.concat(urls)
                });
                setImageError(false);
                setUploading(false);
            }).catch((error) => {
                setImageError('image upload failed (2 mb max)')
            });
        }else{
            setImageError('you can only upload 6 images')
        }
    };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                       console.log(`uploading is ${progress}% done`);
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    })
                }
            )
        });
    };

    const handleDeleteImage = ( index ) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((url, i) => i !== index),
        });
    }

    const handleChange = (e) => {
        if(e.target.id === 'sale' || e.target.id === 'rent'){
            setFormData({
                ...formData,
                type: e.target.id
            })
        }
        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
            setFormData({
                ...formData,
                [e.target.id] : e.target.checked
            })
        }
        if(e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea'){
            setFormData({
                ...formData,
                [e.target.id] : e.target.value
            })
        }
    };
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            if(formData.imageUrls.length < 1) return setError('you must upload at least one image');
            if(+formData.regularPrice < +formData.discountPrice) return setError('regular price must greater then discount price')
            setLoading(true);
            setError(false);
            const res = await fetch('/api/listing/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        ...formData,
                       userRef : currentUser._id,
                    })
            })
            const data = await res.json();
            setLoading(false);
            if(data.success === false){
                setError(data.message);
            }
            navigate(`/listing/${data._id}`)
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    }

  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center mt-2 my-7'>Create a listing</h1>
        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4 flex-1'>
          <div className=' flex flex-col gap-4 flex-1'>  
            <input type='text' placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='8' required onChange={handleChange} value={formData.name} />
            <textarea type='text' placeholder='Description' className='border p-3 rounded-lg' id='description'  required onChange={handleChange} value={formData.description} />
            <input type='text' placeholder='Address' className='border p-3 rounded-lg' id='address'  required onChange={handleChange} value={formData.address}/>
            <div className='flex gap-6 flex-wrap'>
                <div className='flex gap-2'>
                    <input type='checkbox' id='sale' className='w-5' onChange={handleChange} checked={formData.type === 'sale'}/>
                    <span>Sell</span>
                 </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='rent' className='w-5'  onChange={handleChange} checked={formData.type === 'rent'}/>
                    <span>Rent</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='parking' className='w-5'  onChange={handleChange} checked={formData.type.parking}/>
                    <span>Parking-spot</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='furnished' className='w-5' onChange={handleChange} checked={formData.furnished}/>
                    <span>Furnished</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='offer' className='w-5' onChange={handleChange} checked={formData.offer}/>
                    <span>Offer</span>
                </div>
            </div>
            <div className='flex gap-6 flex-wrap'>
                <div className='flex items-center gap-2'>
                    <input className='p-1 border border-gray-400 rounded-lg' id='bedrooms' type='number' required min='1' max='10' onChange={handleChange} value={formData.bedrooms}/>
                    <p>Beds</p>
                </div>
                <div className='flex items-center gap-2'>
                    <input className='p-1 border border-gray-400 rounded-lg' id='bathrooms' type='number' required min='1' max='10' onChange={handleChange} value={formData.bathrooms}/>
                    <p>Bathrooms</p>
                </div>
                <div className='flex items-center gap-2'>
                    <input className='p-1 border border-gray-400 rounded-lg' id='regularPrice' type='number' required min='50' max='10000000' onChange={handleChange} value={formData.regularPrice} />
                    <div className='flex flex-col items-center'>
                        <p>Regular price</p>
                        <span className='text-xs'>{`$/month`}</span>
                    </div>
                </div>
                {formData.offer && 
                    <div className='flex items-center gap-2'>
                        <input className='p-1 border border-gray-400 rounded-lg' id='discountPrice' type='number' required min='10' max='1000000' onChange={handleChange} value={formData.discountPrice} />
                        <div className='flex flex-col items-center'>
                             <p>Discount price</p>
                            <span className='text-xs'>{`$/month`}</span>
                        </div>
                    </div> 
                }
                
            </div>
          </div>
          <div className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold '>Images:
                    <span className='font-normal text-gray-800'>The first image will be cover (max 6)</span>
                </p>
                
            <div className=' flex  gap-4'>
                <input onChange={(e) => setFiles(e.target.files)} type='file' id='images' accept='image/*' multiple className='p- border border-gray-300 rounded w-full'/>
                <button onClick={handleImageSubmit} type='button' className='p-3  border border-green-700 text-green-600  rounded uppercase hover:shadow-lg disable:opacity-80'>{uploading ? 'Uploading' : 'Upload'}</button>
            </div>
            <p className='text-red-700 text-sm'>{imageError && imageError}</p>
            {
                formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                    <div key={url} className='flex justify-between p-3 items-center'>
                        <img src={url} alt='listing image' className='w-20 h-20 object-contain rounded-lg' />
                        <button type='button' onClick={() => handleDeleteImage(index)} className='text-red-700 text-sm p-3 uppercase rounded-lg hover: opacity-75'>Delete</button>
                    </div>
                ))
            }
            <button disabled={loading || uploading} className='p-3 bg-slate-700 border text-white uppercase hover:opacity-95 disable:opacity-80 rounded-lg'>{loading ? 'Creating.....' : 'Create Listing'}</button>
            {error && <p className='text-red-700 text-sm'>{error}</p>}

         </div>
        </form>
    </main>
  )
}

export default CreateListing