import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Model } from "./components/Saxna";

export default function App() {
  return (
    <Canvas camera={{ position: [10, 10, 10] }} className="w-full h-screen bg-black text-white">
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <Suspense fallback={<div> Loading... </div>}>
        <Model />
      </Suspense>
      <OrbitControls />
    </Canvas>
  )
}