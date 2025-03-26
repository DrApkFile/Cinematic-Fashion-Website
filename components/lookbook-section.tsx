"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const lookbookImages = [
  {
    id: 1,
    src: "/images/black-dress.png",
    alt: "Model in black dress with puffed sleeves",
    caption: "ELEVATE SS25 Campaign - Structured Elegance",
  },
  {
    id: 2,
    src: "/images/floating-outfit.png",
    alt: "Floating outfit with brown top and mint skirt",
    caption: "Neo Minimalist Collection - Ethereal Silhouettes",
  },
  {
    id: 3,
    src: "/images/silver-dress.png",
    alt: "Silver metallic dress on mannequin",
    caption: "Digital Couture Series - Reflective Futures",
  },
  {
    id: 4,
    src: "/images/fashion-exhibition.png",
    alt: "Fashion exhibition with multiple outfits",
    caption: "Museum of Modern Fashion - ELEVATE Retrospective",
  },
  {
    id: 5,
    src: "/images/red-jacket.png",
    alt: "Red puffy jacket with hood",
    caption: "Urban Expressions - Statement Outerwear",
  },
]

export default function LookbookSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const controls = useAnimation()
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % lookbookImages.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + lookbookImages.length) % lookbookImages.length)
  }

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.9,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    }),
  }

  return (
    <div className="container mx-auto px-4" ref={containerRef}>
      <motion.div initial="hidden" animate={controls} variants={variants} className="text-center mb-16">
        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
          Lookbook
        </motion.h2>
        <motion.p variants={itemVariants} className="text-xl text-gray-400 max-w-2xl mx-auto">
          Visual narratives that showcase our design philosophy
        </motion.p>
      </motion.div>

      <div className="relative overflow-hidden rounded-2xl">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="relative aspect-[16/9] w-full overflow-hidden"
        >
          <Image
            src={lookbookImages[currentIndex].src || "/placeholder.svg"}
            alt={lookbookImages[currentIndex].alt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
            <h3 className="text-2xl font-bold mb-2">{lookbookImages[currentIndex].caption}</h3>
          </div>
        </motion.div>

        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <motion.div
        initial="hidden"
        animate={controls}
        variants={variants}
        className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-12"
      >
        {lookbookImages.map((image, index) => (
          <motion.div
            key={image.id}
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 30px rgba(0, 0, 0, 0.3)",
              transition: { duration: 0.3 },
            }}
            className={`aspect-square relative overflow-hidden rounded-lg cursor-pointer ${
              currentIndex === index ? "ring-2 ring-white" : ""
            }`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 hover:scale-110"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

