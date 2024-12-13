import React from 'react'
import Link from 'next/link'

const become = () => {
  return (
    <div className='flex flex-col items-center justify-center font-space mt-[2em] h-[78vh] gap-[2em] mb-[5em]'>
        <h1 className='text-[#007BFF] font-[300] text-[96px]'>Become an <span className='font-[700] '>Uption</span></h1>
        <p className='text-[30px] font-[400] text-black w-[30em] text-center'>Partner with us to redefine delivery. Join a network that connects your services to new customers, scales your reach, and grows your business.</p>
        <Link href="https://tally.so/r/w2vY4j">
        <button className='text-white bg-[#001B6C] px-[3em] py-[1em] rounded-full font-[500] text-[20px]  '>
            JOIN US TODAY
        </button>
        </Link>
      
    </div>
  )
}

export default become
