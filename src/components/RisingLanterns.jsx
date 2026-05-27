import { motion } from 'framer-motion';

const lanterns = Array.from({ length: 15 }).map((_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 10,
  duration: Math.random() * 10 + 15, // Slow float
  scale: Math.random() * 0.5 + 0.5,
}));

export default function RisingLanterns() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {lanterns.map(l => (
        <motion.div
          key={l.id}
          className="absolute bottom-[-100px] flex flex-col items-center"
          style={{ 
            left: `${l.x}%`,
            transform: `scale(${l.scale})`
          }}
          animate={{
            y: ['0vh', '-120vh'],
            x: ['0px', '30px', '-30px', '0px']
          }}
          transition={{
            y: { duration: l.duration, repeat: Infinity, delay: l.delay, ease: "linear" },
            x: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          {/* Wish Lantern SVG */}
          <div className="relative">
            {/* Inner Fire Glow */}
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-orange-400 rounded-full blur-md"
              animate={{ opacity: [0.6, 1, 0.6], scale: [0.8, 1.1, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            
            <svg width="40" height="60" viewBox="0 0 40 60" fill="none">
              <path d="M10 15 C10 5, 30 5, 30 15 L35 45 C35 55, 5 55, 5 45 Z" fill="rgba(255, 237, 213, 0.15)" stroke="rgba(255, 237, 213, 0.4)" strokeWidth="1"/>
              <path d="M10 15 L30 15" stroke="rgba(255, 237, 213, 0.4)" strokeWidth="1"/>
              <path d="M5 45 L35 45" stroke="rgba(255, 237, 213, 0.4)" strokeWidth="1"/>
            </svg>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
