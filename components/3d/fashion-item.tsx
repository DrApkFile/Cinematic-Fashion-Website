"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { MeshDistortMaterial } from "@react-three/drei"
import type * as THREE from "three"

interface FashionItemProps {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  color: string
  type: number
}

export default function FashionItem({ position, rotation = [0, 0, 0], scale = 1, color, type }: FashionItemProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
      if (type === 0) {
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      } else if (type === 1) {
        meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      } else {
        meshRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime) * 0.05
        meshRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime) * 0.05
      }
    }
  })

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {type === 0 && (
        // Dress/Gown
        <mesh ref={meshRef}>
          <coneGeometry args={[1, 2, 32, 1, false, 0, Math.PI * 2]} />
          <MeshDistortMaterial color={color} speed={2} distort={0.3} metalness={0.8} roughness={0.2} />
        </mesh>
      )}

      {type === 1 && (
        // Jacket/Top
        <mesh ref={meshRef}>
          <cylinderGeometry args={[0.8, 1, 1.5, 32]} />
          <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
        </mesh>
      )}

      {type === 2 && (
        // Accessory/Bag
        <mesh ref={meshRef}>
          <torusKnotGeometry args={[0.7, 0.3, 128, 32]} />
          <meshStandardMaterial
            color={color}
            metalness={0.7}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={0.3}
          />
        </mesh>
      )}

      {/* Base/Platform */}
      <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.1, 32]} />
        <meshStandardMaterial color="#111111" metalness={0.5} roughness={0.2} />
      </mesh>

      {/* Spotlight */}
      <pointLight position={[0, 2, 0]} intensity={1} color={color} distance={5} />
    </group>
  )
}

