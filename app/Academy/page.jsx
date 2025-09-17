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

export default function Academy() {
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
      ".course-card",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".course-worlds",
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".filter-section",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".filter-section",
          start: "top 85%",
        },
      }
    );

    gsap.fromTo(
      ".course-listing",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".course-listing",
          start: "top 85%",
        },
      }
    );

    gsap.fromTo(
      ".trust-section",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".trust-section",
          start: "top 85%",
        },
      }
    );

    gsap.fromTo(
      ".testimonial",
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".testimonials",
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

  const courseWorlds = [
    {
      id: "security",
      title: "Security Training",
      description: "Prepare for the frontline. Protect people, assets, and operations with confidence.",
      details: "Guarding, fire protection, evacuation drills, compliance & legal basics.",
      accentColor: "border-blue-500 text-blue-400",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
        </svg>
      ),
      zValue: -22,
      rotationY: 0.2,
    },
    {
      id: "technical",
      title: "Technical / TFM",
      description: "Keep buildings running. Learn the systems that power our living city.",
      details: "Plant operation, system maintenance, energy optimization.",
      accentColor: "border-green-500 text-green-400",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.06-.94l2.03-1.58a.5.5 0 00.06-.69l-2-3.46a.5.5 0 00-.61-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.5.5 0 00-.5-.45h-4a.5.5 0 00-.5.45l-.36 2.54c-.59.24-1.13.56-1.62.94l-2.39-.96a.5.5 0 00-.61.22l-2 3.46a.5.5 0 00.06.69l2.03 1.58c-.04.3-.06.64-.06.94s.02.64.06.94l-2.03 1.58a.5.5 0 00-.06.69l2 3.46a.5.5 0 00.61.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54a.5.5 0 00.5.45h4a.5.5 0 00.5-.45l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96a.5.5 0 00.61-.22l2-3.46a.5.5 0 00-.06-.69l-2.03-1.58zM12 15.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z" />
        </svg>
      ),
      zValue: -22,
      rotationY: 0.2,
    },
    {
      id: "cleaning",
      title: "Cleaning / IFM",
      description: "Create safe, hygienic, and welcoming environments.",
      details: "General cleaning, glass/facade care, hygiene standards.",
      accentColor: "border-yellow-500 text-yellow-400",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 6h-3V4a2 2 0 00-2-2H9a2 2 0 00-2 2v2H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2zM9 4h6v2H9V4zm11 16H4V8h16v12z" />
        </svg>
      ),
      zValue: -22,
      rotationY: 0.2,
    },
    {
      id: "soft-skills",
      title: "Soft Skills",
      description: "Elevate service with empathy, clarity, and professionalism.",
      details: "Communication, customer service, service excellence.",
      accentColor: "border-red-500 text-red-400",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
        </svg>
      ),
      zValue: -22,
      rotationY: 0.2,
    },
    {
      id: "software",
      title: "Software / IT",
      description: "Master the digital side of facility management.",
      details: "Apps, workflow tools, digital reporting.",
      accentColor: "border-purple-500 text-purple-400",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
      ),
      zValue: -14,
      rotationY: 0.4,
    },
  ];

  const courses = [
    {
      id: "fire-protection",
      world: "security",
      title: "Certified Fire Protection Officer",
      description: "Gain the skills to manage fire safety, evacuation drills, and compliance obligations effectively.",
      duration: "2 days",
      price: "€450",
      level: "Intermediate",
      learningGoals: [
        "Understand fire protection systems",
        "Lead evacuation procedures",
        "Ensure compliance with local laws",
      ],
      trainer: {
        name: "Anna Schmidt",
        bio: "Certified fire safety expert with 10+ years in security training.",
      },
      format: "Classroom + practical simulation",
      certificate: "Yes",
    },
    {
      id: "energy-optimization",
      world: "technical",
      title: "Energy Optimization for TFM",
      description: "Learn to optimize energy systems for efficiency and sustainability in facility management.",
      duration: "3 days",
      price: "€600",
      level: "Advanced",
      learningGoals: [
        "Analyze energy consumption",
        "Implement optimization strategies",
        "Monitor system performance",
      ],
      trainer: {
        name: "Markus Weber",
        bio: "Technical facility expert with 15 years in energy management.",
      },
      format: "Hybrid",
      certificate: "Yes",
    },
    {
      id: "hygiene-standards",
      world: "cleaning",
      title: "Hygiene Standards in IFM",
      description: "Master cleaning techniques and hygiene standards for safe environments.",
      duration: "1 day",
      price: "€250",
      level: "Beginner",
      learningGoals: [
        "Apply hygiene protocols",
        "Manage cleaning schedules",
        "Ensure regulatory compliance",
      ],
      trainer: {
        name: "Clara Müller",
        bio: "Specialist in infrastructural facility management and hygiene.",
      },
      format: "Online",
      certificate: "Yes",
    },
    {
      id: "customer-service",
      world: "soft-skills",
      title: "Customer Service Excellence",
      description: "Develop communication and service skills to enhance client satisfaction.",
      duration: "2 days",
      price: "€350",
      level: "Intermediate",
      learningGoals: [
        "Master effective communication",
        "Handle customer inquiries",
        "Build professional relationships",
      ],
      trainer: {
        name: "Sophie Klein",
        bio: "Expert in service excellence with 8 years of training experience.",
      },
      format: "Online",
      certificate: "Yes",
    },
    {
      id: "digital-reporting",
      world: "software",
      title: "Digital Reporting Tools",
      description: "Learn to use digital tools for efficient reporting and workflow management.",
      duration: "2 days",
      price: "€400",
      level: "Intermediate",
      learningGoals: [
        "Navigate reporting software",
        "Automate workflow tasks",
        "Analyze data effectively",
      ],
      trainer: {
        name: "Lukas Fischer",
        bio: "Software specialist with expertise in facility management tools.",
      },
      format: "Hybrid",
      certificate: "Yes",
    },
  ];

  const testimonials = [
    {
      quote: "The Academy prepared me for leadership in security services — practical and confidence-boosting.",
      author: "Michael Braun, Security Manager",
    },
    {
      quote: "Energy management training helped us cut 15% costs while staying compliant.",
      author: "Elena Voss, Facility Director",
    },
    {
      quote: "Cleaning and hygiene standards training was vital for our hospital operations.",
      author: "Dr. Laura Meier, Hospital Administrator",
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
            Building Skills for a Safer, Smarter Future
          </h1>
          <p className="hero-text mt-4 text-lg md:text-xl lg:text-2xl font-medium text-gray-200 text-center">
            Upskill with our Academy – practical, certified training for facility, security, and service professionals.
          </p>
          <button
            onClick={() => handleSectionClick(-22, "course-worlds", 0.2)}
            className="mt-8 px-6 py-3 text-white rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-800/50 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Explore Courses
          </button>
        </section>

        {/* Course Worlds Overview */}
        <section id="course-worlds" className="course-worlds py-16 px-6 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-center">
            Course Worlds
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl text-center mb-12">
            Explore our five specialized training worlds, each designed to enhance your skills in facility management, security, and more.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl w-full">
            {courseWorlds.map((world) => (
              <div
                key={world.id}
                className={`course-card p-6 rounded-xl bg-gray-800/50 border ${world.accentColor} shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300`}
                onClick={() => handleSectionClick(world.zValue, "course-listing", world.rotationY)}
              >
                <div className="flex items-center justify-center mb-4">{world.icon}</div>
                <h3 className="text-xl font-semibold text-white text-center mb-2">{world.title}</h3>
                <p className="text-gray-300 text-center mb-2">{world.description}</p>
                <p className={`text-sm ${world.accentColor} text-center`}>{world.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Filters & Sorting */}
        <section id="filters" className="filter-section py-16 px-6 flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Find Your Course</h2>
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl w-full">
            <select className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600">
              <option>Category</option>
              <option>Security</option>
              <option>Technical</option>
              <option>Cleaning</option>
              <option>Soft Skills</option>
              <option>Software / IT</option>
            </select>
            <select className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600">
              <option>Level</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <select className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600">
              <option>Format</option>
              <option>Classroom</option>
              <option>Online</option>
              <option>Hybrid</option>
            </select>
            <select className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600">
              <option>Location</option>
              <option>Berlin</option>
              <option>Munich</option>
              <option>Frankfurt</option>
            </select>
            <input
              type="date"
              className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600"
            />
          </div>
        </section>

        {/* Course Listing */}
        <section id="course-listing" className="course-listing py-16 px-6 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-center">
            Our Courses
          </h2>
          <div className="flex flex-col gap-12 max-w-4xl w-full">
            {courses.map((course) => (
              <div
                key={course.id}
                className="course-card p-8 rounded-xl bg-gray-800/50 border border-gray-700 shadow-lg"
              >
                <h3 className="text-2xl font-semibold text-white mb-4">{course.title}</h3>
                <p className="text-gray-300 mb-6">{course.description}</p>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <span className="text-gray-400">Duration: {course.duration}</span>
                  <span className="text-gray-400">Price: {course.price}</span>
                  <span className="text-gray-400">Level: {course.level}</span>
                </div>
                <button
                  onClick={() => handleSectionClick(-22, `course-${course.id}`, 0.2)}
                  className="px-6 py-3 text-white rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-700/50 transition-all duration-300 self-start"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Course Detail (Sample) */}
        <section id="course-detail" className="py-16 px-6 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-center">
            Course Detail Example
          </h2>
          <div id="course-fire-protection" className="flex flex-col max-w-4xl w-full p-8 rounded-xl bg-gray-800/50 border border-gray-700 shadow-lg">
            <h3 className="text-2xl font-semibold text-white mb-4">Fire Protection & Evacuation Training</h3>
            <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm mb-4">
              Security Training
            </span>
            <p className="text-gray-300 mb-6">
              Gain the skills to manage fire safety, evacuation drills, and compliance obligations effectively.
            </p>
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-white mb-4">Learning Goals</h4>
              <ul className="text-gray-300 space-y-2">
                {courses[0].learningGoals.map((goal, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-blue-400 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {goal}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-white mb-4">Trainer</h4>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-600"></div>
                <div>
                  <p className="text-gray-200 font-semibold">{courses[0].trainer.name}</p>
                  <p className="text-gray-300">{courses[0].trainer.bio}</p>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-white mb-4">Key Facts</h4>
              <p className="text-gray-300">Duration: {courses[0].duration}</p>
              <p className="text-gray-300">Format: {courses[0].format}</p>
              <p className="text-gray-300">Price: {courses[0].price}</p>
              <p className="text-gray-300">Certificate: {courses[0].certificate}</p>
              <p className="text-gray-300">Level: {courses[0].level}</p>
            </div>
            <button
              onClick={() => handleSectionClick(-22, "course-fire-protection", 0.2)}
              className="px-6 py-3 text-white rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-700/50 transition-all duration-300 self-start"
            >
              Request a Seat
            </button>
          </div>
        </section>

        {/* Why Learn With Us */}
        <section id="trust" className="trust-section py-16 px-6 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-center">
            Why Learn With Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
            {[
              { title: "Practical Focus", desc: "Real-world simulations, hands-on training.", icon: "M12 14l9-5-9-5-9 5 9 5zm0 7.36l-7-3.9v-7.46l7-3.9 7 3.9v7.46l-7 3.9z" },
              { title: "Certified Trainers", desc: "Experts from industry & compliance boards.", icon: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" },
              { title: "Recognized Certificates", desc: "Respected across Europe & globally.", icon: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" },
              { title: "Flexible Formats", desc: "Online, on-site, hybrid.", icon: "M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12zM7 9h10v2H7V9z" },
              { title: "Career Growth", desc: "Skills aligned with today’s facility challenges.", icon: "M12 2a10 10 0 00-7.35 3.56l1.42 1.42A8 8 0 0120 12H4v2h16v-2c0-3.31-2.69-6-6-6h-2V4h4c1.1 0 2-.9 2-2z" },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-gray-800/50 border border-gray-700 shadow-lg"
              >
                <svg className="w-8 h-8 text-gray-300 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d={item.icon} />
                </svg>
                <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials & Impact */}
        <section id="testimonials" className="testimonials py-16 px-6 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-center">
            What Our Learners Say
          </h2>
          <div className="flex flex-col gap-6 max-w-4xl w-full">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testimonial p-6 rounded-xl bg-gray-800/50 border border-gray-700 shadow-lg"
              >
                <p className="text-gray-300 italic">“{testimonial.quote}”</p>
                <p className="text-gray-200 font-semibold mt-2">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section id="cta" className="py-16 px-6 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-center">
            Take the Next Step in Your Career
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl text-center mb-8">
            Secure your spot at the Academy today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleSectionClick(-22, "course-worlds", 0.2)}
              className="px-6 py-3 text-white rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-700/50 transition-all duration-300"
            >
              Explore Courses
            </button>
            <button
              onClick={() => handleSectionClick(-22, "course-fire-protection", 0.2)}
              className="px-6 py-3 text-white rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-700/50 transition-all duration-300"
            >
              Request a Seat
            </button>
            <button
              onClick={() => handleSectionClick(-30, "hero", 0)}
              className="px-6 py-3 text-white rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-700/50 transition-all duration-300"
            >
              Contact Academy Team
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}