'use client'
import React, { useState } from 'react';
import Doodle from "@/public/assets/images/testimonialDoodle.svg";
import Image from 'next/image'
import Arrow from '@/public/assets/images/arrow.svg'

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "What is Uptions?",
    answer: "Uptions is a platform for managing investment options and providing tools for better decision-making."
  },
  {
    question: "Why use Uptions over a direct provider?",
    answer: "It helps users track market trends, analyze investment options, and offers personalized recommendations."
  },
  {
    question: "Is Uptions free to use?",
    answer: "Yes, we offer a 14-day free trial with full access to all premium features."
  },
  {
    question: "How does Uptions find the best price?",
    answer: "You can reach our customer support through the 'Contact Us' section on the website or by email."
  },
  {
    question: "What if I have a problem with my delivery?",
    answer: "You can reach our customer support through the 'Contact Us' section on the website or by email."
  },
  {
    question: "How do I pay for my delivery?",
    answer: "You can reach our customer support through the 'Contact Us' section on the website or by email."
  }
];

const Faq: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className='flex flex-col xl:px-[10em] py-[2em] 2xl:py-[3em] items-center font-space bg-white 2xl:px-[18em]'>
      <div className='py-[2em] mb-[1em]'>
        <h1 className='text-[40px] font-[700] text-[#001B6C] font-space'>
          We know you have got questions
        </h1>
        <Image src={Doodle} alt='doodle image' />
      </div>

      <div className='w-full'>
        {faqData.map((faq, index: number) => (
          <div key={index} className='mb-[2em]'>
            <div
              className={`flex flex-col p-[2em] cursor-pointer transition-all duration-500 ease-out border-blue-500 border-[2px] rounded-2xl
                ${openFaq === index ? 'bg-[#007BFF]' : 'bg-white'}`} // Change background color here
              onClick={() => toggleFaq(index)}
            >
              <div className="flex justify-between items-center">
                <h1 className={`text-[${openFaq === index ? '#001B6C' : '#001B6C'}] font-[700] text-[25px]`}>
                  {faq.question}
                </h1>
                
                {/* Arrow image with transition */}
                <Image 
                  src={Arrow} 
                  alt="arrow"
                  className={`transition-transform duration-300 ${openFaq === index ? 'rotate-90' : 'rotate-0'}`} 
                />
              </div>

              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${openFaq === index ? 'max-h-[200px] pt-[1em]' : 'max-h-0 pt-0'}`}
              >
                <p className={`text-[${openFaq === index ? 'white' : '#333'}] text-[25px]`}>
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
