"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const collections = [
  {
    id: 1,
    name: "AVANT-GARDE 2025",
    description: "Pushing boundaries with architectural silhouettes and innovative materials",
    color: "bg-gradient-to-r from-purple-900 to-indigo-900",
    image: "/images/black-dress.png",
  },
  {
    id: 2,
    name: "NEO MINIMALIST",
    description: "Refined essentials with unexpected details and premium fabrications",
    color: "bg-gradient-to-r from-gray-900 to-gray-800",
    image: "/images/floating-outfit.png",
  },
  {
    id: 3,
    name: "DIGITAL COUTURE",
    description: "Where digital aesthetics meet physical craftsmanship",
    color: "bg-gradient-to-r from-cyan-900 to-blue-900",
    image: "/images/silver-dress.png",
  },
]

export default function CollectionPreview() {
  const [activeCollection, setActiveCollection] = useState(0)
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <div className="container mx-auto px-4" ref={targetRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Latest Collections</h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Explore our visionary collections that redefine contemporary fashion
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {collections.map((collection, index) => (
          <motion.div
            key={collection.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className={`rounded-2xl overflow-hidden h-[500px] relative ${collection.color} cursor-pointer group card-hover`}
            onClick={() => setActiveCollection(index)}
          >
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.5 },
              }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={collection.image || "/placeholder.svg"}
                alt={collection.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>

            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20">
              <h3 className="text-2xl font-bold mb-2">{collection.name}</h3>
              <p className="text-gray-300 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {collection.description}
              </p>
              <Button
                variant="outline"
                className="w-full bg-transparent border-white text-white hover:bg-white hover:text-black transition-colors shine-button"
              >
                Explore
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

