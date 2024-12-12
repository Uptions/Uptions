import React, { useEffect } from "react";
import Image from "next/image";
import ScrollReveal from "scrollreveal";
import s1 from "@/public/assets/images/sw.svg";
import s2 from "@/public/assets/images/s2.svg";
import s3 from "@/public/assets/images/s3.svg";

const HowWork = () => {
  useEffect(() => {
    const sr = ScrollReveal({
      origin: "bottom",
      distance: "50px",
      duration: 1000,
      reset: false, // Animations won't repeat on scroll
    });

    sr.reveal(".reveal", {
      interval: 200, // Adds delay between elements
    });
  }, []);

  return (
    <div className="bg-white text-center font-space pt-[5em] pb-[15em]">
      <div>
        <h1
          className="text-[#007BFF] font-[700] text-[50px] reveal"
        >
          How <span className="text-black">Uptions</span> work
        </h1>
      </div>

      <div className="flex items-center gap-[3em] justify-center px-[5em] mt-[3em]">
        <div className="card card1 reveal">
          <Image src={s1} alt="man 1" />
        </div>

        <div className="card card2 reveal">
          <Image src={s2} alt="man 2" />
        </div>

        <div className="card card3 reveal">
          <Image src={s3} alt="man 3" />
        </div>
      </div>
    </div>
  );
};

export default HowWork;
