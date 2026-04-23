import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Instagram, Youtube, Mail, ExternalLink, Heart, Send } from 'lucide-react';
import { sendContactEmail } from '../services/contact';

export default function AboutSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const result = await sendContactEmail(formData);
    
    if (result.success) {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } else {
      setError(result.message);
    }
    setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto w-full pb-20"
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

            <div className="mt-8 flex gap-4">
              <a href="https://youtube.com" className="flex items-center gap-2 px-4 py-2 rounded-full border border-brand-line text-brand-subtle hover:text-brand-olive transition-colors">
                <Youtube className="w-4 h-4" />
                <span className="text-xs font-medium">YouTube</span>
              </a>
              <a href="https://instagram.com" className="flex items-center gap-2 px-4 py-2 rounded-full border border-brand-line text-brand-subtle hover:text-brand-olive transition-colors">
                <Instagram className="w-4 h-4" />
                <span className="text-xs font-medium">Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="mt-20">
        <div className="text-center mb-12">
          <span className="text-brand-orange font-bold text-[10px] uppercase tracking-[0.3em] mb-3 block">Reach Out</span>
          <h3 className="text-4xl font-serif italic text-brand-olive">Connect with Amit</h3>
          <p className="text-brand-subtle font-light mt-4 mx-auto max-w-xl">
            Have questions about a specific practice or interested in private sessions? Send a message and let's start the conversation.
          </p>
        </div>

        <div className="bg-brand-parchment rounded-[32px] p-8 md:p-12 border border-brand-line shadow-sm max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-16 h-16 bg-brand-olive text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-serif italic text-brand-olive mb-2">Message Sent</h4>
                <p className="text-brand-subtle font-light">Thank you for reaching out. Amit will get back to you soon.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-brand-olive font-bold text-xs uppercase tracking-widest border-b border-brand-olive hover:text-brand-ink hover:border-brand-ink transition-all"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-subtle ml-1">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white border border-brand-line rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand-olive transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-subtle ml-1">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white border border-brand-line rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand-olive transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-brand-subtle ml-1">Your Message</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-white border border-brand-line rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand-olive transition-all resize-none"
                    placeholder="How can Amit help you today?"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-xs font-medium bg-red-50 p-3 rounded-xl">{error}</p>
                )}

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-olive text-white font-bold py-5 rounded-2xl hover:bg-brand-ink transition-all shadow-xl shadow-brand-olive/20 disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="mt-20 text-center">
        <Heart className="w-6 h-6 text-brand-orange mx-auto mb-4 animate-pulse" />
        <p className="text-brand-subtle italic font-serif text-lg">"The soul is here for its own joy."</p>
      </div>
    </motion.div>
  );
}
