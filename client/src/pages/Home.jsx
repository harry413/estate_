import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import ListingCard from '../components/ListingCard';


const Home = () => {
  SwiperCore.use([Navigation]);
  const [offer, setOffer] = useState([]);
  const [sale, setSale] = useState([]);
  const [rent, setRent] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async() => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOffer(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    }

    const fetchRentListings = async() => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRent(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    }
    const fetchSaleListings = async() => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSale(data);
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
        offer && offer.length> 0 && offer.map((listing) => (
          <SwiperSlide>
            <div style={{ background:`url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize:'cover' }} className="h-[500px]" key={listing._id}></div>
          </SwiperSlide>
        ))
      }
      </Swiper>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-6 my-10'>
        {offer && offer.length > 0 && (
          <div className=''>
                <div className='my-3'>
                  <h2 className='text-2xl font-bold text-slate-600'>Recent Offer</h2>
                  <Link to={'/search?offer=true'} className='text-sm text-blue-800 hover:underline'> Show more offers-</Link>
                </div>
                <div className='flex flex-wrap gap-4'>
                  {
                    offer.map((listing) =>(
                      <ListingCard listing={listing} key={listing._id} />
                    ))
                  }
                </div>
          </div>
        )}
        {rent && rent.length > 0 && (
          <div className=''>
                <div className='my-3'>
                  <h2 className='text-2xl font-bold text-slate-600'>Recent places for Rent</h2>
                  <Link to={'/search?type=rent'} className='text-sm text-blue-800 hover:underline'> Show more places-</Link>
                </div>
                <div className='flex flex-wrap gap-4'>
                  {
                    rent.map((listing) =>(
                      <ListingCard listing={listing} key={listing._id} />
                    ))
                  }
                </div>
          </div>
        )}
        {sale && sale.length > 0 && (
          <div className=''>
                <div className='my-3'>
                  <h2 className='text-2xl font-bold text-slate-600'>Recent places for Sale</h2>
                  <Link to={'/search?type=sale'} className='text-sm text-blue-800 hover:underline'> Show more places-</Link>
                </div>
                <div className='flex flex-wrap gap-4'>
                  {
                    sale.map((listing) =>(
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