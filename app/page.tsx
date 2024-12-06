"use client";
import React from "react";
import Navbar from "@/app/components/navbar";
import Hero from "@/app/components/hero";
import Unlock from "@/app/components/unlock";
import styled from "styled-components";
import How from "@/app/components/how-we-work";
import WhyChoose from "@/app/components/whychoose";
import WhoCanUse from "@/app/components/whocanuse"

const Background = styled.div`
  background-image: url("/assets/images/mvpBackground.svg");
  background-size: cover;
  background-position: center;

  width: 100%;
`;

const Page = () => {
  return (
    <>
      <div className="">
        <Background>
          <Navbar />
          <Hero />
        </Background>

        <div className="overflow-hidden">
          <Unlock />
          <How />
          <WhyChoose />
          <WhoCanUse/>
        </div>
      </div>
    </>
  );
};

export default Page;
