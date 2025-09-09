"use client";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function WarehouseModel() {
  const { scene } = useGLTF("/models/warehouse.glb");
  const modelRef = useRef();

  useEffect(() => {
    if (!modelRef.current) return;
    const box = new THREE.Box3().setFromObject(modelRef.current);
    const center = box.getCenter(new THREE.Vector3());
    modelRef.current.position.sub(center);

    // Inward zoom-in animation when scrolling down, zoom-out when scrolling up
    gsap.to(modelRef.current.scale, {
      x: 18, // Higher scale for dramatic inward zoom
      y: 12,
      z: 15,
      ease: "power2.inOut", // Smooth easing for immersive effect
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top center", // Start when top of hero section hits viewport center
        end: "bottom+=40% top", // Shorter duration for focused zoom
        scrub: 0.15, // Faster scrub for responsive inward motion
        yoyo: true, // Reverses for zoom-out
      },
    });
    gsap.to(modelRef.current.position, {
      x: 8, // Centered position for strong inward effect
      y: -5, // Slight downward shift for perspective
      z: 0,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".about-section",
        start: "top center",
        end: "bottom+=40% top",
        scrub: 0.15,
        yoyo: true,
      },
    });
    gsap.to(modelRef.current.rotation, {
      x: 7, // Level rotation for focused view
      y: 8,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".projects-section",
        start: "top center",
        end: "bottom+=40% top",
        scrub: 0.15,
        yoyo: true,
      },
    });
    gsap.to(modelRef.current.rotation, {
      x: 0, // Reset X rotation
      y: 15, // Reset Y rotation
      z: 0, // Reset Z rotation
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top center",
        end: "bottom+=40% top",
        scrub: 0.15,
        yoyo: true,
      },
    });
  }, [scene]);

  return <primitive ref={modelRef} object={scene} scale={.4} />;
}

function CameraController({ cameraRef }) {
  const { camera } = useThree();

  useEffect(() => {
    if (!cameraRef.current) return;
    cameraRef.current = camera;

    // Inward zoom-in with camera moving closer to model center
    gsap.to(camera.position, {
      x: 1, // Tight orbit for centered focus
      y: 4, // Slight upward tilt
      z: 0.1, // Very close to model for strong inward effect
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top center", // Align with model animation
        end: "bottom+=40% top", // Shorter duration
        scrub: 0.05, // Faster scrub for responsive motion
        yoyo: true, // Reverses for zoom-out
      },
    });
    gsap.to(camera.position, {
      x: 8, // Centered position for strong inward effect
      y: 8, // Slight upward tilt for perspective
      z: 8,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".about-section",
        start: "top center",
        end: "bottom+=40% top",
        scrub: 0.05,
        yoyo: true,
      },
    });

    // Subtle camera rotation for dynamic effect
    gsap.to(camera.rotation, {
      y: "+=0.15", // Minimal rotation to emphasize inward zoom
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      duration: 2.5,
    });
  }, [camera, cameraRef]);

  return null;
}

