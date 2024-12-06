import React from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // Import framer-motion
import s1 from "@/public/assets/images/sw.svg";
import s2 from "@/public/assets/images/s2.svg";
import s3 from "@/public/assets/images/s3.svg";

const HowWork = () => {
  return (
    <div className="bg-white text-center font-space pt-[5em] pb-[15em]">
      <div>
        <motion.h1
          className="text-[#007BFF] font-[700] text-[50px]"
          initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and move from 50px down
          animate={{ opacity: 1, y: 0 }} // Animate to full opacity and y position 0
          transition={{ duration: 1, delay: 0.2 }} // Duration and delay for animation
        >
          How <span className="text-black">Uptions</span> work
        </motion.h1>
      </div>

      <div className="flex items-center gap-[3em] justify-center px-[5em] mt-[3em]">
        <motion.div
          className="card card1"
          initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and move from 50px down
          animate={{ opacity: 1, y: 0 }} // Animate to full opacity and y position 0
          transition={{ duration: 1, delay: 0.4 }} // Delay for card1
        >
          <Image src={s1} alt="man 1" />
        </motion.div>
        
        <motion.div
          className="card card2"
          initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and move from 50px down
          animate={{ opacity: 1, y: 0 }} // Animate to full opacity and y position 0
          transition={{ duration: 1, delay: 0.6 }} // Delay for card2
        >
          <Image src={s2} alt="man 2" />
        </motion.div>

        <motion.div
          className="card card3"
          initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and move from 50px down
          animate={{ opacity: 1, y: 0 }} // Animate to full opacity and y position 0
          transition={{ duration: 1, delay: 0.8 }} // Delay for card3
        >
          <Image src={s3} alt="man 3" />
        </motion.div>
      </div>
    </div>
  );
};

export default HowWork;
