import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
      {categories.map((category) => {
        const isActive = selected === category;
        return (
          <motion.button
            key={category}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(category)}
            className={cn(
              "px-5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 border",
              isActive 
                ? "bg-brand-olive text-white shadow-md border-brand-olive" 
                : "bg-white text-brand-subtle hover:text-brand-olive hover:bg-brand-parchment border-brand-line"
            )}
          >
            {category}
          </motion.button>
        );
      })}
    </div>
  );
}
