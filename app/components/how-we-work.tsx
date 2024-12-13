import React, { useEffect } from "react";
import Image from "next/image";
import Aos from "aos";
import "aos/dist/aos.css"; // Import the AOS styles
import s1 from "@/public/assets/images/sw.svg";
import s2 from "@/public/assets/images/s2.svg";
import s3 from "@/public/assets/images/s3.svg";

const HowWork = () => {
  useEffect(() => {
    // Initialize AOS
    Aos.init({
      duration: 1000,  // Animation duration
      once: true,      // Whether animation should run only once
    });
  }, []);

  return (
    <div className="bg-white text-center font-space pt-[5em] pb-[15em]">
      <div>
        <h1
          className="text-[#007BFF] font-[700] text-[50px]"
          data-aos="fade-up" // AOS animation trigger
        >
          How <span className="text-black">Uptions</span> work
        </h1>
      </div>

      <div className="flex items-center gap-[3em] justify-center px-[5em] mt-[3em]">
        <div className="card card1" data-aos="fade-up" data-aos-delay="200">
          <Image src={s1} alt="man 1" />
        </div>

        <div className="card card2" data-aos="fade-up" data-aos-delay="400">
          <Image src={s2} alt="man 2" />
        </div>

        <div className="card card3" data-aos="fade-up" data-aos-delay="600">
          <Image src={s3} alt="man 3" />
        </div>
      </div>
    </div>
  );
};

export default HowWork;
