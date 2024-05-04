import HeroSection from '@/components/UI/HomePage/HeroSection/HeroSection'
import HowItWorks from '@/components/UI/HomePage/HowItWorks/HowItWorks'
import Specialist from '@/components/UI/HomePage/Specialist/Specialist'
import TopRatedDoctors from '@/components/UI/HomePage/TopRatedDoctors/TopRatedDoctors'
import WhyUs from '@/components/UI/HomePage/WhyUs/WhyUs'
import { Button } from '@mui/material'
import React from 'react'

const HomePage = () => {
  return (
    <>
      <HeroSection/>
   <Specialist/>
   <TopRatedDoctors/>
   <WhyUs/>
<HowItWorks/>
    </>
  )
}

export default HomePage