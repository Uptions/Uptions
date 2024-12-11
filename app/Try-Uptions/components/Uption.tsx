import React from 'react';

const Uption = () => {
  return (
    <div className='font-space items-center flex flex-col mt-[5em] pb-[8em]'>
      <h1 className='font-[400] text-[96px] text-[#007BFF]'>
        Find an <span className='text-[#001B6C] font-[700]'>Uption</span>
      </h1>
      <p className='font-[400] text-[30px] text-[#001B6C] w-[736px] text-center'>
        Looking to deliver something, fill out the form below and find the best delivery service that fits your budget and needs.
      </p>

      {/* form for finding uptions */}
      <div className='bg-white shadow-lg rounded-lg p-8  w-[700px] mt-[3em] border-gray-200 border-[2px] '>
        <form className='flex flex-col space-y-6'>
          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='origin'>
              Origin location
            </label>
            <input
              id='origin'
              type='text'
              placeholder='Input pickup location'
              className='w-full px-4 py-2 border rounded-md text-[#001B6C] focus:outline-none focus:ring-2 focus:ring-[#007BFF]'
            />
          </div>

          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='destination'>
              Destination
            </label>
            <input
              id='destination'
              type='text'
              placeholder='Input destination'
              className='w-full px-4 py-2 border rounded-md text-[#001B6C] focus:outline-none focus:ring-2 focus:ring-[#007BFF]'
            />
          </div>

          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='quantity'>
              Quantity
            </label>
            <input
              id='quantity'
              type='number'
              placeholder='1'
              className='w-full px-4 py-2 border rounded-md text-[#001B6C] focus:outline-none focus:ring-2 focus:ring-[#007BFF]'
            />
          </div>

          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='weight'>
              Weight class [kg]
            </label>
            <input
              id='weight'
              type='text'
              placeholder='2kg'
              className='w-full px-4 py-2 border rounded-md text-[#001B6C]focus:outline-none focus:ring-2 focus:ring-[#007BFF] text-[#001B6C]'
            />
          </div>

          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='vehicle-type'>
              Vehicle type
            </label>
            <select
              id='vehicle-type'
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#007BFF] text-[#001B6C] '
            >
              <option>Bike</option>
              <option>Car</option>
              <option>Van</option>
            </select>
          </div>

          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='item-value'>
              Item value (Naira)
            </label>
            <input
              id='item-value'
              type='text'
              placeholder='NGN 50,000'
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#007BFF] text-[#001B6C]'
            />
          </div>

          <button
            type='submit'
            className='w-full py-3 bg-[#007BFF] text-white font-bold rounded-md hover:bg-[#0056b3] focus:outline-none focus:ring-4 focus:ring-[#0056b3]'
          >
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
};

export default Uption;
