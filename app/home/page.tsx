"use client"
import React from 'react';
import Navbar from '@/app/home/components/navbar';
import Hero from '@/app/home/components/hero';
import Unlock from '@/app/home/components/unlock';



const Page = () => {
  return (
   
      <div className='pt-[3em]'>
      <Navbar />
      <Hero />
      <Unlock />

      </div>


  );
};

export default Page;
