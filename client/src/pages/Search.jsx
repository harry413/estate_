import {
    useState
} from 'react'

const Search = () => {
    const [sidebardata, setSidebardata] = useState({
        search: '',
        type: 'all',
        offer: false,
        parking: false,
        furnished: false,
        sort: 'created_at',
        order: 'desc',
    });
    console.log(sidebardata);
    const handleChange = (e)=>{
        if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale'){
            setSidebardata({ ...sidebatdata, type: e.target.id });
        }
        if(e.target.id === 'search'){
            setSidebardata({ ...sidebatdata, search: e.target.value });
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
  return (
    <div className='flex flex-col md:flex-row'>
        <div className=' p-6 border-b-2 md:border-r-2 md:min-h-screen'>
            <form className='flex flex-col gap-8'>
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
        <div className=''>
            <h1 className='text-3xl font-semibold p-3 text-slate-600 mt-5'> Listing Result</h1>
        </div>
    </div>
  )
}

export default Search