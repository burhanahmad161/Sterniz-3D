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
      }, "<");

    const handleSectionClick = (zValue, rotationY) => {
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

    setZPosition.current = handleSectionClick;

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

export default function SubcompanyManagement() {
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
      ".governance-card",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".governance-section",
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".subcompany-card",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".subcompany-directory",
          start: "top 85%",
        },
      }
    );

    gsap.fromTo(
      ".leadership-section",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".leadership-section",
          start: "top 85%",
        },
      }
    );

    gsap.fromTo(
      ".resource-card",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".resources-section",
          start: "top 85%",
        },
      }
    );

    gsap.fromTo(
      ".success-story",
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".success-stories",
          start: "top 85%",
        },
      }
    );
  }, []);

  const handleSectionClick = (zValue, sectionId, rotationY) => {
    if (setZPosition.current) {
      setZPosition.current(zValue, rotationY);
    }
    gsap.to(window, {
      scrollTo: { y: `#${sectionId}`, offsetY: 50 },
      duration: 1,
      ease: "power2.inOut",
    });
  };

  const subcompanies = [
    {
      id: "subcompany-a",
      name: "SecuTech Solutions",
      specialization: "Security Solutions",
      region: "Europe & Middle East",
      employees: "8,500+",
      highlights: [
        "Market leader in risk management",
        "Certified by ISO 9001 & 14001",
        "Provides integrated security + FM solutions",
      ],
    },
    {
      id: "subcompany-b",
      name: "GreenFM Services",
      specialization: "Facility Management",
      region: "Nordic Countries",
      employees: "5,000+",
      highlights: [
        "Leader in sustainable FM practices",
        "Specialized in energy-efficient solutions",
        "Serving commercial and public sectors",
      ],
    },
    {
      id: "subcompany-c",
      name: "SmartTech Software",
      specialization: "Software Solutions",
      region: "Global",
      employees: "2,000+",
      highlights: [
        "Innovative IoT and workflow platforms",
        "Global client base in FM and security",
        "Customizable digital reporting tools",
      ],
    },
  ];

  const subcompanyProfile = {
    id: "subcompany-a-profile",
    name: "SecuTech Solutions",
    about: "Founded in 2005, SecuTech Solutions is a leader in security and integrated facility management across Europe and the Middle East, delivering tailored safety solutions.",
    leadership: [
      { name: "Anna Schmidt", role: "Managing Director" },
      { name: "Markus Weber", role: "Head of Security Operations" },
    ],
    keyServices: ["On-site Security", "CCTV & Surveillance", "Integrated FM Solutions"],
    keyClients: [
      "Secured a major airport, reducing incidents by 20%.",
      "Partnered with a global retailer for comprehensive security.",
    ],
    performance: {
      revenue: "€150M+",
      employees: "8,500+",
      activeProjects: "200+",
      sustainabilityScore: "A+",
    },
  };

  const successStories = [
    {
      quote: "Our European FM division collaborated with our Security branch in Dubai to deliver integrated workplace safety for a global tech campus.",
      author: "Global Operations Team",
    },
    {
      quote: "Our Cleaning subcompany adopted sustainability practices from our Nordic branch — reducing waste by 35%.",
      author: "Sustainability Director",
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
        <section id="hero" className="hero-section min-h-screen flex flex-col items-center justify-center px-6 py-16">
          <h1 className="hero-text text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight text-center">
            One Vision, Many Strong Subcompanies
          </h1>
          <p className="hero-text mt-4 text-lg md:text-xl lg:text-2xl font-medium text-gray-200 text-center">
            United under one purpose, each subcompany brings expertise to build safer, smarter, and sustainable environments.
          </p>
          <button
            onClick={() => handleSectionClick(-22, "subcompany-directory", 0.2)}
            className="mt-8 px-6 py-3 text-white rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-800/50 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Explore Our Subcompanies
          </button>
        </section>

        {/* Governance & Oversight */}
        <section id="governance" className="governance-section py-16 px-6 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-center">
            Governance & Oversight
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl text-center mb-12">
            Our management model ensures alignment and excellence across all subcompanies.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl w-full">
            {[
              {
                title: "Centralized Vision",
                desc: "Global policies, values, and quality standards come from HQ.",
                icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z",
              },
              {
                title: "Local Execution",
                desc: "Each subcompany adapts services for its region/market.",
                icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-14h2v6h4v2h-6V6z",
              },
              {
                title: "Leadership Alignment",
                desc: "Shared reporting system ensures collaboration and accountability.",
                icon: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-2.99 1.34-2.99 3S14.34 11 16 11zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5.01 6.34 5.01 8 6.34 11 8 11zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05.02.01.05.03.08.04 2.33.66 4.89 2.46 4.89 3.41V19h-14v-2.5c0-2.33 4.67-3.5 7-3.5 2.33 0 7 1.17 7 3.5V19h-2v-2.5c0-.95-2.56-2.75-4.89-3.41-.03-.01-.06-.03-.08-.04-.35-.03-.68-.05-.97-.05z",
              },
              {
                title: "Innovation Sharing",
                desc: "Best practices and technology are exchanged across the group.",
                icon: "M12 2a10 10 0 00-7.35 3.56l1.42 1.42A8 8 0 0120 12H4v2h16v-2c0-3.31-2.69-6-6-6h-2V4h4c1.1 0 2-.9 2-2z",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="governance-card p-6 rounded-xl border border-gray-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <svg className="w-8 h-8 text-gray-300 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d={item.icon} />
                </svg>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 max-w-4xl w-full">
            <h4 className="text-lg font-semibold text-white mb-4 text-center">Our Management Flow</h4>
            <div className="flex flex-col items-center text-gray-300">
              <div className="p-4 rounded-lg border border-gray-600 mb-4">HQ (Policies & Standards)</div>
              <svg className="w-6 h-6 text-gray-300 mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="p-4 rounded-lg border border-gray-600 flex-1 text-center">Regional Hubs</div>
                <div className="p-4 rounded-lg border border-gray-600 flex-1 text-center">Regional Hubs</div>
              </div>
              <svg className="w-6 h-6 text-gray-300 mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <div className="p-4 rounded-lg border border-gray-600">Local Subcompanies</div>
            </div>
          </div>
        </section>

        {/* Subcompany Directory */}
        <section id="subcompany-directory" className="subcompany-directory py-16 px-6 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-center">
            Subcompany Directory
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl text-center mb-12">
            Explore our diverse subcompanies, each delivering specialized expertise across the globe.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl w-full">
            {subcompanies.map((subcompany) => (
              <div
                key={subcompany.id}
                className="subcompany-card p-6 rounded-xl border border-gray-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-white mb-4">{subcompany.name}</h3>
                <p className="text-gray-300 mb-2">Specialization: {subcompany.specialization}</p>
                <p className="text-gray-300 mb-2">Region: {subcompany.region}</p>
                <p className="text-gray-300 mb-4">Employees: {subcompany.employees}</p>
                <ul className="text-gray-300 space-y-2 mb-6">
                  {subcompany.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-blue-400 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {highlight}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleSectionClick(-22, "subcompany-profile", 0.2)}
                  className="px-6 py-3 text-white rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-800/50 transition-all duration-300"
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Subcompany Profile (Sample) */}
        <section id="subcompany-profile" className="py-16 px-6 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-center">
            Subcompany Profile Example
          </h2>
          <div className="flex flex-col max-w-4xl w-full p-8 rounded-xl border border-gray-700 shadow-lg">
            <h3 className="text-2xl font-semibold text-white mb-4">{subcompanyProfile.name}</h3>
            <p className="text-gray-300 mb-6">{subcompanyProfile.about}</p>
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-white mb-4">Leadership Team</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subcompanyProfile.leadership.map((leader, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-600"></div>
                    <div>
                      <p className="text-gray-200 font-semibold">{leader.name}</p>
                      <p className="text-gray-300">{leader.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-white mb-4">Key Services</h4>
              <ul className="text-gray-300 space-y-2">
                {subcompanyProfile.keyServices.map((service, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-blue-400 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {service}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-white mb-4">Key Clients/Projects</h4>
              <ul className="text-gray-300 space-y-2">
                {subcompanyProfile.keyClients.map((client, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-blue-400 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {client}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-white mb-4">Performance Snapshot</h4>
              <p className="text-gray-300">Revenue: {subcompanyProfile.performance.revenue}</p>
              <p className="text-gray-300">Employees: {subcompanyProfile.performance.employees}</p>
              <p className="text-gray-300">Active Projects: {subcompanyProfile.performance.activeProjects}</p>
              <p className="text-gray-300">Sustainability Score: {subcompanyProfile.performance.sustainabilityScore}</p>
            </div>
            <button
              onClick={() => handleSectionClick(-22, "subcompany-profile", 0.2)}
              className="px-6 py-3 text-white rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-800/50 transition-all duration-300"
            >
              Visit Subcompany Website
            </button>
          </div>
        </section>

        {/* Leadership & Reporting Structure */}
        <section id="leadership" className="leadership-section py-16 px-6 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-center">
            Leadership & Reporting Structure
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl text-center mb-12">
            Our leadership ensures alignment and drives excellence across all subcompanies.
          </p>
          <div className="flex flex-col items-center text-gray-300 max-w-4xl w-full">
            <div className="p-4 rounded-lg border border-gray-600 mb-4">HQ Board & Group CEO</div>
            <svg className="w-6 h-6 text-gray-300 mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="p-4 rounded-lg border border-gray-600 flex-1 text-center">Regional CEOs</div>
              <div className="p-4 rounded-lg border border-gray-600 flex-1 text-center">Regional CEOs</div>
            </div>
            <svg className="w-6 h-6 text-gray-300 mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <div className="p-4 rounded-lg border border-gray-600">Subcompany Managing Directors</div>
          </div>
          <button
            onClick={() => handleSectionClick(-22, "leadership", 0.2)}
            className="mt-8 px-6 py-3 text-white rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-800/50 transition-all duration-300"
          >
            Meet Our Leadership
          </button>
        </section>

        {/* Shared Resources & Academy */}
        <section id="resources" className="resources-section py-16 px-6 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-center">
            Shared Resources & Academy
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl text-center mb-12">
            Our subcompanies benefit from shared resources, fostering collaboration and innovation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl w-full">
            {[
              {
                title: "Academy Training",
                desc: "Access to certified training programs for professional growth.",
                icon: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z",
              },
              {
                title: "Shared HR & Talent",
                desc: "Centralized talent pools for seamless hiring and mobility.",
                icon: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-2.99 1.34-2.99 3S14.34 11 16 11zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5.01 6.34 5.01 8 6.34 11 8 11zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05.02.01.05.03.08.04 2.33.66 4.89 2.46 4.89 3.41V19h-14v-2.5c0-2.33 4.67-3.5 7-3.5 2.33 0 7 1.17 7 3.5V19h-2v-2.5c0-.95-2.56-2.75-4.89-3.41-.03-.01-.06-.03-.08-.04-.35-.03-.68-.05-.97-.05z",
              },
              {
                title: "Centralized Procurement",
                desc: "Shared vendor network for cost-effective solutions.",
                icon: "M20 6h-3V4a2 2 0 00-2-2H9a2 2 0 00-2 2v2H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2zM9 4h6v2H9V4zm11 16H4V8h16v12z",
              },
              {
                title: "Shared Tech Platforms",
                desc: "IoT, Smart FM, and security software for all subcompanies.",
                icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14h-2v6h4v2H10V6H8v10h6v-2h2V6h-2z",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="resource-card p-6 rounded-xl border border-gray-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <svg className="w-8 h-8 text-gray-300 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d={item.icon} />
                </svg>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Success Stories */}
        <section id="success-stories" className="success-stories py-16 px-6 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-center">
            Success Stories
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl text-center mb-12">
            See how our subcompanies collaborate to deliver exceptional results worldwide.
          </p>
          <div className="flex flex-col gap-6 max-w-4xl w-full">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="success-story p-6 rounded-xl border border-gray-700 shadow-lg"
              >
                <p className="text-gray-300 italic">“{story.quote}”</p>
                <p className="text-gray-200 font-semibold mt-2">{story.author}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section id="cta" className="py-16 px-6 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-center">
            Stronger Together, Smarter Tomorrow
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl text-center mb-8">
            Discover how our subcompanies deliver excellence worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleSectionClick(-22, "subcompany-directory", 0.2)}
              className="px-6 py-3 text-white rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-800/50 transition-all duration-300"
            >
              Explore Our Subcompanies
            </button>
            <button
              onClick={() => handleSectionClick(-30, "hero", 0)}
              className="px-6 py-3 text-white rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-800/50 transition-all duration-300"
            >
              Contact Group Management
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}