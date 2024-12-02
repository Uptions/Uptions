import React, { useState } from "react";
import Image from "next/image";
import Doodle from "@/public/assets/images/herodoodle.svg";
import BikeMen from "@/public/assets/images/bikemen.svg";
import Forward from "@/public/assets/images/forward.svg";
import Backward from "@/public/assets/images/backward.svg";
import Time from "@/public/assets/images/time.svg";
import Vetted from "@/public/assets/images/vetted.svg";

const WhyChoose = () => {
  const images = [BikeMen, Time, Vetted]; // Array of images, add more as needed
  const [currentIndex, setCurrentIndex] = useState(0); // State to manage current image index

  // Function to go to the next image
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to go to the previous image
  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="bg-[#001B6C] flex flex-col font-space py-[6em] px-[5em] 2xl:px-[18em]">
      <div className="bg-[#DEEEFF] flex flex-col justify-center items-center rounded-2xl mt-[-13em] py-[2em]">
        <h1 className="font-[700] text-[50px] text-[#007BFF]">
          Why use <span className="text-[#001B6C]">Uptions?</span>
        </h1>
        <Image src={Doodle} alt="doodle image" className="mb-[1em]" />

        {/* Carousel */}
        <div className="relative w-full flex justify-center items-center overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full flex justify-center"
              >
                <Image
                  src={image}
                  alt={`carousel image ${index + 1}`}
                  className="w-auto max-w-full"
                />
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <button
            onClick={handlePrevious}
            className="absolute right-[10em] bottom-0 transform -translate-y-1/2 bg-transparent text-white p-2"
          >
            <Image src={Backward} alt="Previous" width={50} height={50} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-[5em] bottom-0 transform -translate-y-1/2 bg-transparent text-white p-2"
          >
            <Image src={Forward} alt="Next" width={50} height={50} />
          </button>
          {/* number that should change as image animates */}
          <h1 className="bg-[#001B6C] text-white py-[0.8em] px-[1.3em] rounded-full absolute left-[5em] bottom-[2em] font-[700] text-[20px] ">
            0
          </h1>
        </div>
      </div>
      <div className="flex gap-">
        <div className="w-full font-[300]  ">
          <p>Forget the stress of hopping from one delivery service</p>
          <p>to another. Uptions helps you manage all your</p>
          <p>deliveries from a single platform, so you can track and</p>
          <p>pay in one place.</p>
        </div>
        <div className="flex ">
          <h1 className="font-[300] text-[35px] pt-[0.5em] pl-[5em]">
            <span className="text-[#007BFF]">Uptions</span> has got you covered!
          </h1>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
