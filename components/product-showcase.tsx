"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useAnimation, useInView } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const products = [
  {
    id: 1,
    name: "White Hoodie",
    price: "$299",
    description:
      "Minimalist design with premium cotton blend. Features a relaxed fit with ribbed cuffs and hem for comfort and style.",
    colors: ["White", "Gray", "Black"],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "/images/hoodie-white.png",
  },
  {
    id: 2,
    name: "Yellow Hoodie",
    price: "$329",
    description:
      "Bold statement piece with vibrant color. The oversized silhouette and premium materials create a perfect balance of comfort and style.",
    colors: ["Yellow", "Orange", "Blue"],
    sizes: ["XS", "S", "M", "L"],
    image: "/images/yellow-hoodie.png",
  },
  {
    id: 3,
    name: "Red Performance Jacket",
    price: "$549",
    description:
      "Technical outerwear with quilted design for warmth and style. Features water-resistant exterior and breathable lining.",
    colors: ["Red", "Black", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    image: "/images/red-jacket.png",
  },
]

const categories = ["All", "Outerwear", "Hoodies", "Dresses", "Accessories"]

export default function ProductShowcase() {
  const [activeProduct, setActiveProduct] = useState(0)
  const [activeCategory, setActiveCategory] = useState("All")
  const targetRef = useRef<HTMLDivElement>(null)
  const productRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(productRef, { once: false, amount: 0.3 })
  const controls = useAnimation()

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const imageVariants = {
    hover: {
      scale: 1.05,
      rotate: 5,
      transition: { duration: 0.3 },
    },
  }

  return (
    <div className="container mx-auto px-4" ref={targetRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Featured Collection</h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Explore our latest designs that blend artistry with functionality
        </p>
      </motion.div>

      <Tabs defaultValue="All" className="mb-12">
        <TabsList className="grid w-full grid-cols-5 bg-gray-900">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              onClick={() => setActiveCategory(category)}
              className="data-[state=active]:bg-gray-800"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center" ref={productRef}>
        <motion.div
          style={{ y, scale }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="relative h-[600px] bg-gray-900 rounded-lg overflow-hidden"
        >
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            className="w-full h-full flex items-center justify-center p-8"
          >
            <motion.div variants={imageVariants} className="relative w-full h-full">
              <Image
                src={products[activeProduct].image || "/placeholder.svg"}
                alt={products[activeProduct].name}
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-8"
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold mb-2">{products[activeProduct].name}</h3>
            <p className="text-2xl text-gray-300 mb-4">{products[activeProduct].price}</p>
            <p className="text-gray-400 mb-6">{products[activeProduct].description}</p>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3">COLOR</h4>
                <div className="flex gap-3">
                  {products[activeProduct].colors.map((color, index) => (
                    <button
                      key={color}
                      className={`h-10 px-4 rounded-md border ${
                        index === 0 ? "border-white bg-gray-800" : "border-gray-700"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3">SIZE</h4>
                <div className="flex flex-wrap gap-3">
                  {products[activeProduct].sizes.map((size) => (
                    <button
                      key={size}
                      className="h-10 w-10 rounded-md border border-gray-700 flex items-center justify-center hover:border-white hover:bg-gray-800 transition-colors"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-8 sm:flex-row">
              <Button size="lg" className="neon-button">
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="shine-button">
                Save to Wishlist
              </Button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-8 border-t border-gray-800">
            <h4 className="text-lg font-medium mb-4">More from this collection</h4>
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {products.map((product, index) => (
                <motion.button
                  key={product.id}
                  onClick={() => setActiveProduct(index)}
                  whileHover={{ scale: 1.05 }}
                  className={`flex-shrink-0 p-4 rounded-lg transition-colors ${
                    activeProduct === index ? "bg-gray-800" : "bg-gray-900 hover:bg-gray-800"
                  }`}
                >
                  <div className="relative w-16 h-16 mb-2 mx-auto">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-400">{product.price}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{
              y: -10,
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
              transition: { duration: 0.3 },
            }}
            className="bg-gray-900 rounded-xl overflow-hidden cursor-pointer"
            onClick={() => setActiveProduct(index)}
          >
            <div className="h-64 relative">
              <motion.div
                initial={{ scale: 0.9, opacity: 0.8 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                whileHover={{
                  scale: 1.1,
                  rotate: index % 2 === 0 ? 5 : -5,
                  transition: { duration: 0.4 },
                }}
                className="w-full h-full flex items-center justify-center p-4"
              >
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </motion.div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-gray-400 mb-4">{product.price}</p>
              <Button variant="link" className="p-0 h-auto text-white">
                View Details
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

