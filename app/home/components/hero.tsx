import React from "react";
import Image from "next/image";
import Splash from "@/public/assets/images/Frame.svg";
import Doodle from "@/public/assets/images/herodoodle.svg";




const Hero = () => {
  return (
   
      <div className="cursor-pointer text-black font-space flex flex-col items-center mt-[em] group">
        <div className="flex">
          <h1 className="text-[#007BFF] font-[400] text-[100px]">One app,</h1>
          <Image
            src={Splash}
            alt="splash"
            className="-ml-[1.3em] opacity-0 scale-75 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-150 group-hover:translate-x-5"
          />
        </div>

        <h1 className="font-[700] text-[100px] text-[#007BFF] ">
          endless delivery
        </h1>
        <h1 className="text-[#001B6C] font-[700] text-[100px]">Uptions.</h1>
        <Image
          src={Doodle}
          alt="doodle"
          className="transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-5 opacity-0 scale-50 mr-[4em]"
        />
        <p className="font-[400] text-[30px] mt-[1em] mb-[1em] ">
          find the <span className="text-[#007BFF] ">Best delivery deals</span>{" "}
          in one place!
        </p>

      </div>
      
   
  );
};

export default Hero;
