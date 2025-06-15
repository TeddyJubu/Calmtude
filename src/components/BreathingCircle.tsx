import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

interface BreathingAnimationProps {
  isRunning: boolean;
  setLabel: (label: string) => void;
}

const BreathingAnimation = ({ isRunning, setLabel }: BreathingAnimationProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const tlRef = useRef<gsap.core.Timeline>();

  // Setup GSAP timeline
  useEffect(() => {
    if (!meshRef.current) return;

    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      paused: true,
      onStart: () => setLabel("Inhale"),
      onUpdate: function () {
        if (this.reversed()) {
          setLabel("Exhale");
        } else {
          setLabel("Inhale");
        }
      },
    });

    // Initial state
    gsap.set(meshRef.current.scale, { x: 0.5, y: 0.5, z: 0.5 });
    
    // Animation
    tl.to(meshRef.current.scale, {
      duration: 4,
      x: 1,
      y: 1,
      z: 1,
      ease: "power1.inOut",
    });

    tlRef.current = tl;

    return () => {
      tl.kill();
    };
  }, [setLabel]);

  // Control animation playback
  useEffect(() => {
    const tl = tlRef.current;
    if (!tl || !meshRef.current) return;

    if (isRunning) {
      tl.play();
    } else {
      tl.pause();
      // Animate back to initial state when stopped
      gsap.to(meshRef.current.scale, {
        duration: 1,
        x: 0.5,
        y: 0.5,
        z: 0.5,
        ease: "power1.inOut",
        onComplete: () => {
          if (!isRunning) {
            setLabel('Press Start');
          }
        },
      });
    }
  }, [isRunning, setLabel]);

  return (
    <>
      <ambientLight intensity={1.5} />
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#cceeff"
          transparent
          opacity={0.8}
        />
      </mesh>
    </>
  );
};


interface BreathingCircleProps {
  isRunning: boolean;
}

export function BreathingCircle({ isRunning }: BreathingCircleProps) {
  const [label, setLabel] = useState('Press Start');
  
  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
        <Canvas>
            <OrthographicCamera makeDefault zoom={150} position={[0, 0, 10]} />
            <BreathingAnimation isRunning={isRunning} setLabel={setLabel} />
        </Canvas>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-2xl font-semibold text-gray-500/80 transition-opacity duration-500">
                {label}
            </span>
        </div>
      </div>
    </div>
  );
}
