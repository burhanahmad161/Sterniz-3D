"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../Components/ui/carousel";

export default function JobsSection() {
    const jobs = [
        {
            id: "facility-manager",
            title: "Facility Manager (Technical FM)",
            location: "Berlin, Germany",
            type: "Full-time",
            highlights: [
                "Manage HVAC and electrical systems",
                "Oversee emergency maintenance",
                "Lead a team of technicians",
            ],
        },
        {
            id: "security-officer",
            title: "Security Officer",
            location: "Frankfurt, Germany",
            type: "Full-time",
            highlights: [
                "On-site guarding & surveillance",
                "Access control & visitor management",
                "Emergency drills & fire safety",
            ],
        },
        {
            id: "software-engineer",
            title: "Software Engineer",
            location: "Munich, Germany",
            type: "Full-time",
            highlights: [
                "Develop workflow automation tools",
                "Integrate with existing systems",
                "Support digital transformation",
            ],
        },
    ];

    return (
        <section
            id="open-jobs"
            className="open-jobs py-16 px-6 flex flex-col items-center"
        >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-center">
                Open Job Positions
            </h2>
            <Carousel className="w-full max-w-xl">
                <CarouselContent className="flex text-center">
                    {jobs.map((job, index) => (
                        <CarouselItem key={index} className="basis-full p-4">
                            <div className="job-card p-6 rounded-xl bg-gray-800/50 border border-gray-700 shadow-lg h-full flex flex-col justify-between">
                                <div>
                                    <h3 className="text-2xl font-semibold text-white mb-2">
                                        {job.title}
                                    </h3>
                                    <p className="text-gray-300 mb-1">
                                        <strong>Location:</strong> {job.location}
                                    </p>
                                    <p className="text-gray-300 mb-4">
                                        <strong>Type:</strong> {job.type}
                                    </p>
                                    <ul className="list-disc list-inside text-gray-300 mb-4">
                                        {job.highlights.map((point, idx) => (
                                            <li key={idx}>{point}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    );
}
