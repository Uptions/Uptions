"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation"; // Import usePathname for Next.js App Router
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/public/assets/images/logo.svg";
import Link from "next/link";
import Doodle from "@/public/assets/images/doodle.svg";
import Linkedin from "@/public/assets/images/linkedin.svg";
import twitter from "@/public/assets/images/twitter.svg";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null); // Manage hover state
  const pathname = usePathname(); // Initialize usePathname to detect the current route
  const dropdownRef = useRef<HTMLDivElement>(null); // Reference to the dropdown container

  // Toggle the menu using the hamburger button
  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the document's click listener
    setIsOpen((prev) => !prev); // Toggle the state to open or close the menu
  };

  // Close the menu when scrolling
  useEffect(() => {
    if (isOpen) {
      const handleScroll = () => {
        setIsOpen(false);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isOpen]);

  // Handle clicks outside the dropdown to close the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Add the event listener for clicks outside the dropdown
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Function to check if the current route matches
  const isRouteActive = (path: string) => pathname === path;

  return (
    <div className="flex justify-between items-center px-[2em]" ref={dropdownRef}>
      <div>
        <a href="/">
          <Image
            src={Logo}
            alt="logo"
            height={100}
            width={100}
            className="xl:w-[100%]  w-[70%]"
          />
        </a>
      </div>

      {/* Menu for larger screen */}
      <div className="bg-[#001B6C] hidden   font-space lg:flex justify-center backdrop-blur-sm items-center gap-[2em] px-[2em] h-[5em] rounded-t-[30.6px] rounded-b-md mx-auto border-[1.5px] border-blue-300 shadow-xl">
        <Link href="/">
          <div
            onMouseEnter={() => setHovered("/")}
            onMouseLeave={() => setHovered(null)}
            className="w-[10em] flex flex-col items-center justify-center"
          >
            <h1 className="w-full text-[20px] font-[400] text-center">
              Join Waitlist
            </h1>
            {/* Reserved space for the doodle */}
            <div
              className={`w-[100px] flex items-center justify-center transition-all duration-500 transform ${
                isRouteActive("/") || hovered === "/"
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-75"
              }`}
            >
              <Image src={Doodle} width={100} height={20} alt="doodle" />{" "}
              {/* Ensure height is set to auto */}
            </div>
          </div>
        </Link>
      </div>

      <div className="xl:flex gap-[1em] items-center hidden">
        <h1 className="font-space text-[#001B6C] text-[20px] font-[400] ">
          Follow the journey on
        </h1>
        <a href="https://twitter.com" className="">
          <Image src={twitter} alt="twitter logo" />
        </a>
        <a href="https://linkedin.com">
          <Image
            src={Linkedin}
            alt="linkedin logo"
            className="h-[24px] w-[24px]"
          />
        </a>
      </div>

      {/* Hamburger for mobile screens */}
      <div className="xl:hidden mt-[10px] w-[10em] flex items-end justify-end">
        <button onClick={toggleMenu} className="focus:outline-none">
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-blue-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            {/* Top Line */}
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16"
              initial={{ rotate: 0, y: 0 }} // Ensure initial state is correct
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 8 : 0, // Move the line down when open
              }}
              transition={{ duration: 0.2 }}
            />
            {/* Middle Line */}
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 12h16"
              initial={{ opacity: 1 }} // Ensure initial opacity
              animate={{
                opacity: isOpen ? 0 : 1, // Hide when open
              }}
              transition={{ duration: 0.3 }}
            />
            {/* Bottom Line */}
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 18h16"
              initial={{ rotate: 0, y: 0 }} // Ensure initial state is correct
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? -4 : 0, // Move the line up when open
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.svg>
        </button>
      </div>

      {/* Mobile Menu with Framer Motion Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-[70px] left-1/2 transform -translate-x-1/2  border-[1.5px] border-blue-600 bg-[#001b6cd3] md:mt-[5em] mt-[2em] w-[80%] md:w-[60%] h-auto flex flex-col items-center justify-center shadow-lg xl:hidden rounded-t-md rounded-b-3xl z-50 overflow-hidden"
            initial={{ opacity: 0, height: 0, overflow: "hidden" }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0, overflow: "hidden" }}
            transition={{ duration: 0.2 }}
          >
            <ul className="w-full flex flex-col items-center justify-center gap-[1.5em] py-6">
              <li className="text-white list-none font-space cursor-pointer font-normal text-[20px]">
                Follow the journey on
              </li>
              <Link href="https://x.com/useuptions?t=L9pIIsBq9auVnGuCVMYL9w&s=09">
                <div className="flex items-center gap-[1em] font-space">
                  <h1> Twitter</h1>
                  <Image src={twitter} alt="twitter logo"></Image>
                </div>
              </Link>

              <Link href="https://www.linkedin.com/company/105104061/admin/dashboard/">
                <div className="flex items-center gap-[1em] font-space">
                  <h1>Linkedin</h1>
                  <Image src={Linkedin} alt="linkedin logo" />
                </div>
              </Link>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Nav;
