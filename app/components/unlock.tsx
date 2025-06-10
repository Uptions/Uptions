import React, { useEffect } from "react";
import Image from "next/image";
import Aos from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS CSS styles

import Highway from "@/public/assets/images/Highway.svg";

import Bike from "@/public/assets/images/Deliveryman2.png";
import Bike2 from "@/public/assets/images/Delivery Man Riding Scooter.C01.2k 3.svg";
import Bike3 from "@/public/assets/images/Delivery Man Riding Scooter.C01.2k 1.svg";
import Bus from "@/public/assets/images/Electric Delivery Van.B09.2k.svg";

import Woman from "@/public/assets/images/woman.svg";


import AnimatedComponent from "./animated-component";

const Unlock = () => {
  useEffect(() => {
    // Initialize AOS with custom settings (duration, easing, etc.)
    Aos.init({
      duration: 1000,  // Animation duration
      once: true,      // Run the animation only once
    });
  }, []);

  return (
    <div className="font-space bg-white mt-[6em]">
      {/* Bike Animation Section */}
      <div className="relative w-[100vw]">
        <Image src={Highway} alt="highway" className="w-[100vw]" />
        <div className="absolute left w-screen h-full top-0 z-1">
          <AnimatedComponent
            speed={3}
            start="-100vw"
            end="100vw"
            direction="left"
            loop={true}
            className="relative right-2 top-[-4px]"
          >
            <Image src={Bike2} alt="bike image" />
          </AnimatedComponent>
          <AnimatedComponent
            speed={3}
            start="-100vw"
            direction="left"
            end="100vw"
            loop={true}
            className="relative top-[-4px]"
          >
            <Image src={Bike3} alt="bike image" />
          </AnimatedComponent>

          <AnimatedComponent
            speed={3}
            start="-100vw"
            end="100vw"
            loop={true}
            className="bottom-[0px] left-48 rotate-[180]"
          >
            <Image src={Bike} alt="bike image" />
          </AnimatedComponent>
          <AnimatedComponent
            speed={3}
            start="-100vw"
            end="100vw"
            loop={true}
            className="relative bottom-0"
          >
            <Image src={Bus} alt="bus image" className="rotate-180" />
          </AnimatedComponent>
        </div>
      </div>

      {/* Header Section */}
      <div className="flex flex-col items-center mt-[5em]">
        <h1
          className="font-[500] text-[40px] text-[#007BFF]"
          data-aos="fade-up" // AOS animation for the header
        >
          Unlock Your Delivery Power with Uptions
        </h1>
        <p
          className="text-black font-[300] text-[20px] w-[45em] text-center"
          data-aos="fade-up" // AOS animation for the paragraph
        >
          At Uptions, we don’t just help you compare deliveries; we open up the
          most affordable and convenient logistics options for you.
        </p>
      </div>

      {/* Content Section */}
      <div className="justify-center flex mt-[6em]">
        <Image src={Woman} alt="woman choosing delivery options" className="rounded-3xl"/>

      </div>
    </div>
  );
};

export default Unlock;
