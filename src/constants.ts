import { PortfolioItem, Metric, WorkflowStep, FAQItem, Testimonial } from './types';

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  // Thumbnails (16 items)
  { id: 'thumb-0', title: 'Premium Gaming Thumbnail 1', category: 'Thumbnails' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1UEfyrAHsypDtuEiU9dpFFd9oglXLW5_u' },
  { id: 'thumb-1', title: 'Premium Gaming Thumbnail 2', category: 'Thumbnails' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/113B0lYGYA6H7Iwd6qClp4S2FtGjqoaAn' },
  { id: 'thumb-2', title: 'Premium Gaming Thumbnail 3', category: 'Thumbnails' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1BWz0hg3n-_T2Cs47ClBmpmA8JXeT1f7s' },
  { id: 'thumb-3', title: 'Premium Gaming Thumbnail 4', category: 'Thumbnails' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1G4WcQ8JjV7NBAbzD_3mP137a1mRP-efC' },
  { id: 'thumb-4', title: 'Premium Gaming Thumbnail 5', category: 'Thumbnails' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1qBuczO3BvCwkhI2Qxkxoi3fwTjJ5CZ_s' },
  { id: 'thumb-5', title: 'Premium Gaming Thumbnail 6', category: 'Thumbnails' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1iYpmZ5zPHb0QqEY7_0hkUnOgvMroQtRm' },
  { id: 'thumb-6', title: 'Premium Gaming Thumbnail 7', category: 'Thumbnails' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1UQECfc9N0wH8FKwmm2pwU4J66HmGNzJ1' },
  { id: 'thumb-7', title: 'Premium Gaming Thumbnail 8', category: 'Thumbnails' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/164O-RPjtCi23ZWsJCJqs30IL0qc5iNxi' },
  { id: 'thumb-8', title: 'Premium Gaming Thumbnail 9', category: 'Thumbnails' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1ETSdUpEqvkVRZtcHIYkccMXfzdQndLzu' },
  { id: 'thumb-9', title: 'Premium Gaming Thumbnail 10', category: 'Thumbnails' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1qc6PzoJQ7_DYOoLf7Q6gAVU9WF6raPUB' },
  { id: 'thumb-10', title: 'Premium Gaming Thumbnail 11', category: 'Thumbnails' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/13AKUnruHhFGl4xwTmKGSsTLcJZrjAVUu' },
  { id: 'thumb-11', title: 'Premium Gaming Thumbnail 12', category: 'Thumbnails' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1G8dN6dsIyCATYGDSe_ITu2g7qKrB5cum' },
  { id: 'thumb-12', title: 'Premium Gaming Thumbnail 13', category: 'Thumbnails' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/18zZ-n0XJXj4f4yB_YF2ioTlqni0S0l27' },
  { id: 'thumb-13', title: 'Premium Gaming Thumbnail 14', category: 'Thumbnails' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1zjBIMloo56jWfyVSuP-oDJLEkl3c1NF-' },
  { id: 'thumb-14', title: 'Premium Gaming Thumbnail 15', category: 'Thumbnails' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1pxwYe4XT_L1eabQ_1BRooBl7WhgTfRb2' },
  { id: 'thumb-15', title: 'Premium Gaming Thumbnail 16', category: 'Thumbnails' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1rG14oE-G6TMco42p_vCx3-dAEJ9GbjZ6' },
  // Ad Creatives (16 items)
  { id: 'ad-0', title: 'High Conversion Ad Design 1', category: 'Ad Creatives' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1jNpuSxodSUeWuNUU4HQ3tFfOx0wogW1n' },
  { id: 'ad-1', title: 'High Conversion Ad Design 2', category: 'Ad Creatives' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/19_4V8XPwss4p8TbaUjjM_NP-TuSJ5Kdv' },
  { id: 'ad-2', title: 'High Conversion Ad Design 3', category: 'Ad Creatives' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1v2wnvjcOhS9oyto2kdO1wQ6Scqhe1adN' },
  { id: 'ad-3', title: 'High Conversion Ad Design 4', category: 'Ad Creatives' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1yfNTKMq3yly65_ULKne1A7wF_C_HIbUo' },
  { id: 'ad-4', title: 'High Conversion Ad Design 5', category: 'Ad Creatives' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1iqVUlYc3Sn5CB0Ygy_UF-LltU_hxBEJq' },
  { id: 'ad-5', title: 'High Conversion Ad Design 6', category: 'Ad Creatives' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1MAW3iTWa7RdBXNAdwwFoxH-PQF2vy4P_' },
  { id: 'ad-6', title: 'High Conversion Ad Design 7', category: 'Ad Creatives' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1Msgr9bJb6xIcESLnZwZrHNkGFPl1WvE2' },
  { id: 'ad-7', title: 'High Conversion Ad Design 8', category: 'Ad Creatives' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/14VX4eFd-7ZNrJOyEcpfChDZosyQ6kYzr' },
  { id: 'ad-8', title: 'High Conversion Ad Design 9', category: 'Ad Creatives' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1T89r9OAw220icSfYh3Dp324iHDRo_BxZ' },
  { id: 'ad-9', title: 'High Conversion Ad Design 10', category: 'Ad Creatives' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1a-uOHZAND9TuV5RuL8oU2bSHV6GTxi7X' },
  { id: 'ad-10', title: 'High Conversion Ad Design 11', category: 'Ad Creatives' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1XHI2AEmbD-RzkCgUi4pyHEhM88Q533xQ' },
  { id: 'ad-11', title: 'High Conversion Ad Design 12', category: 'Ad Creatives' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1VyMQIgPZIcb21ga2UcmOM4yRaCMa4JKh' },
  { id: 'ad-12', title: 'High Conversion Ad Design 13', category: 'Ad Creatives' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1z11dWpkcF0n9Hl9jo3HjRAotpwsIa5mm' },
  { id: 'ad-13', title: 'High Conversion Ad Design 14', category: 'Ad Creatives' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1FmDpXRiFRIWeIknD0AQIJOlnHgrHnhCQ' },
  { id: 'ad-14', title: 'High Conversion Ad Design 15', category: 'Ad Creatives' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1PxDddZqcnBtzeuP7c8X_LObOHi5SgjLG' },
  { id: 'ad-15', title: 'High Conversion Ad Design 16', category: 'Ad Creatives' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/18lbevWyRxzBtb3xM5QqyuEZ3SSBk0qjJ' },
  // LinkedIn Banners (4 items)
  { id: 'li-0', title: 'Corporate LinkedIn Banner 1', category: 'LinkedIn Banners' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1kB7QGxp5VVuSxd317l7DbefpDVNC4owF' },
  { id: 'li-1', title: 'Corporate LinkedIn Banner 2', category: 'LinkedIn Banners' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1zRSXTPaUvKSrUfMIfvTYd3HN2hny5rJA' },
  { id: 'li-2', title: 'Corporate LinkedIn Banner 3', category: 'LinkedIn Banners' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1th-glQThtO7eIoUvPRwm9dRyncni0TtU' },
  { id: 'li-3', title: 'Corporate LinkedIn Banner 4', category: 'LinkedIn Banners' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1CfGmgvvCPkVc8gtSzXslG0d2CNY4wfh8' },
  // YouTube Banners (4 items)
  { id: 'yt-0', title: 'Channel Art Design 1', category: 'YouTube Banners' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1JHzCKNOnj4vrWEOf3d_P8NzQ7-s8mAkq' },
  { id: 'yt-1', title: 'Channel Art Design 2', category: 'YouTube Banners' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1EQ0ZxTDyWfqA8wKSfv_pumGcbIuG1XuM' },
  { id: 'yt-2', title: 'Channel Art Design 3', category: 'YouTube Banners' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1pjQ4gjME2lNCjkkTm-l0rhm23mmqfMSV' },
  { id: 'yt-3', title: 'Channel Art Design 4', category: 'YouTube Banners' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1CshYBNIh7GIEEhoIb2txPPzWjpYxg_et' },
  // Shorts/Reels Covers (3 items as per limited view)
  { id: 'reel-0', title: 'Viral Vertical Cover 1', category: 'Shorts/Reels Covers' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1Xi7ltcqoRcVtGKESPl9MQgTuYwYAa1Z5' },
  { id: 'reel-1', title: 'Viral Vertical Cover 2', category: 'Shorts/Reels Covers' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1xa12wQCcBqj42QPEp40jgiF5xyaSw6f1' },
  { id: 'reel-2', title: 'Viral Vertical Cover 3', category: 'Shorts/Reels Covers' as const, imageUrl: 'https://lh3.googleusercontent.com/u/0/d/1UL2JBohbIHKBWEI4hwuUxfn1GKnFf6Oa' },
];

export const METRICS: Metric[] = [
  { label: 'Creators & Brands Served', value: 65, suffix: '+' },
  { label: 'Designs Delivered', value: 3500, suffix: '+' },
  { label: 'Client Satisfaction', value: 100, suffix: '%' },
  { label: 'Fast Delivery', value: 24, suffix: '–48H' }
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 1,
    title: 'Content Research',
    description: 'I research your content, analyze competitors, and study audience behavior to refine your packaging and maximize growth and retention.'
  },
  {
    id: 2,
    title: 'Strategic Ideation',
    description: 'I create detailed thumbnail concepts with visual references, clear notes, and proven text options so you know exactly how the final thumbnail will look and why it works.'
  },
  {
    id: 3,
    title: 'Creative Design',
    description: 'I design every visual myself, no outsourcing. From concept to final delivery, with optimized video titles for A/B testing. Everything you need, all under one roof.'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'How fast is delivery?',
    answer: 'Our standard delivery time is 24 hours for most single-visual projects. Bulk orders may take slightly longer, but we always prioritize speed.'
  },
  {
    question: 'Do you offer revisions?',
    answer: 'Yes, we offer unlimited revisions until you are 100% satisfied. We want your visuals to perfectly match your vision.'
  },
  {
    question: 'What files do I get?',
    answer: 'You will receive high-resolution PNG, JPEG, and source files (PSD) if requested. All visuals are optimized for their respective platforms.'
  },
  {
    question: 'Can I request custom styles?',
    answer: 'Absolutely! Artura specializes in creating unique, custom styles that stand out from the generic templates.'
  },
  {
    question: 'Do you work internationally?',
    answer: 'Yes, we have worked with clients across the globe, from the USA to Europe and Asia. Language and time zones are no barrier for us.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 'v1', type: 'video', author: 'Client Review 1', content: 'https://youtube.com/shorts/HQTp0zKU_fg?feature=share' },
  { id: 'v2', type: 'video', author: 'Client Review 2', content: 'https://youtube.com/shorts/DBTJ6x3aKIU?feature=share' },
  { id: 'v3', type: 'video', author: 'Client Review 3', content: 'https://youtube.com/shorts/FIRaM02_YrU?feature=share' }
];
