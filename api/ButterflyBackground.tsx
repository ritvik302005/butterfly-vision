import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function Butterfly({
  position,
  color,
  speed = 1,
  scale = 1
}: {
  position: [number, number, number];
  color: string;
  speed?: number;
  scale?: number;
}) {
  const leftWing = useRef<THREE.Mesh>(null);
  const rightWing = useRef<THREE.Mesh>(null);
  const body = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;

    if (leftWing.current && rightWing.current) {
      const flap = Math.sin(t * 10) * 0.8;
      leftWing.current.rotation.y = flap;
      rightWing.current.rotation.y = -flap;
    }

    if (body.current) {
      body.current.rotation.y += 0.01 * speed;
      body.current.position.y += Math.sin(t) * 0.005;
    }
  });

  const wingShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.5, 1, 1.5, 1, 1.5, 0);
    shape.bezierCurveTo(1.5, -1, 0.5, -1, 0, 0);
    return shape;
  }, []);

  return (
    <group position={position} scale={scale} ref={body}>
      <mesh ref={leftWing}>
        <shapeGeometry args={[wingShape]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.8} />
      </mesh>

      <mesh ref={rightWing} scale={[-1, 1, 1]}>
        <shapeGeometry args={[wingShape]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.8} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}

export default function ButterflyBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />

        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <Butterfly position={[-4, 2, 0]} color="#5A5A40" speed={1.2} scale={1.5} />
        </Float>

        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
          <Butterfly position={[5, -3, -2]} color="#A5A58D" speed={0.8} scale={1.2} />
        </Float>

        <Float speed={2.5} rotationIntensity={1.5} floatIntensity={3}>
          <Butterfly position={[3, 4, -5]} color="#6B705C" speed={1.5} scale={1} />
        </Float>

        <Float speed={1.8} rotationIntensity={0.8} floatIntensity={2}>
          <Butterfly position={[-6, -4, -3]} color="#5A5A40" speed={1.1} scale={1.4} />
        </Float>
      </Canvas>
    </div>
  );
}
