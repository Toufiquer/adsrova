/*
|-----------------------------------------
| setting up Query.tsx for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, 1 November, 2026
|-----------------------------------------
*/

"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { defaultData, parseCards, resolveHomeData, type HomeData } from "./data";

const wrap = "mx-auto max-w-7xl px-5 sm:px-8";
const imagePath = (name: string) => `/images/home/${name}.jpg`;
const services = [
  ["01", "Google Ads", "Meet customers in the moments they are actively searching."],
  ["02", "Facebook Ads", "Build relevant connections across the world’s social feeds."],
  ["03", "Instagram Ads", "Turn visual storytelling into meaningful discovery."],
  ["04", "Remarketing", "Reconnect with people who have already shown interest."],
  ["05", "Lead Generation", "Create a clearer path from interest to enquiry."],
  ["06", "Campaign Optimization", "Refine creative, audiences, and campaigns over time."],
];
const benefits = [
  ["01", "Strategy with purpose", "Start with your business goals, audience, and the actions that matter."],
  ["02", "Creative that connects", "Bring a clear message to life across platforms and placements."],
  ["03", "A considered approach", "Make decisions using campaign signals and ongoing learning."],
  ["04", "Built to evolve", "Keep refining as your business and audience change."],
];
const steps = [
  ["Discovery", "We listen to your goals, audience, and challenges."],
  ["Strategy", "We shape a focused plan for channels, messaging, and measurement."],
  ["Campaign launch", "We bring the campaign to life across the selected platforms."],
  ["Optimization", "We review performance and make thoughtful improvements."],
];
const industries = [
  ["E-commerce", "commerce"],
  ["Real estate", "city"],
  ["Education", "learning"],
  ["Healthcare", "health"],
  ["Local businesses", "local"],
  ["Startups", "team"],
];
const faqs = [
  [
    "Which advertising platforms do you work with?",
    "Adsrova focuses on Google Ads, Facebook Ads, and Instagram Ads, with strategies tailored to your goals.",
  ],
  [
    "Can you help with lead generation?",
    "Yes. We can develop advertising campaigns focused on helping your business connect with potential customers.",
  ],
  [
    "How do you approach campaign optimization?",
    "We review relevant campaign signals and use what we learn to refine audiences, creative, and settings over time.",
  ],
  [
    "What does getting started look like?",
    "Start with a conversation about your business, your audience, and what you want your advertising to achieve.",
  ],
];
const linkStyle =
  buttonVariants({ size: "sm" }) +
  " cursor-pointer rounded-sm bg-amber-100 text-amber-950 transition duration-700 hover:bg-amber-200";

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  );
}
function Photo({
  name,
  alt,
  className = "",
  priority = false,
}: {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  return (
    <motion.div ref={ref} className="absolute inset-[-6%]" style={{ y: reduce ? 0 : y }}>
      <Image
        src={imagePath(name)}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={priority}
        className={`object-cover transition-transform duration-700 group-hover:scale-105 ${className}`}
      />
    </motion.div>
  );
}
function Heading({
  number,
  label,
  title,
  description,
  light = false,
}: {
  number: string;
  label: string;
  title: string;
  description: string;
  light?: boolean;
}) {
  return (
    <div>
      <p className={`text-xs font-semibold uppercase tracking-[.22em] ${light ? "text-sky-300" : "text-blue-700"}`}>
        {number} / {label}
      </p>
      <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.08] tracking-[-.04em] sm:text-5xl">{title}</h2>
      <p className={`mt-5 max-w-xl text-base leading-7 ${light ? "text-blue-100/75" : "text-slate-600"}`}>
        {description}
      </p>
    </div>
  );
}
function Dashboard({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`rounded-sm border border-white/70 bg-white/95 p-5 text-[#091d42] shadow-[0_20px_70px_rgba(5,36,86,.18)] ${compact ? "w-full" : "w-full max-w-sm"}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-700">Campaign overview</p>
          <p className="mt-1 text-sm font-semibold">Your growth, in focus</p>
        </div>
        <span className="rounded-sm bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-700">DEMO</span>
      </div>
      <div className="mt-5 flex h-24 items-end gap-2" aria-hidden="true">
        {[30, 45, 39, 57, 50, 70, 62, 88, 74, 100].map((height, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm bg-gradient-to-t from-blue-700 to-sky-400"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <div className="mt-3 flex justify-between border-t border-[#eadfca] pt-3 text-[10px] text-slate-500">
        <span>Illustrative analytics</span>
        <span>Not actual results</span>
      </div>
    </div>
  );
}
export default function Query({ data }: { data?: Partial<HomeData> }) {
  const values = resolveHomeData(data);
  const sections = parseCards(values.sectionsJson);
  const reduce = useReducedMotion();
  const padX = Math.min(300, Math.max(0, Number(values.paddingX) || 0));
  const padY = Math.min(300, Math.max(0, Number(values.paddingY) || 0));
  const heading = (i: number, label: string, light = false) => (
    <Heading
      number={String(i + 2).padStart(2, "0")}
      label={label}
      title={sections[i].title}
      description={sections[i].description}
      light={light}
    />
  );
  return (
    <div
      className="custom-parent-border overflow-hidden bg-[#fffdf8] text-[#071d42]"
      style={{ paddingInline: `${padX}px`, paddingBlock: `${padY}px` }}
    >
      {/* 1: Hero */}
      <section className="relative overflow-hidden bg-[#f6faff]">
        <div
          aria-hidden="true"
          className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl motion-safe:animate-pulse"
        />
        <div
          className={`${wrap} relative grid items-center gap-12 py-20 lg:min-h-[690px] lg:grid-cols-[1fr_1fr] lg:py-24`}
        >
          <Reveal className="relative z-10">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.22em] text-blue-700">
              <span className="h-2 w-2 rounded-full bg-sky-500" />
              {values.eyebrow || defaultData.eyebrow}
            </p>
            <h1 className="mt-6 max-w-2xl text-5xl font-semibold leading-[.98] tracking-[-.055em] sm:text-6xl xl:text-7xl">
              {values.title || defaultData.title}
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">{values.intro || defaultData.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link className={linkStyle} href="/contact-us">
                Get a Free Consultation <span aria-hidden="true">↗</span>
              </Link>
              <a
                className="text-sm font-semibold text-blue-800 underline-offset-4 transition duration-700 hover:underline"
                href="#services"
              >
                Explore Our Services ↓
              </a>
            </div>
            <p className="mt-10 text-xs font-semibold uppercase tracking-[.16em] text-slate-500">
              Google Ads <span className="mx-2 text-sky-500">✦</span> Facebook Ads{" "}
              <span className="mx-2 text-sky-500">✦</span> Instagram Ads
            </p>
          </Reveal>
          <Reveal delay={0.15} className="relative pb-12 pl-5 sm:pl-12">
            <div className="group relative h-[370px] overflow-hidden rounded-sm bg-blue-100 sm:h-[470px]">
              {values.imageUrl ? (
                <Image
                  src={values.imageUrl}
                  alt={values.imageAlt || defaultData.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <Photo name="workspace" alt="A bright modern creative workspace" priority />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#061d45]/55 to-transparent" />
              <p className="absolute bottom-6 left-6 text-xs font-semibold uppercase tracking-[.2em] text-white">
                A clearer view of growth ↗
              </p>
            </div>
            <motion.div
              initial={false}
              animate={reduce ? {} : { y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-2 -left-1 w-[75%] sm:w-[65%]"
            >
              <Dashboard />
            </motion.div>
            <div className="absolute right-4 top-5 rounded-sm bg-[#0879ed] px-4 py-3 text-xs font-semibold text-white shadow-lg">
              Ideas into impact ↗
            </div>
          </Reveal>
        </div>
      </section>
      {/* 2: Trust & expertise */}
      <section className="border-y border-[#eadfca] bg-white py-10">
        <div className={wrap}>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              {heading(0, "The Adsrova approach")}
              <span className="text-4xl text-sky-400">✳</span>
            </div>
          </Reveal>
        </div>
        <div className="mt-8 overflow-hidden border-t border-[#eadfca] pt-6" aria-label="Advertising capabilities">
          <motion.div
            className="flex w-max gap-10 text-sm font-semibold uppercase tracking-[.16em] text-[#18365e]"
            animate={reduce ? {} : { x: ["0%", "-50%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          >
            {[0, 1].map((copy) => (
              <div className="flex gap-10" key={copy} aria-hidden={copy === 1}>
                {[
                  "Google Ads",
                  "Social advertising",
                  "Audience strategy",
                  "Creative thinking",
                  "Campaign optimization",
                  "Meaningful insights",
                ].map((item) => (
                  <span className="whitespace-nowrap" key={item}>
                    <span className="mr-4 text-sky-500">✦</span>
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* 3: Services */}
      <section id="services" className="bg-[#fffdf8] py-20 sm:py-28">
        <div className={wrap}>
          <Reveal>{heading(1, "What we do")}</Reveal>
          <div className="mt-12 grid border-l border-t border-[#eadfca] sm:grid-cols-2 lg:grid-cols-3">
            {services.map(([n, title, copy], i) => (
              <Reveal
                key={title}
                delay={i * 0.05}
                className="group border-b border-r border-[#eadfca] bg-white p-7 transition duration-700 hover:bg-[#edf7ff]"
              >
                <div className="flex justify-between text-sm font-semibold text-blue-700">
                  <span>{n} /</span>
                  <span className="transition duration-700 group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </div>
                <h3 className="mt-12 text-xl font-semibold">{title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-6 text-slate-600">{copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* 4: Google */}
      <section className="overflow-hidden bg-[#eaf5ff] py-20 sm:py-28">
        <div className={`${wrap} grid items-center gap-12 lg:grid-cols-2`}>
          <Reveal>
            <div className="group relative h-[420px] overflow-hidden rounded-sm">
              <Photo name="analytics" alt="Laptop displaying marketing analytics" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061d45]/55 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 border border-white/30 bg-white/90 p-5 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-700">Search with intent</p>
                <p className="mt-2 text-lg font-semibold">The right moment matters.</p>
                <div className="mt-3 h-2 w-full bg-blue-100">
                  <div className="h-full w-2/3 bg-gradient-to-r from-blue-700 to-sky-400" />
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            {heading(2, "Google Ads solutions")}
            <div className="mt-8 space-y-4">
              {[
                "Connect with high-intent searches",
                "Shape campaigns around your business goals",
                "Learn and refine with meaningful insights",
              ].map((item) => (
                <p className="flex gap-3 border-b border-blue-200 pb-4 text-sm font-medium" key={item}>
                  <span className="text-blue-600">↗</span>
                  {item}
                </p>
              ))}
            </div>
            <Link className={`${linkStyle} mt-7`} href="/contact-us">
              Talk about Google Ads ↗
            </Link>
          </Reveal>
        </div>
      </section>
      {/* 5: Social */}
      <section className="bg-white py-20 sm:py-28">
        <div className={`${wrap} grid items-center gap-12 lg:grid-cols-2`}>
          <Reveal>
            {heading(3, "Facebook & Instagram Ads")}
            <p className="mt-8 border-l-2 border-sky-400 pl-5 text-lg leading-8 text-[#23466d]">
              Creative that earns attention. Strategy that gives it direction.
            </p>
            <Link href="/contact-us" className={`${linkStyle} mt-8`}>
              Let’s talk social ↗
            </Link>
          </Reveal>
          <Reveal delay={0.1} className="relative grid grid-cols-2 gap-3 pb-12 pl-3">
            <div className="group relative mt-12 h-72 overflow-hidden rounded-sm sm:h-96">
              <Photo name="mobile" alt="Working with digital content on a laptop" />
            </div>
            <div className="group relative h-72 overflow-hidden rounded-sm sm:h-96">
              <Photo name="creative" alt="A colorful creative design workspace" />
            </div>
            <motion.div
              animate={reduce ? {} : { y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-1 right-3 w-48 rounded-sm border border-[#eadfca] bg-white p-4 shadow-xl"
            >
              <p className="text-[10px] uppercase tracking-widest text-blue-700">Creative concept</p>
              <p className="mt-2 text-sm font-semibold">Made to be noticed.</p>
              <div className="mt-3 flex gap-1">
                <span className="h-1 w-8 bg-blue-600" />
                <span className="h-1 w-4 bg-sky-400" />
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>
      {/* 6: Why us */}
      <section className="bg-[#071d42] py-20 text-white sm:py-28">
        <div className={wrap}>
          <Reveal>{heading(4, "Why Adsrova", true)}</Reveal>
          <div className="mt-12 grid gap-px bg-white/15 md:grid-cols-2">
            {benefits.map(([n, title, copy], i) => (
              <Reveal
                key={title}
                delay={i * 0.07}
                className="group bg-[#071d42] p-7 transition duration-700 hover:bg-[#0c3269]"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-sm border border-sky-400/40 text-xl text-sky-300 transition duration-700 group-hover:rotate-45">
                    ✳
                  </span>
                  <span className="text-xs text-sky-300">{n}</span>
                </div>
                <h3 className="mt-8 text-xl font-semibold">{title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-blue-100/70">{copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* 7: Creative showcase */}
      <section className="bg-[#fffdf8] py-20 sm:py-28">
        <div className={wrap}>
          <Reveal>{heading(5, "Creative showcase")}</Reveal>
          <p className="mt-3 text-xs text-slate-500">Concept visuals for illustration, not client work.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-12">
            <Reveal className="group relative h-96 overflow-hidden rounded-sm md:col-span-7">
              <Photo name="creative" alt="Creative materials arranged on a desk" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071d42]/75 to-transparent" />
              <p className="absolute bottom-6 left-6 text-xl font-semibold text-white">01 / Make the message matter</p>
            </Reveal>
            <div className="grid gap-4 md:col-span-5">
              <Reveal className="group relative h-56 overflow-hidden rounded-sm">
                <Photo name="team" alt="A team collaborating on ideas" />
                <div className="absolute inset-0 bg-[#071d42]/25" />
                <p className="absolute bottom-5 left-5 font-semibold text-white">02 / Built around people</p>
              </Reveal>
              <Reveal className="relative grid min-h-44 content-between overflow-hidden rounded-sm bg-gradient-to-br from-[#0560df] to-[#05b6ef] p-6 text-white">
                <span className="text-xs uppercase tracking-widest">03 / The idea</span>
                <p className="max-w-xs text-2xl font-semibold tracking-tight">The right story can open a new door. ↗</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
      {/* 8: Process */}
      <section className="border-y border-[#eadfca] bg-white py-20 sm:py-28">
        <div className={wrap}>
          <Reveal>{heading(6, "How we work")}</Reveal>
          <div className="mt-12 grid gap-0 md:grid-cols-4">
            {steps.map(([title, copy], i) => (
              <Reveal key={title} delay={i * 0.08} className="border-t border-blue-200 py-6 pr-6">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700">
                  0{i + 1}
                </span>
                <h3 className="mt-7 text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* 9: Industries */}
      <section className="bg-[#f3f8fd] py-20 sm:py-28">
        <div className={wrap}>
          <Reveal>{heading(7, "Industries we serve")}</Reveal>
          <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-3">
            {industries.map(([title, img], i) => (
              <Reveal key={title} delay={i * 0.04} className="group relative h-48 overflow-hidden rounded-sm sm:h-64">
                <Photo name={img} alt={`${title} industry`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071d42]/85 via-[#071d42]/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <span className="transition duration-700 group-hover:translate-x-1">↗</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* 10: Results */}
      <section className="bg-white py-20 sm:py-28">
        <div className={`${wrap} grid items-center gap-12 lg:grid-cols-2`}>
          <Reveal>
            {heading(8, "Results & insights")}
            <p className="mt-6 text-sm leading-7 text-slate-600">
              Every business starts in a different place. We focus on the measures relevant to your goals and use them
              to guide future decisions.
            </p>
            <p className="mt-5 rounded-sm border border-[#eadfca] bg-[#fffdf8] p-4 text-xs leading-5 text-slate-600">
              The dashboard shown is an illustrative demonstration. Verified case studies are not currently available.
            </p>
          </Reveal>
          <Reveal
            delay={0.1}
            className="relative overflow-hidden rounded-sm bg-gradient-to-br from-[#e1f3ff] via-[#eaf2ff] to-[#c9eaff] p-8 sm:p-14"
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-blue-400/30" />
            <Dashboard compact />
            <div className="mt-4 flex justify-end">
              <span className="rounded-sm bg-[#071d42] px-4 py-3 text-xs font-semibold text-white">
                Measure · Learn · Improve ↗
              </span>
            </div>
          </Reveal>
        </div>
      </section>
      {/* 11: FAQ */}
      <section className="border-t border-[#eadfca] bg-[#fffdf8] py-20 sm:py-28">
        <div className={`${wrap} grid gap-10 lg:grid-cols-[.8fr_1.2fr]`}>
          <Reveal>{heading(9, "FAQ")}</Reveal>
          <Reveal className="border-t border-[#eadfca]">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group border-b border-[#eadfca]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 text-base font-semibold [&::-webkit-details-marker]:hidden">
                  {question}
                  <span className="text-xl font-normal text-blue-700 transition duration-700 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="max-w-xl pb-6 text-sm leading-7 text-slate-600">{answer}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>
      {/* 12: Contact */}
      <section id="contact" className="relative overflow-hidden bg-[#e8f5ff] py-20 sm:py-28">
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-24 h-96 w-96 rounded-full bg-sky-300/30 blur-3xl motion-safe:animate-pulse"
        />
        <div className={`${wrap} relative grid gap-12 lg:grid-cols-2`}>
          <Reveal>
            {heading(10, "Let’s grow together")}
            <p className="mt-8 text-sm font-semibold text-blue-700">A good conversation is a great place to start. ↗</p>
            <Link href="/contact-us" className={`${linkStyle} mt-6`}>
              Get a Free Consultation ↗
            </Link>
          </Reveal>
          <Reveal
            delay={0.1}
            className="rounded-sm border border-[#eadfca] bg-white p-6 shadow-xl shadow-blue-900/5 sm:p-8"
          >
            <h3 className="text-xl font-semibold">Tell us about your goals</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This enquiry form requires an integrated submission service. Please use the consultation link to contact
              us.
            </p>
            <form className="mt-6 grid gap-4" onSubmit={(event) => event.preventDefault()}>
              <label className="grid gap-1.5 text-sm font-medium">
                Your name
                <Input disabled placeholder="Your name" />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                Email address
                <Input disabled type="email" placeholder="you@example.com" />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                What would you like to achieve?
                <Textarea disabled placeholder="Tell us about your business" />
              </label>
              <Button
                size="sm"
                disabled
                className="w-fit cursor-pointer bg-green-100 text-green-900 transition duration-700"
              >
                Form integration required
              </Button>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
