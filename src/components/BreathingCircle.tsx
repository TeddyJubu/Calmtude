
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, OrthographicCamera } from '@react-three/drei';
import { Water } from 'three/examples/jsm/objects/Water.js';
import * as THREE from 'three';
import gsap from 'gsap';

const waterNormalsUrl = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/textures/waternormals.jpg';

interface BreathingAnimationProps {
  isRunning: boolean;
  setLabel: (label: string) => void;
}

const BreathingAnimation = ({ isRunning, setLabel }: BreathingAnimationProps) => {
  const waterRef = useRef<Water>();

  useFrame((state, delta) => {
    if (waterRef.current) {
      // Animate the water ripples
      (waterRef.current.material as THREE.ShaderMaterial).uniforms.time.value += delta * 0.2;
    }
  });

  const waterNormals = useTexture(waterNormalsUrl);
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

  const sunDirection = useMemo(() => new THREE.Vector3(0, 10, 5).normalize(), []);
  
  const water = useMemo(() => {
    const geom = new THREE.CircleGeometry(1, 64);
    return new Water(geom, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection,
      sunColor: 0xffffff,
      waterColor: 0xebf2f7,
      distortionScale: 4.0,
      fog: false,
    });
  }, [waterNormals, sunDirection]);

  useEffect(() => {
    if (!waterRef.current) return;

    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      paused: true,
      onStart: () => setLabel("Inhale"),
      onUpdate: function() {
        if (this.reversed()) {
          setLabel("Exhale");
        } else {
          setLabel("Inhale");
        }
      }
    });

    gsap.set(waterRef.current.scale, { x: 0.7, y: 0.7, z: 0.7 });
    tl.to(waterRef.current.scale, {
      duration: 4,
      x: 1.0,
      y: 1.0,
      z: 1.0,
      ease: "power1.inOut",
    });

    if (isRunning) {
      tl.play();
    } else {
      tl.pause();
      // Animate back to initial state when stopped
      gsap.to(waterRef.current.scale, { duration: 0.5, x: 0.7, y: 0.7, z: 0.7, ease: "power1.inOut" });
      setLabel('Press Start');
    }

    return () => {
      tl.kill(); // Clean up the animation timeline
    };
  }, [isRunning, setLabel, water]);

  return (
    <>
      <directionalLight position={[0, 10, 5]} intensity={0.6} />
      <primitive
        ref={waterRef}
        object={water}
        rotation-x={-Math.PI / 2}
      />
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
      <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden bg-white shadow-inner">
        <Canvas>
            <OrthographicCamera makeDefault zoom={250} position={[0, 10, 0]} />
            <ambientLight intensity={0.8} />
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
