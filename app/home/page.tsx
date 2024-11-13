"use client"
import React from 'react';
import Navbar from '@/app/home/components/navbar';
import Hero from '@/app/home/components/hero';
import Unlock from '@/app/home/components/unlock';
import styled from 'styled-components';


const Background = styled.div`
  background-image: url("/assets/images/mvpBackground.svg"); // Replace with your image path
  background-size: cover;
  background-position: center;
 
  width: 100%;
`;


const Page = () => {
  return (
   <Background>
      <div className='pt-[2em]'>
      <Navbar />
      <Hero />
      <Unlock />
      </div>
      </Background>


  );
};

export default Page;
