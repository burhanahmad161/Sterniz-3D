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

export default function AboutUs() {
    const cameraRef = useRef();
    const [isMounted, setIsMounted] = useState(false);
    const setZPosition = useRef();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        gsap.fromTo(
            ".hero-text",
            { opacity: 0, y: 50, scale: 0.9 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.5,
                stagger: 0.3,
                ease: "back.out(1.7)",
            }
        );

        gsap.fromTo(
            ".about-heading",
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".about-section",
                    start: "top 80%",
                },
            }
        );

        gsap.fromTo(
            ".about-text",
            { opacity: 0, x: -20 },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".about-section",
                    start: "top 80%",
                },
            }
        );

        gsap.fromTo(
            ".value-card",
            { opacity: 0, rotationY: 90, y: 50 },
            {
                opacity: 1,
                rotationY: 0,
                y: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: ".values-section",
                    start: "top 85%",
                },
            }
        );

        gsap.fromTo(
            ".team-card",
            { opacity: 0, scale: 0.8, rotationX: -10 },
            {
                opacity: 1,
                scale: 1,
                rotationX: 0,
                duration: 1,
                stagger: 0.15,
                ease: "elastic.out(1, 0.3)",
                scrollTrigger: {
                    trigger: ".team-section",
                    start: "top 85%",
                },
            }
        );

        // Timeline items with alternating animation directions
        gsap.fromTo(
            ".timeline-item:nth-child(odd)",
            { opacity: 0, x: -50 },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                stagger: 0.3,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".timeline-section",
                    start: "top 85%",
                },
            }
        );

        gsap.fromTo(
            ".timeline-item:nth-child(even)",
            { opacity: 0, x: 50 },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                stagger: 0.3,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".timeline-section",
                    start: "top 85%",
                },
            }
        );

        gsap.fromTo(
            ".award-item",
            { opacity: 0, y: 100, scale: 0.5 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                stagger: 0.2,
                ease: "bounce.out",
                scrollTrigger: {
                    trigger: ".awards-section",
                    start: "top 85%",
                },
            }
        );

        const stats = document.querySelectorAll(".stat-number");
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute("data-target"));
            gsap.to(stat, {
                innerHTML: target,
                duration: 2,
                snap: { innerHTML: 1 },
                scrollTrigger: {
                    trigger: ".impact-section",
                    start: "top 85%",
                },
                onUpdate: function () {
                    stat.innerHTML = Math.ceil(this.targets()[0].innerHTML);
                },
            });
        });
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
                <section id="hero-section" className="hero-section min-h-screen flex flex-col items-center justify-center px-6">
                    <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight">
                        About Living City Solutions
                    </h1>
                    <p className="hero-text mt-4 text-lg md:text-xl lg:text-2xl font-medium text-white">
                        Pioneering Sustainable Urban Ecosystems
                    </p>
                    <p className="hero-text mt-4 text-base md:text-lg lg:text-xl text-gray-200 max-w-2xl text-center">
                        We are architects of tomorrow's cities, blending innovative facility management, intelligent software, and transformative training to create spaces that thrive and inspire.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center space-x-4 space-y-4">
                        <button
                            onClick={() => handleServiceClick(-22, "services-section", 0.2)}
                            className="service-tile px-6 py-3 text-white rounded-lg hover:text-gray-300 border border-gray-300 hover:border-gray-400 transition-all duration-300 relative group hover:scale-105"
                        >
                            Facility Services
                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-900 bg-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100">
                                Tech Yard, Campus, Control Center
                            </span>
                        </button>
                        <button
                            onClick={() => handleServiceClick(-14, "software-section", 0.4)}
                            className="service-tile px-6 py-3 text-white rounded-lg hover:text-gray-300 border border-gray-300 hover:border-gray-400 transition-all duration-300 relative group hover:scale-105"
                        >
                            Software Solutions
                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-900 bg-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100">
                                Digital Hub
                            </span>
                        </button>
                        <button
                            onClick={() => handleServiceClick(-14, "academy-section", 0.4)}
                            className="service-tile px-6 py-3 text-white rounded-lg hover:text-gray-300 border border-gray-300 hover:border-gray-400 transition-all duration-300 relative group hover:scale-105"
                        >
                            Academy
                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-900 bg-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100">
                                Training Center
                            </span>
                        </button>
                    </div>
                </section>

                {/* About Us Section - Expanded */}
                <section id="about-section" className="about-section min-h-screen flex flex-col items-center justify-center px-6 py-16">
                    <h2 className="about-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">Our Story</h2>
                    <div className="max-w-4xl text-center">
                        <p className="about-text mt-6 text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed">
                            Founded in the heart of a bustling metropolis, Living City Solutions emerged from a simple yet profound vision: to breathe life into the buildings and spaces that define our urban landscapes. Over the years, we've grown from a small team of passionate innovators into a global leader in facility management, software development, and professional training.
                        </p>
                        <p className="about-text mt-4 text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed">
                            Our journey is fueled by a commitment to sustainability, excellence, and human-centered design. Today, we serve thousands of clients worldwide, optimizing operations, securing environments, and upskilling workforces to meet the challenges of tomorrow.
                        </p>
                    </div>

                    {/* Core Values - Expanded */}
                    <div className="values-section mt-16 w-full max-w-6xl">
                        <h3 className="about-heading text-2xl md:text-3xl font-semibold text-white mb-8 text-center">Our Guiding Principles</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="value-card p-8 rounded-xl border border-gray-300 hover:border-gray-400 transition-all duration-500 relative group hover:shadow-2xl hover:bg-opacity-5 bg-gray-800/30 backdrop-blur-sm">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <h4 className="text-2xl font-bold text-white relative z-10 mb-4">Innovation</h4>
                                <p className="text-gray-200 relative z-10 leading-relaxed">
                                    At the core of our DNA, we pioneer cutting-edge technologies and methodologies to redefine what's possible in urban facility management and beyond.
                                </p>
                                <ul className="mt-4 text-sm text-gray-300 relative z-10 space-y-1">
                                    <li>• Adaptive AI integrations</li>
                                    <li>• Eco-innovative practices</li>
                                    <li>• Forward-thinking partnerships</li>
                                </ul>
                            </div>
                            <div className="value-card p-8 rounded-xl border border-gray-300 hover:border-gray-400 transition-all duration-500 relative group hover:shadow-2xl hover:bg-opacity-5 bg-gray-800/30 backdrop-blur-sm">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <h4 className="text-2xl font-bold text-white relative z-10 mb-4">Excellence</h4>
                                <p className="text-gray-200 relative z-10 leading-relaxed">
                                    We set the benchmark for service quality, ensuring every project, from routine maintenance to complex integrations, exceeds expectations.
                                </p>
                                <ul className="mt-4 text-sm text-gray-300 relative z-10 space-y-1">
                                    <li>• Rigorous quality controls</li>
                                    <li>• Continuous improvement cycles</li>
                                    <li>• Client-centric deliverables</li>
                                </ul>
                            </div>
                            <div className="value-card p-8 rounded-xl border border-gray-300 hover:border-gray-400 transition-all duration-500 relative group hover:shadow-2xl hover:bg-opacity-5 bg-gray-800/30 backdrop-blur-sm">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <h4 className="text-2xl font-bold text-white relative z-10 mb-4">Sustainability</h4>
                                <p className="text-gray-200 relative z-10 leading-relaxed">
                                    Sustainability isn't a buzzword—it's our mandate. We integrate green practices into every aspect of our operations to foster resilient, eco-friendly cities.
                                </p>
                                <ul className="mt-4 text-sm text-gray-300 relative z-10 space-y-1">
                                    <li>• Carbon-neutral initiatives</li>
                                    <li>• Resource optimization</li>
                                    <li>• Community impact programs</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Impact Stats Section */}
                    <div className="impact-section mt-16 w-full max-w-4xl text-center">
                        <h3 className="about-heading text-2xl md:text-3xl font-semibold text-white mb-8">Our Impact at a Glance</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="p-6">
                                <p className="text-4xl md:text-5xl font-bold text-blue-400 mb-2 stat-number" data-target="500">0</p>
                                <p className="text-gray-300 text-sm uppercase tracking-wide">Projects Completed</p>
                            </div>
                            <div className="p-6">
                                <p className="text-4xl md:text-5xl font-bold text-green-400 mb-2 stat-number" data-target="10000">0</p>
                                <p className="text-gray-300 text-sm uppercase tracking-wide">Professionals Trained</p>
                            </div>
                            <div className="p-6">
                                <p className="text-4xl md:text-5xl font-bold text-purple-400 mb-2 stat-number" data-target="50">0</p>
                                <p className="text-gray-300 text-sm uppercase tracking-wide">Countries Served</p>
                            </div>
                            <div className="p-6">
                                <p className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2 stat-number" data-target="95">0</p>
                                <p className="text-gray-300 text-sm uppercase tracking-wide">% Client Satisfaction</p>
                            </div>
                        </div>
                    </div>

                    {/* Team Section - Expanded */}
                    <div className="team-section mt-16 w-full max-w-6xl">
                        <h3 className="about-heading text-2xl md:text-3xl font-semibold text-white mb-8 text-center">The People Behind the Vision</h3>
                        <p className="about-text text-center text-gray-200 mb-12 max-w-3xl mx-auto">
                            Our diverse team of experts brings together decades of experience in facility management, technology, and education. Meet the leaders driving our mission forward.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                            <div className="team-card relative group cursor-pointer overflow-hidden rounded-xl border border-gray-300 hover:border-gray-400 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                                <div className="w-full h-48 bg-gradient-to-br from-blue-500/20 to-blue-700/20 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-ping"></div>
                                </div>
                                <div className="p-4">
                                    <p className="text-center text-white font-semibold">Jane Doe</p>
                                    <p className="text-center text-gray-300 text-sm">CEO & Founder</p>
                                    <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                        <p className="text-white text-sm px-4 text-center">Visionary leader with 20+ years shaping sustainable urban futures</p>
                                    </div>
                                </div>
                            </div>
                            <div className="team-card relative group cursor-pointer overflow-hidden rounded-xl border border-gray-300 hover:border-gray-400 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                                <div className="w-full h-48 bg-gradient-to-br from-green-500/20 to-green-700/20 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-ping"></div>
                                </div>
                                <div className="p-4">
                                    <p className="text-center text-white font-semibold">John Smith</p>
                                    <p className="text-center text-gray-300 text-sm">CTO</p>
                                    <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                        <p className="text-white text-sm px-4 text-center">Tech wizard integrating AI for smarter facility ecosystems</p>
                                    </div>
                                </div>
                            </div>
                            <div className="team-card relative group cursor-pointer overflow-hidden rounded-xl border border-gray-300 hover:border-gray-400 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                                <div className="w-full h-48 bg-gradient-to-br from-purple-500/20 to-purple-700/20 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-ping"></div>
                                </div>
                                <div className="p-4">
                                    <p className="text-center text-white font-semibold">Emily Chen</p>
                                    <p className="text-center text-gray-300 text-sm">Head of Academy</p>
                                    <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                        <p className="text-white text-sm px-4 text-center">Educator empowering thousands through cutting-edge training</p>
                                    </div>
                                </div>
                            </div>
                            <div className="team-card relative group cursor-pointer overflow-hidden rounded-xl border border-gray-300 hover:border-gray-400 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                                <div className="w-full h-48 bg-gradient-to-br from-yellow-500/20 to-yellow-700/20 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-ping"></div>
                                </div>
                                <div className="p-4">
                                    <p className="text-center text-white font-semibold">Michael Brown</p>
                                    <p className="text-center text-gray-300 text-sm">Operations Lead</p>
                                    <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                        <p className="text-white text-sm px-4 text-center">Operations maestro ensuring flawless execution daily</p>
                                    </div>
                                </div>
                            </div>
                            <div className="team-card relative group cursor-pointer overflow-hidden rounded-xl border border-gray-300 hover:border-gray-400 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                                <div className="w-full h-48 bg-gradient-to-br from-red-500/20 to-red-700/20 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-ping"></div>
                                </div>
                                <div className="p-4">
                                    <p className="text-center text-white font-semibold">Sarah Lee</p>
                                    <p className="text-center text-gray-300 text-sm">Security Director</p>
                                    <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                        <p className="text-white text-sm px-4 text-center">Guardian of safe spaces with strategic foresight</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Timeline Section - Modified for Alternating Sides */}
                    <div className="timeline-section mt-16 w-full max-w-4xl">
                        <h3 className="about-heading text-2xl md:text-3xl font-semibold text-white mb-8 text-center">
                            Milestones in Our Journey
                        </h3>
                        <div className="relative">
                            {/* Center Line */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-blue-400 to-purple-400 h-full"></div>

                            <div className="space-y-12">
                                {/* Timeline Item - Odd (Left) */}
                                <div className="timeline-item flex justify-start relative">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full absolute left-1/2 transform -translate-x-1/2 shadow-lg z-10"></div>
                                    <div className="w-1/2 pr-6 text-right">
                                        <p className="text-gray-200 font-semibold">2015</p>
                                        <p className="text-sm text-gray-400">Inception</p>
                                        <p className="text-gray-200 mt-2">
                                            Founded Living City Solutions with a mission to revolutionize facility management through sustainable practices.
                                        </p>
                                    </div>
                                </div>

                                {/* Timeline Item - Even (Right) */}
                                <div className="timeline-item flex justify-end relative">
                                    <div className="w-6 h-6 bg-green-500 rounded-full absolute left-1/2 transform -translate-x-1/2 shadow-lg z-10"></div>
                                    <div className="w-1/2 pl-6 text-left">
                                        <p className="text-gray-200 font-semibold">2018</p>
                                        <p className="text-sm text-gray-400">Expansion</p>
                                        <p className="text-gray-200 mt-2">
                                            Launched the Academy, training over 1,000 professionals in security and technical facility operations.
                                        </p>
                                    </div>
                                </div>

                                <div className="timeline-item flex justify-start relative">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full absolute left-1/2 transform -translate-x-1/2 shadow-lg z-10"></div>
                                    <div className="w-1/2 pr-6 text-right">
                                        <p className="text-gray-200 font-semibold">2015</p>
                                        <p className="text-sm text-gray-400">Inception</p>
                                        <p className="text-gray-200 mt-2">
                                            Founded Living City Solutions with a mission to revolutionize facility management through sustainable practices.
                                        </p>
                                    </div>
                                </div>

                                {/* Timeline Item - Even (Right) */}
                                <div className="timeline-item flex justify-end relative">
                                    <div className="w-6 h-6 bg-green-500 rounded-full absolute left-1/2 transform -translate-x-1/2 shadow-lg z-10"></div>
                                    <div className="w-1/2 pl-6 text-left">
                                        <p className="text-gray-200 font-semibold">2018</p>
                                        <p className="text-sm text-gray-400">Expansion</p>
                                        <p className="text-gray-200 mt-2">
                                            Launched the Academy, training over 1,000 professionals in security and technical facility operations.
                                        </p>
                                    </div>
                                </div>

                                {/* Continue alternating like this for 2020, 2022, 2025 */}
                            </div>
                        </div>
                    </div>
                    
                    {/* Awards Section - New */}
                    <div className="awards-section mt-16 w-full max-w-4xl">
                        <h3 className="about-heading text-2xl md:text-3xl font-semibold text-white mb-8 text-center">Awards & Recognitions</h3>
                        <p className="about-text text-center text-gray-200 mb-12 max-w-3xl mx-auto">
                            Our commitment to excellence has been celebrated by industry leaders and sustainability advocates worldwide.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="award-item p-6 rounded-xl border border-gray-300 hover:border-gray-400 transition-all duration-300 hover:shadow-xl bg-gray-800/30 backdrop-blur-sm">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gold-500 rounded-lg flex items-center justify-center mr-4">
                                        <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-xl font-semibold text-white">Sustainability Innovation Award 2023</h4>
                                </div>
                                <p className="text-gray-200">Recognized for pioneering eco-friendly facility management solutions that reduce carbon emissions by 30%.</p>
                            </div>
                            <div className="award-item p-6 rounded-xl border border-gray-300 hover:border-gray-400 transition-all duration-300 hover:shadow-xl bg-gray-800/30 backdrop-blur-sm">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-silver-500 rounded-lg flex items-center justify-center mr-4">
                                        <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-xl font-semibold text-white">Tech Excellence Award 2024</h4>
                                </div>
                                <p className="text-gray-200">Honored for our Digital Hub platform's role in transforming operational workflows across industries.</p>
                            </div>
                            <div className="award-item p-6 rounded-xl border border-gray-300 hover:border-gray-400 transition-all duration-300 hover:shadow-xl bg-gray-800/30 backdrop-blur-sm md:col-span-2">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-bronze-500 rounded-lg flex items-center justify-center mr-4">
                                        <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-xl font-semibold text-white">Global Training Impact Award 2025</h4>
                                </div>
                                <p className="text-gray-200">Celebrated for upskilling 10,000+ professionals, fostering safer and more efficient workplaces worldwide.</p>
                            </div>
                        </div>
                    </div>
                    {/* Awards Section */}
                    <div className="awards-section mt-16 w-full max-w-4xl">
                        <h3 className="about-heading text-2xl md:text-3xl font-semibold text-white mb-8 text-center">Awards & Recognitions</h3>
                        <p className="about-text text-center text-gray-200 mb-12 max-w-3xl mx-auto">
                            Our commitment to excellence has been celebrated by industry leaders and sustainability advocates worldwide.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="award-item p-6 rounded-xl border border-gray-300 hover:border-gray-400 transition-all duration-300 hover:shadow-xl bg-gray-800/30 backdrop-blur-sm">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mr-4">
                                        <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-xl font-semibold text-white">Sustainability Innovation Award 2023</h4>
                                </div>
                                <p className="text-gray-200">Recognized for pioneering eco-friendly facility management solutions that reduce carbon emissions by 30%.</p>
                            </div>
                            <div className="award-item p-6 rounded-xl border border-gray-300 hover:border-gray-400 transition-all duration-300 hover:shadow-xl bg-gray-800/30 backdrop-blur-sm">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center mr-4">
                                        <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-xl font-semibold text-white">Tech Excellence Award 2024</h4>
                                </div>
                                <p className="text-gray-200">Honored for our Digital Hub platform's role in transforming operational workflows across industries.</p>
                            </div>
                            <div className="award-item p-6 rounded-xl border border-gray-300 hover:border-gray-400 transition-all duration-300 hover:shadow-xl bg-gray-800/30 backdrop-blur-sm md:col-span-2">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-orange-400 rounded-lg flex items-center justify-center mr-4">
                                        <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-xl font-semibold text-white">Global Training Impact Award 2025</h4>
                                </div>
                                <p className="text-gray-200">Celebrated for upskilling 10,000+ professionals, fostering safer and more efficient workplaces worldwide.</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-16 text-center">
                        <button
                            onClick={() => handleServiceClick(-8, "contact-section", 0.6)}
                            className="px-8 py-4 text-white rounded-xl hover:text-gray-300 border-2 border-gray-300 hover:border-gray-400 transition-all duration-300 text-lg font-semibold hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            Ready to Collaborate? Get in Touch
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}