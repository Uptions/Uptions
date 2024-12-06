import React from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // Import Framer Motion

import Doodle from "@/public/assets/images/herodoodle.svg";

const Hero = () => {
  return (
    <div className="cursor-pointer text-black font-space flex flex-col items-center group">
      <div className="flex mt-[4em]">
        <motion.h1
          className="text-[#007BFF] font-[400] text-[80px] 2xl:text-[100px]"
          initial={{ opacity: 0, y: 40 }} // Initial state (invisible and offset)
          animate={{ opacity: 1, y: 0 }} // Animate to visible and correct position
          transition={{ duration: 1, delay: 0.2 }} // Animation duration and delay
        >
          One app,
        </motion.h1>
      </div>

      <motion.h1
        className="font-[700] text-[80px] 2xl:text-[100px] text-[#007BFF]"
        initial={{ opacity: 0, y: 40 }} // Initial state
        animate={{ opacity: 1, y: 0 }} // Animate to visible and correct position
        transition={{ duration: 1, delay: 0.4 }} // Delay for second element
      >
        endless delivery
      </motion.h1>

      <motion.h1
        className="text-[#001B6C] font-[700] text-[80px] 2xl:text-[100px]"
        initial={{ opacity: 0, y: 40 }} // Initial state
        animate={{ opacity: 1, y: 0 }} // Animate to visible and correct position
        transition={{ duration: 1, delay: 0.6 }} // Delay for third element
      >
        Uptions.
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }} // Start with opacity 0 and scaled down
        animate={{ opacity: 1, scale: 1 }} // Animate to full opacity and scale
        transition={{ duration: 1, delay: 0.8 }} // Delay for image animation
      >
        <Image
          src={Doodle}
          alt="doodle"
          className="transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-5 opacity-0 scale-100"
        />
      </motion.div>

      <motion.p
        className="font-[400] text-[30px] mt-[1em] mb-[1em]"
        initial={{ opacity: 0, y: 40 }} // Start with opacity 0 and offset
        animate={{ opacity: 1, y: 0 }} // Animate to visible and correct position
        transition={{ duration: 1, delay: 1 }} // Delay for text animation
      >
        find the <span className="text-[#007BFF]">Best delivery deals</span> in
        one place!
      </motion.p>
    </div>
  );
};

export default Hero;
