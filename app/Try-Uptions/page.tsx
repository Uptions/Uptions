"use client";
import React from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import styled from "styled-components";
import Uption from "@/app/Try-Uptions/components/Uption"


const Background = styled.div`
  background-image: url("/assets/images/LongBg.svg");
  background-size: cover;
  background-position: center;

  width: 100%;
`;

const page = () => {
  return (
    <div className="">
      <Background>
        <Navbar />
        <Uption/>
        <Footer />
      </Background>
    </div>
  );
};

export default page;
