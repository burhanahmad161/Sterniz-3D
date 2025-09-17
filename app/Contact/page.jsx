"use client";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function StarModel({ setZPosition }) {
  const { scene } = useGLTF("/models/stars.glb");
  const modelRef = useRef();

  useEffect(() => {
    if (!modelRef.current) return;
    const box = new THREE.Box3().setFromObject(modelRef.current);
    const center = box.getCenter(new THREE.Vector3());
    modelRef.current.position.sub(center);

    // Single GSAP timeline for smooth zoom and rotation transitions
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".main-content",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    tl.to(modelRef.current.position, {
      z: -30, // Start far out (star field overview)
      duration: 1,
      ease: "power2.inOut",
    })
      .to(modelRef.current.rotation, {
        y: 0, // Initial rotation
        duration: 1,
        ease: "power2.inOut",
      }, 0)
      .to(modelRef.current.position, {
        z: -22, // Gradual zoom for services
        duration: 1,
        ease: "power2.inOut",
      }, ">")
      .to(modelRef.current.rotation, {
        y: 0.2, // Subtle rotation for services
        duration: 1,
        ease: "power2.inOut",
      }, "<")
      .to(modelRef.current.position, {
        z: -14, // Further zoom for software solutions
        duration: 1,
        ease: "power2.inOut",
      }, ">")
      .to(modelRef.current.rotation, {
        y: 0.4, // Subtle rotation for software
        duration: 1,
        ease: "power2.inOut",
      }, "<")
      .to(modelRef.current.position, {
        z: -8, // Closest zoom for contact
        duration: 1,
        ease: "power2.inOut",
      }, ">")
      .to(modelRef.current.rotation, {
        y: 0.6, // Subtle rotation for contact
        duration: 1,
        ease: "power2.inOut",
      }, "<");

    // Handle service hotspot clicks to zoom and rotate to specific positions
    const handleServiceClick = (zValue, rotationY) => {
      gsap.to(modelRef.current.position, {
        z: zValue,
        duration: 1,
        ease: "power2.inOut",
      });
      gsap.to(modelRef.current.rotation, {
        y: rotationY,
        duration: 1,
        ease: "power2.inOut",
      });
    };
    // A slight rotation happening continuously
    // it is too quick and distracting
    gsap.to(modelRef.current.rotation, {
      y: "+=0.8",
      duration: 20,
      ease: "none",
      repeat: -1,
    });


    setZPosition.current = handleServiceClick;

    return () => {
      tl.kill();
    };
  }, [scene, setZPosition]);

  return <primitive ref={modelRef} object={scene} scale={1} />;
}

function CameraController({ cameraRef }) {
  const { camera } = useThree();

  useEffect(() => {
    if (!cameraRef.current) return;
    cameraRef.current = camera;
    console.log("Camera initialized:", camera);
  }, [camera, cameraRef]);

  return null;
}

export default function Contact() {
  const cameraRef = useRef();
  const [isMounted, setIsMounted] = useState(false);
  const setZPosition = useRef();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Hero text animation
    gsap.fromTo(
      ".hero-text",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: "power4.out",
      }
    );

    // Contact form and info animation
    gsap.fromTo(
      ".contact-heading, .contact-text, .contact-form, .social-icon",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  const handleServiceClick = (zValue, sectionId, rotationY) => {
    if (setZPosition.current) {
      setZPosition.current(zValue, rotationY);
    }
    gsap.to(window, {
      scrollTo: { y: `#${sectionId}`, offsetY: 50 },
      duration: 1,
      ease: "power2.inOut",
    });
  };

  return (
    <div className="w-full min-h-screen text-white font-sans main-content" style={{ textShadow: "0 0 2px rgba(0, 0, 0, 0.5)" }}>
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
          <StarModel setZPosition={setZPosition} />
          {isMounted && (
            <OrbitControls
              enableZoom={true}
              enableRotate={true}
              enablePan={true} // Enable panning for left/right/any direction movement
              target={[0, 0, 0]}
              minDistance={3}
              maxDistance={12}
            />
          )}
          <CameraController cameraRef={cameraRef} />
        </Canvas>
      </div>

      <div className="relative z-10">

        {/* Hero Section */}
        <section id="hero-section" className="hero-section min-h-screen flex flex-col items-center justify-center px-6">
          <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight">
            Living City Solutions
          </h1>
          <p className="hero-text mt-4 text-lg md:text-xl lg:text-2xl font-medium text-white">
            Connect with Us
          </p>
          <p className="hero-text mt-4 text-base md:text-lg lg:text-xl text-gray-200 max-w-2xl text-center">
            Reach out to explore our facility management and training solutions, tailored to your needs.
          </p>
          <div className="mt-8 flex space-x-4">
            <button
              onClick={() => handleServiceClick(-22, "services-section", 0.2)}
              className="service-tile px-6 py-3 text-white rounded-lg hover:text-gray-300 border border-gray-300 hover:border-gray-400 transition-colors duration-300 relative group"
            >
              Facility Services
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-900 bg-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Tech Yard, Campus, Control Center
              </span>
            </button>
            <button
              onClick={() => handleServiceClick(-14, "software-section", 0.4)}
              className="service-tile px-6 py-3 text-white rounded-lg hover:text-gray-300 border border-gray-300 hover:border-gray-400 transition-colors duration-300 relative group"
            >
              Software Solutions
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-900 bg-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Digital Hub
              </span>
            </button>
            <button
              onClick={() => handleServiceClick(-8, "academy-section", 0.6)}
              className="service-tile px-6 py-3 text-white rounded-lg hover:text-gray-300 border border-gray-300 hover:border-gray-400 transition-colors duration-300 relative group"
            >
              Academy
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-900 bg-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Training Center
              </span>
            </button>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact-section" className="contact-section min-h-screen flex flex-col items-center justify-center px-6 py-16">
          <h2 className="contact-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white">Let’s Connect</h2>
          <p className="contact-text mt-6 text-base md:text-lg lg:text-xl max-w-3xl text-center text-gray-200 leading-relaxed">
            Ready to bring your facility or training needs to life? Reach out to us or connect via social media.
          </p>
          <div className="contact-form mt-8 w-full max-w-md p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold text-white mb-4">Contact Us</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 border border-gray-300"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 border border-gray-300"
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full px-4 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 border border-gray-300"
              ></textarea>
              <button className="w-full px-4 py-2 text-white rounded-lg hover:text-gray-300 border border-gray-300 hover:border-gray-400 transition-colors duration-300">
                Send Message
              </button>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="contact-text text-gray-200">
              Email: <a href="#" className="text-white hover:text-gray-300 transition-colors duration-300">
                contact@livingcity.studio
              </a>
            </p>
            <p className="contact-text text-gray-200 mt-2">
              Phone: +1 (123) 456-7890
            </p>
            <div className="mt-4">
              <p className="contact-text text-gray-200">Our Location:</p>
              <div className="mt-2 w-full max-w-md h-48 rounded-lg flex items-center justify-center border border-gray-300">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509098!2d144.9537353153165!3d-37.81627997975157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11f5b5%3A0x5045675218ceed30!2sVictoria%20Harbour%2C%20Docklands%2C%20Melbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1616161616161!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
          <div className="mt-8 flex space-x-6">
            <a href="#" target="_blank" className="social-icon text-white hover:text-gray-300 transition-all duration-300 transform hover:scale-110">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
            <a href="#" target="_blank" className="social-icon text-white hover:text-gray-300 transition-all duration-300 transform hover:scale-110">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" target="_blank" className="social-icon text-white hover:text-gray-300 transition-all duration-300 transform hover:scale-110">
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