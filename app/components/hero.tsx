import React, { useEffect } from "react";
import Image from "next/image";
import Splash from "@/public/assets/images/Frame.svg";
import Doodle from "@/public/assets/images/herodoodle.svg";
import ScrollReveal from "scrollreveal";

const Hero = () => {
  useEffect(() => {
    // Initialize ScrollReveal with your animation settings
    ScrollReveal().reveal('.reveal', {
      origin: 'bottom',
      distance: '40px',
      duration: 1000,
      reset: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <div className="cursor-pointer text-black font-space flex flex-col items-center mt-[em] group">
      <div className="flex mt-[2em]">
        <h1 className="text-[#007BFF] font-[400] text-[100px] reveal ">One app,</h1>
        <Image
          src={Splash}
          alt="splash"
          className="reveal -ml-[0.8em] -mt-[2em] opacity-0 scale-150 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-150 group-hover:translate-x-5"
        />
      </div>

      <h1 className="font-[700] text-[100px] text-[#007BFF] reveal">
        endless delivery
      </h1>
      <h1 className="text-[#001B6C] font-[700] text-[100px] reveal">
        Uptions.
      </h1>
      <Image
        src={Doodle}
        alt="doodle"
        className="reveal transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-5 opacity-0 scale-100 "
      />
      <p className="font-[400] text-[30px] mt-[1em] mb-[1em] reveal">
        find the <span className="text-[#007BFF] ">Best delivery deals</span>{" "}
        in one place!
      </p>
    </div>
  );
};

export default Hero;
