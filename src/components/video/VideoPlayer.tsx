import { useState } from 'react';
import OriginalReactPlayer from 'react-player';
const ReactPlayer = OriginalReactPlayer as any;
import { motion, AnimatePresence } from 'motion/react';
import { X, Share2, Heart } from 'lucide-react';
import type { Video } from '@/src/lib/youtube';
import { cn } from '@/src/lib/utils';

interface VideoPlayerProps {
  video: Video | null;
  onClose: () => void;
}

export default function VideoPlayer({ video, onClose }: VideoPlayerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!video) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-2xl bg-brand-ink/40"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 40 }}
          className="relative w-full max-w-5xl bg-brand-parchment rounded-[32px] overflow-hidden shadow-2xl border border-brand-line"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(false); // Reset on click outside
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2 bg-brand-olive/10 hover:bg-brand-olive/20 rounded-full transition-colors group"
          >
            <X className="w-6 h-6 text-brand-olive" />
          </button>

          <div className="aspect-video w-full bg-brand-ink">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${video.id}`}
              width="100%"
              height="100%"
              controls
              playing
            />
          </div>

          <div className="p-10">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
              <div className="flex-1">
                <span className="text-brand-orange font-bold text-[10px] uppercase tracking-[0.2em] mb-3 block">Now Playing</span>
                <h2 className="font-serif text-3xl text-brand-olive mb-4 italic leading-tight">
                  {video.title}
                </h2>
                <div className="relative">
                  <p className={cn(
                    "text-brand-subtle text-sm leading-relaxed font-light transition-all duration-300",
                    !isExpanded ? "line-clamp-2" : "max-h-60 overflow-y-auto pr-6 custom-scrollbar"
                  )}>
                    {video.description}
                  </p>
                  {video.description && video.description.length > 100 && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsExpanded(!isExpanded);
                      }}
                      className="text-brand-olive text-xs font-bold mt-2 hover:text-brand-ink transition-colors cursor-pointer border-b border-transparent hover:border-brand-ink"
                    >
                      {isExpanded ? 'Read Less' : 'Read More'}
                    </button>
                  )}
                </div>
              </div>
              
              <div className="flex gap-3 shrink-0">
                <button className="p-4 rounded-full border border-brand-line hover:bg-white transition-all shadow-sm">
                  <Heart className="w-5 h-5 text-brand-subtle hover:text-brand-orange transition-colors" />
                </button>
                <button className="p-4 rounded-full border border-brand-line hover:bg-white transition-all shadow-sm">
                  <Share2 className="w-5 h-5 text-brand-subtle" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
