import React, { useEffect } from "react";
import Image from "next/image";
import Aos from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS CSS styles

import Highway from "@/public/assets/images/Highway.svg";

import Bike from "@/public/assets/images/Deliveryman2.png";
import Bike2 from "@/public/assets/images/Delivery Man Riding Scooter.C01.2k 3.svg";
import Bike3 from "@/public/assets/images/Delivery Man Riding Scooter.C01.2k 1.svg";
import Bus from "@/public/assets/images/Electric Delivery Van.B09.2k.svg";

import Woman from "@/public/assets/images/woman2.svg";
import tag1 from "@/public/assets/images/4.svg";
import tag2 from "@/public/assets/images/1.svg";
import tag3 from "@/public/assets/images/2.svg";
import tag4 from "@/public/assets/images/3.svg";

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
          className="font-[700] text-[40px] text-[#007BFF]"
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
      <div className="flex justify-center items-center mt-[2em] gap-[3em] px-[5em]">
        <div
          className="w-[33em] py-[1em]"
          data-aos="fade-right"  // AOS animation for the content section
          data-aos-delay="200"  // Staggered animation delay
        >
          <h1 className="text-[#007BFF] font-[500] text-[40px]">
            Tired of overpaying for deliveries? Same here!
          </h1>
          <p className="text-[#001B6C] font-[300] text-[20px]">
            Why waste time comparing prices and offers when Uptions can do it
            for you? We bring all the best delivery deals into one place, so you
            get what you need fast and for the right price!
          </p>
        </div>

        {/* Animated Tags and Woman Image */}
        <div className="flex relative">
          <div
            className="absolute top-[6em] left-[3em]"
            style={{ zIndex: 2 }}
            data-aos="fade-left" // AOS animation for the first tag
            data-aos-delay="300"
          >
            <Image src={tag1} alt="tagline 1" />
          </div>

          <div
            className="absolute bottom-[2em] left-[4.5em]"
            style={{ zIndex: 2 }}
            data-aos="fade-left" // AOS animation for the second tag
            data-aos-delay="500"
          >
            <Image src={tag2} alt="tagline 2" />
          </div>

          <div
            style={{ zIndex: 1 }}
            data-aos="fade-up" // AOS animation for the woman image
            data-aos-delay="700"
          >
            <Image src={Woman} alt="Woman" />
          </div>

          <div
            className="absolute left-[21em] top-[3.5em]"
            style={{ zIndex: 2 }}
            data-aos="fade-right" // AOS animation for the third tag
            data-aos-delay="900"
          >
            <Image src={tag3} alt="tagline 3" />
          </div>

          <div
            className="absolute left-[23em] bottom-[5em]"
            style={{ zIndex: 2 }}
            data-aos="fade-right" // AOS animation for the fourth tag
            data-aos-delay="1100"
          >
            <Image src={tag4} alt="tagline 4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unlock;
