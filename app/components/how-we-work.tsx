import React, { useEffect } from "react";
import Image from "next/image";
import Aos from "aos";
import "aos/dist/aos.css"; // Import the AOS styles
import List from "@/public/assets/images/delivery-list.svg";
import Deliveries from "@/public/assets/images/deliveries.svg";
import Courier from "@/public/assets/images/courier.svg";

const HowWork = () => {
  useEffect(() => {
    // Initialize AOS
    Aos.init({
      duration: 1000, // Animation duration
      once: true, // Whether animation should run only once
    });
  }, []);

  return (
    <div className="bg-white text-center font-space py-[5em]">
      <div>
        <h1
          className="text-[#007BFF] font-[700] text-[50px]"
          data-aos="fade-up" // AOS animation trigger
        >
          How <span className="text-black">Uptions</span> work
        </h1>
      </div>
      <div data-aos='fade-up'>
        <div className="flex items-center gap-[7.5em] justify-center px-[5em] mt-[3em]">
          <Image
            src={List}
            alt="List of delivery companies prices"
            className="rounded-2xl"
          />
          <div>
            <h1 className="text-[58px] font-bold font-space text-[#007BFF] ">
              Give us the details
            </h1>
            <p className="text-lg text-black ">
              Tell us what you’re sending and where—it only takes a sec.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-[7.5em] justify-center px-[5em] mt-[3em]">
          <div>
            <h1 className="text-[58px] font-bold font-space text-[#007BFF] text-left  ">
              Compare delivery <br />
              uptions instantly.
            </h1>
            <p className="text-lg text-black text-left ">
              We scan the streets so you don’t have to—get the best <br /> deals
              in seconds.
            </p>
          </div>

          <Image
            src={Deliveries}
            alt="List of delivery companies prices"
            className="rounded-2xl"
          />
        </div>
        <div className="flex items-center gap-[7.5em] justify-center px-[5em] mt-[3em]">
          <Image
            src={Courier}
            alt="List of delivery companies prices"
            className="rounded-2xl"
          />
          <div>
            <h1 className="text-[58px] font-bold font-space text-[#007BFF] text-left">
              Pick your fave and
              <br /> get started.
            </h1>
            <p className="text-lg text-black ">
              Choose your perfect match and let’s get that package moving!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowWork;
