import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { Model } from '../components/Model'

export default function Home() {
    return (
        <div style={{ width: '100vw', height: '100vh', background: '#111' }}>
            <Canvas camera={{ position: [5, 5, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                <Suspense fallback={null}>
                    <Model />
                    <Environment preset="city" />
                    <ContactShadows position={[0, -0.8, 0]} opacity={0.25} scale={10} blur={1.5} far={0.8} />
                </Suspense>

                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
            </Canvas>
        </div>
    )
}
