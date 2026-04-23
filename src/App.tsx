import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, Youtube, Instagram, Mail, LayoutGrid, Compass, Globe, Heart as HeartIcon } from 'lucide-react';
import { fetchVideos, type Video } from '@/src/lib/youtube';
import { cn } from '@/src/lib/utils';
import VideoCard from './components/video/VideoCard';
import VideoPlayer from './components/video/VideoPlayer';
import CategoryFilter from './components/video/CategoryFilter';
import BrandLogo from './components/BrandLogo';
import AboutSection from './components/AboutSection';
import { subscribeToNewsletter } from './services/newsletter';

const CATEGORIES = [
  "All Practices",
  "My Practice",
  "Yoga for Men",
  "Yoga for Women",
  "Digestion",
  "Seniors",
  "Pranayama",
  "EFT Healing",
  "Morning Yoga",
  "Back Pain",
  "Breathing",
  "Beginner Friendly",
  "Stress Relief"
];

const CATEGORY_KEYWORDS: Record<string, string> = {
  "Seniors": "70+ Seniors Elderly",
  "Pranayama": "Breathing Pranayama",
  "Digestion": "Digestion Gut Health",
  "Yoga for Men": "Men Strength",
  "Yoga for Women": "Women Wellness",
  "EFT Healing": "EFT Healing Tapping",
  "Morning Yoga": "Morning Energy",
  "Back Pain": "Back Pain Relief",
  "Stress Relief": "Stress Anxiety Relief"
};

