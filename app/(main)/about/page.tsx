"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Briefcase, GraduationCap, FileText, Award, Heart, Sparkles, Shield, X, ExternalLink, Rocket, RotateCw, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Interests } from "@/components/sections/interests";
import { createClient } from "@/lib/supabase/client";
import { AboutBackground } from "@/components/sections/bg-animations";
import { Certificate, TimelineRecord } from "@/lib/types";

const fallbackCertificates: Certificate[] = [
  {
    id: "fb-cert-1",
    created_at: "",
    title: "Data Science Professional Certificate",
    issuer: "Digital Skola",
    date: "2024",
    description: "A comprehensive program covering Python for Data Science, Exploratory Data Analysis, Machine Learning, and Big Query database manipulation.",
    color: "bg-neo-yellow",
    credential_url: "#",
    order_index: 1,
  },
  {
    id: "fb-cert-2",
    created_at: "",
    title: "Automation & QA Engineering",
    issuer: "Innovate Tech Labs",
    date: "2023",
    description: "Intensive training focused on automation frameworks using Selenium, Jest, and integration testing pipelines.",
    color: "bg-neo-blue",
    credential_url: "#",
    order_index: 2,
  },
  {
    id: "fb-cert-3",
    created_at: "",
    title: "Digital Literacy & Community Empowerment",
    issuer: "Social Action Hub",
    date: "2022",
    description: "Volunteering program aimed at teaching essential computer literacy skills and online safety to underserved communities.",
    color: "bg-neo-pink",
    credential_url: "#",
    order_index: 3,
  },
];

const fallbackTimeline: TimelineRecord[] = [
  {
    id: "fb-time-1",
    type: "work",
    year: "2024 - Present",
    title: "Senior Full-Stack Developer",
    company: "Innovate Tech Labs",
    description: "Leading frontend initiatives, building Next.js web applications, managing PostgreSQL clusters, and mentoring junior engineers.",
    color: "bg-neo-yellow",
  },
  {
    id: "fb-time-2",
    type: "work",
    year: "2021 - 2024",
    title: "Software Engineer",
    company: "DevFlow Studio",
    description: "Developed and maintained full-stack websites, integrated third-party payment gateways, and improved database indexing to reduce load times.",
    color: "bg-neo-blue",
  },
  {
    id: "fb-time-3",
    type: "education",
    year: "2017 - 2021",
    title: "Computer Science Degree",
    company: "State University of Technology",
    description: "Graduated with honors, focusing on software engineering, distributed systems, and user experience paradigms.",
    color: "bg-neo-green",
  },
];

