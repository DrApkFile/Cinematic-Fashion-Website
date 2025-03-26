"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

export default function AboutSection() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y3 = useTransform(scrollYProgress, [0, 1], [200, 0])

  return (
    <div className="container mx-auto px-4" ref={targetRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Our Story</h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Crafting the future of fashion through innovation and artistic expression
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">Vision & Craft</h3>
            <p className="text-gray-300">
              Founded in 2020, ELEVATE emerged from a desire to challenge conventional fashion paradigms. Our designs
              blend architectural precision with fluid movement, creating pieces that transcend seasonal trends and
              become timeless expressions of individuality.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">Sustainable Innovation</h3>
            <p className="text-gray-300">
              We're committed to pushing the boundaries of sustainable fashion through innovative materials and ethical
              production processes. Each piece is crafted with intention, balancing aesthetic vision with environmental
              responsibility.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">Global Perspective</h3>
            <p className="text-gray-300">
              Our team brings together diverse cultural influences and technical expertise from around the world. This
              global perspective informs our design approach, resulting in collections that resonate across boundaries
              while maintaining a distinctive point of view.
            </p>
          </motion.div>
        </div>

        <div className="relative h-[600px]">
          <motion.div style={{ y: y1 }} className="absolute top-0 left-0 w-2/3 h-64 overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=256&width=384"
              alt="Fashion design process"
              width={384}
              height={256}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div style={{ y: y2 }} className="absolute top-1/4 right-0 w-2/3 h-64 overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=256&width=384"
              alt="Sustainable materials"
              width={384}
              height={256}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div style={{ y: y3 }} className="absolute bottom-0 left-1/4 w-2/3 h-64 overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=256&width=384"
              alt="Fashion runway"
              width={384}
              height={256}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

