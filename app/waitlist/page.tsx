'use client'
import Navbar from "@/app/components/Navbar";
import Waitlist from "./components/waitlist";
import "./page.css"
import styled from "styled-components";


const Background = styled.div`
  background-image: url("/assets/images/mvpBackground.svg");
  background-size: cover;
  background-position: center;
  height: 100%;
  width: 100%;
`;

export default function Home() {
  return (
    <div className=" h-[100vh]">
      <Background>
      <Navbar />
      <Waitlist/>

      </Background>

    </div>
  );
}
