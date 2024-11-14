import React from "react";
import Image from "next/image";
import Highway from "@/public/assets/images/Highway.svg";
import Bike from "@/public/assets/images/Deliveryman2.png"

const unlock = () => {
  return (
    <div className="font-space  bg-white">
      <div className="relative">
        <Image src={Highway} alt="highway" className="w-[100vw]" />
        <Image src={Bike} alt="bike image" className="absolute top-0 animate-bikehero"/>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="font-[700] text-[50px] text-[#007BFF]">
          Unlock Your Delivery Power with Uptions
        </h1>
        <p className="text-black font-[300] text-[]25px">
          At Uptions, we don’t just help you compare deliveries; we open up the
          most affordable and convenient logistics options for you.
        </p>
      </div>
    </div>
  );
};

export default unlock;
