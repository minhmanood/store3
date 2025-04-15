import React, { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import { assets } from '../assets/assets.js'
import { motion, AnimatePresence } from 'framer-motion'
import Categories from '../components/Categories'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    // Simulate loading time (replace with actual loading logic)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      const fadeTimer = setTimeout(() => {
        setShowWelcome(false)
      }, 1000)
      return () => clearTimeout(fadeTimer)
    }
  }, [isLoading])

  return (
    <div className="relative">
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            className="fixed inset-0 bg-white z-50 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-center"
              initial={{ scale: 1 }}
              animate={{ 
                scale: [1, 1.5, 0], // Phóng to rồi thu nhỏ
                opacity: [1, 1, 0], // Mờ dần khi thu nhỏ
                transition: { 
                  duration: 3.6,
                  times: [0, 0.5, 1], // Thời gian cho từng giai đoạn
                  ease: "easeInOut"
                }
              }}
            >
              Well come to our store
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={showWelcome ? "opacity-0" : "opacity-100 transition-opacity duration-1000"}>
        <Hero/>
        <Categories/>
        <LatestCollection/>
        <BestSeller/>
        <OurPolicy/>
        <NewsletterBox/>
      </div>
    </div>
  )
}

export default Home
