import { useMemo } from 'react'
import { motion } from 'framer-motion'

export default function Lanterns() {
  const lanterns = useMemo(() => [
    { x: 8, delay: 0, color: '#fbbf24' },
    { x: 25, delay: 1.2, color: '#34d399' },
    { x: 75, delay: 0.6, color: '#fbbf24' },
    { x: 92, delay: 1.8, color: '#f59e0b' },
  ], [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      {lanterns.map((l, i) => (
        <motion.div
          key={i}
          className="absolute top-0"
          style={{ left: `${l.x}%` }}
          animate={{ rotate: [-4, 4, -4] }}
          transition={{ duration: 3, repeat: Infinity, delay: l.delay, ease: 'easeInOut' }}
        >
          {/* String */}
          <div className="w-px h-16 sm:h-24 bg-white/10 mx-auto" />
          {/* Lantern body */}
          <div className="relative w-8 h-12 sm:w-10 sm:h-14 mx-auto">
            <div className="absolute inset-0 rounded-lg" style={{
              background: `linear-gradient(180deg, ${l.color}33, ${l.color}11)`,
              border: `1px solid ${l.color}22`,
            }} />
            {/* Inner glow */}
            <motion.div
              className="absolute inset-2 rounded"
              style={{ background: l.color, filter: 'blur(6px)', opacity: 0.3 }}
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, delay: l.delay }}
            />
            {/* Cap */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-5 h-2 sm:w-6 sm:h-2 rounded-t" style={{
              background: `linear-gradient(to right, ${l.color}66, ${l.color}44)`,
            }} />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
