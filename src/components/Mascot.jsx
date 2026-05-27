import { motion } from 'framer-motion'

const moods = {
  happy: {
    eyes: '^ ^',
    mouth: 'w',
    blush: true,
    color: 'from-slate-50 to-slate-200',
    animation: { y: [0, -4, 0], rotate: [0, 2, -2, 0] },
  },
  wave: {
    eyes: '^ ^',
    mouth: 'w',
    blush: true,
    color: 'from-slate-50 to-slate-200',
    animation: { y: [0, -3, 0] },
  },
  excited: {
    eyes: '★ ★',
    mouth: 'o',
    blush: true,
    color: 'from-slate-50 to-slate-200',
    animation: { y: [0, -12, 0], scale: [1, 1.05, 1] },
  },
  sad: {
    eyes: 'T T',
    mouth: '︵',
    blush: false,
    color: 'from-slate-200 to-slate-300',
    animation: { y: [0, 2, 0] },
  },
  pray: {
    eyes: 'U U',
    mouth: 'w',
    blush: true,
    color: 'from-slate-50 to-slate-200',
    animation: { y: [0, -2, 0], scale: [1, 1.02, 1] },
  },
}

export default function Mascot({ mood = 'happy', size = 'md', className = '' }) {
  const config = moods[mood] || moods.happy
  const sizeMap = {
    sm: { container: 'w-20 h-24', face: 'text-xs', ears: 'w-6 h-6', paw: 'w-5 h-5' },
    md: { container: 'w-28 h-32', face: 'text-sm', ears: 'w-8 h-8', paw: 'w-7 h-7' },
    lg: { container: 'w-36 h-40', face: 'text-lg', ears: 'w-10 h-10', paw: 'w-9 h-9' },
  }
  const s = sizeMap[size] || sizeMap.md

  return (
    <motion.div
      className={`relative flex flex-col items-center ${className}`}
      animate={config.animation}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className={`${s.container} relative flex flex-col items-center justify-end`}>
        
        {/* Left Ear */}
        <motion.div 
          className={`absolute top-1 left-2 ${s.ears} bg-gradient-to-br ${config.color} rounded-tl-xl shadow-sm z-0`}
          style={{ transform: 'rotate(-20deg)' }}
          animate={mood === 'sad' ? { rotate: -50, y: 6 } : {}}
        />
        {/* Right Ear */}
        <motion.div 
          className={`absolute top-1 right-2 ${s.ears} bg-gradient-to-bl ${config.color} rounded-tr-xl shadow-sm z-0`}
          style={{ transform: 'rotate(20deg)' }}
          animate={mood === 'sad' ? { rotate: 50, y: 6 } : {}}
        />

        {/* Squishy Cat Body */}
        <div className={`relative bg-gradient-to-b ${config.color} rounded-[45%] flex flex-col items-center justify-center shadow-xl z-10 border border-white/40`}
          style={{ width: '95%', height: '85%' }}
        >
          {/* Eyes */}
          <motion.div
            className={`${s.face} font-bold tracking-[0.6em] mb-1 text-slate-800 ml-2`}
            animate={mood === 'sad' ? {} : { scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 1] }}
          >
            {config.eyes}
          </motion.div>

          {/* Mouth */}
          <div className={`${s.face} text-slate-800 font-bold mb-2`}>
            {config.mouth}
          </div>

          {/* Left Whiskers */}
          <div className="absolute left-1 top-[45%] flex flex-col gap-1.5 opacity-40">
            <div className="w-3 sm:w-4 h-[1.5px] bg-slate-800 rotate-12" />
            <div className="w-3 sm:w-4 h-[1.5px] bg-slate-800 -rotate-6" />
          </div>
          {/* Right Whiskers */}
          <div className="absolute right-1 top-[45%] flex flex-col gap-1.5 items-end opacity-40">
            <div className="w-3 sm:w-4 h-[1.5px] bg-slate-800 -rotate-12" />
            <div className="w-3 sm:w-4 h-[1.5px] bg-slate-800 rotate-6" />
          </div>

          {/* Blush */}
          {config.blush && (
            <>
              <div className="absolute left-[15%] top-[50%] w-3 h-2 sm:w-4 sm:h-2.5 rounded-full bg-pink-400/50 blur-[2px]" />
              <div className="absolute right-[15%] top-[50%] w-3 h-2 sm:w-4 sm:h-2.5 rounded-full bg-pink-400/50 blur-[2px]" />
            </>
          )}

          {/* Emerald Eid Collar */}
          <div className="absolute -bottom-1 w-[70%] h-3 sm:h-4 bg-emerald-500 rounded-full shadow-inner flex items-center justify-center z-20 border border-emerald-400/50">
            {/* Gold Bell/Medallion */}
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gold-400 shadow-md border border-gold-300 flex items-center justify-center">
              <div className="w-[1px] h-[4px] bg-gold-600/50" />
            </div>
          </div>
        </div>

        {/* Waving paw */}
        {mood === 'wave' && (
          <motion.div
            className={`absolute right-[-15%] top-[35%] ${s.paw} bg-slate-100 rounded-full shadow-lg z-20 border border-white/50`}
            animate={{ rotate: [0, -40, 20, -40, 0], y: [0, -6, 0, -6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}

        {/* Praying paws */}
        {mood === 'pray' && (
          <motion.div
            className={`absolute bottom-3 left-1/2 -translate-x-1/2 w-8 h-5 sm:w-10 sm:h-6 bg-slate-100 rounded-full shadow-lg z-30 flex justify-center items-center gap-1 border border-white/50`}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-1.5 h-3 sm:h-4 bg-slate-200 rounded-full" />
            <div className="w-1.5 h-3 sm:h-4 bg-slate-200 rounded-full" />
          </motion.div>
        )}

        {/* Tears for sad */}
        {mood === 'sad' && (
          <>
            <motion.div
              className="absolute left-[30%] top-[55%] w-1.5 h-2.5 sm:w-2 sm:h-3 bg-blue-400/70 rounded-full z-20"
              animate={{ y: [0, 20], opacity: [1, 0], scaleY: [1, 1.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="absolute right-[30%] top-[55%] w-1.5 h-2.5 sm:w-2 sm:h-3 bg-blue-400/70 rounded-full z-20"
              animate={{ y: [0, 20], opacity: [1, 0], scaleY: [1, 1.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 }}
            />
          </>
        )}

        {/* Sparkles for excited */}
        {mood === 'excited' && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-gold-400 z-0 text-[10px] sm:text-xs"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${-20 + Math.random() * 20}%`,
                }}
                animate={{
                  y: [0, -25, 0],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5, 0.5],
                  rotate: [0, 180]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                ✦
              </motion.div>
            ))}
          </>
        )}
      </div>
    </motion.div>
  )
}
