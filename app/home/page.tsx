import React from 'react'
import Navbar from '@/app/home/components/navbar'
import "./components/page.css"
import Hero from "@/app/home/components/hero"
import Unlock from "@/app/home/components/unlock"

const page = () => {
  return (
    <div className='page'>
      <Navbar/>
      <Hero/>
      <Unlock/>
      
    </div>
  )
}

export default page
