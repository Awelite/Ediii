import { useMemo } from 'react'
import { motion } from 'framer-motion'

export default function Moon({ className = '' }) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Glow layers */}
      {[80, 60, 40].map((blur, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gold-300"
          style={{
            width: 200 - i * 40,
            height: 200 - i * 40,
            opacity: 0.04 + i * 0.03,
            filter: `blur(${blur}px)`,
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{ opacity: [0.04 + i * 0.03, 0.08 + i * 0.04, 0.04 + i * 0.03] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
      <div className="relative w-20 h-20 sm:w-28 sm:h-28">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-300 via-gold-400 to-gold-500 shadow-[0_0_50px_rgba(251,191,36,0.4)]" />
        <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-16 h-16 sm:w-22 sm:h-22 rounded-full bg-navy-950" />
      </div>
    </motion.div>
  )
}
