import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import './MysticBackground.css';

function Galaxy() {
  const ref = useRef();
  
  const particles = useMemo(() => {
    const count = 5000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // 은하수 나선형 구조
      const radius = Math.random() * 20;
      const spinAngle = radius * 0.5;
      const branchAngle = (i % 8) / 8 * Math.PI * 2;
      
      const randomX = (Math.random() - 0.5) * 0.5;
      const randomY = (Math.random() - 0.5) * 0.5;
      const randomZ = (Math.random() - 0.5) * 0.5;
      
      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;
      
      // 금색과 보라색 계열 색상
      const color = new THREE.Color();
      const mix = Math.random();
      if (mix < 0.5) {
        color.setRGB(1, 0.84, 0); // 금색
      } else {
        color.setRGB(0.5, 0.2, 0.8); // 보라색
      }
      
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }
    
    return { positions, colors };
  }, []);
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.1;
    }
  });
  
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        transparent
        vertexColors
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function WheelOfFortune() {
  const wheelRef = useRef();
  const innerWheelRef = useRef();
  
  useFrame((state, delta) => {
    if (wheelRef.current) {
      wheelRef.current.rotation.z += delta * 0.2;
    }
    if (innerWheelRef.current) {
      innerWheelRef.current.rotation.z -= delta * 0.15;
    }
  });
  
  return (
    <group position={[0, -2, -5]}>
      {/* 외부 수레바퀴 */}
      <mesh ref={wheelRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#ffd700"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* 내부 수레바퀴 */}
      <mesh ref={innerWheelRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.08, 16, 100]} />
        <meshStandardMaterial
          color="#764ba2"
          emissive="#9d4edd"
          emissiveIntensity={0.3}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      
      {/* 중심 */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial
          color="#ffd700"
          emissive="#ffd700"
          emissiveIntensity={1}
          metalness={1}
          roughness={0.1}
        />
      </mesh>
      
      {/* 연결선들 */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh
            key={i}
            rotation={[Math.PI / 2, 0, angle]}
            position={[Math.cos(angle) * 1.75, 0, Math.sin(angle) * 1.75]}
          >
            <boxGeometry args={[0.05, 0.05, 0.5]} />
            <meshStandardMaterial
              color="#d4af37"
              emissive="#ffd700"
              emissiveIntensity={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function MysticBackground() {
  return (
    <div className="mystic-background">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffd700" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#9d4edd" />
        
        <Galaxy />
        <WheelOfFortune />
      </Canvas>
    </div>
  );
}

