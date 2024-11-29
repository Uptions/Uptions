"use client"
import React from 'react';
import Navbar from '@/app/components/navbar';
import Hero from '@/app/components/hero';
import Unlock from '@/app/components/unlock';
import styled from 'styled-components';
import How from '@/app/components/how-we-work'

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
      <How/>
      </div>
      </Background>


  );
};

export default Page;
