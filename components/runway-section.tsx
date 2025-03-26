"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function RunwaySection() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.6, 1, 1, 0.6])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  return (
    <div className="container mx-auto px-4" ref={targetRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Runway Moments</h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Experience the drama and artistry of our runway presentations
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          style={{ y, opacity, scale }}
          className="h-[600px] bg-gray-900 rounded-2xl overflow-hidden relative"
        >
          <Image
            src="/images/fashion-exhibition.png"
            alt="Fashion exhibition with multiple outfits"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-2">ELEVATE Retrospective</h3>
              <p className="text-gray-300 mb-4">Museum of Modern Fashion</p>
            </motion.div>
          </div>
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-4">Paris Fashion Week 2025</h3>
            <p className="text-gray-300 mb-6">
              Our most ambitious runway presentation to date, featuring groundbreaking designs that challenge
              conventional notions of silhouette and form. The collection explores the intersection of digital and
              physical realms, with garments that transform and adapt to the wearer's environment.
            </p>
            <Button size="lg" className="neon-button">
              Watch Full Show
            </Button>
          </motion.div>

          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-800">
            {[
              { src: "/images/black-dress.png", alt: "Model in black dress" },
              { src: "/images/silver-dress.png", alt: "Silver metallic dress" },
              { src: "/images/floating-outfit.png", alt: "Floating outfit" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
                  transition: { duration: 0.3 },
                }}
                className="aspect-square relative rounded-lg overflow-hidden"
              >
                <Image src={item.src || "/placeholder.svg"} alt={item.alt} fill className="object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Milan",
            image: "/images/red-jacket.png",
            desc: "Exploring the boundaries of form and function with innovative textiles.",
          },
          {
            title: "New York",
            image: "/images/yellow-hoodie.png",
            desc: "Urban influences meet high fashion in our most wearable collection.",
          },
          {
            title: "Tokyo",
            image: "/images/silver-dress.png",
            desc: "Futuristic designs inspired by Japanese architecture and technology.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-900 rounded-xl p-6 space-y-4"
          >
            <motion.div
              className="aspect-video relative rounded-lg overflow-hidden mb-4"
              whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
            >
              <Image
                src={item.image || "/placeholder.svg"}
                alt={`Fashion show ${item.title}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
                    <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
            <h4 className="text-xl font-bold">{item.title} Fashion Week</h4>
            <p className="text-gray-400">{item.desc}</p>
            <Button variant="link" className="p-0 h-auto text-white">
              Watch Highlights
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

