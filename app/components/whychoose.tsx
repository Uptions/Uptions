import React, { useState, useEffect } from "react";
import Image from "next/image";
import Doodle from "@/public/assets/images/herodoodle.svg";
import BikeMen from "@/public/assets/images/bikemen.svg";
import Forward from "@/public/assets/images/forward.svg";
import Backward from "@/public/assets/images/backward.svg";
import Time from "@/public/assets/images/time.svg";
import Vetted from "@/public/assets/images/vetted.svg";
import Assistant from "@/public/assets/images/assistant.svg";
import { motion } from "framer-motion";
import Forward2 from "@/public/assets/images/forward2.svg";
import Backward2 from "@/public/assets/images/backward2.svg";

// Type for textColors
type TextColors = {
  color1: string;
  color2: string;
  color3?: string;
  color4?: string;
  color5?: string;
};

const WhyChoose = () => {
  const images = [BikeMen, Time, Vetted, Assistant]; // Array of images, add more as needed
  const [currentIndex, setCurrentIndex] = useState(0); // State to manage current image index
  const [currentNumber, setCurrentNumber] = useState(0); // State to manage the current number

  // Background colors and carousel texts
  const backgroundColors = ["#DEEEFF", "#007BFF", "#001B6C", "#007BFF"];
  const carouselText = [
    "why use uptions?", // We will handle this text specially
    "save time & money",
    "vetted and trustworthy delivery partners",
    "customer-centered support",
  ];

  // Updated TextColors type to be an array of these color objects
  const textColors: TextColors[] = [
    { color1: "#007BFF", color2: "#001B6C" },
    { color1: "#001B6C", color2: "white", color3: "white", color4: "white" },
    {
      color1: "white",
      color2: "#007BFF",
      color3: "",
      color4: "#007BFF",
      color5: "#007BFF",
    },
    { color1: "#001B6C", color2: "white" },
  ];

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

  // Sync the currentNumber with currentIndex
  useEffect(() => {
    setCurrentNumber(currentIndex); // Set the number to the current index
  }, [currentIndex]); // Run this whenever currentIndex changes

  // Helper function to render the carousel text with multiple colors
  const renderCarouselText = (text: string) => {
    if (text === "why use uptions?") {
      // Special case for "why use uptions?" to ensure space is added
      return (
        <div className="flex gap-[1px]">
          <span style={{ color: textColors[currentIndex].color1 }}>
            why use
          </span>
          <span style={{ color: textColors[currentIndex].color2 }}>
            uptions?
          </span>
        </div>
      );
    }

    // For other texts, split and color normally
    return text.split(" ").map((word: string, index: number) => {
      const colorKey = `color${index + 1}` as keyof TextColors; // Dynamically generate the key
      const wordColor =
        textColors[currentIndex][colorKey] || textColors[currentIndex].color1;
      return (
        <span
          key={index}
          style={{ color: wordColor, marginRight: "8px" }} // Add space between words
        >
          {word}
        </span>
      );
    });
  };

  // Automatic carousel interval (runs every 2 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Change slide every 2 seconds

    // Clean up the interval on component unmount or when currentIndex changes manually
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      className="flex flex-col font-space pt-[6em] pb-[1em] px-[5em] 2xl:px-[18em] bg-cover bg-center"
      style={{
        backgroundImage: "url('/assets/images/Bluebg.svg')", // Your image path here
      }}
    >
      {/* Apply the border to the 3rd card */}
      <div
        style={{
          backgroundColor: backgroundColors[currentIndex], // Dynamically change background color
        }}
        className={`bg-[#DEEEFF] flex flex-col justify-center items-center rounded-2xl mt-[-15em] pt-[2em] ${
          currentIndex === 2 ? "border-2 border-[#007BFF]" : "" // Border for 3rd card
        }`}
      >
        <div className="flex font-[500] text-[50px]">
          {/* Render the carousel text with colors */}
          {renderCarouselText(carouselText[currentIndex])}
        </div>

        <Image
          src={Doodle}
          alt="doodle image"
          className={`mb-[1em] ${currentIndex !== 0 ? "hidden" : ""}`}
        />

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

          {/* Number that should change as the image animates */}
          <h1
            className="py-[0.8em] px-[1.3em] rounded-full absolute left-[5em] bottom-[2em] font-[700] text-[20px] "
            style={{
              backgroundColor: currentIndex === 2 ? "#007BFF" : "#001B6C", // Change background color for 3rd slide
              color: "white", // Make text white for visibility
            }}
          >
            {currentNumber} {/* Dynamically change the number */}
          </h1>
        </div>
      </div>
      <div className="flex mt-[2em] mb-[2em] ">
        <div className="w-full font-[300] text-[18px] font-mono mt-[1em]">
          <p>Forget the stress of hopping from one delivery service</p>
          <p>
            to another. <span className="font-[700]">Uptions</span> helps you
            manage all your
          </p>
          <p>deliveries from a single platform, so you can track and</p>
          <p>pay in one place.</p>
        </div>
        <div className="flex ">
          <h1 className="font-[300] text-[35px]  ">
            <span className="text-[#007BFF]">Uptions</span> has got you covered!
          </h1>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
