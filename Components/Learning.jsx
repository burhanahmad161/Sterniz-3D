"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function TrustSection() {
  const items = [
    {
      title: "Practical Focus",
      desc: "Real-world simulations, hands-on training.",
      icon: "M12 14l9-5-9-5-9 5 9 5zm0 7.36l-7-3.9v-7.46l7-3.9 7 3.9v7.46l-7 3.9z",
    },
    {
      title: "Certified Trainers",
      desc: "Experts from industry & compliance boards.",
      icon: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
    },
    {
      title: "Recognized Certificates",
      desc: "Respected across Europe & globally.",
      icon: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z",
    },
    {
      title: "Flexible Formats",
      desc: "Online, on-site, hybrid.",
      icon: "M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12zM7 9h10v2H7V9z",
    },
    {
      title: "Career Growth",
      desc: "Skills aligned with today’s facility challenges.",
      icon: "M12 2a10 10 0 00-7.35 3.56l1.42 1.42A8 8 0 0120 12H4v2h16v-2c0-3.31-2.69-6-6-6h-2V4h4c1.1 0 2-.9 2-2z",
    },
  ];

  return (
    <section
      id="trust"
      className="trust-section py-16 px-6 flex flex-col items-center"
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-center">
        Why Learn With Us
      </h2>

      <Carousel className="w-full max-w-4xl">
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem
              key={index}
              className="basis-full md:basis-1/2 lg:basis-1/3 p-4"
            >
              <div className="p-6 rounded-xl bg-gray-800/50 border border-gray-700 shadow-lg text-center h-full">
                <svg
                  className="w-8 h-8 text-gray-300 mb-4 mx-auto"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d={item.icon} />
                </svg>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Controls */}
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
