
import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { BreathingPattern } from '@/lib/breathing';

interface BreathingAnimationProps {
  isRunning: boolean;
  setLabel: (label: string) => void;
  pattern: BreathingPattern;
}

const BreathingAnimation = ({ isRunning, setLabel, pattern }: BreathingAnimationProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const tlRef = useRef<gsap.core.Timeline>();

  // Setup GSAP timeline
  useEffect(() => {
    if (!meshRef.current || !pattern) return;

    if (tlRef.current) {
        tlRef.current.kill();
    }

    const tl = gsap.timeline({
      repeat: -1,
      paused: true,
    });

    // Initial state
    const initialScale = 0.5;
    gsap.set(meshRef.current.scale, { x: initialScale, y: initialScale, z: initialScale });
    
    let lastScale = initialScale;

    pattern.steps.forEach(step => {
        let targetScale;
        switch (step.label) {
            case "Inhale":
                targetScale = 1;
                break;
            case "Exhale":
                targetScale = 0.5;
                break;
            case "Hold":
                // Hold at the scale of the previous step
                targetScale = lastScale;
                break;
        }

        tl.to(meshRef.current.scale, {
            duration: step.duration,
            x: targetScale,
            y: targetScale,
            z: targetScale,
            ease: "power1.inOut",
            onStart: () => setLabel(step.label),
        });
        lastScale = targetScale;
    });

    tlRef.current = tl;

    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
      }
    };
  }, [pattern, setLabel]);

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
  pattern: BreathingPattern;
  setLabel: (label: string) => void;
  label: string;
}

export function BreathingCircle({ isRunning, pattern, setLabel, label }: BreathingCircleProps) {
  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
        <Canvas>
            <OrthographicCamera makeDefault zoom={150} position={[0, 0, 10]} />
            <BreathingAnimation isRunning={isRunning} setLabel={setLabel} pattern={pattern} />
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
