"use client";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
import TestimonialsSection from "../../Components/Testinomial";
import JobsSection from "../../Components/OpenJobs";

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

export default function Career() {
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
      ".value-card",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".value-section",
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
      ".job-card",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".job-listing",
          start: "top 85%",
        },
      }
    );

    gsap.fromTo(
      ".form-section",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".form-section",
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

  const values = [
    {
      title: "Impactful Work",
      description: "Contribute to sustainability, safety, and technology-driven services.",
      icon: (
        <svg className="w-8 h-8 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14a6 6 0 00-6 6c0 1.65.67 3.15 1.76 4.24L12 14l4.24 2.24A6 6 0 0012 6z" />
        </svg>
      ),
    },
    {
      title: "Global Reach",
      description: "Opportunities in 50+ countries.",
      icon: (
        <svg className="w-8 h-8 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-14h2v6h4v2h-6V6z" />
        </svg>
      ),
    },
    {
      title: "Career Growth",
      description: "Training at our Academy, mentorship programs.",
      icon: (
        <svg className="w-8 h-8 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 00-7.35 3.56l1.42 1.42A8 8 0 0120 12H4v2h16v-2c0-3.31-2.69-6-6-6h-2V4h4c1.1 0 2-.9 2-2z" />
        </svg>
      ),
    },
    {
      title: "Diverse Teams",
      description: "Inclusive, collaborative, and people-focused culture.",
      icon: (
        <svg className="w-8 h-8 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-2.99 1.34-2.99 3S14.34 11 16 11zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5.01 6.34 5.01 8 6.34 11 8 11zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05.02.01.05.03.08.04 2.33.66 4.89 2.46 4.89 3.41V19h-14v-2.5c0-2.33 4.67-3.5 7-3.5 2.33 0 7 1.17 7 3.5V19h-2v-2.5c0-.95-2.56-2.75-4.89-3.41-.03-.01-.06-.03-.08-.04-.35-.03-.68-.05-.97-.05z" />
        </svg>
      ),
    },
    {
      title: "Stability & Innovation",
      description: "A trusted name with a forward-looking vision.",
      icon: (
        <svg className="w-8 h-8 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14h-2v6h4v2H10V6H8v10h6v-2h2V6h-2z" />
        </svg>
      ),
    },
  ];

  const jobDetail = {
    id: "security-officer-detail",
    title: "Security Officer",
    location: "Frankfurt, Germany",
    highlights: [
      "On-site guarding & surveillance",
      "Access control & visitor management",
      "Emergency drills & fire safety",
    ],
    responsibilities: [
      "Conduct regular patrols and monitor CCTV",
      "Manage access control systems",
      "Coordinate emergency response drills",
      "Ensure compliance with safety regulations",
    ],
    requirements: [
      "Security certification (e.g., §34a GewO)",
      "1–2 years of security experience",
      "Fluent German, basic English",
      "Strong communication skills",
    ],
    benefits: [
      "Competitive salary & overtime pay",
      "Training at Academy (certifications included)",
      "Health insurance & retirement plan",
      "Career progression opportunities",
    ],
    shifts: "Day/Night",
  };

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
            Grow Your Career in Our Living City
          </h1>
          <p className="hero-text mt-4 text-lg md:text-xl lg:text-2xl font-medium text-gray-200 text-center">
            Join a team that builds safer, smarter, and more sustainable workplaces worldwide.
          </p>
          <button
            onClick={() => handleSectionClick(-22, "job-listing", 0.2)}
            className="mt-8 px-6 py-3 text-white rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-800/50 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            See Open Positions
          </button>
        </section>

        {/* Why Work With Us */}
        <section id="value" className="value-section py-16 px-6 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-center">
            Why Work With Us
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl text-center mb-12">
            Discover a career where your work makes a difference, with opportunities for growth and impact worldwide.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-card p-6 rounded-xl border border-gray-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-white text-center mb-2">{value.title}</h3>
                <p className="text-gray-300 text-center">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Job Filters */}
        <section id="filters" className="filter-section py-16 px-6 flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Find Your Role</h2>
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl w-full">
            <select className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600">
              <option>Location</option>
              <option>Berlin, Germany</option>
              <option>Frankfurt, Germany</option>
              <option>Munich, Germany</option>
            </select>
            <select className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600">
              <option>Department</option>
              <option>Facility Services</option>
              <option>Security</option>
              <option>Consulting</option>
              <option>Software</option>
              <option>Support</option>
            </select>
            <select className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600">
              <option>Employment Type</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
              <option>Flexible</option>
            </select>
            <select className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600">
              <option>Shift</option>
              <option>Day</option>
              <option>Night</option>
              <option>Rotational</option>
            </select>
            <select className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600">
              <option>Experience Level</option>
              <option>Entry</option>
              <option>Mid</option>
              <option>Senior</option>
            </select>
          </div>
        </section>

        {/* Job Listings */}
        <section id="job-listing" className="job-listing py-16 px-6 flex flex-col items-center">
          <JobsSection handleSectionClick={handleSectionClick} />
        </section>

        {/* Job Detail (Sample) */}
        <section id="job-detail" className="py-16 px-6 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-center">
            Job Detail Example
          </h2>
          <div className="flex flex-col max-w-4xl w-full p-8 rounded-xl border border-gray-700 shadow-lg">
            <h3 className="text-2xl font-semibold text-white mb-4">{jobDetail.title} – {jobDetail.location}</h3>
            <div className="flex flex-col md:flex-row gap-8 mb-8 justify-between">
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4">Highlights</h4>
                <ul className="text-gray-300 space-y-2">
                  {jobDetail.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-blue-400 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4">Responsibilities</h4>
                <ul className="text-gray-300 space-y-2">
                  {jobDetail.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-blue-400 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8 mb-8 justify-between">
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4">Requirements</h4>
                <ul className="text-gray-300 space-y-2">
                  {jobDetail.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-blue-400 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4">Benefits</h4>
                <ul className="text-gray-300 space-y-2">
                  {jobDetail.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-blue-400 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-gray-300 mb-6">Shifts: {jobDetail.shifts}</p>
            <button
              onClick={() => handleSectionClick(-22, "application-form", 0.2)}
              className="px-6 py-3 text-white rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-800/50 transition-all duration-300"
            >
              Apply Now
            </button>
          </div>
        </section>

        {/* Application Form */}
        <section id="application-form" className="form-section py-16 px-6 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-center">
            Apply Now
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl text-center mb-8">
            This won’t take more than 5 minutes. Join our team and start your journey with us!
          </p>
          <div className="flex flex-col gap-6 max-w-4xl w-full">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="p-6 rounded-xl border border-gray-700">
                <h4 className="text-lg font-semibold text-white mb-4">Step 1: Personal Details</h4>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-2 mb-4 rounded-lg bg-gray-800 text-white border border-gray-600"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 mb-4 rounded-lg bg-gray-800 text-white border border-gray-600"
                />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-600"
                />
              </div>
              <div className="p-6 rounded-xl border border-gray-700">
                <h4 className="text-lg font-semibold text-white mb-4">Step 2: Upload CV</h4>
                <input
                  type="file"
                  className="w-full p-2 mb-4 rounded-lg bg-gray-800 text-white border border-gray-600"
                />
                <input
                  type="url"
                  placeholder="LinkedIn Profile (Optional)"
                  className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-600"
                />
              </div>
            </div>

            <div className="p-6 rounded-xl border border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">Step 3: Short Questions</h4>
              <input
                type="text"
                placeholder="Availability (e.g., Immediate, 2 weeks)"
                className="w-full p-2 mb-4 rounded-lg bg-gray-800 text-white border border-gray-600"
              />
              <textarea
                placeholder="Briefly describe your experience"
                className="w-full p-2 mb-4 rounded-lg bg-gray-800 text-white border border-gray-600"
                rows="4"
              ></textarea>
              <textarea
                placeholder="Why do you want to join us?"
                className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-600"
                rows="4"
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                className="max-w-md px-6 py-3 text-white rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-800/50 transition-all duration-300"
              >
                Review & Submit
              </button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="testimonials py-16 px-6 flex flex-col items-center">
          <TestimonialsSection />
        </section>

        {/* Call to Action */}
        <section id="cta" className="py-16 px-6 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-center">
            Your Next Step Starts Here
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl text-center mb-8">
            Find a role that fits your skills and ambitions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleSectionClick(-22, "job-listing", 0.2)}
              className="px-6 py-3 text-white rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-800/50 transition-all duration-300"
            >
              See Open Jobs
            </button>
            <button
              onClick={() => handleSectionClick(-22, "application-form", 0.2)}
              className="px-6 py-3 text-white rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-800/50 transition-all duration-300"
            >
              Apply Now
            </button>
            <button
              onClick={() => handleSectionClick(-30, "hero", 0)}
              className="px-6 py-3 text-white rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-800/50 transition-all duration-300"
            >
              Contact HR Team
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}