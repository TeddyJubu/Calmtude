
import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { BreathingPattern } from '@/lib/breathing';

interface BreathingAnimationProps {
  isRunning: boolean;
  setLabel: (label: string) => void;
  setCountdown: (countdown: string) => void;
  pattern: BreathingPattern;
}

const BreathingAnimation = ({ isRunning, setLabel, setCountdown, pattern }: BreathingAnimationProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const tlRef = useRef<gsap.core.Timeline>();
  const countdownIntervalRef = useRef<number | undefined>();

  const cleanupCountdown = useCallback(() => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = undefined;
    }
  }, []);

  // Setup GSAP timeline
  useEffect(() => {
    if (!meshRef.current || !pattern) return;

    if (tlRef.current) {
        tlRef.current.kill();
    }
    cleanupCountdown();

    const tl = gsap.timeline({
      repeat: -1,
      paused: true,
      onInterrupt: cleanupCountdown,
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
            onStart: () => {
                setLabel(step.label);
                cleanupCountdown();

                let remaining = Math.ceil(step.duration);
                setCountdown(String(remaining));

                countdownIntervalRef.current = window.setInterval(() => {
                    remaining -= 1;
                    if (remaining >= 0) {
                        setCountdown(String(remaining));
                    } else {
                        cleanupCountdown();
                    }
                }, 1000);
            },
        });
        lastScale = targetScale;
    });

    tlRef.current = tl;

    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
      }
      cleanupCountdown();
    };
  }, [pattern, setLabel, setCountdown, cleanupCountdown]);

  // Control animation playback
  useEffect(() => {
    const tl = tlRef.current;
    if (!tl || !meshRef.current) return;

    if (isRunning) {
      tl.play();
    } else {
      cleanupCountdown();
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
  }, [isRunning, setLabel, cleanupCountdown]);

  return (
    <>
      <ambientLight intensity={1.5} />
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#99CCFF"
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
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    if (!isRunning) {
      setCountdown('');
    }
  }, [isRunning]);

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
        <Canvas>
            <OrthographicCamera makeDefault zoom={150} position={[0, 0, 10]} />
            <BreathingAnimation isRunning={isRunning} setLabel={setLabel} pattern={pattern} setCountdown={setCountdown} />
        </Canvas>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-semibold text-gray-500/80 transition-opacity duration-500">
                {label}
            </span>
            {countdown && isRunning && (
              <span className="text-6xl font-bold text-gray-600/90 transition-opacity duration-500 mt-2 tabular-nums">
                {countdown}
              </span>
            )}
        </div>
      </div>
    </div>
  );
}
