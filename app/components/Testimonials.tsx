"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Star,
  Award,
  TrendingUp,
  Clock,
  ThumbsUp,
  Quote,
  Linkedin,
} from "lucide-react";

const upworkStats = [
  { label: "Top Rated Plus", icon: Award, color: "#FF9F0A" },
  { label: "100% JSS", icon: ThumbsUp, color: "#30D158" },
  { label: "$60K+ Earned", icon: TrendingUp, color: "#2997FF" },
  { label: "47 Jobs", icon: Star, color: "#BF5AF2" },
  { label: "1,519 Hours", icon: Clock, color: "#86868B" },
  { label: "5.0 Rating", icon: Star, color: "#FF375F" },
];

const linkedinRecs = [
  {
    name: "Daniel O'Neil",
    title: "CEO @ PrivacyLabs",
    quote:
      "Haris worked for my startup for 11 months, where he was able to create our MVP. Haris was the most honest and effective freelancer I have ever worked with. I knew that when I assigned a task to him, he would accomplish the task effectively... I could trust his judgment on his capabilities, skills, and expected task completion timeframe.",
    date: "April 2024",
    relation: "Direct manager",
  },
  {
    name: "Mike Soertsz",
    title: "CTO | Building Product for Startups",
    quote:
      "To date, Haris is the most reliable, present, dedicated and professional freelancer I've hired, and I've hired and worked with over 600 now... His speed and professionalism are truly commendable.",
    date: "August 2023",
    relation: "Direct manager",
  },
  {
    name: "Tron Mason, MBA",
    title: "Engineering Team Lead, U.S. House of Representatives",
    quote:
      "He was always patient in understanding our needs and quick to implement changes... Given his level of expertise and engagement, he makes you feel as if you're his only client.",
    date: "August 2023",
    relation: "Client",
  },
  {
    name: "Kristen Burke, MBA, MS",
    title: "Founder/CEO · Cross-Functional Project Leader",
    quote:
      "He is honest about the amount of time he completes on projects and is easy to work with. I also found him to be very accommodating to working with clients out of his time zone.",
    date: "March 2024",
    relation: "Client",
  },
  {
    name: "Cesar Diaz",
    title: "Entrepreneur, Investor",
    quote:
      "Haris is one of few honest developers out there. He accurately reports associated details and has been a pleasure to work with. He's responsive and provides good quality work.",
    date: "August 2023",
    relation: "Client",
  },
  {
    name: "Ahmed Ali",
    title: "Blockchain Engineer @ TruYields",
    quote:
      "Haris is an exceptional coder and problem solver. His attention to detail and ability to find creative solutions make him a valuable asset to any team. He is a reliable and efficient team member.",
    date: "January 2023",
    relation: "Colleague",
  },
];

const upworkReviews = [
  {
    quote: "Incredible speed and communication! Built the MVP I was looking for in record time.",
    amount: "$200",
    date: "Dec 2024",
  },
  {
    quote: "Harris is a great React developer. Outstanding skills and always available. Communication is super perfect.",
    amount: "$25,110 · 817hrs",
    date: "Dec 2024",
  },
  {
    quote: "Haris is an amazing developer with excellent communication skills. Extremely passionate and knowledgeable full stack developer.",
    amount: "$500",
    date: "Sep 2024",
  },
  {
    quote: "Terrific freelancer, diligent and hard-working. An excellent problem solver.",
    amount: "$1,639",
    date: "Dec 2024",
  },
  {
    quote: "Haris is an excellent and hard working developer who has provided non-stop excellent work.",
    amount: "$2,090",
    date: "Dec 2022",
  },
  {
    quote: "He was great. Was super fast and high quality work. Haris is fantastic and a great expert in web development.",
    amount: "",
    date: "Oct 2021",
  },
  {
    quote: "Haris was a great choice for my project. Communicated well, understood the assignment, and executed quickly.",
    amount: "$100",
    date: "Apr 2023",
  },
];

const wordCloud = [
  { text: "Reliable", count: 14 },
  { text: "Committed to Quality", count: 12 },
  { text: "Clear Communicator", count: 9 },
  { text: "Collaborative", count: 7 },
  { text: "Solution Oriented", count: 7 },
  { text: "Professional", count: 3 },
  { text: "Detail Oriented", count: 2 },
];

export default function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="testimonials" className="relative py-28 sm:py-36">
      <div className="section-divider" />

      <div className="max-w-[1120px] mx-auto px-6 pt-28">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-label font-[family-name:var(--font-jetbrains)]">
            Reviews
          </span>
          <h2 className="heading-lg text-[#F5F5F7] mt-4">
            What People Say
          </h2>
        </motion.div>

        {/* Upwork Stats - Bento Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-14"
        >
          {upworkStats.map((stat) => (
            <div
              key={stat.label}
              className="bento-card p-4 text-center"
            >
              <stat.icon size={18} style={{ color: stat.color }} className="mx-auto mb-2" />
              <span className="text-[12px] font-medium text-[#F5F5F7] block leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* LinkedIn Recs */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-8">
            <Linkedin size={16} className="text-[#0A66C2]" />
            <h3 className="text-[14px] font-semibold text-[#F5F5F7] tracking-wide">
              LinkedIn Recommendations
            </h3>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {linkedinRecs.map((rec, i) => (
              <motion.div
                key={rec.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                className="break-inside-avoid bento-card p-5"
              >
                <Quote size={18} className="text-[#2997FF]/30 mb-3" />
                <p className="text-[14px] text-[#86868B] leading-[1.7] mb-4">
                  &ldquo;{rec.quote}&rdquo;
                </p>
                <div className="border-t border-white/[0.04] pt-3">
                  <p className="text-[14px] font-semibold text-[#F5F5F7]">
                    {rec.name}
                  </p>
                  <p className="text-[12px] text-[#86868B] mt-0.5">{rec.title}</p>
                  <p className="text-[10px] text-[#48484A] mt-1 font-[family-name:var(--font-jetbrains)]">
                    {rec.date} · {rec.relation}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Upwork Reviews */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-8">
            <Star size={16} className="text-[#FF9F0A]" />
            <h3 className="text-[14px] font-semibold text-[#F5F5F7] tracking-wide">
              Upwork Reviews
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upworkReviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
                className="bento-card p-5"
              >
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      size={13}
                      className="text-[#FF9F0A] fill-[#FF9F0A]"
                    />
                  ))}
                </div>
                <p className="text-[14px] text-[#86868B] leading-[1.7] mb-3">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between text-[11px] text-[#48484A] font-[family-name:var(--font-jetbrains)]">
                  <span>{review.date}</span>
                  {review.amount && (
                    <span className="text-[#2997FF]">{review.amount}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Word Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <h3 className="text-[13px] text-[#48484A] mb-8 tracking-wide uppercase font-medium">
            What Clients Say Most
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {wordCloud.map((word) => {
              const size = Math.max(0.75, word.count / 14) * 1.2;
              return (
                <span
                  key={word.text}
                  className="px-4 py-2 rounded-xl bg-white/[0.03] text-[#86868B] hover:text-[#F5F5F7] hover:bg-white/[0.06] transition-all duration-300"
                  style={{ fontSize: `${size}rem` }}
                >
                  {word.text}
                </span>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
