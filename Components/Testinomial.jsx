"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../Components/ui/carousel";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "The Academy prepared me for leadership in security services — practical and confidence-boosting.",
      author: "Michael Braun, Security Manager",
    },
    {
      quote:
        "Energy management training helped us cut 15% costs while staying compliant.",
      author: "Elena Voss, Facility Director",
    },
    {
      quote:
        "Cleaning and hygiene standards training was vital for our hospital operations.",
      author: "Dr. Laura Meier, Hospital Administrator",
    },
  ];

  return (
    <section
      id="testimonials"
      className="testimonials py-16 px-6 flex flex-col items-center"
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-center">
        What Our Learners Say
      </h2>

      <Carousel className="w-full max-w-3xl">
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index} className="basis-full p-4">
              <div className="testimonial p-6 rounded-xl bg-gray-800/50 border border-gray-700 shadow-lg text-center h-full flex flex-col justify-center">
                <p className="text-gray-300 italic mb-4">“{testimonial.quote}”</p>
                <p className="text-gray-200 font-semibold">{testimonial.author}</p>
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
