import { motion } from 'framer-motion';

const stars = Array.from({ length: 30 }).map((_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 4 + 3,
  delay: Math.random() * 5,
}));

export default function FloatingStars() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute bg-gold-300 rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            boxShadow: `0 0 ${star.size * 2}px rgba(251, 191, 36, 0.8)`
          }}
          animate={{
            opacity: [0.1, 0.8, 0.1],
            scale: [1, 1.5, 1],
            y: [0, -20, 0]
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Subtle Rotating Geometric Mandala in background */}
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.03]"
        animate={{ rotate: 360 }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
      >
        <svg width="800" height="800" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="0.5">
          <circle cx="50" cy="50" r="48" />
          <path d="M50 2 L50 98 M2 50 L98 50" />
          <path d="M16 16 L84 84 M16 84 L84 16" />
          <rect x="25" y="25" width="50" height="50" transform="rotate(45 50 50)" />
          <rect x="25" y="25" width="50" height="50" />
        </svg>
      </motion.div>
    </div>
  );
}
