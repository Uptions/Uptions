import React, { useEffect } from "react";
import Image from "next/image";
import s1 from "@/public/assets/images/sw.svg";
import s2 from "@/public/assets/images/s2.svg";
import s3 from "@/public/assets/images/s3.svg";
import ScrollReveal from "scrollreveal";

const HowWork = () => {
  useEffect(() => {
    // Initialize ScrollReveal for each card with different delays
    ScrollReveal().reveal('.card1', {
      origin: 'bottom',
      distance: '50px',
      duration: 1000,
      reset: true,
      easing: 'ease-in-out',
      delay: 200, // Delay for card1
    });
    ScrollReveal().reveal('.card2', {
      origin: 'bottom',
      distance: '50px',
      duration: 1000,
      reset: true,
      easing: 'ease-in-out',
      delay: 400, // Delay for card2
    });
    ScrollReveal().reveal('.card3', {
      origin: 'bottom',
      distance: '50px',
      duration: 1000,
      reset: true,
      easing: 'ease-in-out',
      delay: 600, // Delay for card3
    });
  }, []);

  return (
    <div className="bg-white text-center font-space pt-[5em] pb-[15em]">
      <div>
        <h1 className="text-[#007BFF] font-[700] text-[50px] card card1">
          How <span className="text-black">Uptions</span> work
        </h1>
      </div>

      <div className="flex items-center gap-[3em] justify-center px-[5em] mt-[3em]">
        <div className="card card1">
          <Image src={s1} alt="man 1" />
        </div>
        <div className="card card2">
          <Image src={s2} alt="man 2" />
        </div>
        <div className="card card3">
          <Image src={s3} alt="man 3" />
        </div>
      </div>
    </div>
  );
};

export default HowWork;
