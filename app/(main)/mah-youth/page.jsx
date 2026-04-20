'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import HighlightedEvents from './components/HighlightedEvents'
import Volunteering from './components/Volunteering'
import Programs from './components/Programs'

const Page = () => {
  const [isMobile, setIsMobile] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // --- Animation Variants ---

  const logoVariants = {
    hidden: { y: '-150%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.43, 0.13, 0.23, 0.96], // power2.inOut equivalent
      },
    },
    hover: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
      },
    },
  }

  const quoteVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        delay: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const mobileQuoteVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const arrowVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 1.5,
        ease: 'easeOut',
      },
    },
    bounce: {
      y: [0, 10, 0],
      transition: {
        duration: 1.5,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
        delay: 2.3,
      },
    },
  }

  return (
    <div className='mt-36 min-h-screen'>
      {/* Hero */}
      <div className="flex flex-col items-center justify-start h-[70vh] w-full p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-black/5 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-black/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '2s' }}
          />
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center lg:gap-12 xl:gap-20 w-full max-w-7xl relative z-10">
          {/* Logo Section */}
          <div className="flex justify-center w-full lg:w-auto relative mb-8 lg:mb-0">
            {/* Glow effect behind logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] xl:w-[550px] xl:h-[550px] bg-black/5 rounded-full blur-3xl" />
            </div>

            <motion.div
              className="relative bg-yPrimary rounded-full p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12"
              variants={logoVariants}
              initial="hidden"
              animate={shouldReduceMotion ? 'visible' : ['visible', 'hover']}
              viewport={{ once: true }}
            >
              <Image
                className="logo w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] xl:w-[500px] flex-shrink-0 drop-shadow-2xl"
                src="/mah-youth-logo.png"
                alt="Hero Image"
                width={600}
                height={600}
                priority
              />
            </motion.div>
          </div>

          {/* Quote Section — Desktop */}
          {!isMobile && (
            <motion.div
              className="text-black flex flex-col items-start max-w-2xl xl:max-w-4xl relative"
              variants={quoteVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Decorative quote mark */}
              <div className="absolute -top-6 -left-6 lg:-top-8 lg:-left-8 text-black/10 text-6xl lg:text-8xl font-serif">
                &quot;
              </div>

              <div className="relative bg-black/5 backdrop-blur-sm border border-black/10 rounded-2xl p-6 lg:p-8 shadow-2xl">
                <p
                  className="text-lg lg:text-2xl xl:text-4xl mb-6 leading-relaxed text-right font-arabic"
                  style={{ fontFamily: 'var(--font-arabic, serif)' }}
                >
                  إِنَّمَا ٱلۡمُؤۡمِنُونَ إِخۡوَةٞ فَأَصۡلِحُواْ بَيۡنَ أَخَوَيۡكُمۡۚ وَٱتَّقُواْ ٱللَّهَ لَعَلَّكُمۡ
                  تُرۡحَمُونَ
                </p>

                <div className="h-px bg-gradient-to-r from-transparent via-black/20 to-transparent mb-6" />

                <p className="text-base lg:text-lg xl:text-xl text-black/80 leading-relaxed italic">
                  &quot;The believers are but brothers, so make settlement between your brothers. And fear
                  Allah that you may receive mercy.&quot;
                </p>

                {/* Surah reference */}
                <div className="mt-4 inline-flex items-center gap-2 bg-black/10 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-black/50 rounded-full" />
                  <span className="text-xs text-black/70 font-medium">Surah Al-Hujurat (49:10)</span>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute -bottom-4 -right-4 w-12 h-12 lg:w-16 lg:h-16 border-b-2 border-r-2 border-black/20 rounded-br-2xl" />
              </div>
            </motion.div>
          )}

          {/* Quote Section — Mobile */}
          {isMobile && (
            <motion.div
              className="text-black flex flex-col items-center max-w-md relative px-4"
              variants={mobileQuoteVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="relative bg-black/5 backdrop-blur-sm border border-black/10 rounded-2xl p-6 shadow-2xl">
                <p
                  className="text-base sm:text-lg mb-4 leading-relaxed text-right font-arabic"
                  style={{ fontFamily: 'var(--font-arabic, serif)' }}
                >
                  إِنَّمَا ٱلۡمُؤۡمِنُونَ إِخۡوَةٞ
                </p>

                <div className="h-px bg-gradient-to-r from-transparent via-black/20 to-transparent mb-4" />

                <p className="text-sm sm:text-base text-black/80 leading-relaxed italic text-center">
                  &quot;The believers are but brothers&quot;
                </p>

                <div className="mt-4 inline-flex items-center gap-2 bg-black/10 px-3 py-1.5 rounded-full mx-auto">
                  <div className="w-1.5 h-1.5 bg-black/50 rounded-full" />
                  <span className="text-xs text-black/70 font-medium">Surah Al-Hujurat (49:10)</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Scroll Down Arrow */}
        <motion.div
          className="mt-52 flex flex-col items-center gap-2 cursor-pointer group"
          variants={arrowVariants}
          initial="hidden"
          animate={shouldReduceMotion ? 'visible' : ['visible', 'bounce']}
          onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <p className="text-xs text-black/50 uppercase tracking-wider font-medium group-hover:text-black/70 transition-colors">
            Scroll Down
          </p>
          <div className="relative flex flex-col items-center">
            <div className="w-px h-6 sm:h-8 bg-gradient-to-b from-transparent via-black/30 to-black/60 mb-2" />
            <div className="relative">
              <div className="absolute inset-0 bg-black/20 rounded-full blur-md group-hover:bg-black/30 transition-colors" />
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                className="sm:w-8 sm:h-8 text-black/70 group-hover:text-black transition-colors relative z-10"
              >
                <path
                  d="M7 10L12 15L17 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Highlighted Events */}
      <div className="flex flex-col items-center justify-start h-[70vh] w-full p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden">
        <HighlightedEvents />
      </div>

      <div className="flex flex-col items-center justify-start h-[70vh] w-full p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden">
        <Volunteering />
      </div>

      <div className="flex flex-col items-center justify-start min-h-[70vh] w-full p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden">
        <Programs />
      </div>
    </div>
  )
}

export default Page
