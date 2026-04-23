import React from 'react';
import { motion } from 'motion/react';
import { Globe, Instagram, Youtube, Mail, ExternalLink, Heart } from 'lucide-react';

export default function AboutSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto w-full"
    >
      <div className="bg-white rounded-[40px] overflow-hidden shadow-2xl border border-brand-line">
        <div className="grid md:grid-cols-2">
          <div className="aspect-[4/5] relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000" 
              alt="Amit Yoga Practice"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-olive/60 to-transparent flex flex-col justify-end p-10 text-white">
              <h2 className="text-4xl font-serif italic mb-2 tracking-tight">Amit Yoga</h2>
              <p className="text-sm font-light opacity-90 uppercase tracking-[0.2em]">Guided by Spirit, Rooted in Practice</p>
            </div>
          </div>
          
          <div className="p-12 flex flex-col justify-center">
            <span className="text-brand-orange font-bold text-[10px] uppercase tracking-[0.2em] mb-4 block">Teacher & Guide</span>
            <h3 className="text-3xl font-serif italic text-brand-olive mb-6 leading-tight">About Amit</h3>
            
            <div className="space-y-6 text-brand-subtle text-sm leading-relaxed font-light">
              <p>
                Namaste. I am Amit, and my journey with yoga began with a simple desire for peace in a busy world. Over the last decade, I have dedicated myself to sharing the transformative power of mindful movement and breathwork.
              </p>
              <p>
                My approach blends traditional Hatha and Vinyasa techniques with a modern focus on accessibility and inner harmony. Whether you are a beginner or looking to deepen your practice, I am here to guide you through every flow, every breath, and every moment of stillness.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-brand-line grid grid-cols-2 gap-4">
              <a 
                href="https://yogawithamit.com" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-2xl bg-brand-parchment hover:bg-brand-line transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-brand-olive shadow-sm">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-brand-subtle uppercase tracking-widest leading-none mb-1">Website</span>
                  <span className="text-xs text-brand-olive font-medium truncate">yogawithamit.com</span>
                </div>
              </a>
              
              <a 
                href="mailto:namaste@yogawithamit.com" 
                className="flex items-center gap-3 p-3 rounded-2xl bg-brand-parchment hover:bg-brand-line transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-brand-olive shadow-sm">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-brand-subtle uppercase tracking-widest leading-none mb-1">Contact</span>
                  <span className="text-xs text-brand-olive font-medium truncate">Email Amit</span>
                </div>
              </a>
            </div>

            <div className="mt-6 flex gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-brand-line text-brand-subtle hover:text-brand-olive transition-colors cursor-pointer">
                <Youtube className="w-4 h-4" />
                <span className="text-xs font-medium">YouTube</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-brand-line text-brand-subtle hover:text-brand-olive transition-colors cursor-pointer">
                <Instagram className="w-4 h-4" />
                <span className="text-xs font-medium">Instagram</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <Heart className="w-6 h-6 text-brand-orange mx-auto mb-4 animate-pulse" />
        <p className="text-brand-subtle italic font-serif text-lg">"The soul is here for its own joy."</p>
      </div>
    </motion.div>
  );
}
