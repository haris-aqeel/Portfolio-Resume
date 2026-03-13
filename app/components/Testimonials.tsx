"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Quote, Award, TrendingUp, Clock, ThumbsUp } from "lucide-react";

const upworkStats = [
  { label: "Top Rated Plus", icon: Award, value: "" },
  { label: "Job Success", icon: ThumbsUp, value: "100%" },
  { label: "Earned", icon: TrendingUp, value: "$60K+" },
  { label: "Hours", icon: Clock, value: "1,519" },
];

const linkedinRecs = [
  {
    name: "Daniel O'Neil",
    title: "CEO @ PrivacyLabs",
    quote:
      "Haris worked for my startup for 11 months, where he was able to create our MVP. Haris was the most honest and effective freelancer I have ever worked with. I knew that when I assigned a task to him, he would accomplish the task effectively.",
    relation: "Direct manager",
  },
  {
    name: "Mike Soertsz",
    title: "CTO | Building Product for Startups",
    quote:
      "To date, Haris is the most reliable, present, dedicated and professional freelancer I've hired, and I've hired and worked with over 600 now. His speed and professionalism are truly commendable.",
    relation: "Direct manager",
  },
  {
    name: "Tron Mason, MBA",
    title: "Engineering Team Lead, U.S. House of Representatives",
    quote:
      "He was always patient in understanding our needs and quick to implement changes. Given his level of expertise and engagement, he makes you feel as if you're his only client.",
    relation: "Client",
  },
  {
    name: "Kristen Burke, MBA, MS",
    title: "Founder/CEO",
    quote:
      "He is honest about the amount of time he completes on projects and is easy to work with. I also found him to be very accommodating to working with clients out of his time zone.",
    relation: "Client",
  },
];

const upworkReviews = [
  {
    quote: "Incredible speed and communication! Built the MVP I was looking for in record time.",
    rating: 5,
  },
  {
    quote: "Harris is a great React developer. Outstanding skills and always available. Communication is super perfect.",
    rating: 5,
  },
  {
    quote: "Haris is an amazing developer with excellent communication skills. Extremely passionate and knowledgeable full stack developer.",
    rating: 5,
  },
  {
    quote: "Terrific freelancer, diligent and hard-working. An excellent problem solver.",
    rating: 5,
  },
];

export default function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="testimonials" className="py-24 lg:py-32">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4 }}
              className="text-primary font-mono text-sm mb-4"
            >
              Testimonials
            </motion.p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              What people say
            </h2>
          </div>

          {/* Upwork Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-3xl mx-auto"
          >
            {upworkStats.map((stat) => (
              <div
                key={stat.label}
                className="p-5 rounded-xl bg-surface border border-border text-center"
              >
                <stat.icon size={24} className="mx-auto text-primary mb-3" />
                {stat.value && (
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                )}
                <p className="text-xs text-muted mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* LinkedIn Recommendations */}
          <div className="mb-16">
            <h3 className="text-base font-semibold text-white mb-8 flex items-center justify-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[#0a66c2]">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn Recommendations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {linkedinRecs.map((rec, i) => (
                <motion.div
                  key={rec.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                  className="p-6 rounded-2xl bg-surface border border-border hover:border-primary/30 transition-colors"
                >
                  <Quote size={24} className="text-primary/30 mb-4" />
                  <p className="text-muted leading-relaxed mb-6">
                    &ldquo;{rec.quote}&rdquo;
                  </p>
                  <div className="border-t border-border pt-4">
                    <p className="font-medium text-white">
                      {rec.name}
                    </p>
                    <p className="text-sm text-muted mt-0.5">{rec.title}</p>
                    <span className="inline-block mt-3 px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full">
                      {rec.relation}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Upwork Reviews */}
          <div>
            <h3 className="text-base font-semibold text-white mb-8 flex items-center justify-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[#14a800]">
                <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
              </svg>
              Client Reviews
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {upworkReviews.map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
                  className="p-5 rounded-xl bg-surface border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star
                        key={j}
                        size={14}
                        className="text-primary fill-primary"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted leading-relaxed">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
