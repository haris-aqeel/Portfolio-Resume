"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Quote, Linkedin } from "lucide-react";

const stats = [
  { value: "$100K+", label: "Earned" },
  { value: "50+", label: "Projects Delivered" },
  { value: "100%", label: "Job Success" },
  { value: "5.0", label: "Client Rating" },
];

const linkedinRecs = [
  { name: "Daniel O'Neil", title: "CEO @ PrivacyLabs", quote: "Haris worked for my startup for 11 months, where he was able to create our MVP. Haris was the most honest and effective freelancer I have ever worked with. I knew that when I assigned a task to him, he would accomplish the task effectively... I could trust his judgment on his capabilities, skills, and expected task completion timeframe.", date: "April 2024", relation: "Direct manager" },
  { name: "Mike Soertsz", title: "CTO | Building Product for Startups", quote: "To date, Haris is the most reliable, present, dedicated and professional freelancer I've hired, and I've hired and worked with over 600 now... His speed and professionalism are truly commendable.", date: "August 2023", relation: "Direct manager" },
  { name: "Tron Mason, MBA", title: "Engineering Team Lead, U.S. House of Representatives", quote: "He was always patient in understanding our needs and quick to implement changes... Given his level of expertise and engagement, he makes you feel as if you're his only client.", date: "August 2023", relation: "Client" },
  { name: "Kristen Burke, MBA, MS", title: "Founder/CEO · Cross-Functional Project Leader", quote: "He is honest about the amount of time he completes on projects and is easy to work with. I also found him to be very accommodating to working with clients out of his time zone.", date: "March 2024", relation: "Client" },
  { name: "Cesar Diaz", title: "Entrepreneur, Investor", quote: "Haris is one of few honest developers out there. He accurately reports associated details and has been a pleasure to work with. He's responsive and provides good quality work.", date: "August 2023", relation: "Client" },
  { name: "Ahmed Ali", title: "Blockchain Engineer @ TruYields", quote: "Haris is an exceptional coder and problem solver. His attention to detail and ability to find creative solutions make him a valuable asset to any team. He is a reliable and efficient team member.", date: "January 2023", relation: "Colleague" },
];

const clientReviews = [
  { quote: "Incredible speed and communication! Built the MVP I was looking for in record time. Will work with him again!", amount: "$200", date: "Dec 2024" },
  { quote: "Harris is a great React developer. Outstanding skills and always available. Communication is super perfect.", amount: "$25,110 · 817hrs", date: "Dec 2024" },
  { quote: "Haris is an amazing developer with excellent communication skills. Extremely passionate and knowledgeable full stack developer.", amount: "$500", date: "Sep 2024" },
  { quote: "Haris is an exceptional Freelancer. He is hard working and terrific knowledge that enables him to problem solve quickly and autonomously. A great asset.", amount: "$1,150", date: "Jul 2024" },
  { quote: "Terrific freelancer, diligent and hard-working. An excellent problem solver. I will hire again.", amount: "$1,639", date: "Dec 2024" },
  { quote: "Understood detailed scope and did job accordingly. Good follow up and details. Will work with Haris again.", amount: "$2,350", date: "May 2023" },
  { quote: "Great working with Haris again. Always honest and caring about his work.", amount: "$1,248", date: "Dec 2024" },
  { quote: "Haris was excellent from the start taking on a short notice project. Very efficient and professional, even provided a long term solution while resolving the current issue.", amount: "$142", date: "Jan 2025" },
  { quote: "Very good, quick work. Solution works just as expected. Haris is very helpful and readily available.", amount: "$65", date: "Jul 2024" },
  { quote: "Haris is an excellent and hard working developer who has provided non-stop excellent work since we started our relationship.", amount: "$2,090", date: "Dec 2022" },
  { quote: "Fast and skilled. Will definitely work together in future.", amount: "$605", date: "Mar 2022" },
  { quote: "He was great. Was super fast and high quality work. Haris is fantastic and a great expert in web development.", amount: "$129", date: "Oct 2021" },
  { quote: "Haris Aqeel has done a quick, great, well written and well communicated job. He is surely the goto developer!", amount: "", date: "Oct 2021" },
  { quote: "Great work. It required a good understanding of Python and Typescript, and he did it great!", amount: "$60", date: "Sep 2024" },
  { quote: "Haris was very helpful. He immediately understood my problems, found effective solutions and explained every detail.", amount: "$15", date: "Apr 2021" },
];

export default function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="testimonials" className="relative pt-16 sm:pt-20 pb-12 sm:pb-16">
      <div className="section-divider" />
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 pt-16">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mb-16">
          <span className="section-label font-[family-name:var(--font-jetbrains)]">Reviews</span>
          <h2 className="heading-lg mt-4 max-w-[500px]">What people <span className="gradient-text">say.</span></h2>
        </motion.div>

        {/* Stats row */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center py-4">
              <span className="text-[2rem] sm:text-[2.5rem] font-extrabold text-white tracking-tight block">{stat.value}</span>
              <span className="text-[13px] text-[#9AA0A6] mt-1 block">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* LinkedIn */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <Linkedin size={18} className="text-[#0A66C2]" />
            <h3 className="text-[16px] font-bold text-white">LinkedIn Recommendations</h3>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {linkedinRecs.map((rec, i) => (
              <motion.div key={rec.name} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }} className="break-inside-avoid bento-card p-6">
                <Quote size={20} className="text-[#FFA000]/40 mb-3" />
                <p className="text-[14px] text-[#9AA0A6] leading-[1.7] mb-4">&ldquo;{rec.quote}&rdquo;</p>
                <div className="border-t border-white/[0.06] pt-3">
                  <p className="text-[14px] font-bold text-white">{rec.name}</p>
                  <p className="text-[12px] text-[#9AA0A6] mt-0.5">{rec.title}</p>
                  <p className="text-[10px] text-[#6B6B6F] mt-1 font-[family-name:var(--font-jetbrains)]">{rec.date} · {rec.relation}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Client Reviews */}
        <div>
          <div className="flex items-center gap-2 mb-8">
            <Star size={18} className="text-[#FFA000]" />
            <h3 className="text-[16px] font-bold text-white">Client Reviews</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {clientReviews.map((review, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }} className="bento-card p-5">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => (<Star key={j} size={13} className="text-[#FFA000] fill-[#FFA000]" />))}
                </div>
                <p className="text-[14px] text-[#9AA0A6] leading-[1.7] mb-3">&ldquo;{review.quote}&rdquo;</p>
                <div className="flex items-center justify-between text-[11px] text-[#6B6B6F] font-[family-name:var(--font-jetbrains)]">
                  <span>{review.date}</span>
                  {review.amount && <span className="text-[#FFA000]">{review.amount}</span>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