export default function AboutPage() {
  const [certificates, setCertificates] = useState<Certificate[]>(fallbackCertificates);
  const [timeline, setTimeline] = useState<TimelineRecord[]>(fallbackTimeline);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  useEffect(() => {
    async function fetchCertificates() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("certificates")
          .select("*")
          .order("order_index", { ascending: true });

        if (!error) {
          setCertificates(data as Certificate[] || []);
        } else {
          setCertificates([]);
        }
      } catch (err) {
        console.error("Failed to fetch certificates:", err);
        setCertificates([]);
      }
    }

    async function fetchTimeline() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("timeline_records")
          .select("*")
          .order("order_index", { ascending: true });

        if (!error && data && data.length > 0) {
          setTimeline(data as TimelineRecord[]);
        }
      } catch (err) {
        console.error("Failed to fetch timeline:", err);
      }
    }

    fetchCertificates();
    fetchTimeline();
  }, []);

  return (
    <div className="w-full py-16 bg-[#F4F3EF] dark:bg-zinc-950 min-h-screen text-black dark:text-white transition-colors duration-200 relative overflow-hidden">
      <AboutBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Heading */}
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-neo-yellow text-black neo-border shadow-neo flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <h1 className="font-space font-black text-4xl md:text-6xl uppercase tracking-tight">
            ABOUT ME
          </h1>
        </div>

        {/* Biography Grid: Polaroid Photo + Description */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">

          {/* Polaroid Photo Column */}
          <div className="md:col-span-5 flex justify-center py-2">
            <motion.div
              initial={{ rotate: -2, y: 0 }}
              whileHover={{
                y: -10,
                rotate: 1,
                scale: 1.02,
              }}
              whileTap={{ scale: 0.98, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="w-full max-w-[340px] bg-white border-4 border-black p-4 shadow-neo hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] transition-shadow duration-300 cursor-pointer"
            >
              <div className="w-full aspect-[4/5] bg-zinc-200 border-4 border-black relative overflow-hidden flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Foto%20preuni.jpeg"
                  alt="Inria's Portrait"
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  className="w-full h-full object-cover grayscale contrast-[1.1] hover:grayscale-0 transition-all duration-300 select-none"
                />
              </div>
              <div className="pt-4 pb-1 text-center font-space font-black uppercase text-sm text-black">
                NAMAKU.PNG
              </div>
            </motion.div>
          </div>

          {/* Biography Card Column */}
          <Card className="md:col-span-7 border-4 border-black bg-white dark:bg-zinc-900 shadow-neo p-6 md:p-8">
            <div className="space-y-6 font-sans font-semibold text-zinc-700 dark:text-zinc-300 leading-relaxed text-base">
              <h2 className="font-space font-black text-2xl uppercase text-black dark:text-white">
                MY JOURNEY & PHILOSOPHY
              </h2>
              <p>
                Hey there! I'm Inria Altje Kalalo, an IT student from Indonesia with a deep passion for building technology that matters. I started coding because I wanted to create not just learn and that mindset has driven everything I do.
              </p>
              <p>
                I specialize in full-stack development, mobile apps, cybersecurity, and AI. But beyond the technical skills, I believe the best products come from understanding people, solving real problems, and building with purpose.
              </p>
              <p>
                My long-term goal? To build a technology-based business that creates real impact starting with the products I'm building today.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a href="/resume.pdf" download>
                  <Button variant="secondary" className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Download Resume
                  </Button>
                </a>
              </div>
            </div>
          </Card>

        </div>

        {/* Core Values Section */}
        <div className="mb-16 space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neo-green text-black neo-border shadow-neo flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h2 className="font-space font-black text-2xl md:text-3xl uppercase tracking-tight">
              MY CORE VALUES
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Build With Purpose */}
            <Card className="border-4 border-black bg-white dark:bg-zinc-900 p-6 shadow-neo hover:translate-y-[-4px] transition-transform duration-200">
              <div className="w-10 h-10 rounded-none bg-neo-pink border-2 border-black flex items-center justify-center mb-4 shadow-neo-sm">
                <Rocket className="w-5 h-5 text-black" />
              </div>
              <h3 className="font-space font-black text-lg uppercase mb-2 text-black dark:text-white">
                Build With Purpose
              </h3>
              <p className="font-sans font-bold text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Every product I create is driven by a real problem worth solving and a clear vision of its impact.
              </p>
            </Card>

            {/* Always Learning */}
            <Card className="border-4 border-black bg-white dark:bg-zinc-900 p-6 shadow-neo hover:translate-y-[-4px] transition-transform duration-200">
              <div className="w-10 h-10 rounded-none bg-neo-yellow border-2 border-black flex items-center justify-center mb-4 shadow-neo-sm">
                <RotateCw className="w-5 h-5 text-black" />
              </div>
              <h3 className="font-space font-black text-lg uppercase mb-2 text-black dark:text-white">
                Always Learning
              </h3>
              <p className="font-sans font-bold text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                I'm constantly exploring new tools and ideas inside and outside of tech to stay sharp and think differently.
              </p>
            </Card>

            {/* Integrity First */}
            <Card className="border-4 border-black bg-white dark:bg-zinc-900 p-6 shadow-neo hover:translate-y-[-4px] transition-transform duration-200">
              <div className="w-10 h-10 rounded-none bg-neo-blue border-2 border-black flex items-center justify-center mb-4 shadow-neo-sm">
                <Shield className="w-5 h-5 text-black" />
              </div>
              <h3 className="font-space font-black text-lg uppercase mb-2 text-black dark:text-white">
                Integrity First
              </h3>
              <p className="font-sans font-bold text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                I show up with honesty and consistency in everything code, collaboration, and character.
              </p>
            </Card>

            {/* Tech Meets Business */}
            <Card className="border-4 border-black bg-white dark:bg-zinc-900 p-6 shadow-neo hover:translate-y-[-4px] transition-transform duration-200">
              <div className="w-10 h-10 rounded-none bg-neo-orange border-2 border-black flex items-center justify-center mb-4 shadow-neo-sm">
                <TrendingUp className="w-5 h-5 text-black" />
              </div>
              <h3 className="font-space font-black text-lg uppercase mb-2 text-black dark:text-white">
                Tech Meets Business
              </h3>
              <p className="font-sans font-bold text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                I believe the most meaningful impact happens at the intersection of technology and entrepreneurship and I'm building toward that.
              </p>
            </Card>
          </div>
        </div>

        {/* Experience & Education Timeline */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neo-pink text-black neo-border shadow-neo flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <h2 className="font-space font-black text-2xl md:text-3xl uppercase tracking-tight">
              TIMELINE
            </h2>
          </div>

          <div className="relative border-l-4 border-black dark:border-white pl-6 sm:pl-8 ml-4 space-y-12">
            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative"
              >
                {/* Bullet */}
                <div className="absolute -left-[38px] top-1.5 w-6 h-6 bg-white dark:bg-zinc-900 border-4 border-black dark:border-white rounded-full flex items-center justify-center shadow-neo-sm">
                  {item.type === "work" ? (
                    <Briefcase className="w-2.5 h-2.5 text-black dark:text-white" />
                  ) : (
                    <GraduationCap className="w-2.5 h-2.5 text-black dark:text-white" />
                  )}
                </div>

                {/* Timeline Card */}
                <Card bg={item.color} className="p-6 border-4 border-black shadow-neo text-black dark:text-black">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                    <span className="font-space font-black text-sm bg-white text-black border-2 border-black px-2 py-0.5 shadow-neo-sm inline-block self-start">
                      {item.year}
                    </span>
                    <h3 className="font-space font-black text-lg uppercase leading-tight text-black dark:text-black">
                      {item.title}
                    </h3>
                  </div>
                  <h4 className="font-sans font-black text-sm uppercase text-black/85 dark:text-black/85 mb-3">
                    {item.company}
                  </h4>
                  <p className="font-sans font-bold text-xs text-black/80 dark:text-black/80 leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certificates Section */}
        {certificates.length > 0 && (
          <div className="mt-16 space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-neo-yellow text-black neo-border shadow-neo flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h2 className="font-space font-black text-2xl md:text-3xl uppercase tracking-tight">
                CERTIFICATES
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert, idx) => (
                <Card
                  key={cert.id || idx}
                  onClick={() => setSelectedCert(cert)}
                  className="border-4 border-black bg-white dark:bg-zinc-900 p-6 shadow-neo flex flex-col justify-between hover:translate-y-[-6px] hover:shadow-neo-lg transition-all duration-200 cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className={`w-10 h-10 ${cert.color || "bg-neo-yellow"} border-2 border-black flex items-center justify-center shadow-neo-sm`}>
                        <Award className="w-5 h-5 text-black" />
                      </div>
                      {cert.image_url && (
                        <span className="text-[9px] font-space font-black uppercase bg-neo-green text-black border-2 border-black px-1.5 py-0.5 shadow-neo-sm animate-pulse">
                          PREVIEW
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="font-space font-black text-xs uppercase bg-black text-white px-2 py-0.5 border border-black shadow-neo-sm inline-block mb-2">
                        {cert.date}
                      </span>
                      <h3 className="font-space font-black text-lg uppercase leading-tight text-black dark:text-white">
                        {cert.title}
                      </h3>
                      <p className="font-sans font-black text-xs text-zinc-500 uppercase mt-1">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>
                  {cert.credential_url && cert.credential_url !== "#" && (
                    <div className="pt-4 mt-4 border-t-2 border-dashed border-zinc-200 dark:border-zinc-800">
                      <span className="inline-flex items-center gap-1 text-xs font-space font-black uppercase text-neo-blue hover:underline">
                        Verify Credential &rarr;
                      </span>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Interests Section */}
        <div className="mt-16 space-y-8">
          <Interests />
        </div>

      </div>

      {/* Certificate Detail Modal / Lightbox */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="bg-white dark:bg-zinc-900 border-4 border-black dark:border-white shadow-neo max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 flex flex-col space-y-4 text-black dark:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start gap-4 border-b-4 border-black dark:border-zinc-700 pb-3">
              <div>
                <span className="font-space font-black text-xs uppercase bg-black text-white px-2 py-0.5 border border-black shadow-neo-sm inline-block mb-1">
                  {selectedCert.date}
                </span>
                <h3 className="font-space font-black text-xl md:text-2xl uppercase leading-tight">
                  {selectedCert.title}
                </h3>
                <p className="font-sans font-black text-xs text-zinc-500 uppercase mt-0.5">
                  {selectedCert.issuer}
                </p>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="p-1.5 bg-white dark:bg-zinc-800 text-black dark:text-white border-2 border-black dark:border-white shadow-neo-sm hover:translate-y-[-1px] active:translate-y-[1px] hover:bg-neo-pink dark:hover:bg-neo-pink dark:hover:text-black transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            {selectedCert.description && (
              <div className="border-l-4 border-black dark:border-white bg-zinc-50 dark:bg-zinc-800 px-4 py-3">
                <p className="font-sans text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {selectedCert.description}
                </p>
              </div>
            )}

            {/* Certificate Image Preview */}
            <div className="w-full border-4 border-black dark:border-zinc-750 overflow-hidden bg-zinc-100 dark:bg-zinc-800 p-2 flex items-center justify-center min-h-[220px]">
              {selectedCert.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={selectedCert.image_url}
                  alt={selectedCert.title}
                  className="w-full h-auto object-contain max-h-[50vh] border-2 border-black dark:border-zinc-700 shadow-neo-sm"
                />
              ) : (
                <div className="flex flex-col items-center justify-center font-space text-zinc-400 dark:text-zinc-500 p-8">
                  <Award className="w-16 h-16 mb-2" />
                  <span className="font-black text-sm uppercase">No preview image available</span>
                  <span className="text-xs mt-1 text-zinc-500">Add image_url in Supabase to show certificate image</span>
                </div>
              )}
            </div>

            {/* Modal Footer/Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t-2 border-dashed border-zinc-200 dark:border-zinc-800 justify-end">
              {selectedCert.credential_url && selectedCert.credential_url !== "#" && (
                <a
                  href={selectedCert.credential_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button className="w-full flex items-center justify-center gap-1.5">
                    <ExternalLink className="w-4 h-4 text-black" />
                    Verify Credential
                  </Button>
                </a>
              )}
              <Button
                variant="secondary"
                onClick={() => setSelectedCert(null)}
                className="w-full sm:w-auto"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
