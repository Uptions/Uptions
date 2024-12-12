import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import Doodle from "@/public/assets/images/herodoodle.svg";

const Hero = () => {
  return (
    <div className="cursor-pointer text-black font-space flex flex-col items-center group ">
      <div className="flex mt-[4em]">
        {/* Animated Text 1: Slide In from Left + Fade In */}
        <motion.h1
          className="text-[#007BFF] font-[400] text-[80px] 2xl:text-[100px]"
          initial={{ opacity: 0, x: -100 }} // Start off-screen to the left
          animate={{ opacity: 1, x: 0 }} // Slide to its original position
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }} // Smooth transition with delay
        >
          One app,
        </motion.h1>
      </div>

      {/* Animated Text 2: Slide In from Right + Fade In */}
      <motion.h1
        className="font-[700] text-[80px] 2xl:text-[100px] text-[#007BFF]"
        initial={{ opacity: 0, x: 100 }} // Start off-screen to the right
        animate={{ opacity: 1, x: 0 }} // Slide to its original position
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }} // Smooth transition with delay
      >
        endless delivery
      </motion.h1>

      {/* Animated Text 3: Scale + Fade In */}
      <motion.h1
        className="text-[#001B6C] font-[700] text-[80px] 2xl:text-[100px]"
        initial={{ opacity: 0, scale: 0.8 }} // Start smaller with opacity 0
        animate={{ opacity: 1, scale: 1 }} // Scale up and fade in
        transition={{ duration: 1, ease: "easeOut", delay: 0.6 }} // Scale animation with delay
      >
        Uptions.
      </motion.h1>

      {/* Animated Image: Subtle bounce effect + fade */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }} // Start with opacity 0 and scaled down
        animate={{ opacity: 1, scale: 1 }} // Fade in and scale up
        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }} // Smooth transition with delay
        whileHover={{ scale: 1.05, rotate: 3 }} // Subtle hover effects for interaction
      >
        <Image
          src={Doodle}
          alt="doodle"
          className="transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-5 opacity-0 scale-100"
        />
      </motion.div>

      {/* Animated Text 4: Fade In with Bounce */}
      <motion.p
        className="font-[400] text-[30px] mt-[1em] mb-[1em]"
        initial={{ opacity: 0, y: 40 }} // Start with opacity 0 and offset
        animate={{ opacity: 1, y: 0 }} // Animate to visible and correct position
        transition={{ duration: 0.8, delay: 1, type: "spring", stiffness: 200 }} // Spring effect for bounce
      >
        find the <span className="text-[#007BFF]">Best delivery deals</span> in
        one place!
      </motion.p>
    </div>
  );
};

export default Hero;
