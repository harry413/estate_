import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import ListingCard from '../components/ListingCard.jsx';

const Search = () => {
    const navigate = useNavigate();
    const [sidebardata, setSidebardata] = useState({
        search: '',
        type: 'all',
        offer: false,
        parking: false,
        furnished: false,
        sort: 'created_at',
        order: 'desc',
    });
   
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchFromUrl = urlParams.get('search');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if(searchFromUrl || typeFromUrl || parkingFromUrl || furnishedFromUrl || offerFromUrl || sortFromUrl || orderFromUrl ){
            setSidebardata({
                search: searchFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' ? true : false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc', 
            });
        }
        const fetchData = async() => {
            setShowMore(false);
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`)
            const data = await res.json();
            if(data.length > 8){
                setShowMore(true);
            }else{
                setShowMore(false);
            }
            setListings(data);
            setLoading(false);
        }
        fetchData();
    }, [location.search]);



    const handleChange = (e)=>{
        if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale'){
            setSidebardata({ ...sidebardata, type: e.target.id });
        }
        if(e.target.id === 'search'){
            setSidebardata({ ...sidebardata, search: e.target.value });
        }
        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
            setSidebardata({ ...sidebardata, [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false})
        }

        if(e.target.id === 'sort_order'){
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';
            setSidebardata({ ...sidebardata, sort, order });
        }
    } 
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('search', sidebardata.search);
        urlParams.set('type', sidebardata.type);
        urlParams.set('parking', sidebardata.parking);
        urlParams.set('furnished', sidebardata.furnished);
        urlParams.set('offer', sidebardata.offer);
        urlParams.set('sort', sidebardata.sort);
        urlParams.set('order', sidebardata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

    const onShowMoreClick = async () => {
        const numberOfListings = listings.length;
        const startIndex = numberOfListings;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        if (data.length < 9) {
          setShowMore(false);
        }
        setListings([...listings, ...data]);
      };

  return (
    <div className='flex flex-col md:flex-row'>
        <div className=' p-6 border-b-2 md:border-r-2 md:min-h-screen'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                <div className='flex items-center gap-2'>
                    <label className='whitespace-nowrap'>Search:</label>
                    <input type='text' id='search' placeholder='Search...' className='border rounded-lg p-3 w-full' value={sidebardata.search} onChange={handleChange}/>
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
                    <label>Type:</label>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='all' className='w-5' onChange={handleChange} checked={sidebardata.type === 'all'}/>
                        <span>Rent & Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='rent' className='w-5' onChange={handleChange} checked={sidebardata.type === 'rent'}/>
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='sale' className='w-5' onChange={handleChange} checked={sidebardata.type === 'sale'}/>
                        <span>Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='offer' className='w-5' onChange={handleChange} checked={sidebardata.offer}/>
                        <span>offer</span>
                    </div>
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
                    <label>Amenities:</label>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='parking' className='w-5' onChange={handleChange} checked={sidebardata.parking}/>
                        <span>Parking</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='furnished' className='w-5' onChange={handleChange} checked={sidebardata.furnished}/>
                        <span>Furnished</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <label>Sort:</label>
                    <select id='sort_order' className='border rounded-lg p-2' onChange={handleChange} defaultValue={'created_at_desc'}>
                        <option value='regularPrice_desc'>Price high to low</option>
                        <option value='regularPrice_asc'>Price low to high</option>
                        <option value='createdAt_desc'>Latest</option>
                        <option value='createdAt_asc'>Oldest</option>
                    </select>
                </div>
                <button className=' text-white bg-slate-700 uppercase rounded-lg p-2 hover:opacity-95'>search</button>
            </form>
        </div>
        <div className='flex-1'>
            <h1 className='text-3xl font-semibold p-3 text-slate-600 mt-5'> Listing Result</h1>
            <div className="p-7 flex flex-wrap gap-4">
                {!loading && listings.length === 0 && (
                    <p className='text-slate-900 text-xl'>No listing found!</p>
                )}
                {
                    loading && (
                        <p className='text-slate-400 text-center w-full'>Loading....</p>
                    )
                }
                {
                    !loading && listings.map((listing) => <ListingCard key={listing._id} listing={listing}/>)
                }
                {showMore && (
                    <button onClick={onShowMoreClick} className='text-blue-700 p-7 hover:underline'>
                        Show more
                    </button>
                )}
            </div>
        </div>
    </div>
  )
}

export default Search