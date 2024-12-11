import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Highway from "@/public/assets/images/Highway.svg";
import Bike from "@/public/assets/images/Deliveryman2.png";
import Woman from "@/public/assets/images/woman2.svg";
import tag1 from "@/public/assets/images/4.svg";
import tag2 from "@/public/assets/images/1.svg";
import tag3 from "@/public/assets/images/2.svg";
import tag4 from "@/public/assets/images/3.svg";

const Unlock = () => {
  return (
    <div className="font-space bg-white ">
      <div className="relative hidden lg:block">
        <Image src={Highway} alt="highway" className="w-[100vw]" />

        {/* Animated Bike Image */}
        <motion.div
          className="absolute top-[-4px]"
          animate={{ x: [0, 100, 200] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
        >
          <Image src={Bike} alt="bike image" className="animate-bikehero" />
        </motion.div>
      </div>

      <div className="flex flex-col items-center mt-[5em] ">
        <h1 className="font-[700] text-[40px] text-[#007BFF]">
          Unlock Your Delivery Power with Uptions
        </h1>
        <p className="text-black font-[300] text-[20px] w-[45em] text-center">
          At Uptions, we don’t just help you compare deliveries; we open up the
          most affordable and convenient logistics options for you.
        </p>
      </div>

      <div className="flex justify-center items-center mt-[2em] gap-[3em] px-[5em] ">
        <motion.div
          className="w-[33em] py-[1em]"
          initial={{ opacity: 0, y: 40 }} // Initial state (invisible and offset)
          animate={{ opacity: 1, y: 0 }} // Animate to visible and correct position
          transition={{
            duration: 1.2,
            delay: 0.3,
            ease: "easeOut", // Smooth easing for this tagline
          }}
        >
          <h1 className="text-[#007BFF] font-[500] text-[40px] text">
            Tired of overpaying for deliveries? Same here!
          </h1>
          <p className="text-[#001B6C] font-[300] text-[20px]">
            Why waste time comparing prices and offers when Uptions can do it
            for you? We bring all the best delivery deals into one place, so you
            get what you need fast and for the right price!
          </p>
        </motion.div>

        <div className="flex relative">
          {/* Animate tag1 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }} // Start below the target position
            animate={{ opacity: 1, y: 0 }} // Animate to final position (from bottom to top)
            transition={{
              duration: 1.5, // Smoother, longer animation
              delay: 0.6, // Delay for first tagline
              ease: "easeOut", // Smooth easing function
            }}
          >
            <Image src={tag1} alt="tagline 1" className="absolute top-[6em] left-[3em]" />
          </motion.div>

          {/* Animate tag2 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }} // Start below the target position
            animate={{ opacity: 1, y: 0 }} // Animate to final position (from bottom to top)
            transition={{
              duration: 1.5, // Smoother, longer animation
              delay: 0.8, // Delay for second tagline
              ease: "easeOut", // Smooth easing function
            }}
          >
            <Image src={tag2} alt="tagline 2" className="absolute bottom-[2em] left-[4.5em]" />
          </motion.div>

          {/* Woman Image (no animation) */}
          <Image src={Woman} alt="Woman" />

          {/* Animate tag3 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }} // Start below the target position
            animate={{ opacity: 1, y: 0 }} // Animate to final position (from bottom to top)
            transition={{
              duration: 1.5, // Smoother, longer animation
              delay: 1.0, // Delay for third tagline
              ease: "easeOut", // Smooth easing function
            }}
          >
            <Image src={tag3} alt="tagline 3" className="absolute left-[21em] top-[3.5em]" />
          </motion.div>

          {/* Animate tag4 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }} // Start below the target position
            animate={{ opacity: 1, y: 0 }} // Animate to final position (from bottom to top)
            transition={{
              duration: 1.5, // Smoother, longer animation
              delay: 1.2, // Delay for fourth tagline
              ease: "easeOut", // Smooth easing function
            }}
          >
            <Image src={tag4} alt="tagline 4" className="absolute left-[23em] bottom-[5em]" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Unlock;
