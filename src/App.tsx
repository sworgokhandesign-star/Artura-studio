/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';
import { 
  Instagram, 
  MessageCircle, 
  ChevronDown, 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  X, 
  Menu,
  Zap,
  Star,
  Globe,
  Linkedin,
  ExternalLink,
  MessageSquare,
  Search,
  PenTool,
  TrendingUp,
  Layout,
  Smartphone,
  Youtube,
  Maximize2
} from 'lucide-react';
import { PORTFOLIO_ITEMS, METRICS, WORKFLOW_STEPS, FAQ_ITEMS, TESTIMONIALS } from './constants';
import { PortfolioItem } from './types';

// --- Components ---

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div 
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className={`glass rounded-[32px] p-8 relative overflow-hidden group ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    {children}
  </motion.div>
);

const SectionHeading = ({ title, subtitle, highlightWord }: { title: string, subtitle?: string, highlightWord?: string }) => {
  const words = title.split(' ');
  return (
    <div className="mb-12 md:mb-16 text-center px-4">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-3xl md:text-5xl lg:text-6xl font-sans font-semibold tracking-tight mb-6 text-brand-white"
      >
        {words.map((word, i) => {
          const cleanWord = word.replace(/[^\w]/g, '');
          const isHighlighted = highlightWord && cleanWord.toLowerCase() === highlightWord.toLowerCase();
          return (
            <span key={i} className={isHighlighted ? "accent-serif-italic" : ""}>
              {word}{i !== words.length - 1 ? ' ' : ''}
            </span>
          );
        })}
      </motion.h1>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-text-dim max-w-xl mx-auto text-base md:text-lg font-normal tracking-wide font-sans lg:text-xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

const MetricCounter = ({ value, suffix, label }: { value: number, suffix: string, label: string, key?: React.Key }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div 
      ref={ref} 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.04 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
      }}
      className="text-center py-8 px-6 glass rounded-[32px] w-full font-sans flex flex-col items-center justify-center h-48 group transition-all duration-[380ms] ease-out relative overflow-hidden"
    >
      <div className="text-5xl md:text-6xl font-sans font-medium text-brand-blue mb-3 tracking-tighter transition-colors duration-[380ms] ease-out">
        {count}{suffix}
      </div>
      <div className="text-[10px] text-text-dim uppercase tracking-[3px] font-medium transition-colors duration-[380ms] ease-out">{label}</div>
      {/* Spotlight Radial Glow Overlay */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[380ms] ease-out z-10"
        style={{
          background: `radial-gradient(150px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(41, 98, 255, 0.15), transparent 80%)`
        }}
      />
    </motion.div>
  );
};

const PortfolioFilter = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => {
  const tabs = ['Thumbnails', 'Ad Creatives', 'LinkedIn Banners', 'YouTube Banners', 'Shorts/Reels Covers'];
  
  return (
    <div className="flex flex-wrap justify-center gap-12 mb-16 border-b border-white/5 px-4 pb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`relative text-[11px] font-medium uppercase tracking-[2px] transition-all duration-[380ms] ease-out pb-2 ${
            activeTab === tab 
              ? 'text-brand-blue' 
              : 'text-text-dim hover:text-white'
          }`}
        >
          {tab}
          {activeTab === tab && (
            <motion.div 
              layoutId="tabUnderline"
              className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-brand-blue shadow-[0_0_10px_#2962FF]"
            />
          )}
        </button>
      ))}
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('Thumbnails');
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<typeof PORTFOLIO_ITEMS[0] | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const yShiftTop = useTransform(scrollY, [0, 4000], [0, -250]);
  const yShiftBottom = useTransform(scrollY, [0, 4000], [0, 250]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']); // Subtle parallax

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPortfolioItem(null);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // "How We Work" Timeline refs and state
  const timelineParentRef = useRef<HTMLDivElement | null>(null);
  const dot1Ref = useRef<HTMLDivElement | null>(null);
  const dot2Ref = useRef<HTMLDivElement | null>(null);
  const dot3Ref = useRef<HTMLDivElement | null>(null);

  const [dotYPositions, setDotYPositions] = useState<number[]>([0, 0, 0]);
  const [segment1Progress, setSegment1Progress] = useState(0);
  const [segment2Progress, setSegment2Progress] = useState(0);
  const [dot1Active, setDot1Active] = useState(false);
  const [dot2Active, setDot2Active] = useState(false);
  const [dot3Active, setDot3Active] = useState(false);

  // Update Dot Relative Y-Positions
  const updateDotPositions = useCallback(() => {
    const parent = timelineParentRef.current;
    const d1 = dot1Ref.current;
    const d2 = dot2Ref.current;
    const d3 = dot3Ref.current;

    if (!parent || !d1 || !d2 || !d3) return;

    const parentRect = parent.getBoundingClientRect();
    const r1 = d1.getBoundingClientRect();
    const r2 = d2.getBoundingClientRect();
    const r3 = d3.getBoundingClientRect();

    const y1 = r1.top + r1.height / 2 - parentRect.top;
    const y2 = r2.top + r2.height / 2 - parentRect.top;
    const y3 = r3.top + r3.height / 2 - parentRect.top;

    setDotYPositions([y1, y2, y3]);
  }, []);

  useEffect(() => {
    // Initial and periodic calculations to ensure exact positions on dynamic paint/font load
    updateDotPositions();

    const t1 = setTimeout(updateDotPositions, 100);
    const t2 = setTimeout(updateDotPositions, 500);
    const t3 = setTimeout(updateDotPositions, 1500);

    const handleScroll = () => {
      requestAnimationFrame(() => {
        const d1 = dot1Ref.current;
        const d2 = dot2Ref.current;
        const d3 = dot3Ref.current;

        if (!d1 || !d2 || !d3) return;

        const rect1 = d1.getBoundingClientRect();
        const rect2 = d2.getBoundingClientRect();
        const rect3 = d3.getBoundingClientRect();

        const y1 = rect1.top + rect1.height / 2;
        const y2 = rect2.top + rect2.height / 2;
        const y3 = rect3.top + rect3.height / 2;

        const triggerY = window.innerHeight * 0.65; // trigger point at 65% of viewport height

        // Dot active states (glowing dot)
        const active1 = triggerY >= y1;
        const active2 = triggerY >= y2;
        const active3 = triggerY >= y3;

        setDot1Active(active1);
        setDot2Active(active2);
        setDot3Active(active3);

        // Calculate Segment 1 progress
        let p1 = 0;
        if (triggerY >= y1) {
          if (triggerY >= y2) {
            p1 = 1;
          } else {
            p1 = (triggerY - y1) / (y2 - y1);
          }
        }
        setSegment1Progress(p1);

        // Calculate Segment 2 progress
        let p2 = 0;
        if (triggerY >= y2) {
          if (triggerY >= y3) {
            p2 = 1;
          } else {
            p2 = (triggerY - y2) / (y3 - y2);
          }
        }
        setSegment2Progress(p2);
      });
    };

    window.addEventListener('resize', updateDotPositions, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Trigger scroll check on mount
    handleScroll();

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('resize', updateDotPositions);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateDotPositions]);

  const filteredItems = PORTFOLIO_ITEMS.filter(item => item.category === activeTab);

  const ASPECT_RATIOS: Record<string, string> = {
    'Thumbnails': 'aspect-video',
    'Ad Creatives': 'aspect-square',
    'LinkedIn Banners': 'aspect-[4/1]',
    'YouTube Banners': 'aspect-[1707/282] max-w-6xl mx-auto',
    'Shorts/Reels Covers': 'aspect-[9/16]'
  };

  return (
    <div className="relative min-h-screen text-brand-white selection:bg-brand-blue/30 font-sans outline-none bg-transparent">
      {/* Subtle Noise Texture Overlay */}
      <div className="noise-overlay" />

      {/* Subtle Vignette Overlay */}
      <div className="pointer-events-none fixed inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]" />

      {/* Fixed Parallax Corner Background Glows */}
      <motion.div 
        style={{ y: yShiftTop }}
        className="pointer-events-none fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] min-w-[300px] min-h-[300px] rounded-full bg-[#2962ff]/22 blur-[100px] md:blur-[150px] z-0"
      />
      <motion.div 
        style={{ y: yShiftBottom }}
        className="pointer-events-none fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] min-w-[300px] min-h-[300px] rounded-full bg-[#2962ff]/22 blur-[100px] md:blur-[150px] z-0"
      />

      {/* Centered Floating Pill Navbar */}
      <nav className={`fixed left-0 right-0 mx-auto z-50 w-[92%] max-w-5xl transition-all duration-500 flex flex-col ${
        scrolled ? 'top-3' : 'top-5'
      }`}>
        <div className={`w-full rounded-[999px] flex items-center justify-between px-6 py-2.5 transition-all duration-500 ${
          scrolled ? 'glass-navbar-scrolled' : 'glass-navbar'
        }`}>
          {/* Left: Logo */}
          <a href="#hero" className="flex items-center cursor-pointer shrink-0">
            <img src="https://lh3.googleusercontent.com/u/0/d/1ZfkSGJFlWH6yEwOJyUTRtv3wU3qNguck" alt="Artura" className="h-[18px] md:h-[24px] w-auto object-contain transition-transform duration-[380ms] ease-out hover:scale-105" referrerPolicy="no-referrer" />
          </a>
          
          {/* Center: Navigation */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12 text-[10px] uppercase tracking-[3px] font-medium">
            {[
              { name: 'Home', href: '#hero' },
              { name: 'Portfolio', href: '#portfolio' },
              { name: 'Workflow', href: '#workflow' },
              { name: 'Testimonials', href: '#testimonials' }
            ].map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className="text-text-dim hover:text-white transition-all duration-[380ms] ease-out relative group/link"
              >
                {item.name}
                <span className="absolute -bottom-1.5 left-0 w-0 h-[1.5px] bg-brand-blue transition-all duration-[380ms] ease-out group-hover/link:w-full" />
              </a>
            ))}
          </div>

          {/* Right: Contact Button & Hamburger Toggle */}
          <div className="flex items-center gap-3 md:gap-0">
            {/* Hamburger / Menu toggle button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-text-dim hover:text-white transition-all duration-[380ms] ease-out p-1.5 rounded-full hover:bg-white/5 active:scale-95 focus:outline-none flex items-center justify-center shrink-0"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <a 
              href="#contact" 
              className="cta-button group px-5 py-2 md:px-6 md:py-2.5 rounded-full text-[9px] md:text-[10px] uppercase tracking-[2px] font-medium shrink-0"
            >
              Contact Us
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-[380ms] ease-out hidden sm:inline-block" />
            </a>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="mt-2 w-full rounded-[24px] overflow-hidden md:hidden flex flex-col items-center py-5 gap-1.5 shadow-2xl"
              style={{
                background: 'rgba(15, 15, 20, 0.85)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              {[
                { name: 'Home', href: '#hero' },
                { name: 'Portfolio', href: '#portfolio' },
                { name: 'Workflow', href: '#workflow' },
                { name: 'Testimonials', href: '#testimonials' }
              ].map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-text-dim hover:text-white transition-all duration-[300ms] ease-out text-[10px] uppercase tracking-[3px] font-medium py-3 w-full text-center hover:bg-white/[0.03]"
                >
                  {item.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="relative z-10 text-center overflow-x-hidden">
        
        {/* SECTION 1: HERO */}
        <section id="hero" className="min-h-screen flex items-center justify-center px-4 max-w-7xl mx-auto relative hero-section py-16 md:py-[120px]">
          
          <div className="flex flex-col items-center w-full relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: "rgba(15, 15, 20, 0.55)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
                borderRadius: "999px",
                padding: "11px 20px"
              }}
              className="flex items-center gap-3 text-[10px] font-medium text-[#7c7c7c] mb-10 w-fit tracking-[4px] uppercase"
            >
              <div 
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                  boxShadow: "0 0 8px rgba(34, 197, 94, 0.8), 0 0 16px rgba(34, 197, 94, 0.4)"
                }}
                className="shrink-0"
              />
              <span>Welcome to Artura, your premium design partner</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-sans font-semibold mb-8 leading-[1.1] tracking-tighter text-brand-white"
            >
              Build a <span className="accent-serif-italic">Premium</span> <br /> 
              Presence on <span className="text-brand-white">YouTube</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
              className="text-text-dim text-base md:text-lg lg:text-xl max-w-2xl mb-12 leading-relaxed font-normal font-sans"
            >
              We help creators and brands present themselves at a premium level through high-impact thumbnails, ads, and content visuals.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <a href="https://wa.me/8801873345937?text=Hey%20I%20came%20from%20your%20website%20I%20want%20to%20get%20a%20design" target="_blank" rel="noopener noreferrer" className="cta-button px-12 py-5 rounded-full font-medium flex items-center justify-center gap-3 text-base">
                Get Your Design Now <MessageSquare size={20} />
              </a>
              <a href="#portfolio" className="glass-button px-12 py-5 rounded-full font-medium flex items-center justify-center gap-3 tracking-wide text-base">
                View Portfolio
              </a>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: SOCIAL PROOF */}
        <section className="px-4 py-16 md:py-[120px] max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {METRICS.map((metric, i) => (
              <MetricCounter 
                key={i} 
                value={metric.value} 
                suffix={metric.suffix} 
                label={metric.label} 
              />
            ))}
          </div>
        </section>

        {/* SECTION 3: PORTFOLIO */}
        <section id="portfolio" className="px-4 py-16 md:py-[120px] max-w-7xl mx-auto">
          <SectionHeading 
            title="Featured Projects" 
            highlightWord="Projects"
            subtitle="Check out some of the projects we have done for our clients."
          />
          
          <PortfolioFilter activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <motion.div 
            layout
            className={`grid gap-10 ${
              activeTab === 'LinkedIn Banners' ? 'grid-cols-1 md:grid-cols-2' : 
              activeTab === 'YouTube Banners' ? 'grid-cols-1' :
              activeTab === 'Shorts/Reels Covers' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto' : 
              'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4'
            }`}
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.slice(0, activeTab === 'Shorts/Reels Covers' ? 3 : 16).map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  onClick={() => setSelectedPortfolioItem(item)}
                  className={`group relative rounded-[12px] overflow-hidden glass cursor-pointer ${ASPECT_RATIOS[activeTab] || 'aspect-video'}`}
                >
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full ${activeTab === 'YouTube Banners' ? 'object-contain' : 'object-cover'} transition-transform duration-[380ms] ease-out group-hover:scale-[1.07]`}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* SECTION 4: WORKFLOW */}
        <section id="workflow" className="px-4 py-16 md:py-[120px] max-w-5xl mx-auto">
          <SectionHeading 
            title="How We Work" 
            highlightWord="Work"
            subtitle="We take your raw idea and shape it into a high-impact design in just 3 steps." 
          />
          
          <div ref={timelineParentRef} className="relative mt-16 md:mt-24">
            {/* Continuous Background Track */}
            {dotYPositions[0] > 0 && (
              <div 
                style={{
                  top: `${dotYPositions[0]}px`,
                  height: `${dotYPositions[2] - dotYPositions[0]}px`
                }}
                className="absolute left-[20px] md:left-1/2 w-[2px] bg-white/5 -translate-x-1/2 z-0 rounded-full" 
              />
            )}

            {/* Segment 1 active fill line */}
            {dotYPositions[0] > 0 && (
              <div 
                style={{
                  top: `${dotYPositions[0]}px`,
                  height: `${(dotYPositions[1] - dotYPositions[0]) * segment1Progress}px`
                }}
                className="absolute left-[20px] md:left-1/2 w-[2px] -translate-x-1/2 bg-[#2962ff] shadow-[0_0_12px_#2962ff] z-10 pointer-events-none rounded-full" 
              />
            )}

            {/* Segment 2 active fill line */}
            {dotYPositions[1] > 0 && (
              <div 
                style={{
                  top: `${dotYPositions[1]}px`,
                  height: `${(dotYPositions[2] - dotYPositions[1]) * segment2Progress}px`
                }}
                className="absolute left-[20px] md:left-1/2 w-[2px] -translate-x-1/2 bg-[#2962ff] shadow-[0_0_12px_#2962ff] z-10 pointer-events-none rounded-full" 
              />
            )}

            <div className="space-y-12 md:space-y-24 relative z-10">
              {WORKFLOW_STEPS.map((step, i) => {
                 const isLeft = i % 2 === 0;
                 const stepNum = `0${step.id}`;
                 
                 // Get appropriate dot ref and active state
                 const dotRef = i === 0 ? dot1Ref : i === 1 ? dot2Ref : dot3Ref;
                 const isDotActive = i === 0 ? dot1Active : i === 1 ? dot2Active : dot3Active;

                 return (
                  <div 
                    key={step.id}
                    className={`flex flex-col md:flex-row items-stretch md:items-center relative ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Glowing dot marker on the line */}
                    <div 
                      ref={dotRef}
                      className="absolute left-[20px] md:left-1/2 w-5 h-5 rounded-full border-[4px] border-[#08090d] -translate-x-1/2 z-20 flex items-center justify-center pointer-events-none transition-all duration-300"
                      style={{
                        backgroundColor: isDotActive ? "#2962ff" : "#1f2937",
                        boxShadow: isDotActive 
                          ? "0 0 15px rgba(41, 98, 255, 0.9), 0 0 30px rgba(41, 98, 255, 0.5)" 
                          : "none",
                        transform: `translate(-50%, 0) scale(${isDotActive ? 1.1 : 0.95})`,
                      }}
                    >
                      {/* Pulse ring when active */}
                      {isDotActive && (
                        <span className="absolute inline-flex h-full w-full rounded-full bg-[#2962ff]/35 animate-ping opacity-75" />
                      )}
                    </div>

                    {/* Step Card Content - fades and slides in on scroll */}
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                      className={`w-full md:w-1/2 pl-12 md:pl-0 ${isLeft ? "md:pr-16" : "md:pl-16"}`}
                    >
                      <div className="glass rounded-[32px] p-8 md:p-10 relative overflow-hidden group transition-all duration-300 hover:border-brand-blue/30 h-full">
                        {/* Large Step Number in Top Right */}
                        <div className="absolute top-4 right-6 text-5xl md:text-6xl font-light italic font-serif text-brand-blue/15 select-none">
                          {stepNum}
                        </div>

                        {/* Bold Step Title */}
                        <h3 className="text-xl md:text-2xl font-bold text-[#2962ff] mb-4 tracking-tight">
                          {step.title}
                        </h3>

                        {/* Description */}
                        <p className="text-text-dim text-sm md:text-base leading-relaxed font-normal">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>

                    {/* Spacer column for desktop symmetry */}
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                 );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 6: TESTIMONIALS */}
        <section id="testimonials" className="px-4 py-16 md:py-[120px] max-w-7xl mx-auto">
          <SectionHeading title="Client Reviews" highlightWord="Reviews" subtitle="What our clients say about working with us" />
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-10">
            {TESTIMONIALS.filter(t => t.type === 'video').map((v) => {
              const videoId = v.content.split('/shorts/')[1]?.split('?')[0];
              const isPlaying = activeVideo === v.id;

              return (
                <motion.div 
                  key={v.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  whileHover={!isPlaying ? { scale: 1.05 } : {}}
                  onClick={() => !isPlaying && setActiveVideo(v.id)}
                  className="glass rounded-3xl overflow-hidden aspect-[9/16] relative group cursor-pointer shadow-xl w-full max-w-[260px]"
                >
                  <AnimatePresence mode="wait">
                    {!isPlaying ? (
                      <motion.div 
                        key="thumbnail"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full relative"
                      >
                        <img 
                          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
                          alt={v.author} 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                          <motion.div 
                            whileHover={{ scale: 1.15 }}
                            className="w-16 h-16 rounded-full glass-button flex items-center justify-center text-white shadow-[0_0_25px_rgba(43,98,255,0.45)]"
                          >
                            <Play fill="white" size={24} />
                          </motion.div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="video"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full h-full bg-black"
                      >
                        <iframe
                          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0&modestbranding=1`}
                          className="w-full h-full border-none"
                          allow="autoplay; encrypted-media; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                        />
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveVideo(null);
                          }}
                          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
                        >
                          <X size={16} />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* SECTION 5: CTA BLOCK */}
        <section id="contact" className="px-4 py-16 md:py-[120px] max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden group shadow-2xl"
          >
            <div className="relative z-10">
              <div className="text-[10px] text-brand-blue uppercase tracking-[4px] font-bold mb-6">Visuals that win the first impression</div>
              <h2 className="text-3xl md:text-6xl lg:text-7xl font-sans font-semibold mb-8 tracking-tighter leading-none text-brand-white">
                Ready to take your visuals <br /> 
                to the <span className="accent-serif-italic">next level?</span>
              </h2>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a href="https://wa.me/8801873345937?text=Hey%20I%20came%20from%20your%20website%20I%20want%20to%20get%20a%20design" target="_blank" rel="noopener noreferrer" className="cta-button px-10 py-5 rounded-full font-medium flex items-center justify-center gap-3 text-base">
                  <MessageSquare size={22} /> Get Your Design Now
                </a>
                <a href="https://www.instagram.com/sworgokhan/" target="_blank" rel="noopener noreferrer" className="glass-button px-10 py-5 rounded-full font-medium flex items-center justify-center gap-3 text-base">
                  <Instagram size={22} /> Instagram
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* SECTION 7: FAQ */}
        <section id="faq" className="px-4 py-16 md:py-[120px] max-w-4xl mx-auto">
          <SectionHeading title="Frequently Asked" highlightWord="Asked" />
          
          <div className="space-y-4 text-left">
            {FAQ_ITEMS.map((item, i) => (
              <FAQAccordionItem key={i} item={item} />
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="px-4 pb-12">
          <div className="max-w-7xl mx-auto glass p-8 md:p-12 rounded-[40px] md:rounded-full flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-4 mb-8 md:mb-0">
              <img src="https://lh3.googleusercontent.com/u/0/d/1ZfkSGJFlWH6yEwOJyUTRtv3wU3qNguck" alt="Artura" className="h-10 w-auto object-contain" referrerPolicy="no-referrer" />
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-10 text-[10px] uppercase tracking-[2px] font-medium">
              {[
                { name: 'Home', href: '#hero' },
                { name: 'Portfolio', href: '#portfolio' },
                { name: 'Workflow', href: '#workflow' },
                { name: 'Contact', href: '#contact' }
              ].map((item) => (
                <a key={item.name} href={item.href} className="text-text-dim hover:text-white transition-colors">{item.name}</a>
              ))}
            </div>

            <div className="flex gap-4 mt-8 md:mt-0">
              <a href="https://www.linkedin.com/in/sworgokhan/" target="_blank" rel="noopener noreferrer" className="p-3 glass-button rounded-full hover:text-brand-blue"><Globe size={20} /></a>
              <a href="https://www.instagram.com/sworgokhan/" target="_blank" rel="noopener noreferrer" className="p-3 glass-button rounded-full hover:text-brand-blue"><Instagram size={20} /></a>
              <a href="https://wa.me/8801873345937?text=Hey%20I%20came%20from%20your%20website%20I%20want%20to%20get%20a%20design" target="_blank" rel="noopener noreferrer" className="p-3 glass-button rounded-full hover:text-brand-blue"><MessageSquare size={20} /></a>
            </div>
          </div>
          <p className="text-gray-500 text-[10px] text-center mt-8 font-medium tracking-widest uppercase">
            © 2026 Artura — Aura of Art.
          </p>
        </footer>
        {/* PORTFOLIO LIGHTBOX MODAL */}
        <AnimatePresence>
          {selectedPortfolioItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 pt-[90px] backdrop-blur-md bg-black/90"
              onClick={() => setSelectedPortfolioItem(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="relative w-full max-w-4xl max-h-[85vh] flex flex-col items-center justify-center cursor-default"
                onClick={e => e.stopPropagation()}
              >
                {/* Image Box */}
                <div className="glass rounded-[24px] md:rounded-[32px] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.7)] p-2 md:p-3 bg-[#0c0d12]/95 border border-white/10 flex items-center justify-center max-h-[68vh] max-w-full">
                  <img 
                    src={selectedPortfolioItem.imageUrl} 
                    alt={selectedPortfolioItem.title}
                    className="max-w-full max-h-[64vh] object-contain rounded-[16px] md:rounded-[24px]"
                    style={{ maxHeight: 'calc(68vh - 16px)' }}
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Close Button - Located horizontally centered underneath the modal image */}
                <button 
                  onClick={() => setSelectedPortfolioItem(null)}
                  className="mt-6 group w-11 h-11 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center text-white hover:scale-110 active:scale-95 shadow-2xl transition-all duration-[380ms] ease-out border border-white/10 shrink-0"
                >
                  <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// --- Subcomponents ---

function FAQAccordionItem({ item }: { item: { question: string, answer: string }, key?: React.Key }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass-flat rounded-[24px] overflow-hidden w-full block"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors duration-[380ms] ease-out"
      >
        <span className="text-sm font-medium tracking-wide">{item.question}</span>
        <ChevronDown size={18} className={`text-brand-blue transition-transform duration-[380ms] ease-out ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 pt-0 text-text-dim text-sm font-normal leading-relaxed">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
