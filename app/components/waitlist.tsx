"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import bike3 from "@/public/assets/images/Delivery Man Riding Scooter (1).svg";
import biketwo from "@/public/assets/images/Delivery Man Riding Scooter (2).svg";
import bikeone from "@/public/assets/images/Delivery Man Riding Scooter.svg";
import { ClipLoader } from 'react-spinners'; // Import the spinner

const Waitlist = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const [isError, setIsError] = useState(false); // Track error state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Regex to ensure the email contains "@gmail.com"
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailPattern.test(email)) {
      setMessage('Please enter a valid Gmail address.');
      setIsError(true);
      return;
    }

    setLoading(true); // Set loading to true when form is submitted

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(`Error: ${data.error}`);
        setIsError(true); // Set error state to true
      } else {
        setMessage(data.message);
        setIsError(false); // Clear error state on success
        setEmail(''); // Clear email input on success
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
      setIsError(true);
    } finally {
      setLoading(false); // Set loading to false after the request is done
    }
  };

  return (
    <div className="w-full mt-[3em] font-space">
      <div className="text-center z-10 flex flex-col">
        {/* Gradient Text */}
        <h1 className="md:hidden bg-gradient-to-r from-[#001b6c] via-[#007bff8f] to-[#001B6C] text-transparent text-[32px] bg-clip-text font-bold">
          One app,<br /> endless delivery<br /> Uptions.
        </h1>

        <h1 className="lg:text-[100.63px] hidden md:block text-[50px] font-bold font-space text-transparent mb-4 lg:leading-[100px] bg-gradient-to-r from-[#001b6c] via-[#007bff8f] to-[#001B6C] bg-clip-text">
          One app,<br /> endless delivery<br /> Uptions.
        </h1>

        <p className="lg:text-[52.1px] text-[15px] font-normal text-[#007BFF] lg:mt-[40px] mt-[1em]">
          Compare prices and send packages.
        </p>

        {/* Waitlist input and button */}
        <div className="flex justify-center mt-6 w-[80%] md:w-[50%] lg:w-[50%] mx-auto">
          <form onSubmit={handleSubmit} className="flex items-center w-full backdrop-blur-md border-blue-600 px-[5px] py-[2px] md:py-[4px] lg:px-[5px] border-[1px] bg-[rgba(0,123,255,0.2)] rounded-full z-20">
            <input
              type="email"
              placeholder="type your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-[#007BFFBF] p-3 bg-transparent outline-none placeholder-[#007BFFBF] md:text-[20px] text-[12px] font-space"
            />
            <button
              className="bg-[#001E62] text-white font-semibold text-[8px] lg:text-[18px] lg:py-6 px-2 p-3 md:py-5 lg:w-[20em] w-[50%] rounded-full hover:bg-blue-800 transition ease-linear duration-300  "
              disabled={loading} // Disable the button while loading
            >
              JOIN WAITLIST
            </button>
          </form>
        </div>

        {/* Error or Success Message */}
        {message && (
          <p className={`font-space mt-4 ${isError ? 'text-red-300' : 'text-[#007BFF]'}`}>{message}</p>
        )}

        {/* Preloader */}
        {loading && (
          <div className="fixed top-0 left-0 w-full h-full bg-blue-300 bg-opacity-20 flex items-center justify-center z-50">
            <ClipLoader size={80} color={"#001E62"} loading={loading} />
          </div>
        )}

        {/* Anchor tag for external form link */}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfbPPG2jrtDCZSveg62aT-7YuQ_8ugV2UrZcR98DAnTbaLF5g/viewform?usp=sf_link"
          target="_blank"
          rel="noopener noreferrer"
          className="md:mt-[3em] mt-[1em] block text-[#007BFF] font-[700] text-[16px] md:text-[21px] md:w-[20%] mx-auto"
        >
          Take a survey
        </a>
      </div>

      {/* Animated Bikes */}
      <div className="">
        <div className="absolute  z-0 top-[55%] lg:right-[-200px] right-[-200px] transform -rotate-12 lg:animate-bike1 animate-bike1Subtle pointer-events-none">
          <Image
            src={bikeone}
            width={200}
            height={200}
            alt="Delivery Man Riding Scooter"
            className="w-[100.47px] md:w-[650.47px] xl:w-[800px] h-[396.56px] "
          />
        </div>

        <div className="absolute top-[60%] hidden xl:block left-[20px] transform -rotate-12 animate-bike2">
          <Image
            src={bike3}
            width={200}
            height={200}
            alt="Delivery Man Riding Scooter 2"
            className="w-[456px] h-[224px]"
          />
        </div>

        <div className="lg:block absolute top-[40%] hidden left-[-200px] transform rotate-6 animate-bike3">
          <Image
            src={biketwo}
            width={200}
            height={200}
            alt="Delivery Man Riding Scooter 3"
            className="w-[400px] md:w-[456px] h-[180px] md:h-[224px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Waitlist;
