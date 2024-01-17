import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'

const ListingCard = ({ listing }) => {
  return (
    <div className='bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden transition-shadow w-[230px] sm:w-[220px]'>
        <Link to={`/listing/${listing._id}`} className='flex flex-col'>
            <img src={listing.imageUrls[0]} alt='card image' className='h-[180px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300 rounded-t-lg' />
            <div className="flex flex-col p-3 gap-1">
                <p className="text-lg font-bold text-slate-700 truncate">{listing.name}</p>
                <div className='flex items-center gap-1'>
                  <MdLocationOn className='w-4 h-4 text-green-700'/>
                  <p className='truncate text-sm text-slate-500'>{listing.address}</p>
                </div>
                <p className='text-sm text-gray-600 line-clamp-2'>{listing.description}</p>
                <p className='text-slate-500 mt-2 font-semibold'>
                  $
                  {listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
                  {listing.type === 'rent' && '/ month'}
                </p>
                <div className='text-slate-700 flex gap-4'>
                  <div className="text-xs font-bold">
                   {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed` }
                  </div>
                  <div className="text-xs font-bold">
                   {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath` }
                  </div>
                </div>
            </div>
        </Link>
        
    </div>
  )
}

export default ListingCard