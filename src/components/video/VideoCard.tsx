import { motion } from 'motion/react';
import { Play, Heart } from 'lucide-react';
import type { Video } from '@/src/lib/youtube';
import { cn } from '@/src/lib/utils';

interface VideoCardProps {
  video: Video;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent, video: Video) => void;
  onClick: (video: Video) => void;
}

export default function VideoCard({ video, isFavorite, onToggleFavorite, onClick }: VideoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group cursor-pointer bg-white p-3 rounded-[24px] overflow-hidden border border-brand-line hover:shadow-lg transition-all duration-300 relative"
      onClick={() => onClick(video)}
    >
      <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-brand-ink/0 group-hover:bg-brand-ink/20 transition-colors flex items-center justify-center">
          <div className="w-10 h-10 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100">
            <Play className="w-5 h-5 text-white fill-current" />
          </div>
        </div>
        <button 
          onClick={(e) => onToggleFavorite(e, video)}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-lg transform transition-transform hover:scale-110"
        >
          <Heart 
            className={cn(
              "w-4 h-4 transition-colors",
              isFavorite ? "fill-brand-orange text-brand-orange" : "text-brand-subtle"
            )} 
          />
        </button>
      </div>
      <div className="px-2 pb-2">
        <h3 className="font-semibold text-sm text-brand-olive leading-snug mb-2 line-clamp-2">
          {video.title}
        </h3>
        <p className="text-[10px] text-brand-subtle uppercase tracking-wider font-bold">
          {new Date(video.publishedAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
    </motion.div>
  );
}
