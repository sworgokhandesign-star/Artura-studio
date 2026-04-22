/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
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
    <div className="mb-20 text-center px-4">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl lg:text-6xl font-sans font-medium tracking-tight mb-6"
      >
        {words.map((word, i) => {
          const cleanWord = word.replace(/[^\w]/g, '');
          const isHighlighted = highlightWord && cleanWord.toLowerCase() === highlightWord.toLowerCase();
          return (
            <span key={i} className={isHighlighted ? "text-brand-blue font-serif italic" : ""}>
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
          className="text-text-dim max-w-xl mx-auto text-base md:text-lg font-medium tracking-wide font-sans lg:text-xl"
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
      whileHover={{ scale: 1.02 }}
      className="text-center py-8 px-6 glass rounded-[32px] w-full border-white/5 font-sans ring-1 ring-white/10 flex flex-col items-center justify-center h-48 group transition-all duration-500"
    >
      <div className="text-5xl md:text-6xl font-sans font-medium text-brand-blue mb-3 tracking-tighter transition-colors group-hover:text-white">
        {count}{suffix}
      </div>
      <div className="text-[10px] text-text-dim uppercase tracking-[3px] font-medium group-hover:text-white transition-colors">{label}</div>
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
          className={`relative text-[11px] font-medium uppercase tracking-[2px] transition-all duration-300 pb-2 ${
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
  const { scrollYProgress } = useScroll();
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

  const filteredItems = PORTFOLIO_ITEMS.filter(item => item.category === activeTab);

  const ASPECT_RATIOS: Record<string, string> = {
    'Thumbnails': 'aspect-video',
    'Ad Creatives': 'aspect-square',
    'LinkedIn Banners': 'aspect-[4/1]',
    'YouTube Banners': 'aspect-[1707/282] max-w-6xl mx-auto',
    'Shorts/Reels Covers': 'aspect-[9/16]'
  };

  return (
    <div className="relative min-h-screen text-brand-white selection:bg-brand-blue/30 font-sans outline-none overflow-hidden bg-transparent">
      {/* Full Width Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 px-8 lg:px-16 py-6 transition-all duration-700 ${
        scrolled ? 'bg-[#0b0b0f]/90 backdrop-blur-xl py-4' : 'bg-gradient-to-b from-[#0b0b0f] to-transparent'
      }`}>
        <div className="max-w-[100vw] w-full flex items-center justify-between">
          {/* Left: Logo */}
          <a href="#hero" className="flex items-center gap-3 group cursor-pointer pl-4">
            <img src="https://lh3.googleusercontent.com/u/0/d/1ZfkSGJFlWH6yEwOJyUTRtv3wU3qNguck" alt="Artura" className="h-8 w-auto object-contain" referrerPolicy="no-referrer" />
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
                className="text-text-dim hover:text-white transition-all duration-500 relative group/link"
              >
                {item.name}
                <span className="absolute -bottom-1.5 left-0 w-0 h-[1.5px] bg-brand-blue transition-all duration-500 group-hover/link:w-full" />
              </a>
            ))}
          </div>

          {/* Right: Contact Button */}
          <div className="hidden md:flex items-center">
            <a 
              href="#contact" 
              className="cta-button group px-8 py-3 rounded-full text-[10px] uppercase tracking-[2px] font-medium"
            >
              Contact Us
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <button 
            className="md:hidden p-2 glass rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden mt-4 glass p-6 rounded-[32px] flex flex-col gap-6"
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
                  className="text-lg font-medium border-b border-white/5 pb-2"
                >
                  {item.name}
                </a>
              ))}
              <div className="flex gap-4">
                <a href="https://wa.me/8801873345937?text=Hey%20I%20came%20from%20your%20website%20I%20want%20to%20get%20a%20design" className="w-full bg-brand-blue text-brand-black py-4 rounded-full font-bold text-center">
                  Contact Us
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="relative z-10 text-center overflow-x-hidden">
        
        {/* SECTION 1: HERO */}
        <section id="hero" className="min-h-screen flex items-center justify-center px-4 max-w-7xl mx-auto relative hero-section pt-32 md:pt-0">
          <div className="flex flex-col items-center w-full">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-8 py-2 rounded-full text-[10px] font-medium text-[#7c7c7c] mb-10 w-fit tracking-[4px] uppercase bg-white/[0.02] badge-glow"
            >
              Welcome to Artura, your premium design partner 🔥
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-sans font-medium mb-8 leading-[1.1] tracking-tighter"
            >
              Build a <span className="font-serif italic text-brand-blue">Premium</span> <br /> 
              Presence on <span className="text-brand-white">YouTube</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-text-dim text-base md:text-lg lg:text-xl max-w-2xl mb-12 leading-relaxed font-medium font-sans"
            >
              We help creators and brands present themselves at a premium level through high-impact thumbnails, ads, and content visuals.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <a href="https://wa.me/8801873345937?text=Hey%20I%20came%20from%20your%20website%20I%20want%20to%20get%20a%20design" className="cta-button px-12 py-5 rounded-full font-medium flex items-center justify-center gap-3 text-base">
                Get Your Design Now <MessageSquare size={20} />
              </a>
              <a href="#portfolio" className="glass px-12 py-5 rounded-full font-medium flex items-center justify-center gap-3 hover:bg-white/10 transition-all tracking-wide text-base border-white/10">
                View Portfolio
              </a>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: SOCIAL PROOF */}
        <section className="px-4 mb-20 max-w-7xl mx-auto pt-10">
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
        <section id="portfolio" className="px-4 mb-48 max-w-7xl mx-auto">
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
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedPortfolioItem(item)}
                  className={`group relative rounded-[12px] overflow-hidden glass cursor-pointer ${ASPECT_RATIOS[activeTab] || 'aspect-video'}`}
                >
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full ${activeTab === 'YouTube Banners' ? 'object-contain' : 'object-cover'} transition-all duration-700 group-hover:scale-105`}
                  />
                  <div className="absolute inset-0 bg-brand-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 rounded-full glass flex items-center justify-center text-white border-white/20"
                    >
                      <Maximize2 size={20} />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* SECTION 4: WORKFLOW */}
        <section id="workflow" className="px-4 mb-32 max-w-6xl mx-auto">
          <SectionHeading 
            title="How We Work" 
            highlightWord="Work"
            subtitle="We take your raw idea and shape it into a high-impact design in just 3 steps." 
          />
          
          <div className="relative">
            {/* Animated Connector Line */}
            <div className="absolute top-28 left-0 right-0 h-1 bg-white/5 overflow-hidden hidden md:block rounded-full">
              <motion.div 
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="w-1/2 h-full bg-gradient-to-r from-brand-blue via-brand-blue-glow to-brand-blue shadow-[0_0_15px_rgba(0,209,255,0.4)]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              {WORKFLOW_STEPS.map((step, i) => {
                 const Icon = i === 0 ? Youtube : i === 1 ? Search : PenTool;
                 return (
                  <motion.div 
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center group"
                  >
                    {/* Step Node */}
                    <div className="relative mb-8">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 z-10 relative ${
                        i === 0 ? 'bg-brand-blue shadow-[0_0_30px_#2962FF] text-brand-black' :
                        i === 1 ? 'bg-brand-blue/20 border-2 border-brand-blue animate-pulse text-brand-blue' :
                        'bg-white/10 text-white/50 border border-white/10'
                      }`}>
                        {i === 2 ? <CheckCircle2 size={32} className="text-brand-blue" /> : <Icon size={24} />}
                      </div>
                      {/* Glow for active/progress */}
                      {(i === 0 || i === 1) && (
                        <div className="absolute inset-0 bg-brand-blue/30 blur-[20px] rounded-full scale-150" />
                      )}
                    </div>

                    <div className="glass rounded-[40px] p-8 flex flex-col items-center text-center group-hover:bg-white/[0.02] transition-colors border-white/5 w-full">
                      <h3 className="text-xl font-medium mb-4 tracking-tight">{step.title}</h3>
                      <p className="text-text-dim text-sm font-medium leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                 );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 6: TESTIMONIALS */}
        <section id="testimonials" className="px-4 mb-32 max-w-7xl mx-auto">
          <SectionHeading title="Client Reviews" highlightWord="Reviews" subtitle="What our clients say about working with us" />
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-10">
            {TESTIMONIALS.filter(t => t.type === 'video').map((v) => {
              const videoId = v.content.split('/shorts/')[1]?.split('?')[0];
              const isPlaying = activeVideo === v.id;

              return (
                <motion.div 
                  key={v.id}
                  layout
                  whileHover={!isPlaying ? { scale: 1.05 } : {}}
                  onClick={() => !isPlaying && setActiveVideo(v.id)}
                  className="glass rounded-3xl overflow-hidden aspect-[9/16] relative group cursor-pointer border-white/10 shadow-xl w-full max-w-[260px]"
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
                            className="w-16 h-16 rounded-full glass border border-white/20 flex items-center justify-center text-white shadow-[0_0_20px_rgba(43,98,255,0.4),0_0_20px_rgba(255,59,59,0.4)] transition-shadow"
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
                          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all border-white/10"
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
        <section id="contact" className="px-4 mb-32 max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden group border-white/10 shadow-2xl"
          >
            <div className="relative z-10">
              <div className="text-[10px] text-brand-blue uppercase tracking-[4px] font-bold mb-6">Visuals that win the first impression</div>
              <h2 className="text-3xl md:text-6xl lg:text-7xl font-sans font-medium mb-8 tracking-tighter leading-none">
                Ready to take your visuals <br /> 
                to the <span className="font-serif italic text-brand-blue">next level?</span>
              </h2>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a href="https://wa.me/8801873345937?text=Hey%20I%20came%20from%20your%20website%20I%20want%20to%20get%20a%20design" className="cta-button px-10 py-5 rounded-full font-medium flex items-center justify-center gap-3 text-base">
                  <MessageSquare size={22} /> Get Your Design Now
                </a>
                <a href="https://www.instagram.com/sworgokhan/" className="glass hover:bg-white/10 px-10 py-5 rounded-full font-medium flex items-center justify-center gap-3 transition-all border-white/10 text-base">
                  <Instagram size={22} /> Instagram
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* SECTION 7: FAQ */}
        <section id="faq" className="px-4 mb-20 max-w-4xl mx-auto">
          <SectionHeading title="Frequently Asked" highlightWord="Asked" />
          
          <div className="space-y-4 text-left">
            {FAQ_ITEMS.map((item, i) => (
              <FAQAccordionItem key={i} item={item} />
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="px-4 pb-12">
          <div className="max-w-7xl mx-auto glass p-8 md:p-12 rounded-[40px] md:rounded-full bg-black/10 backdrop-blur-md border-white/5 flex flex-col md:flex-row items-center justify-between">
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
              <a href="https://www.linkedin.com/in/sworgokhan/" className="p-3 glass rounded-full hover:text-brand-blue transition-all"><Globe size={20} /></a>
              <a href="https://www.instagram.com/sworgokhan/" className="p-3 glass rounded-full hover:text-brand-blue transition-colors"><Instagram size={20} /></a>
              <a href="https://wa.me/8801873345937?text=Hey%20I%20came%20from%20your%20website%20I%20want%20to%20get%20a%20design" className="p-3 glass rounded-full hover:text-brand-blue transition-colors"><MessageSquare size={20} /></a>
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
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 pt-24 md:pt-32 backdrop-blur-md bg-black/80"
              onClick={() => setSelectedPortfolioItem(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative w-full max-w-lg md:max-w-xl lg:max-w-2xl max-h-[65vh] md:max-h-[70vh] flex flex-col items-center gap-6 cursor-default"
                onClick={e => e.stopPropagation()}
              >
                {/* Image Container */}
                <div className="flex-1 min-h-0 w-full flex items-center justify-center">
                  <div className="glass rounded-[32px] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] flex items-center justify-center p-2 h-full w-auto max-w-full border border-white/10">
                    <img 
                      src={selectedPortfolioItem.imageUrl} 
                      alt={selectedPortfolioItem.title}
                      className="max-w-full max-h-full object-contain rounded-[24px]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Close Button - Outside the image area, bottom centered */}
                <button 
                  onClick={() => setSelectedPortfolioItem(null)}
                  className="group w-12 h-12 md:w-14 md:h-14 rounded-full glass border border-white/20 flex items-center justify-center text-white hover:bg-brand-blue/20 transition-all hover:scale-110 shadow-2xl shrink-0"
                >
                  <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
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
    <div className="glass rounded-[24px] overflow-hidden border-white/5">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="text-sm font-medium tracking-wide">{item.question}</span>
        <ChevronDown size={18} className={`text-brand-blue transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 pt-0 text-text-dim text-sm font-medium leading-relaxed">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
