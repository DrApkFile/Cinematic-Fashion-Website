"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface VideoBackgroundProps {
  videoSrc: string
  overlayOpacity?: number
  children?: React.ReactNode
}

export default function VideoBackground({ videoSrc, overlayOpacity = 0.5, children }: VideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Check if browser supports autoplay
    const canAutoplay = document.createElement("video").canPlayType

    // Only run on the client side
    if (typeof window !== "undefined") {
      // Handle video loading
      const handleLoadedData = () => {
        setIsLoaded(true)
      }

      video.addEventListener("loadeddata", handleLoadedData)

      // Attempt to play the video
      const playVideo = async () => {
        try {
          await video.play()
        } catch (error) {
          console.error("Autoplay prevented:", error)
          // Add a play button or other fallback here if needed
        }
      }

      if (canAutoplay) {
        playVideo()
      }

      return () => {
        video.removeEventListener("loadeddata", handleLoadedData)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
      <motion.div style={{ opacity, scale }} className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          src={videoSrc}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: isLoaded ? 1 : 0,
          transition: { delay: 0.3, duration: 0.8 },
        }}
        className="relative z-10 w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  )
}

