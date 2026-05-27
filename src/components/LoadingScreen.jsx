import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 400)
          return 100
        }
        return prev + 2
      })
    }, 28)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: '#0a1128',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100dvh',
    }}>

      {/* Ambient radial glow */}
      <div style={{
        position: 'absolute',
        width: 300, height: 300,
        borderRadius: '50%',
        background: 'rgba(16,185,129,0.07)',
        filter: 'blur(70px)',
        top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        pointerEvents: 'none',
      }}/>

      {/* Crescent moon */}
      <motion.div
        initial={{ scale: 0, rotate: -20, opacity: 0 }}
        animate={{ scale: 1, rotate: 0,  opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: 28 }}
      >
        <div style={{ position:'relative', width:70, height:70 }}>
          <div style={{
            position:'absolute', inset:0, borderRadius:'50%',
            background:'#fbbf24',
            boxShadow:'0 0 40px rgba(251,191,36,0.45)',
          }}/>
          <div style={{
            position:'absolute', top:-3, right:-3,
            width:60, height:60, borderRadius:'50%',
            background:'#0a1128',
          }}/>
        </div>
      </motion.div>

      {/* Label */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(52,211,153,0.7)',
          marginBottom: 20,
          textAlign: 'center',
          padding: '0 24px',
        }}
      >
        Preparing your Eid experience
      </motion.p>

      {/* Progress bar */}
      <div style={{
        width: 140, height: 2.5,
        background: 'rgba(255,255,255,0.07)',
        borderRadius: 9999, overflow: 'hidden',
      }}>
        <motion.div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg,#10b981,#fbbf24)',
            borderRadius: 9999,
          }}
          transition={{ duration: 0.06 }}
        />
      </div>

      {/* Twinkling stars — fixed positions, not random (avoids SSR/hydration flicker) */}
      {[
        { top:'15%', left:'8%',  d:2.2, dd:0 },
        { top:'20%', left:'88%', d:1.8, dd:0.4 },
        { top:'72%', left:'10%', d:2.0, dd:0.8 },
        { top:'78%', left:'85%', d:1.6, dd:1.2 },
        { top:'38%', left:'4%',  d:2.4, dd:0.6 },
        { top:'42%', left:'93%', d:1.8, dd:1.0 },
        { top:'55%', left:'50%', d:1.5, dd:1.5 },
      ].map(({ top, left, d, dd }, i) => (
        <motion.div
          key={i}
          style={{
            position:'absolute', width:3, height:3,
            borderRadius:'50%', background:'#fcd34d',
            top, left,
          }}
          animate={{ opacity:[0.1,0.85,0.1], scale:[0.7,1.4,0.7] }}
          transition={{ duration: d + 1.2, repeat:Infinity, delay: dd }}
        />
      ))}
    </div>
  )
}
