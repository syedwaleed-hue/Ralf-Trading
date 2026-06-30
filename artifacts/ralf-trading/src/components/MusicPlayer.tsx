import React from 'react';
import { useMusic } from '@/context/MusicContext';
import { FaPlay, FaPause } from 'react-icons/fa';
import { motion } from 'framer-motion';

export const MusicPlayer = () => {
  const { isPlaying, togglePlay, volume, setVolume, hasEntered } = useMusic();

  if (!hasEntered) return null;

  return (
    <div className="flex items-center gap-4 group">
      {/* Animated Equalizer */}
      <div className="flex items-end gap-[2px] h-4 w-4">
        {[1, 2, 3].map((bar) => (
          <motion.div
            key={bar}
            className="w-1 bg-primary rounded-t-sm"
            animate={{
              height: isPlaying ? ['4px', '16px', '4px'] : '4px',
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: bar * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <button 
        onClick={togglePlay}
        className="text-primary hover:text-white transition-colors"
      >
        {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
      </button>

      <div className="w-0 overflow-hidden group-hover:w-20 transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center">
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={volume} 
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-primary"
        />
      </div>
    </div>
  );
};

export default MusicPlayer;