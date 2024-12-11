"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ClipLoader } from "react-spinners"; // Import the spinner


const Waitlist = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const [isError, setIsError] = useState(false); // Track error state
  const [showMessage, setShowMessage] = useState(true); // Track visibility of message

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Regex to ensure the email contains "@gmail.com"
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailPattern.test(email)) {
      setMessage("Please enter a valid Gmail address.");
      setIsError(true);
      setShowMessage(true); // Show message
      return;
    }

    setLoading(true); // Set loading to true when form is submitted

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.status === 409) {
        // Handle conflict (email already signed up)
        setMessage("Email has already been signed up for our waitlist.");
        setIsError(true); // Set error state to true
        setShowMessage(true); // Show message
      } else if (!response.ok) {
        // Handle other errors
        setMessage(
          `Error: ${data.error || "Something went wrong. Please try again."}`
        );
        setIsError(true); // Set error state to true
        setShowMessage(true); // Show message
      } else {
        // Successful signup
        setMessage("Welcome to Uptions, please check your inbox");
        setIsError(false); // Clear error state on success
        setShowMessage(true); // Show message
        setEmail(""); // Clear email input on success
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
      setIsError(true);
      setShowMessage(true); // Show message
    } finally {
      setLoading(false); // Set loading to false after the request is done
    }
  };

  useEffect(() => {
    if (message && !isError) {
      // Set timeout to hide message after 5 seconds
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);

      return () => clearTimeout(timer); // Cleanup on unmount or when message changes
    }
  }, [message, isError]);

  return (
    <div className="w-full mt-[3em] font-space">
      <div className="text-center z-10 flex flex-col">
        <h1 className="font-[300] text-[80px] text-[#007BFF] mt-[1em]">Join in and lets keep </h1>
        <h1 className="font-[300] text-[80px] text-[#007BFF]">you up to date</h1>


        <p className="lg:text-[100px] text-[15px] font-[700] text-[#001B6C] lg:mt-[20px] mt-[1em]">
          With our Progress
        </p>

        {/* Waitlist input and button */}
        <div className="flex justify-center mt-6 w-[80%] md:w-[50%] lg:w-[50%] mx-auto">
          <form
            onSubmit={handleSubmit}
            className="flex items-center w-full backdrop-blur-md border-blue-600 px-[3px] py-[2px] md:py-[4px] lg:px-[5px] border-[1px] bg-[rgba(0,123,255,0.2)] rounded-full z-20"
            id="waitlist"
          >
            <input
              type="email"
              placeholder="Type your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-[#007BFFBF] p-3 bg-transparent outline-none placeholder-[#007BFFBF] md:text-[20px] text-[12px] font-space"
            />
            <button
              className="bg-[#001E62] text-white font-semibold text-[8px] lg:text-[18px] lg:py-6 px-2 p-3 md:py-5 lg:w-[20em] w-[50%] md:w-[40%] rounded-full hover:bg-blue-800 transition ease-linear duration-300  "
              disabled={loading} // Disable the button while loading
            >
              JOIN WAITLIST
            </button>
          </form>
        </div>

        {/* Error or Success Message */}
        {showMessage && message && (
          <p
            className={`font-space mt-4 ${
              isError ? "text-red-300" : "text-[#007BFF]"
            }`}
          >
            {message}
          </p>
        )}

        {/* Preloader */}
        {loading && (
          <div className="fixed top-0 left-0 w-full h-full bg-blue-300 bg-opacity-20 flex items-center justify-center z-50">
            <ClipLoader size={80} color={"#001E62"} loading={loading} />
          </div>
        )}

        {/* Anchor tag for external form link */}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfT69uhrTbxMQO1nRgR-yBQ2aUXxfDqJUbFHib35GDSTgp6Gw/viewform?usp=sf_link"
          target="_blank"
          rel="noopener noreferrer"
          className="md:mt-[2em] z-20 mt-[1em] block text-[#007BFF] font-[700] text-[16px] md:text-[21px]  mx-auto  border-b-[2px] border-[#007BFF]"
        >
          Take a survey
        </a>
      </div>
    </div>
  );
};

export default Waitlist;