export default function Home() {
  const cameraRef = useRef();
  const [isMounted, setIsMounted] = useState(false);

  // Ensure we're on the client side before rendering 3D controls
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Hero Animation with pulse effect
    gsap.fromTo(
      ".hero-text",
      { opacity: 0, y: 50, scale: 1.2 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        stagger: 0.3,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
    gsap.to(".hero-text", {
      scale: 1.05,
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: "sine.inOut",
    });

    // About Animation with slide-up
    gsap.fromTo(
      ".about-heading",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
    gsap.fromTo(
      ".about-text",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Projects Animation with staggered card entry
    gsap.fromTo(
      ".project-card",
      { opacity: 0, y: 60, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.3,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".projects-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Contact Animation with bounce effect for icons
    gsap.fromTo(
      ".contact-heading",
      { opacity: 0, scale: 1.3 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "elastic.out(1, 0.7)",
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
    gsap.fromTo(
      ".contact-text",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
    gsap.fromTo(
      ".social-icon",
      { opacity: 0, scale: 0, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "bounce.out",
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div className="w-full min-h-screen text-white font-sans bg-gradient-to-b from-gray-900/90 to-transparent">
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      >
        <Canvas style={{ pointerEvents: "none" }}>
          <perspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[8, 8, 8]}
            fov={50}
          />
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <WarehouseModel />
          {isMounted && (
            <OrbitControls
              enableZoom={true}
              enableRotate={true}
              target={[0, 0, 0]}
              minDistance={3}
              maxDistance={12}
            />
          )}
          <CameraController cameraRef={cameraRef} />
        </Canvas>
      </div>

      <div className="relative z-10 ">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6">
          <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 tracking-tight">
            Sterniz Studio
          </h1>
          <p className="hero-text mt-4 text-lg md:text-xl lg:text-2xl font-medium text-gray-200">
            Innovate. Create. Celebrate.
          </p>
          <p className="hero-text mt-4 text-base md:text-lg lg:text-xl text-gray-400 max-w-2xl text-center">
            We blend cutting-edge 3D artistry with web development to craft unforgettable digital experiences.
          </p>
        </section>

        {/* About Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-16 ">
          <h2 className="about-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white">Who We Are</h2>
          <p className="about-text mt-6 text-base md:text-lg lg:text-xl max-w-3xl text-center text-gray-300 leading-relaxed">
            At Sterniz Studio, we’re a team of passionate 3D artists and developers with over 5 years of experience. Specializing in Blender, Three.js, and React, we create immersive visualizations and interactive web experiences that push boundaries. Based in Your City, we’re here to turn your vision into reality—let’s create something extraordinary together!
          </p>
        </section>

        {/* Projects Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">Our Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mt-8">
            <div className="project-card bg-gray-800/40 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-rotate-1">
              <h3 className="text-2xl font-semibold text-cyan-400">Cyber Metropolis</h3>
              <p className="mt-3 text-gray-300 text-base">
                A stunning 3D cityscape rendered in Blender, brought to life with Three.js. Features dynamic lighting, real-time day-night cycles, and interactive elements for an immersive urban experience.
              </p>
              <a
                href="#"
                target="_blank"
                className="mt-4 inline-block text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
              >
                Explore on GitHub
              </a>
            </div>
            <div className="project-card bg-gray-800/40 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:rotate-1">
              <h3 className="text-2xl font-semibold text-cyan-400">Virtual Art Gallery</h3>
              <p className="mt-3 text-gray-300 text-base">
                A React-powered WebGL application showcasing a 3D virtual gallery. Users can navigate art exhibits with smooth controls and real-time rendering, built with Three.js and GSAP.
              </p>
              <a
                href="#"
                target="_blank"
                className="mt-4 inline-block text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
              >
                Explore on GitHub
              </a>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-16 ">
          <h2 className="contact-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white">Let’s Connect</h2>
          <p className="contact-text mt-6 text-base md:text-lg lg:text-xl max-w-3xl text-center text-white leading-relaxed">
            Ready to bring your ideas to life? Contact us at{" "}
            <a
              href="#"
              className="text-red-700 hover:text-red-400 transition-colors duration-300"
            >
              contact@sterniz.studio
            </a>{" "}
            or connect with us on social media:
          </p>
          <div className="mt-8 flex space-x-6">
            <a
              href="#"
              target="_blank"
              className="social-icon text-white hover:text-cyan-400 transition-all duration-300 transform hover:scale-110"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
            <a
              href="#"
              target="_blank"
              className="social-icon text-white hover:text-cyan-400 transition-all duration-300 transform hover:scale-110"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="#"
              target="_blank"
              className="social-icon text-white hover:text-cyan-400 transition-all duration-300 transform hover:scale-110"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.28 1.08 2.84.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.26.1-2.63 0 0 .84-.27 2.75 1.03A9.58 9.58 0 0 1 12 6.8c.85 0 1.71.11 2.52.33 1.91-1.3 2.75-1.03 2.75-1.03.55 1.37.2 2.38.1 2.63.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.56.94.56 1.55v2.3c0 .27.16.58.67.5A10 10 0 0 0 22 12 10 10 0 0 0 12 2z" />
              </svg>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
