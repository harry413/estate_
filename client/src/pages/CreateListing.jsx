import React from 'react'

const CreateListing = () => {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center mt-2 my-7'>Create a listing</h1>
        <form className='flex flex-col sm:flex-row gap-4 flex-1'>
          <div className=' flex flex-col gap-4 flex-1'>  
            <input type='text' placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='8' required />
            <textarea type='text' placeholder='Description' className='border p-3 rounded-lg' id='description'  required />
            <input type='text' placeholder='Address' className='border p-3 rounded-lg' id='address'  required />
            <div className='flex gap-6 flex-wrap'>
                <div className='flex gap-2'>
                    <input type='checkbox' id='sell' className='w-5'/>
                    <span>Sell</span>
            </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='rent' className='w-5'/>
                    <span>Rent</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='parking' className='w-5'/>
                    <span>Parking-spot</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='furnished' className='w-5'/>
                    <span>Furnished</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='offer' className='w-5'/>
                    <span>Offer</span>
                </div>
            </div>
            <div className='flex gap-6 flex-wrap'>
                <div className='flex items-center gap-2'>
                    <input className='p-1 border border-gray-400 rounded-lg' id='bedrooms' type='number' required min='1' max='10'/>
                    <p>Beds</p>
                </div>
                <div className='flex items-center gap-2'>
                    <input className='p-1 border border-gray-400 rounded-lg' id='bathrooms' type='number' required min='1' max='10'/>
                    <p>Bathrooms</p>
                </div>
                <div className='flex items-center gap-2'>
                    <input className='p-1 border border-gray-400 rounded-lg' id='regularPrice' type='number' required  />
                    <div className='flex flex-col items-center'>
                        <p>Regular price</p>
                        <span className='text-xs'>{`$/month`}</span>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <input className='p-1 border border-gray-400 rounded-lg' id='discountPrice' type='number' required  />
                    <div className='flex flex-col items-center'>
                        <p>Discount price</p>
                        <span className='text-xs'>{`$/month`}</span>
                    </div>
                </div> 
            </div>
          </div>
          <div className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold '>Images:
                    <span className='font-normal text-gray-800'>The first image will be cover (max 6)</span>
                </p>
                
            <div className=' flex  gap-4'>
                <input type='file' id='images' accept='image/*' multiple className='p- border border-gray-300 rounded w-full'/>
                <button className='p-3  border border-green-700 text-green-600  rounded uppercase hover:shadow-lg disable:opacity-80'>upload</button>
            </div>
            <button className='p-3 bg-slate-700 border text-white uppercase hover:opacity-95 disable:opacity-80 rounded-lg'>Create listing</button>
         </div>
        </form>
    </main>
  )
}

export default CreateListing