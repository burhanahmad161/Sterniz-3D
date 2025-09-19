"use client";
import { Canvas, useThree } from "@react-three/fiber";
import React from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
import { FaCog, FaBuilding, FaShieldAlt, FaLightbulb, FaCode } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function StarModel({ setZPosition }) {
  const { scene } = useGLTF("/models/stars.glb");
  const modelRef = useRef();

  useEffect(() => {
    if (!modelRef.current) return;
    const box = new THREE.Box3().setFromObject(modelRef.current);
    const center = box.getCenter(new THREE.Vector3());
    modelRef.current.position.sub(center);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".main-content",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    tl.to(modelRef.current.position, {
      z: -30,
      duration: 1,
      ease: "power2.inOut",
    })
      .to(modelRef.current.rotation, {
        y: 0,
        duration: 1,
        ease: "power2.inOut",
      }, 0)
      .to(modelRef.current.position, {
        z: -22,
        duration: 1,
        ease: "power2.inOut",
      }, ">")
      .to(modelRef.current.rotation, {
        y: 0.2,
        duration: 1,
        ease: "power2.inOut",
      }, "<")
      .to(modelRef.current.position, {
        z: -14,
        duration: 1,
        ease: "power2.inOut",
      }, ">")
      .to(modelRef.current.rotation, {
        y: 0.4,
        duration: 1,
        ease: "power2.inOut",
      }, "<")
      .to(modelRef.current.position, {
        z: -8,
        duration: 1,
        ease: "power2.inOut",
      }, ">")
      .to(modelRef.current.rotation, {
        y: 0.6,
        duration: 1,
        ease: "power2.inOut",
      }, "<");

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

    gsap.to(modelRef.current.rotation, {
      y: "+=1.2",
      duration: 60,
      ease: "none",
      repeat: -1,
    });

    if (modelRef.current.children.length > 0) {
      const stars = modelRef.current.children.find(child => child.name.includes('star') || child.isMesh);
      if (stars && stars.material) {
        gsap.to(stars.material.emissive, {
          intensity: 0.5,
          duration: 3,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }
    }

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

export default function Services() {
  const cameraRef = useRef();
  const [isMounted, setIsMounted] = useState(false);
  const setZPosition = useRef();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".hero-text",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      ".service-tile",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".sub-service-card",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-section",
          start: "top 85%",
        },
      }
    );

    gsap.fromTo(
      ".faq-item",
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".faq-section",
          start: "top 85%",
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

  const servicesData = [
    {
      id: "tfm",
      title: "Technical Facility Management",
      description: "Our TFM services ensure your technical systems operate at peak performance, minimizing downtime and maximizing efficiency.",
      process: ["Assess system needs", "Implement maintenance plans", "Monitor and optimize"],
      benefits: [
        "Reduced operational downtime",
        "Enhanced system longevity",
        "Energy cost savings",
        "Compliance with safety regulations",
      ],
      reference: "Optimized HVAC systems for a major tech campus, reducing energy costs by 25%.",
      faqs: [
        { q: "What systems do you manage?", a: "We handle HVAC, elevators, electrical systems, and more." },
        { q: "How do you ensure compliance?", a: "Regular inspections and adherence to standards like DGUV V3." },
        { q: "Can you modernize old systems?", a: "Yes, we specialize in system upgrades and retrofits." },
      ],
      cta: "Request Consultation",
      zValue: -22,
      rotationY: 0.2,
      icon: FaCog,
    },
    {
      id: "ifm",
      title: "Infrastructural Facility Management",
      description: "From cleaning to logistics, our IFM services keep your facilities pristine and operational.",
      process: ["Site assessment", "Service scheduling", "Quality assurance"],
      benefits: [
        "Impeccable facility cleanliness",
        "Streamlined logistics",
        "Enhanced occupant experience",
        "Cost-effective operations",
      ],
      reference: "Transformed a corporate campus with tailored cleaning and logistics, improving employee satisfaction by 30%.",
      faqs: [
        { q: "What cleaning services are included?", a: "General, glass, facade, and specialized hygiene cleaning." },
        { q: "Do you offer catering?", a: "Yes, we provide catering and conference services." },
        { q: "How do you handle waste?", a: "We manage waste disposal and recycling sustainably." },
      ],
      cta: "Configure Service",
      zValue: -22,
      rotationY: 0.2,
      icon: FaBuilding,
    },
    {
      id: "security",
      title: "Security Services",
      description: "Our comprehensive security solutions protect your assets and people with cutting-edge technology and trained professionals.",
      process: ["Risk assessment", "Security deployment", "Continuous monitoring"],
      benefits: [
        "Robust asset protection",
        "Rapid alarm response",
        "Advanced CCTV integration",
        "Tailored security strategies",
      ],
      reference: "Secured a major event with 10,000 attendees, ensuring zero incidents through vigilant monitoring.",
      faqs: [
        { q: "What types of security do you offer?", a: "Manned guarding, CCTV, access control, and event security." },
        { q: "How do you handle emergencies?", a: "Our 24/7 control center ensures rapid response." },
        { q: "Do you provide fire safety?", a: "Yes, including drills and fire protection services." },
      ],
      cta: "Request Consultation",
      zValue: -22,
      rotationY: 0.2,
      icon: FaShieldAlt,
    },
    {
      id: "consulting",
      title: "FM Consulting & Project Management",
      description: "We provide expert guidance to optimize your facility operations and implement cutting-edge solutions.",
      process: ["Needs analysis", "Strategy development", "Project execution"],
      benefits: [
        "Optimized processes",
        "Seamless CAFM integration",
        "Cost-effective project delivery",
        "Expert technical advice",
      ],
      reference: "Streamlined operations for a global retailer, reducing costs by 15% through CAFM implementation.",
      faqs: [
        { q: "What is CAFM?", a: "Computer-Aided Facility Management software for streamlined operations." },
        { q: "Do you offer ongoing support?", a: "Yes, we provide continuous consulting and support." },
        { q: "Can you manage large projects?", a: "Absolutely, from planning to execution." },
      ],
      cta: "Request Consultation",
      zValue: -22,
      rotationY: 0.2,
      icon: FaLightbulb,
    },
    {
      id: "software",
      title: "Software Solutions",
      description: "Our Digital Hub offers innovative software to streamline workflows, enhance security, and boost efficiency.",
      process: ["Requirement analysis", "Solution deployment", "User training"],
      benefits: [
        "Automated workflows",
        "Real-time analytics",
        "Mobile accessibility",
        "Scalable solutions",
      ],
      reference: "Implemented Shift-Tracker for a logistics firm, improving shift management efficiency by 40%.",
      faqs: [
        { q: "What software do you offer?", a: "ID management, guard automation, analytics, and more." },
        { q: "Is it mobile-friendly?", a: "Yes, our mobile app supports shifts and tasks." },
        { q: "Can it integrate with existing systems?", a: "Our solutions are designed for seamless integration." },
      ],
      cta: "Request a Demo",
      zValue: -14,
      rotationY: 0.4,
      icon: FaCode,
    },
  ];

  return (
    <div className="w-full text-white font-sans main-content">
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          opacity: 0.8,
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
              enablePan={true}
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
        <section id="hero-section" className="hero-section min-h-screen flex flex-col items-center justify-center px-6 py-16">
          <h1 className="hero-text text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
            Our Services
          </h1>
          <p className="hero-text mt-4 text-lg md:text-xl lg:text-2xl font-medium text-gray-100 text-center">
            Transforming Spaces, Empowering Futures
          </p>
          <p className="hero-text mt-4 text-base md:text-lg text-gray-200 max-w-3xl text-center">
            Discover our comprehensive facility management and software solutions, designed to create efficient, secure, and sustainable environments.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <button
              onClick={() => handleServiceClick(-22, "facility-services", 0.2)}
              className="service-tile px-8 py-3 text-blue-200 rounded-lg border border-blue-300 hover:border-blue-400 hover:bg-blue-900/30 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Facility Services
            </button>
            <button
              onClick={() => handleServiceClick(-14, "software-solutions", 0.4)}
              className="service-tile px-8 py-3 text-purple-200 rounded-lg border border-purple-300 hover:border-purple-400 hover:bg-purple-900/30 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Software Solutions
            </button>
          </div>
          <button
            onClick={() => handleServiceClick(-30, "hero-section", 0)}
            className="mt-6 px-6 py-2 text-gray-200 rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-800/30 transition-all duration-300"
          >
            Back to City
          </button>
        </section>

        {/* Facility Services Section */}
        <section id="facility-services" className="services-section py-16 px-6 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-500">
            Facility Services
          </h2>
          <p className="text-base md:text-lg text-gray-200 max-w-3xl text-center mb-12">
            Our facility services create vibrant, efficient spaces through technical expertise, infrastructural excellence, robust security, and strategic consulting.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full">
            {servicesData.slice(0, 4).map((service) => (
              <div
                key={service.id}
                id={service.id}
                className="sub-service-card flex flex-col p-8 rounded-xl border border-blue-600/50 shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <service.icon className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300 mb-6">{service.description}</p>

                {/* Process */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white mb-4">Our Process</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {service.process.map((step, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 flex flex-col items-center text-center"
                      >
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mb-2">
                          {index + 1}
                        </div>
                        <p className="text-gray-300">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white mb-4">Benefits</h4>
                  <ul className="text-gray-300 space-y-2">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-blue-400 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <button
                  onClick={() => handleServiceClick(service.zValue, service.id, service.rotationY)}
                  className="px-6 py-3 text-blue-200 rounded-lg border border-blue-300 hover:border-blue-400 hover:bg-blue-900/30 transition-all duration-300 self-start shadow-md hover:shadow-lg"
                >
                  {service.cta}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Software Solutions Section */}
        <section id="software-solutions" className="services-section py-16 px-6 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-purple-500">
            Software Solutions
          </h2>
          <p className="text-base md:text-lg text-gray-200 max-w-3xl text-center mb-12">
            Our Digital Hub delivers innovative software to streamline operations, enhance security, and provide actionable insights through advanced analytics.
          </p>
          <div className="flex flex-col gap-12 max-w-4xl w-full">
            <div
              id={servicesData[4].id}
              className="sub-service-card flex flex-col p-8 rounded-xl border border-purple-600/50 shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {React.createElement(servicesData[4].icon, { className: "w-12 h-12 text-purple-400 mb-4" })}
              <h3 className="text-2xl font-semibold text-white mb-4">{servicesData[4].title}</h3>
              <p className="text-gray-300 mb-6">{servicesData[4].description}</p>

              {/* Process */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4">Our Process</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {servicesData[4].process.map((step, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 flex flex-col items-center text-center"
                    >
                      <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold mb-2">
                        {index + 1}
                      </div>
                      <p className="text-gray-300">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4">Benefits</h4>
                <ul className="text-gray-300 space-y-2">
                  {servicesData[4].benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-purple-400 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <button
                onClick={() => handleServiceClick(servicesData[4].zValue, servicesData[4].id, servicesData[4].rotationY)}
                className="px-6 py-3 text-purple-200 rounded-lg border border-purple-300 hover:border-purple-400 hover:bg-purple-900/30 transition-all duration-300 self-start shadow-md hover:shadow-lg"
              >
                {servicesData[4].cta}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}