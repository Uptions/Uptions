"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/public/assets/images/logo2.svg";
import Link from "next/link";
import Doodle from "@/public/assets/images/Doodle.svg";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Join Waitlist", path: "/waitlist" },
  { label: "Be an Uption", path: "/Become-Uption" },
];



const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen) {
      const handleScroll = () => setIsOpen(false);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isRouteActive = (path: string) => pathname === path;

  return (
    
      <div
        className="flex justify-between items-center px-[1.5em] py-[1em] bg-[#001E62] rounded-full mx-[2em] sticky top-[2em] z-30  shadow-lg shadow-gray-800"
        ref={dropdownRef}
      >
        <div>
          <a href="/" className="w-[8%]">
            <Image src={Logo} alt="logo" height={100} width={200} />
          </a>
        </div>

        <div className="bg-[rgba(0,123,255,0.34)] hidden font-space lg:flex justify-center backdrop-blur-sm items-center px-[2em] h-[5em] rounded-full mx-auto border-[1px] border-blue-300 shadow-xl py-[em]">
          {NAV_LINKS.map(({ label, path }) => (
            <Link href={path} key={path}>
              <div
                onMouseEnter={() => setHovered(path)}
                onMouseLeave={() => setHovered(null)}
                className="w-[10em] flex flex-col items-center justify-center"
              >
                <h1 className="w-full text-[20px] font-[400] text-center">
                  {label}
                </h1>
                <div
                  className={`w-[100px] flex items-center justify-center transition-all duration-500 transform ${
                    isRouteActive(path) || hovered === path
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-75"
                  }`}
                >
                  <Image src={Doodle} width={80} height={20} alt="doodle" />
                </div>
              </div>
            </Link>
          ))}
        </div>
          <Link href="/Try-Uptions">
          <button className="bg-[#007BFF] py-[1.5em] font-space px-6 rounded-full h-full text-[17px] hidden lg:block">
          Try out Uptions
        </button>
          </Link>


        <div className="lg:hidden mt-[10px] w-[10em] flex items-end justify-end">
          <button onClick={toggleMenu} className="focus:outline-none">
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-blue-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16"
                initial={{ rotate: 0, y: 0 }}
                animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
                transition={{ duration: 0.1 }}
              />
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 12h16"
                initial={{ opacity: 1 }}
                animate={{ opacity: isOpen ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 18h16"
                initial={{ rotate: 0, y: 0 }}
                animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -4 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.svg>
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute top-[70px] left-1/2 transform -translate-x-1/2 border-[1.5px] border-blue-600 bg-[#001b6cd3] md:mt-[5em] mt-[2em] w-[80%] md:w-[60%] h-auto flex flex-col items-center justify-center shadow-lg xl:hidden rounded-t-md rounded-b-3xl z-50 overflow-hidden"
              initial={{ opacity: 0, height: 0, overflow: "hidden" }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0, overflow: "hidden" }}
              transition={{ duration: 0.2 }}
            >
              <ul className="w-full flex flex-col items-center justify-center gap-[1.5em] py-6">
                {NAV_LINKS.map(({ label, path }) => (
                  <li key={path}>
                    <Link href={path} className="text-white text-[20px]">
                      {label}
                    </Link>
                  </li>
                ))}
                <button className="bg-[#007BFF] py-5 px-6 rounded-full h-full text-[17px] text-white mt-4">
                  Try out Uptions
                </button>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

  );
};

export default Nav;
