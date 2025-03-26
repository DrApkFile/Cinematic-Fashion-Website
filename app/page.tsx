"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import Navbar from "@/components/navbar"
import ProductShowcase from "@/components/product-showcase"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import LookbookSection from "@/components/lookbook-section"
import CollectionPreview from "@/components/collection-preview"
import RunwaySection from "@/components/runway-section"
import CustomCursor from "@/components/custom-cursor"
import VideoBackground from "@/components/video-background"
import NewsletterSignup from "@/components/newsletter-signup"

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  // You'll need to replace this with the actual path to your video
  // after downloading it from Pinterest
  const fashionVideoSrc = "/videos/fashion-background.mp4"

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <CustomCursor />
      <Navbar />

      {/* Hero Section with Video Background */}
      <motion.section
        ref={targetRef}
        style={{ opacity, scale }}
        className="h-screen relative flex flex-col items-center justify-center"
      >
        <VideoBackground videoSrc={fashionVideoSrc} overlayOpacity={0.6}>
          <div className="container relative z-20 text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
            >
              ELEVATE
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 text-gray-300"
            >
              Redefining fashion through cinematic experiences
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button size="lg" className="neon-button">
                Explore Collection
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          >
            <Link href="#collection">
              <ChevronDown className="h-8 w-8" />
            </Link>
          </motion.div>
        </VideoBackground>
      </motion.section>

      {/* Collection Preview Section */}
      <section id="collection" className="py-20">
        <CollectionPreview />
      </section>

      {/* Products Section */}
      <section id="products" className="py-20">
        <ProductShowcase />
      </section>

      {/* Lookbook Section */}
      <section id="lookbook" className="py-20 bg-gray-950">
        <LookbookSection />
      </section>

      {/* Runway Section */}
      <section id="runway" className="py-20">
        <RunwaySection />
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <AboutSection />
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-950">
        <NewsletterSignup />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <ContactSection />
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">© {new Date().getFullYear()} ELEVATE. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Instagram
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Twitter
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Facebook
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

