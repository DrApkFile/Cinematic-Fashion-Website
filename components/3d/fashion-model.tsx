"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { MeshDistortMaterial } from "@react-three/drei"
import type * as THREE from "three"

export default function FashionModel() {
  const dressRef = useRef<THREE.Mesh>(null)
  const topRef = useRef<THREE.Mesh>(null)
  const hatRef = useRef<THREE.Mesh>(null)
  const accessoryRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (dressRef.current) {
      dressRef.current.rotation.y += 0.003
    }
    if (topRef.current) {
      topRef.current.rotation.y -= 0.002
    }
    if (hatRef.current) {
      hatRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 + 2.5
    }
    if (accessoryRef.current) {
      accessoryRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  return (
    <group position={[0, -1, 0]}>
      {/* Mannequin base */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 3, 32]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Head */}
      <mesh position={[0, 2, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Dress/Gown */}
      <mesh ref={dressRef} position={[0, 0.2, 0]}>
        <coneGeometry args={[1.2, 2.5, 32, 1, false, 0, Math.PI * 2]} />
        <MeshDistortMaterial color="#ff00ff" speed={2} distort={0.3} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Top/Blouse */}
      <mesh ref={topRef} position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.6, 0.8, 0.8, 32]} />
        <meshStandardMaterial color="#00ffff" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Hat */}
      <mesh ref={hatRef} position={[0, 2.5, 0]}>
        <coneGeometry args={[0.5, 0.5, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Accessory (necklace) */}
      <mesh ref={accessoryRef} position={[0, 1.5, 0.4]}>
        <torusGeometry args={[0.2, 0.05, 16, 32]} />
        <meshStandardMaterial
          color="#ffff00"
          metalness={1}
          roughness={0.1}
          emissive="#ffff00"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Platform */}
      <mesh position={[0, -1.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.2, 32]} />
        <meshStandardMaterial color="#111111" metalness={0.5} roughness={0.2} />
      </mesh>

      {/* Spotlights */}
      <pointLight position={[-2, 2, 2]} intensity={1} color="#ff00ff" />
      <pointLight position={[2, 2, 2]} intensity={1} color="#00ffff" />
      <pointLight position={[0, 3, -2]} intensity={1} color="#ffffff" />
    </group>
  )
}

