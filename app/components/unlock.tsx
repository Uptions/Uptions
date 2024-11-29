import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Highway from "@/public/assets/images/Highway.svg";
import Bike from "@/public/assets/images/Deliveryman2.png";
import Woman from "@/public/assets/images/woman2.svg";
import tag1 from "@/public/assets/images/4.svg";
import tag2 from "@/public/assets/images/1.svg";
import tag3 from "@/public/assets/images/2.svg"
import tag4 from "@/public/assets/images/3.svg"
import ScrollReveal from "scrollreveal";

const Unlock = () => {
  const bikeRef = useRef<HTMLImageElement | null>(null); // Ref for the bike image

  useEffect(() => {
    // Initialize ScrollReveal for taglines with different delays
    ScrollReveal().reveal('.tagline1', {
      origin: 'bottom',
      distance: '50px',
      duration: 1000,
      reset: true,
      easing: 'ease-in-out',
      delay: 300, // Tagline1 appears first
    });
    
    ScrollReveal().reveal('.tagline2', {
      origin: 'bottom',
      distance: '50px',
      duration: 1000,
      reset: true,
      easing: 'ease-in-out',
      delay: 600, // Tagline2 appears second
    });
    
    ScrollReveal().reveal('.tagline3', {
      origin: 'bottom',
      distance: '50px',
      duration: 1000,
      reset: true,
      easing: 'ease-in-out',
      delay: 900, // Tagline3 appears third
    });
    
    ScrollReveal().reveal('.tagline4', {
      origin: 'bottom',
      distance: '50px',
      duration: 1000,
      reset: true,
      easing: 'ease-in-out',
      delay: 1200, // Tagline4 appears last
    });
  }, []);
   
  useEffect(() => {
    // Function to reset animation
    const resetAnimation = () => {
      const bikeElement = bikeRef.current;

      if (bikeElement) {
        bikeElement.classList.remove("animate-bikehero"); // Remove animation
        void bikeElement.offsetWidth; // Trigger reflow to restart the animation
        bikeElement.classList.add("animate-bikehero"); // Reapply animation
      }
    };

    // IntersectionObserver callback
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (!entry.isIntersecting) {
          // If the bike leaves the viewport
          setTimeout(() => {
            resetAnimation(); // Restart animation after 5 seconds
          });
        }
      });
    };

    // Create and observe IntersectionObserver
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1, // Trigger when 10% is visible
    });

    const bikeElement = bikeRef.current;
    if (bikeElement) observer.observe(bikeElement);

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, []);

  return (
    <div className="font-space bg-white">
      <div className="relative">
        <Image src={Highway} alt="highway" className="w-[100vw]" />
        <Image
          ref={bikeRef}
          src={Bike}
          alt="bike image"
          className="absolute top-[-4px] animate-bikehero"
        />
      </div>
      <div className="flex flex-col items-center mt-[5em]">
        <h1 className="font-[700] text-[40px] text-[#007BFF]">
          Unlock Your Delivery Power with Uptions
        </h1>
        <p className="text-black font-[300] text-[20px] w-[45em] text-center">
          At Uptions, we don’t just help you compare deliveries; we open up the
          most affordable and convenient logistics options for you.
        </p>
      </div>
      <div className="flex justify-center items-center mt-[2em] gap-[2em]">
        <div className="w-[33em] p-[1em]">
          <h1 className="text-[#007BFF] font-[500] text-[40px]">
            Tired of overpaying for deliveries? Same here!
          </h1>
          <p className="text-[#001B6C] font-[300] text-[20px]">
            Why waste time comparing prices and offers when Uptions can do it
            for you? We bring all the best delivery deals into one place, so you
            get what you need fast and for the right price!
          </p>
        </div>
        <div className="flex relative">
          <div className="flex flex-col justify-between">
            <Image src={tag1} alt="tagline 1" className="absolute top-[7.5em] left-[4em] tagline1" />
            <Image src={tag2} alt="tagline 2" className="absolute bottom-[1.5em] left-[5em] tagline2" />
          </div>
          <div>
          <Image src={Woman} alt=""/>
          </div>
          <div className="flex flex-col justify-between">
            <Image src={tag3} alt="tagline 3" className="tagline3 absolute left-[22em] top-[3em]"/>
            <Image src={tag4} alt="tagline 4" className=" tagline4 absolute left-[24em] bottom-[5em]"/>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Unlock;
