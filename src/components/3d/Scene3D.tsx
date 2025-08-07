import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function AnimatedSphere({ position, color, size = 1 }: { position: [number, number, number], color: string, size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial 
        color={color}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
}

function StartupLogo() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <mesh position={[-1.5, 0, 0]}>
        <boxGeometry args={[2.5, 0.6, 0.2]} />
        <meshStandardMaterial color="#8b5cf6" />
      </mesh>
      <mesh position={[1.5, -0.5, 0]}>
        <boxGeometry args={[2, 0.4, 0.15]} />
        <meshStandardMaterial color="#06b6d4" />
      </mesh>
    </group>
  );
}

export function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        className="!fixed inset-0"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
          
          {/* Animated spheres */}
          <AnimatedSphere position={[-4, 2, -2]} color="#8b5cf6" size={0.8} />
          <AnimatedSphere position={[4, -1, -1]} color="#06b6d4" size={0.6} />
          <AnimatedSphere position={[2, 3, -3]} color="#ec4899" size={0.4} />
          <AnimatedSphere position={[-3, -2, -2]} color="#10b981" size={0.5} />
          <AnimatedSphere position={[0, 0, -4]} color="#f59e0b" size={0.3} />
          
          {/* Main logo */}
          <StartupLogo />
          
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            enableDamping
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}