import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingCard from '../components/ListingCard.jsx';


const Home = () => {
  SwiperCore.use([Navigation]);
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async() => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    }

    const fetchRentListings = async() => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    }
    const fetchSaleListings = async() => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchOfferListings();
  }, [])

  return (
    <div className=''>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your <span className='text-slate-500 hover:text-slate-400 '>perfect</span> and <span className='text-slate-500 hover:text-slate-400 '>dream</span><br/> home to live
        </h1>
        <div className=" text-gray-500 text-xs sm: text-sm"> Patidar estate is the best place to find your dream place to live</div>
        <Link to={'/search'} className='text-xs sm:text-sm text-blue-700 font-bold hover:underline'> lets get start...</Link>
      </div>
      <Swiper navigation>
        {
        offerListings && offerListings.length > 0 && offerListings.map((listing) => (
          <SwiperSlide  key={listing._id}>
            <div style={{ background:`url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize:'cover' }} className="h-[500px]"></div>
          </SwiperSlide>
        ))
      }
      </Swiper>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-6 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
                <div className='my-3'>
                  <h2 className='text-2xl font-bold text-slate-600'>Recent Offer</h2>
                  <Link to={'/search?offer=true'} className='text-sm text-blue-800 hover:underline'> Show more offers-</Link>
                </div>
                <div className='flex flex-wrap gap-4'>
                  {
                    offerListings.map((listing) =>(
                      <ListingCard listing={listing} key={listing._id} />
                    ))
                  }
                </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
                <div className='my-3'>
                  <h2 className='text-2xl font-bold text-slate-600'>Recent places for Rent</h2>
                  <Link to={'/search?type=rent'} className='text-sm text-blue-800 hover:underline'> Show more places-</Link>
                </div>
                <div className='flex flex-wrap gap-4'>
                  {
                    rentListings.map((listing) =>(
                      <ListingCard listing={listing} key={listing._id} />
                    ))
                  }
                </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
                <div className='my-3'>
                  <h2 className='text-2xl font-bold text-slate-600'>Recent places for Sale</h2>
                  <Link to={'/search?type=sale'} className='text-sm text-blue-800 hover:underline'> Show more places-</Link>
                </div>
                <div className='flex flex-wrap gap-4'>
                  {
                    saleListings.map((listing) =>(
                      <ListingCard listing={listing} key={listing._id} />
                    ))
                  }
                </div>
          </div>
        )}
      </div>
      
    </div>
  )
}

export default Home