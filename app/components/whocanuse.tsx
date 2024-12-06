import React from 'react'
import Image from 'next/image'
import Tag1 from "@/public/assets/images/tag1.svg"
import Tag2 from "@/public/assets/images/tag2.svg"
import Tag3 from "@/public/assets/images/tag3.svg"
import Tag4 from "@/public/assets/images/tag4.svg"
import Tag5 from "@/public/assets/images/tag5.svg"
import Tag6 from "@/public/assets/images/tag6.svg"
import Tag7 from "@/public/assets/images/tag7.svg"

const whoCanUse = () => {
  return (
    <div
    className="flex font-space justify-between p-[2em]"
    style={{
      backgroundImage: "url('/assets/images/SkyBluebg.svg')", // Your image path here
    }}>
        <div>
            <h1 className='font-[400] text-[40px] '>
            Who can use Uptions?
            </h1>
        </div>
        <div className='flex flex-col gap-[2em]'>
            <div className='flex gap-[1em]'>
                <Image src={Tag1} alt=''/>
                <Image src={Tag2} alt=''/>
                <Image src={Tag3} alt=''/>
                <Image src={Tag4} alt=''/>

            </div>
            <div className='flex gap-[1em]'>
            <Image src={Tag5} alt=''/>
            <Image src={Tag6} alt=''/>
            <Image src={Tag7} alt=''/>

            </div>
            

        </div>


      
    </div>
  )
}

export default whoCanUse
