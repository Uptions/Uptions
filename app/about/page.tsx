"use client";
import React from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import styled from "styled-components";
import AbtHero from "./components/AbtHero";
import AbtDescription from "./components/abtDescription";

const Background = styled.div`
  background-image: url("/assets/images/LongBg.svg");
  background-size: cover;
  background-position: center;

  width: 100%;
`;

const page = () => {
  return (
    <div>
      <Background>
        <Navbar />
        <AbtHero />

        <AbtDescription />
        <div className="overflow-hidden">
          <Footer />
        </div>
      </Background>
    </div>
  );
};

export default page;