export default function App() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Practices");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'about'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Video[]>(() => {
    const saved = localStorage.getItem('amit_yoga_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('amit_yoga_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    setSearchQuery(''); // Clear search when category changes
    loadVideos();
    // Smooth scroll to top of grid area when category changes
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [selectedCategory]);

  const loadVideos = async (overrideQuery?: string) => {
    setLoading(true);
    
    if (selectedCategory === "My Practice" && overrideQuery === undefined) {
      setVideos(favorites);
      setLoading(false);
      return;
    }

    let query = "";
    if (overrideQuery !== undefined) {
      query = overrideQuery;
    } else if (selectedCategory !== "All Practices") {
      query = CATEGORY_KEYWORDS[selectedCategory] || selectedCategory;
    }
    
    const data = await fetchVideos(query);
    setVideos(data);
    setLoading(false);
  };

  const toggleFavorite = (e: React.MouseEvent, video: Video) => {
    e.stopPropagation();
    setFavorites(prev => {
      const isFav = prev.some(v => v.id === video.id);
      if (isFav) {
        return prev.filter(v => v.id !== video.id);
      } else {
        return [...prev, video];
      }
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSelectedCategory("All Practices"); // Reset category when searching
      loadVideos(searchQuery);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || isSubscribing) return;

    setIsSubscribing(true);
    const result = await subscribeToNewsletter(email);
    setIsSubscribing(false);
    
    if (result.success) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-brand-parchment">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-72 h-full border-r border-brand-line bg-white flex-col">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center">
              <BrandLogo className="w-full h-full" />
            </div>
            <h1 className="text-2xl font-serif italic text-brand-olive tracking-tight">Yoga with Amit</h1>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-brand-subtle font-bold">Inner Balance & Harmony</p>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          <div 
            onClick={() => setActiveTab('home')}
            className={cn(
              "px-4 py-3 rounded-2xl flex items-center shadow-md cursor-pointer transition-all duration-300 mb-2",
              activeTab === 'home' ? "bg-brand-olive text-white shadow-brand-olive/20" : "bg-transparent text-brand-subtle hover:bg-brand-parchment"
            )}
          >
            <LayoutGrid className="w-5 h-5 mr-3" />
            <span className="font-medium text-sm">Practices</span>
          </div>

          <div 
            onClick={() => setActiveTab('about')}
            className={cn(
              "px-4 py-3 rounded-2xl flex items-center shadow-md cursor-pointer transition-all duration-300",
              activeTab === 'about' ? "bg-brand-olive text-white shadow-brand-olive/20" : "bg-transparent text-brand-subtle hover:bg-brand-parchment"
            )}
          >
            <Compass className="w-5 h-5 mr-3" />
            <span className="font-medium text-sm">About Amit</span>
          </div>
          
          <div className="mt-8 px-4">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-brand-subtle font-bold mb-4">Practices</h3>
            <ul className="space-y-4">
              {CATEGORIES.slice(1).map(cat => (
                <li 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="flex items-center text-sm text-brand-olive hover:text-brand-ink cursor-pointer group transition-colors"
                >
                  <span className={cn(
                    "w-2 h-2 rounded-full border border-brand-olive mr-4 transition-all duration-300",
                    selectedCategory === cat ? "bg-brand-olive scale-110" : "group-hover:bg-brand-olive"
                  )} />
                  {cat}
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="p-8 mt-auto">
          <div className="bg-brand-parchment p-4 rounded-2xl border border-brand-line">
            <p className="text-[11px] leading-relaxed text-slate-500 italic">
              "Yoga is not just a workout, it's about working on yourself."
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto custom-scrollbar flex flex-col p-10"
      >
        {/* Header Bar */}
        <header className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-6">
            {/* Logo Slot */}
            <div 
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-3 lg:hidden cursor-pointer"
            >
              <div className="w-14 h-14 flex items-center justify-center group overflow-hidden p-1">
                <BrandLogo className="w-full h-full transition-transform group-hover:scale-110" />
              </div>
            </div>

            <div className="flex space-x-3 items-center w-full max-w-[calc(100vw-300px)] lg:max-w-none">
              {activeTab === 'home' ? (
                <CategoryFilter 
                  categories={CATEGORIES}
                  selected={selectedCategory}
                  onSelect={setSelectedCategory}
                />
              ) : (
                <div className="text-xl font-serif italic text-brand-olive py-4">Amit's Journey</div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-subtle group-focus-within:text-brand-olive transition-colors" />
              <input 
                type="text" 
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-white border border-brand-line rounded-full w-48 focus:outline-none focus:border-brand-olive transition-all text-xs shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <div className="w-10 h-10 bg-brand-olive rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-brand-olive/20 cursor-pointer text-sm">
              A
            </div>
          </div>
        </header>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Content Section */}
              <div className="mb-8">
                <div className="flex justify-between items-end mb-6">
                  <h3 className="text-xl font-serif italic text-brand-olive">Continue Your Practice</h3>
                  <span className="text-xs text-brand-subtle font-bold border-b border-brand-subtle cursor-pointer hover:text-brand-olive hover:border-brand-olive transition-colors">
                    Explore More Categories
                  </span>
                </div>

                {/* Video Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  <AnimatePresence mode="popLayout">
                    {loading ? (
                      Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="animate-pulse bg-white p-3 rounded-[24px] border border-brand-line">
                          <div className="aspect-video bg-brand-parchment rounded-2xl mb-4" />
                          <div className="px-2">
                            <div className="h-5 bg-brand-parchment rounded-lg w-3/4 mb-3" />
                            <div className="h-3 bg-brand-parchment rounded-lg w-1/4" />
                          </div>
                        </div>
                      ))
                    ) : (
                      videos
                        .filter(v => v.title.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((video) => (
                          <VideoCard 
                            key={video.id} 
                            video={video} 
                            isFavorite={favorites.some(v => v.id === video.id)}
                            onToggleFavorite={toggleFavorite}
                            onClick={setSelectedVideo}
                          />
                        ))
                    )}
                  </AnimatePresence>
                </div>

                {!loading && videos.length === 0 && (
                  <div className="text-center py-32 bg-white/50 border border-brand-line border-dashed rounded-[40px]">
                    <Sparkles className="w-12 h-12 text-brand-subtle/30 mx-auto mb-6" />
                    <p className="font-serif text-xl italic text-brand-subtle">No practices found. Every path is unique, try exploring another category.</p>
                  </div>
                )}
              </div>

              {/* Support Section */}
              <section className="bg-brand-olive text-white p-12 rounded-[40px] shadow-2xl shadow-brand-olive/10 relative overflow-hidden mt-12">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Mail className="w-32 h-32" />
                </div>
                <div className="relative z-10 max-w-xl">
                  {isSubscribed ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-4"
                    >
                      <h3 className="font-serif text-3xl italic mb-4">Thank you for subscribing!</h3>
                      <p className="text-white/80 font-light leading-relaxed">
                        We're excited to have you in the community. Look out for our next routine in your inbox soon.
                      </p>
                      <button 
                        onClick={() => setIsSubscribed(false)}
                        className="mt-6 text-xs text-white/60 hover:text-white uppercase tracking-widest font-bold border-b border-white/20 transition-colors"
                      >
                        Subscribe another email
                      </button>
                    </motion.div>
                  ) : (
                    <>
                      <h3 className="font-serif text-3xl italic mb-6">Deepen Your Practice</h3>
                      <p className="text-white/80 font-light leading-relaxed mb-8">
                        Join our weekly newsletter for exclusive routines, wellness tips, and access to private community workshops led by Amit.
                      </p>
                      <form onSubmit={handleSubscribe} className="flex gap-4">
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your email address" 
                          disabled={isSubscribing}
                          className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50"
                        />
                        <button 
                          type="submit"
                          disabled={isSubscribing}
                          className="bg-white text-brand-olive font-bold px-8 py-4 rounded-2xl hover:bg-brand-parchment transition-colors disabled:opacity-50 flex items-center justify-center min-w-[140px]"
                        >
                          {isSubscribing ? (
                            <div className="w-5 h-5 border-2 border-brand-olive border-t-transparent rounded-full animate-spin" />
                          ) : 'Subscribe'}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="about"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
            >
              <AboutSection />
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-20 py-12 border-t border-brand-line flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-brand-subtle uppercase tracking-[0.2em] font-bold">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <p>© 2026 Yoga with Amit. All Rights Reserved.</p>
            <div className="flex items-center gap-4 border-l border-brand-line pl-6 hidden md:flex">
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-brand-ink transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-brand-ink transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://yogawithamit.com" target="_blank" rel="noreferrer" className="hover:text-brand-ink transition-colors">
                <Globe className="w-4 h-4" />
              </a>
            </div>
            {/* Mobile Socials */}
            <div className="flex items-center gap-6 md:hidden">
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-brand-ink transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-brand-ink transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://yogawithamit.com" target="_blank" rel="noreferrer" className="hover:text-brand-ink transition-colors">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="flex gap-12">
            <span className="hover:text-brand-ink transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-brand-ink transition-colors cursor-pointer">Terms</span>
            <span className="hover:text-brand-ink transition-colors cursor-pointer">Cookie Policy</span>
          </div>
        </footer>
      </main>

      {/* Video Player Modal */}
      <VideoPlayer 
        video={selectedVideo} 
        onClose={() => setSelectedVideo(null)} 
      />
    </div>
  );
}

