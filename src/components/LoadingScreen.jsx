import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 2
      })
    }, 30)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: '#0a1128' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 320, height: 320,
          borderRadius: '50%',
          background: 'rgba(16,185,129,0.06)',
          filter: 'blur(80px)',
          top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      />

      {/* Crescent moon */}
      <motion.div
        initial={{ scale: 0, rotate: -30, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: 32, position: 'relative' }}
      >
        <div style={{ position: 'relative', width: 80, height: 80 }}>
          {/* Gold circle */}
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: '50%',
            background: '#fbbf24',
            boxShadow: '0 0 50px rgba(251,191,36,0.4)',
          }} />
          {/* Cutout to make crescent */}
          <div style={{
            position: 'absolute',
            top: -4, right: -4,
            width: 68, height: 68,
            borderRadius: '50%',
            background: '#0a1128',
          }} />
        </div>
      </motion.div>

      {/* Text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(52,211,153,0.75)',
          marginBottom: 24,
          textAlign: 'center',
        }}
      >
        Preparing your Eid experience
      </motion.p>

      {/* Progress bar */}
      <div style={{
        width: 160, height: 3,
        background: 'rgba(255,255,255,0.06)',
        borderRadius: 9999, overflow: 'hidden',
      }}>
        <motion.div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #10b981, #fbbf24)',
            borderRadius: 9999,
          }}
          transition={{ duration: 0.08 }}
        />
      </div>

      {/* Twinkling stars */}
      {[
        { top: '18%', left: '12%' },
        { top: '25%', left: '82%' },
        { top: '70%', left: '15%' },
        { top: '75%', left: '80%' },
        { top: '40%', left: '6%'  },
        { top: '45%', left: '92%' },
      ].map((pos, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: 3, height: 3,
            borderRadius: '50%',
            background: '#fcd34d',
            ...pos,
          }}
          animate={{ opacity: [0.15, 0.9, 0.15], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </div>
  )
}
