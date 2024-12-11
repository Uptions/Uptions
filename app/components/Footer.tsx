import React from "react";
import Image from "next/image";
import Logo from "@/public/assets/images/footerlogo.svg";
import Twitter from "@/public/assets/twitter.svg";
import Linkedin from "@/public/assets/linkedin.svg";
import Facebook from "@/public/assets/images/facebook.svg";
import Tiktok from "@/public/assets/images/tiktok.svg";
import Instagram from "@/public/assets/instagram.svg";
import Link from "next/link";
import { motion } from "framer-motion";
import Asterix from "@/public/assets/asterix.svg";

// Define the types for the social media links
interface SocialLink {
  src: string;
  alt: string;
  url: string;
}

// Array for social media links
const socialLinks: SocialLink[] = [
  { src: Instagram, alt: "Instagram", url: "https://www.instagram.com" },
  { src: Facebook, alt: "Facebook", url: "https://www.facebook.com" },
  { src: Twitter, alt: "Twitter", url: "https://www.twitter.com" },
  { src: Linkedin, alt: "LinkedIn", url: "https://www.linkedin.com" },
  { src: Tiktok, alt: "TikTok", url: "https://www.tiktok.com" },
];

// Array for footer navigation links
interface FooterLink {
  label: string;
  url: string;
}

const footerLinks: FooterLink[] = [
  { label: "Home", url: "/" },
  { label: "About Us", url: "/about" },
  { label: "Join Us", url: "/join" },
  { label: "Become an Uption", url: "/become-an-uption" },
  { label: "Try Uptions", url: "/try" },
];

const Footer = () => {
  return (
    <div
      className="bg-[#001B6C] bg-cover bg-center"
      style={{
        backgroundImage: "url('/assets/footerbg2.svg')", // Your image path here
      }}
    >
      <div className="flex flex-col p-[3em]">
        <div className="flex justify-between">
          {/* Logo and Social Media Links */}
          <div className="flex flex-col gap-[1em]">
            <Image src={Logo} alt="footer logo" />
            <h1 className="text-[24px] font-[400] text-[#007BFF]">
              Follow Us on
            </h1>
            <div className="flex gap-[3em]">
              {socialLinks.map((social, index) => (
                <Link key={index} href={social.url} target="_blank">
                  <Image src={social.src} alt={social.alt} />
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Navigation Links */}
          <div className="flex flex-col gap-[1em] font-space">
            <div className="flex gap-[2em]">
              {footerLinks.slice(0, 3).map((link, index) => (
                <Link key={index} href={link.url}>
                  <h1 className="text-[24px] font-[400] text-white">
                    {link.label}
                  </h1>
                </Link>
              ))}
            </div>
            <div className="flex gap-[2em]">
              {footerLinks.slice(3).map((link, index) => (
                <Link key={index} href={link.url}>
                  <h1 className="text-[24px] font-[400] text-white">
                    {link.label}
                  </h1>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Animated Text with Infinite Scrolling using Framer Motion */}
      <div className="overflow-hidden py-2 mb-[-5em]">
        <motion.div
          className="scrolling-wrapper"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 10,
              ease: "linear",
            },
          }}
        >
          <div className="flex ">
            <div className="scrolling-text">
              <h1 className="text-[220px] font-[700] font-space text-[#007bff5f]">
                Compare
              </h1>{" "}
            </div> 

            <div className="scrolling-text">
              <h1 className="text-[220px] font-[700] font-space text-[#007bff73]">
                *
              </h1>{" "}
            </div>

            <div className="scrolling-text">
              <h1 className="text-[220px] font-[700] font-space text-[#0e1a41c8]  ">Choose</h1>{" "}
            </div>
            <div className="scrolling-text">
              <h1 className="text-[220px] font-[700] font-space text-[#007bff76]">*</h1>{" "}
            </div>

            <div className="scrolling-text">
              <h1 className="text-[220px] font-[700] font-space text-[#007bff5f]">Enjoy</h1>{" "}
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .scrolling-wrapper {
          display: flex;
          flex-direction: row;
          width: 100%;
        }

        .scrolling-text {
          white-space: nowrap;
          display: inline-block;
          padding-right: 5%;
        }
      `}</style>
    </div>
  );
};

export default Footer;
