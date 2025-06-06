"use client";
import React from "react";
import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/hero";
import Unlock from "@/app/components/unlock";
import How from "@/app/components/how-we-work";
import WhoCanUse from "@/app/components/whocanuse"
import Faq from "@/app/components/faq"
import Footer from '@/app/components/Footer'
import styled from "styled-components";

const Background = styled.div`
  background-image: url("/assets/images/pattern.svg");
  background-size: cover;
  background-position: center;

  width: 100%;
`;

const Page = () => {
  return (
    <>
      <div className="overflow-hidden">
        <Background>
          <Navbar />
          <Hero />
          <Unlock />
           </Background>
          <How />
          <WhoCanUse/>
          <Faq/>
          <Footer/>
     
       
      </div>
    </>
  );
};

export default Page;
